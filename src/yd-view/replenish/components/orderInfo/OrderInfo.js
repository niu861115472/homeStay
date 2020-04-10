import React, { Component } from 'react';
import { request, config } from '../../../../assets/api/index'
import { noYearFormat, formatWeek, formatDays } from '../../../../assets/js/dateFormat'
import './index.css'
import { data } from '../../../../mock/data';

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }
    componentDidMount() {
        request.get(config.api.getUserOrderInfo, {
            orderId: sessionStorage.getItem('orderId')
        })
            .then(data => {
                this.setState({
                    data: data.result[0]
                })
            })
    }
    render() {
        const { data } = this.state
        const inWeek = formatWeek(data.in_time)
        const leaveWeek = formatWeek(data.leave_time)
        const liveTime = noYearFormat(data.in_time)
        const leaveTime = noYearFormat(data.leave_time)
        const days = formatDays(data.in_time, data.leave_time)
        return (
            <div className="order-user-info">
                <p>{data.house_name}</p>
                <p>{liveTime}(周{inWeek})/{leaveTime}(周{leaveWeek}) 共{days}晚</p>
                <p>大床5512222</p>
                <div className="pay-status">已支付</div>
            </div>
        );
    }
}

export default OrderInfo;