import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './sort.css'

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="sort">
                <Link to={{pathname:'/addOrder',state:{type:false}}}>
                    <div className="box">新增订单</div>
                </Link>
                <Link to="/hadOrder">
                    <div className="box">已有订单</div>
                </Link>
            </div>
        );
    }
}

export default Sort;