import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { noYearFormat } from '../../../assets/js/dateFormat'
import { request, config } from '../../../assets/api/index'
import { data } from '../../../mock/data'
import { Modal } from 'antd-mobile'
import './orderItem.css'

const alert = Modal.alert;

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }
    handleCancelOrder() {
        const alertInstance = alert('取消', '是否取消订单?', [
            {
                text: '取消', onPress: () =>
                    console.log('cancel'), style: 'default'
            },
            {
                text: '确定', onPress: () => {
                    this.cancelOrder()

                }
            },
        ]);
        setTimeout(() => {
            console.log('auto close');
            alertInstance.close();
        }, 10000);
    }
    cancelOrder() {
        request.post(config.api.cancelOrder, {
            id: this.props.orderId
        })
            .then(data => {
                if (data.success) {
                    this.setState({
                        status: true
                    })
                    this.props.getOrderList()
                }
            })
    }
    render() {
        const source = data[this.props.source].come
        let path = {
            pathname: '/changeOrder',
            state: {
                type: true,
                orderId: this.props.orderId,
                roomId: this.props.roomId,
                house_id: this.props.houseId,
                inTime: this.props.inTime,
                leaveTime: this.props.leaveTime,
                name: this.props.customer,
                idCard: this.props.idCard,
                phone: this.props.phone,
                source: this.props.source,
                price: this.props.price
            }
        }
        let otherPath = {
            pathname: '/orderDetail',
            state: {
                name: this.props.roomId,
                orderId: this.props.orderId,
                pathStatus: true
            }
        }
        const { inTime, leaveTime } = this.props
        const date = noYearFormat(inTime) + '/' + noYearFormat(leaveTime)
        return (
            <div className="order-item">
                    <div>
                        <p>订单号：{this.props.orderId}</p>
                        <div className="item-box">
                            <div className="left-content">
                                <ul>
                                    <li><span className="order-item-title">房间：</span>{this.props.roomId}</li>
                                    <li><span className="order-item-title">入住离店时间：</span>{date}</li>
                                    <li><span className="order-item-title">入住人：</span>{this.props.customer}</li>
                                    <li><span className="order-item-title">身份证号：</span>{this.props.idCard}</li>
                                    <li><span className="order-item-title">手机号：</span>{this.props.phone}</li>
                                    <li><span className="order-item-title">来源：</span>{source}</li>
                                    {
                                        this.props.source == 8 ?
                                            <li><span className="order-item-title">金额：</span>{this.props.price}</li> : null
                                    }

                                </ul>
                            </div>
                            <div className="right-content">
                                <Link to={this.props.source == 8 ? otherPath : path}><div>{this.props.source == 8 ? '订单详情' : '信息变更'}</div></Link>
                                {
                                    this.props.source != 8 ?
                                        <div onClick={this.handleCancelOrder.bind(this)}>取消订单</div> : null
                                }
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(OrderItem);