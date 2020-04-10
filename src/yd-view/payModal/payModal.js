import React, { Component } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank, Radio } from 'antd-mobile'
import { wxPay } from '../../assets/js/wxPayConfig'

const alert = Modal.alert;
const RadioItem = Radio.RadioItem

class payModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            value: 0
        };
    }
    onChange(value) {
        console.log('checkbox');
        this.setState({
            value
        })
    }
   
    onClose(key) {
        this.setState({
            [key]: false
        })
    }
    handlePay(key){
        this.setState({
            [key]: false
        })
        wxPay(this.props.price,this.props.orderId)
    }
    render() {
        const { value } = this.state
        const data = [
            { value: 0, label: '微信' },
            { value: 1, label: '支付宝' }
        ]
        return (
            <WingBlank>
                <WhiteSpace />
                <Modal
                    popup
                    visible={this.props.modal}
                    onClose={this.onClose.bind(this, 'modal')}
                    animationType="slide-up"
                >
                    <List renderHeader={() => <div>共{this.props.price}元</div>} className="popup-list">
                        {
                            data.map((i) => (
                                <RadioItem key={i.value} checked={value === i.value} onChange={this.onChange.bind(this, i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))
                        }
                        <List.Item>
                            <Button type="primary" onClick={this.handlePay.bind(this, 'modal')}>支付</Button>
                        </List.Item>
                    </List>
                </Modal>
            </WingBlank>
        );
    }
}

export default payModal;