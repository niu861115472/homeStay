import React from 'react'
//引入Cropper图片裁剪组件
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Icon } from 'antd-mobile'
import './index.css'

export default class TakePhoto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayAdd:true,
            displayLoading: false,
            cropperData: '',
            base64: '',
            showCropModal: false
        };
        this.fReader = new FileReader();
        this.closureTime = 0;
    }

    render() {
        return <div id='testPage' className="contianer">
            {/*图片裁剪组件*/}
            {
                this.state.showCropModal ? <div className="cropModal" id='cropModal'>
                    <Cropper
                        className="crop"
                        ref='cropper'
                        src={this.state.cropperData}
                        style={{ height: '100%', width: '100%' }}
                        //0-默认-没有任何限制 1-限制裁剪框不超过canvas画布边缘 2-如果是长图-限制图片不超过cropper的最高可视区域-同时裁剪框不超过canvas画布边缘
                        viewMode={2}
                        dragMode='none'
                        minCanvasWidth={285}
                        //隐藏棋盘背景色
                        background={false}
                        //裁剪框内部的横竖虚线可见
                        guides={true}
                        //裁剪框内部的十字线可见
                        center={false}
                        //可旋转原图
                        rotatable={true}
                        //可缩放原图
                        scalable={true}
                    //crop={(e)=>{this.crop(e)}}
                    />
                    <div className="btn">
                        <div className="cropperBtn" onClick={this.cancelCrop.bind(this)}>取消</div>
                        <div className="cropperBtn" onClick={this.confirmCrop.bind(this)}>确认</div>
                        <div className="cropperBtn" onClick={this.rotateCrop.bind(this)}>旋转</div>
                    </div>
                </div> : null
            }
            
            <div className='pic-box'>
                <input
                    type="file"
                    onChange={(e) => { this.onChange(e) }}
                    className="getImg"
                    title={this.state.title}
                    id="fileinput"
                    ref='onChange'
                    accept="image/*"
                // capture="camera"
                />
                {this.state.displayLoading ? <Icon className='loading' type='loading' /> : null}
                {
                    this.state.displayAdd ?
                    <span className="add">+</span> : null
                }
                
            </div>
        </div>
    }
    onChange(e) {
        //此处是崩溃点 相机调用的频率越高，崩溃越快
        let _this = this;
        //弹出加载动画
        this.openLoading()
        let file = e.currentTarget.files[0];//object-Blob //96K 的文件转换成 base64 是 130KB
        //用户取消操作
        if (file == undefined) {
            return
        }
        this.fReader = new FileReader();
        let tempTimer = setTimeout(function () {
            _this.fReader.readAsDataURL(file);
            _this.fReader.onload = function (e) {
                _this.zip(this.result);//压缩逻辑
            }
            file = null;
            tempTimer = null;
        }, 500)
    }
    openLoading() {
        this.setState({
            displayLoading: true,
            displayAdd:false
        })
    }
    zip(base64) {
        let img = new Image();
        let _this = this
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let compressionRatio = 0.5
        //获取用户拍摄图片的旋转角度
        let orientation = this.getOrientation(this.base64ToArrayBuffer(base64));//1 0°  3 180°  6 90°  8 -90°
        img.src = base64
        img.onload = function () {
            let width = img.width, height = img.height;
            //图片旋转到 正向
            if (orientation == 3) {
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(Math.PI)
                ctx.drawImage(img, -width, -height, width, height)
            } else if (orientation == 6) {
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(Math.PI / 2)
                ctx.drawImage(img, 0, -height, width, height)
            } else if (orientation == 8) {
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(-Math.PI / 2)
                ctx.drawImage(img, -width, 0, width, height)
            } else {
                //不旋转原图
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
            }

            //第一次粗压缩
            // let base64 = canvas.toDataURL('image/jpeg', compressionRatio);//0.1-表示将原图10M变成1M 10-表示将原图1M变成10M
            //100保证图片容量 0.05保证不失真
            //console.log('第一次粗压缩',base64.length/1024,'kb，压缩率',compressionRatio);
            //第二次细压缩
            // while(base64.length/1024 > 500 && compressionRatio > 0.01){
            //console.log('while')
            // compressionRatio -= 0.01;
            // base64 = canvas.toDataURL('image/jpeg', compressionRatio);//0.1-表示将原图10M变成1M 10-表示将原图1M变成10M
            //console.log('第二次细压缩',base64.length/1024,'kb，压缩率',compressionRatio)
            // }
            _this.setCropperDate(canvas.toDataURL('image/jpeg', compressionRatio));
        };
    }

    /**
    * 拍照第一次压缩后为cropper组件赋值
    * @param imgDataBase64 图片的base64
    * @return
    */
    setCropperDate = (imgDataBase64) => {
        let _this = this;
        this.state.cropperData = imgDataBase64;
        //定时器的作用，上面的imgDataBase64赋值，属于大数据赋值操作，消耗资源过大，加上定时器等待大数据赋值成功内存释放之后再渲染UI，不会出现白屏
        let tempTimer = setTimeout(function () {
            _this.setState({
                displayLoading: false,
                showCropModal: true
            })
            clearTimeout(tempTimer)
        }, 300)
    }
    base64ToArrayBuffer(base64) {
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }
    getOrientation(arrayBuffer) {
        var dataView = new DataView(arrayBuffer);
        var length = dataView.byteLength;
        var orientation;
        var exifIDCode;
        var tiffOffset;
        var firstIFDOffset;
        var littleEndian;
        var endianness;
        var app1Start;
        var ifdStart;
        var offset;
        var i;
        // Only handle JPEG image (start by 0xFFD8)
        if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
            offset = 2;
            while (offset < length) {
                if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
                    app1Start = offset;
                    break;
                }
                offset++;
            }
        }
        if (app1Start) {
            exifIDCode = app1Start + 4;
            tiffOffset = app1Start + 10;
            if (this.getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
                endianness = dataView.getUint16(tiffOffset);
                littleEndian = endianness === 0x4949;
                if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
                    if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                        firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                        if (firstIFDOffset >= 0x00000008) {
                            ifdStart = tiffOffset + firstIFDOffset;
                        }
                    }
                }
            }
        }
        if (ifdStart) {
            length = dataView.getUint16(ifdStart, littleEndian);
            for (i = 0; i < length; i++) {
                offset = ifdStart + i * 12 + 2;
                if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
                    // 8 is the offset of the current tag's value
                    offset += 8;
                    // Get the original orientation value
                    orientation = dataView.getUint16(offset, littleEndian);
                    // Override the orientation with its default value for Safari (#120)
                    if (true) {
                        dataView.setUint16(offset, 1, littleEndian);
                    }
                    break;
                }
            }
        }
        return orientation;
    }

    getStringFromCharCode(dataView, start, length) {
        var str = '';
        var i;
        for (i = start, length += start; i < length; i++) {
            str += String.fromCharCode(dataView.getUint8(i));
        }
        return str;
    }
    rotateCrop() {
        this.refs.cropper.rotate(-90);
    }

    /**
    * 在裁剪组件中确认裁剪
    * @param
    * @return
    */
    confirmCrop() {
        let _this = this;
        //节流
        if (Date.now() - this.closureTime < 2000) {
            return
        }
        this.closureTime = Date.now()
        document.getElementById('cropModal').style.visibility = 'hidden';
        this.setState({
            displayLoading: true,
        })
        let tempTimer = setTimeout(function () {
            //获取裁剪后的图片base64 向服务器传递500KB以内的图片
            let compressionRatio = 0.5;
            let cropperData = _this.refs.cropper.getCroppedCanvas().toDataURL("image/jpeg", compressionRatio)
            while (cropperData.length / 1024 > 500 && compressionRatio > 0.1) {
                compressionRatio -= 0.1;
                cropperData = _this.refs.cropper.getCroppedCanvas().toDataURL("image/jpeg", compressionRatio)
            }
            _this.state.cropperData = null;
            _this.refs.cropper.clear();//去除裁剪框
            // console.log(_this.state.cropperData)
            //_this.refs.cropper.destroy();//需要修改npm包
            // _this.upload(cropperData);//向服务器提交base64图片数据
            _this.setState({
                base64: cropperData,
                displayAdd:false,
                displayLoading:false
            })
            // this.parent.getChildBase64(this, this.state.base64)
            var box = document.querySelector('.pic-box')
            box.style.backgroundImage = `url(${cropperData})`;
            box.style.backgroundSize = '100% 100%'
            console.log(cropperData)
            sessionStorage.setItem('base64_pic',cropperData)
            cropperData = null;
            //必须先拿到cropper数据 关闭裁剪框 显示加载框
            _this.setState({
                showCropModal: false
            })
            clearTimeout(tempTimer)
        }, 300)
    }

    /**
    * 在裁剪组件中取消裁剪
    * @param
    * @return
    */
    cancelCrop() {
        this.state.cropperData = null;
        this.refs.cropper.clear()
        this.setState({
            showCropModal: false
        })
    }
}