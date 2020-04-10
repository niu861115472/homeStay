import React, { Component } from 'react';
import { DatePicker, List,Toast } from 'antd-mobile';
import { request, config } from '../../../../assets/api/index'
import { normalFormat } from '../../../../assets/js/dateFormat'
import Upload from '../../../submitOrder/components/upload/upload'
import './index.css'

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                time: '',
                license: '',
                invoice: '',
                duty: '',
                name:'',
                houseId:'',
                phone:'',
                idCard:'',
                status:''
            }
        }
    }
    componentDidMount(){
        request.get(config.api.getUserOrderInfo,{
            orderId:sessionStorage.getItem('orderId')
        })
        .then(data =>{
            this.setState({
                form:{
                    ...this.state.form,
                    name:data.result[0].name,
                    houseId:data.result[0].house_id,
                    phone:data.result[0].telephone,
                    idCard:data.result[0].id_card,
                    status:data.result[0].uploadImageMessage
                }
            })
            console.log(this.state.form)
        })
    }
    handleInputValue(key, event) {
        const { form } = this.state
        for (let item in form) {
            if (item == key) {
                form[item] = event.target.value
                this.state.form.time = this.state.time
                this.setState({ form: form })
            }
        }
    }
    handleSubmitOrder() {
        const { time, license, invoice, duty,name,houseId,phone,idCard,status} = this.state.form
        if(status != 'OK'){
            request.post(config.api.reviseOrder, {
                id: sessionStorage.getItem('orderId'),
                houseId:houseId,
                name:name,
                telephone:phone,
                idCard:idCard,
                arriveTime: normalFormat(time),
                carNumber: license,
                dutyParagraph: duty,
                company: invoice,
                image: sessionStorage.getItem('base64_pic')
            })
                .then(data => {})
        }else{
            Toast.info('请勿重复操作')
        }
    }
    render() {
        return (
            <div className="select-info order-form">
                <p className="title">*补登信息</p>
                <form action="/" className="form">
                    <div>
                        <DatePicker

                            value={this.state.time}
                            onChange={time => this.setState({ time })}
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
                        <p>人脸照片：</p>
                        <Upload />
                    </div>
                </form>
                <div className="sure" onClick={this.handleSubmitOrder.bind(this)}>确定</div>
            </div >
        );
    }
}

export default OrderForm;