import React, { Component } from 'react';
import OrderItem from '../orderList/components/OrderItem'
import NavBar from '../navBar/NavBar'
import { request, config } from '../../assets/api/index'
import TakePhoto from '../submitOrder/components/upload/upload2'
import './index.css'

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: false,
            list: []
        };
    }
    componentDidMount() {
        this.getOrderList()
    }
    getChildrenList(result, list) {
        this.setState({
            list: list
        })
        console.log(list)
    }
    getOrderList() {
        request.get(config.api.getOrders, {
            hotelId: localStorage.getItem('hotelId'),
            telephone: localStorage.getItem('tel')
        })
            .then(data => {
                this.setState({
                    list: data.result
                })
            })
    }
    getChildBase64(result,msg){
        console.log(msg)
    }
    render() {
        const { list } = this.state
        return (
            <div className="order-list">
                {/* <TakePhoto parent={this} /> */}
                {
                    list.map((item, index) => {
                        return (
                            item.pay_status == 0 ? null :
                                <OrderItem
                                    key={index}
                                    orderId={item.id}
                                    roomId={item.house_name}
                                    stay={item.in_time}
                                    leave={item.leave_time}
                                    price={item.total_fee}
                                    index={index}
                                    list={list}
                                    parent={this}
                                />
                        )
                    })
                }
                <NavBar type={this.state.currentType} />
            </div>
        );
    }
}

export default OrderList;