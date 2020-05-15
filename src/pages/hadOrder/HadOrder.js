import React, { Component } from 'react';
import { data } from '../../mock/data'
import { request, config } from '../../assets/api/index'
import OrderItem from '../hadOrder/components/OrderItem'
import './hadOrder.css'

class HadOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            childrenMsg: ''
        };
    }
    componentDidMount() {
        document.title = "订单"
        this.getOrderList()
    }
    getOrderList() {
        request.get(config.api.getOrders, {
            hotelId: sessionStorage.getItem('manager_hotelId'),
            // status:0
        })
            .then(data => {
                this.setState({
                    list: data.result
                })
            })
    }
    render() {
        return (
            <div className="had-order">
                {
                    this.state.list.map((item, index) => {
                        return (
                            <div key={index + item.id}>
                                {
                                    item.pay_status !=0 ?
                                        <OrderItem
                                            orderId={item.id}
                                            houseId={item.house_id}
                                            roomId={item.house_name}
                                            inTime={item.in_time}
                                            leaveTime={item.leave_time}
                                            customer={item.name}
                                            idCard={item.id_card}
                                            phone={item.telephone}
                                            source={item.source}
                                            price={item.total_fee}
                                            index={index}
                                            parent={this}
                                            getOrderList={this.getOrderList.bind(this)}
                                        />
                                        : null
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default HadOrder;