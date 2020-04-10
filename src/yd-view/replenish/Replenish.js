import React, { Component } from 'react'
import OrderForm from './components/orderComplete/OrderForm'
import OrderInfo from './components/orderInfo/OrderInfo'
import './index.css'

class Replenish extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentWillMount() {
        var str = window.location.hash
        var num = str.replace(/[^0-9]/ig,"")
        console.log(num)
        sessionStorage.setItem('orderId',num)
    }
    render() {
        return (
            <div className="order-detail">
                <OrderInfo />
                <OrderForm />
            </div>
        );
    }
}

export default Replenish;
