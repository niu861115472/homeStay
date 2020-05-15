import React, { Component } from 'react';
import { DatePicker, List, Toast } from 'antd-mobile';
import { getHotelList, submitOrder, changeOrder } from './util'
import { withRouter } from 'react-router-dom'
import { data } from '../../mock/data'
import { format, normalFormat, formatDays } from '../../assets/js/dateFormat'
import { gethotelTime } from '../../assets/js/gethotelTime'
import './addOrder.css'

const nowTimeStamp = Date.now();
const leaveTimeStamp = Date.now() + 24 * 60 * 60 * 1000
const now = new Date(nowTimeStamp);
const leaveTime = new Date(leaveTimeStamp);
const id = sessionStorage.getItem('manager_hotelId')

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stay: now,
            leave: leaveTime,
            index: '',
            form: {
                type: false,
                selectVal: '',
                name: '',
                phone: '',
                idCard: '',
                source: '',
            },
            homes: [],
            cTime: '',
            lTime: ''
        }
    }
    componentDidMount() {
        document.title = "新增订单"
        gethotelTime(id).then(data => {
            const stay = format(this.state.stay) + ' ' + data.result[0].inTime
            const leave = format(this.state.leave) + ' ' + data.result[0].leaveTime
            this.setState({
                cTime: data.result[0].inTime,
                lTime: data.result[0].leaveTime
            })
            getHotelList(id, stay, leave).then((data) => {
                this.setState({
                    homes: data.result
                })
                console.log(this.state)
            })
        })
    }

    handleSubmit() {
        const index = document.getElementById('select').selectedIndex
        const sourceIndex = document.getElementById('source').selectedIndex
        const houseId = this.state.homes[index].id
        const stay = format(this.state.stay) + ' ' + this.state.homes[index].inTime
        const leave = format(this.state.leave) + ' ' + this.state.homes[index].leaveTime
        const { type, orderId } = this.props.location.state == undefined ? this.state.form : this.props.location.state
        const hotelId = sessionStorage.getItem('manager_hotelId')
        const price = formatDays(stay, leave) * this.state.homes[index].defaultPrice
        const { name, phone, idCard } = type ? this.props.location.state : this.state.form
        console.log(stay, leave)

        Toast.loading('Loading...', 3, () => {
            submitOrder(hotelId, houseId, normalFormat(stay), normalFormat(leave), name, phone, idCard, sourceIndex).then(data => {
                if (data.success) {
                    Toast.hide()
                    window.location.href = 'http://demo.live-ctrl.com/www/#/home'
                }else{
                    Toast.info(data.msg)
                }
            })
        });


    }
    handleChange(key, event) {
        const { form } = this.state
        for (let item in form) {
            if (item == key) {
                form[item] = event.target.value
                this.setState({
                    form: form
                })
            }
        }
    }
    handleStayTime(stay) {
        this.setState({ stay })
        const stay1 = format(stay) + ' ' + this.state.cTime
        const leave1 = format(this.state.leave) + ' ' + this.state.lTime
        getHotelList(id, stay1, leave1).then((data) => {
            this.setState({
                homes: data.result,
            })
        })
    }
    handleLeaveTime(leave) {
        this.setState({ leave })
        const stay2 = format(this.state.stay) + ' ' + this.state.cTime
        const leave2 = format(leave) + ' ' + this.state.lTime
        getHotelList(id, stay2, leave2).then((data) => {
            this.setState({
                homes: data.result
            })
        })
        console.log(this.state.homes)
    }
    render() {
        const { homes } = this.state
        const obj = this.props.location.state
        const { type, orderId, name, idCard, phone } = obj == undefined ? this.state.form : obj
        console.log(this.state.stay,this.state.leave)
        return (
            <div className="add-order">
                {/* <p className="order-id">订单号: {type ? orderId : 'XXXXXXXXXXXXXXXXX'}</p> */}
                <div className="select-home">
                    房间选择
                    <select
                        onChange={this.handleChange.bind(this, 'selectVal')} id="select">
                        {
                            homes.map((item, index) =>
                                <option key={index}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="select-date">
                    <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                        <DatePicker
                            mode="date"
                            title="选择时间"
                            minDate={new Date(nowTimeStamp)}
                            extra="Optional"
                            value={this.state.stay}
                            onChange={(stay) => { this.handleStayTime(stay) }}>
                            <List.Item arrow="horizontal">入住时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="date"
                            title="选择时间"
                            minDate={new Date(leaveTimeStamp)}
                            extra="Optional"
                            value={this.state.leave}
                            onChange={(leave) => { this.handleLeaveTime(leave) }}>
                            <List.Item arrow="horizontal">离店时间</List.Item>
                        </DatePicker>
                        <List.Item>
                            <span className="title">入住人</span>
                            <input className="order-input clear"
                                type="text"
                                disabled={type ? true : false}
                                defaultValue={type ? name : ''}
                                placeholder="请填写入住人姓名"
                                onChange={this.handleChange.bind(this, 'name')}
                            />
                        </List.Item>
                        <List.Item>
                            <span className="title">身份证号</span>
                            <input className="order-input clear"
                                ref="idCard"
                                type="text"
                                disabled={type ? true : false}
                                defaultValue={type ? idCard : ''}
                                placeholder="请填写身份证号"
                                onChange={this.handleChange.bind(this, 'idCard')}
                            />
                        </List.Item>
                        <List.Item>
                            <span className="title">手机号</span>
                            <input className="order-input clear"
                                ref="phone"
                                type="tel"
                                maxLength="11"
                                disabled={type ? true : false}
                                defaultValue={type ? phone : ''}
                                placeholder="请填写手机号"
                                onChange={this.handleChange.bind(this, 'phone')}
                            />
                        </List.Item>
                        <div className="select-home">
                            来源
                            <select
                                // defaultValue="飞猪"
                                onChange={this.handleChange.bind(this, 'source')} id="source">
                                {
                                    data.map((item, index) =>
                                        <option key={index}>{item.come}</option>
                                    )
                                }
                            </select>
                        </div>
                    </List>
                </div>
                <div className="submit" onClick={this.handleSubmit.bind(this)}>确定</div>
            </div>
        );
    }
}

export default withRouter(AddOrder);