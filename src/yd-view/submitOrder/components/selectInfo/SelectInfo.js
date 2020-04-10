import React, { Component } from 'react';
import { DatePicker, List } from 'antd-mobile';
import ReactDOM from 'react-dom';
import Upload2 from '../upload/upload2'
import './index.css'
// import { Upload } from 'element-react';

class SelectInfo extends Component {
    constructor(props) {
        super(props);
        this.upload = React.createRef();
        this.state = {
            form: {
                time:'',
                license:'',
                invoice:'',
                duty:''
            }
        }
    }    
    handleInputValue(key,event) {
        const { form } = this.state
        for (let item in form) {
            if (item == key) {
                form[item] = event.target.value
                this.state.form.time = this.state.time
                this.setState({ form: form })
            }
        }
        this.props.parentS.getSchildrenMsg(this,this.state.form)
    }
    render() {
        return (
            <div className="select-info">
                <p className="title">*选填信息</p>
                <form action="/" className="form">
                    <div>
                        <DatePicker
                           
                            value={this.state.time}
                            onChange={time=>this.setState({time})}
                        >
                            <List.Item arrow="horizontal">到店时间</List.Item>
                        </DatePicker>
                    </div>
                    <div className="customer-name add-border">
                        <p>车牌</p>
                        <input type="text" onChange={this.handleInputValue.bind(this, 'license')} placeholder="请输入车牌" />
                    </div>
                    <div className="customer-name">
                        <p>预约发票</p>
                        <input type="number" onChange={this.handleInputValue.bind(this, 'invoice')} placeholder="请输入公司抬头" />
                    </div>
                    <div className="second-input">
                        <input type="number" className="duty clear" onChange={this.handleInputValue.bind(this, 'duty')} placeholder="请输入税号" />
                    </div>
                    <div className="upload-picture">
                        <p className="pic">人脸照片：</p>
                        {/* <Upload parent={this} /> */}
                        <Upload2 />
                    </div>
                    {/* <p className='tip'>*ios用户请上传或拍摄向右旋转90°的照片</p> */}
                </form>
            </div >
        );
    }
}

export default SelectInfo;