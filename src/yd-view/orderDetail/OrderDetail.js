import React, { Component } from 'react'
import OrderPay from './components/orderPay/OrderPay'
import OrderInfo from './components/orderCustomerInfo/OrderInfo'
import { formatDays } from '../../assets/js/dateFormat'
import { request, config } from '../../assets/api/index'
import './index.css'

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }
    componentDidMount() {
        const index = this.props.location.state.index
        const { fromSub,orderId } = this.props.location.state
        request.get(config.api.getUserOrderInfo, {
            orderId:orderId
        })
            .then(data => {
                this.setState({
                    data: data.result[0]
                })
            })
    }
    render() {
        const { data } = this.state
        const { pathStatus } = this.props.location.state
        console.log(data)
        return (
            <div className="order-detail">
                <OrderPay
                    houseName={data.house_name}
                    in_time={data.in_time}
                    leave_time={data.leave_time}
                    house_assort={data.house_assort}
                    pay_status={data.pay_status}
                    orderId={data.id}
                    totalFee={data.total_fee}
                    pathStatus={pathStatus}
                />
                <OrderInfo
                    name={data.name}
                    tel={data.telephone}
                    idCard={data.id_card}
                    arrive={data.arrive_time}
                    carNum={data.car_number}
                    company={data.company}
                    img={data.people_image}
                />
            </div>
        );
    }
}

export default OrderDetail;