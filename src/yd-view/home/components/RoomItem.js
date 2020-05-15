import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './roomItem.css'

class RoomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let path = {
            pathname:'/submit',
            state:{
                name:this.props.name,
                stay:this.props.cTime,
                leave:this.props.lTime,
                tip:this.props.tip,
                houseId:this.props.houseId,
                price:this.props.price
            }
        }
        return (
            <div className="room-item">
                <div className="room-pic">
                    <img src={this.props.pic} alt="" />
                </div>
                <div className="room-content">
                    <p>{this.props.name}</p>
                    <p>{this.props.introduce}</p>
                    <p>提前48小时可免费取消</p>
                    <p>￥{this.props.price}</p>
                </div>
                <Link to={path}>
                    <div className="room-reserve">预订</div>
                </Link>
            </div>
        );
    }
}

export default RoomItem;