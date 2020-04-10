import React, { Component } from 'react';
import './index.css'

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }
    componentDidMount() {

    }
    render() {
        const { name, tel, idCard, arrive, carNum, company, img } = this.props
        return (
            <div className="order-info">
                <ul>
                    <li>
                        <p>入住人</p>
                        <p>{name}</p>
                    </li>
                    <li>
                        <p>手机</p>
                        <p>{tel}</p>
                    </li>
                    <li>
                        <p>身份证</p>
                        <p>{idCard}</p>
                    </li>
                    <li>
                        <p>到店时间</p>
                        <p>{arrive}</p>
                    </li>
                    <li>
                        <p>车牌</p>
                        <p>{carNum}</p>
                    </li>
                    <li>
                        <p>发票</p>
                        <p>{company}</p>
                    </li>
                    <li>
                        <p>人脸照片</p>
                        <div className="photo">
                            <img src={`data:image/jpeg;base64,${img}`} />
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default OrderInfo;