import React, { Component } from 'react'
import { noYearFormat } from '../../../assets/js/dateFormat';
import { Link, withRouter } from 'react-router-dom'
import './orderItem.css'

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let path = {
            pathname: '/orderDetail',
            state: {
                name: this.props.roomId,
                date: this.props.date,
                index: this.props.index,
                orderId: this.props.orderId
            }
        }
        const stay = noYearFormat(this.props.stay)
        const leave = noYearFormat(this.props.leave)
        sessionStorage.setItem('price', this.props.price)
        return (
            <div>

                <div className="order-item">
                    <p>订单号：{this.props.orderId}</p>
                    <div className="item-box">
                        <div className="left-content">
                            <ul>
                                <li><span className="order-item-title">房间：</span>{this.props.roomId}</li>
                                <li><span className="order-item-title">入住离店时间：</span>{stay}/{leave}</li>
                                <li><span className="order-item-price">￥{this.props.price}</span>{this.props.customer}</li>
                            </ul>
                        </div>
                        <div className="right-content-x">
                            <Link to={path}>
                                <div>订单详情</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderItem;