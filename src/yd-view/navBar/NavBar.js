import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './navBar.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="nav-bar">
                <Link to="/home">
                    <div className={this.props.type == true ? 'current' : ''}>首页</div>
                </Link>
                <Link to="/order">
                    <div className={this.props.type == false ? 'current' : ''}>订单</div>
                </Link>
            </div>
        );
    }
}

export default NavBar;