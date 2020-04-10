import React, { Component } from 'react';
import './index.css'

class MustInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                phone: '',
                idCard: ''
            }
        }
    }
    handleInputValue(key,event) {
        const { form } = this.state
        for (let item in form) {
            if (item == key) {
                form[item] = event.target.value
                this.setState({ form: form })
            }
        }
        this.props.parent.getChildrenMsg(this,this.state.form)
    }
    render() {
        return (
            <div className="must-info">
                <p className="tittle">*必填信息</p>
                <form action="/" className="form">
                    <div className="customer-name">
                        <p>入住人</p>
                        <input type="text" onChange={this.handleInputValue.bind(this, 'name')} placeholder="请输入姓名" />
                    </div>
                    <div className="customer-name">
                        <p>联系手机</p>
                        <input type="tel" maxLength="11" onChange={this.handleInputValue.bind(this, 'phone')} placeholder="请输入手机号" />
                    </div>
                    <div className="customer-name">
                        <p>身份证号</p>
                        <input type="text" onChange={this.handleInputValue.bind(this, 'idCard')} placeholder="请输入身份证号" />
                    </div>
                </form>
            </div>
        );
    }
}

export default MustInfo;