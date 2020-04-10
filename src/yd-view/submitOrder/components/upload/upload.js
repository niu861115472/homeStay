import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd'
import 'antd/dist/antd.css'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        alert('1')
        message.error('你只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        alert('2')
        message.error('图片必须小于10MB!');
    }
    return isJpgOrPng && isLt2M;
}

class upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            loading: false
        };
    }
    componentDidMount(){
        var input = document.querySelectorAll('input');
        console.log(input)
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false
                })
                
            )
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
            </div>
        );
        const { imageUrl } = this.state;
        sessionStorage.setItem('base64_pic', imageUrl)
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} id='image' alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
                
            </Upload>
        );
    }
}

export default upload;