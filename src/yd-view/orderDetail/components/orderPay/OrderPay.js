import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { formatWeek,noYearFormat,formatDays } from '../../../../assets/js/dateFormat'
import PayModal from '../../../payModal/payModal'
import { request, config } from '../../../../assets/api/index'
import './index.css'

const alert = Modal.alert;

class OrderPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            days:''
        };
    }
    handleClickPay(e) {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modal: true
        })
    }
    cancelOrder(id) {
        request.post(config.api.cancelOrder, {
            id: id
        })
            .then(data => {
                if (data.success) {
                    this.props.history.push('/order')
                }
            })
    }
    handleCancelOrder() {
        const { pay_status, orderId, totalFee } = this.props
        const alertInstance = alert('取消', '是否取消订单?', [
            {
                text: '取消', onPress: () =>
                    console.log('cancel'), style: 'default'
            },
            {
                text: '确定', onPress: () => {
                    if (pay_status == 2) {
                        this.cancelOrder(orderId)
                    } else if (pay_status == 1) {
                        this.handleRefund(orderId, totalFee, totalFee)
                    }

                }
            },
        ]);
        setTimeout(() => {
            console.log('auto close');
            alertInstance.close();
        }, 10000);
    }
    getChild(result, msg) {
        this.setState({
            modal: msg
        })
    }
    handleRefund(id, totalFee, redundFee) {
        request.post(config.api.getWXRefund, {
            id: id,
            totalFee: totalFee,
            redundFee: redundFee
        })
            .then(data => { })
    }
    render() {
        const { houseName, in_time, leave_time, house_assort, pay_status, totalFee, orderId } = this.props
        const inWeek = formatWeek(in_time)
        const leaveWeek = formatWeek(leave_time)
        const liveTime = noYearFormat(in_time)
        const leaveTime = noYearFormat(leave_time)
        const days = formatDays(in_time,leave_time)
        return (
            <div className="order-pay">
                <p>{houseName}</p>
                <p>{liveTime}(周{inWeek})/{leaveTime}(周{leaveWeek})&nbsp;&nbsp;&nbsp;共{days}晚</p>
                <p>{house_assort}</p>
                {
                    !this.props.pathStatus ?
                        <div className="pay-btn">
                            {
                                pay_status == 0 ?
                                    <div className="had-cancel">已取消</div> : null
                            }
                            {
                                pay_status == 1 ?
                                    <div className="had-pay">已支付</div> : null
                            }
                            {
                                pay_status == 2 ?
                                    <div className="no-pay" onClick={this.handleClickPay.bind(this)}>立即支付</div> : null
                            }
                            {
                                pay_status == 1 || pay_status == 2 ?
                                    <div className="cancel" onClick={this.handleCancelOrder.bind(this)}>{pay_status == 1 ? '退款' : '取消订单'}</div> : null
                            }
                            {
                                pay_status == 5 ?
                                    <div className="complete">已完成</div> : null
                            }

                        </div>
                        :
                        <div className="pay--status-btn">
                            {
                                pay_status == 0 ?
                                    <div className="pay_status">已取消</div> : null
                            }
                            {
                                pay_status == 1 ?
                                    <div className="pay_status">已支付</div> : null
                            }
                            {
                                pay_status == 2 ?
                                    <div className="pay_status">待付款</div> : null
                            }
                            {
                                pay_status == 4 ?
                                    <div className="pay_status">已失效</div> : null
                            }
                            {
                                pay_status == 5 ?
                                    <div className="pay_status">已完成</div> : null
                            }
                        </div>
                }
                <PayModal parent={this} orderId={orderId} price={totalFee} modal={this.state.modal} />
            </div>
        );
    }
}

export default withRouter(OrderPay);