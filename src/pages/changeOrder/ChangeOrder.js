import React, { Component } from 'react';
import { DatePicker, List, Toast } from 'antd-mobile';
import { getHotelList, submitOrder, changeOrder, getOrderDetail } from '../addOrder/util'
import { withRouter } from 'react-router-dom'
import { data } from '../../mock/data'
import { format, normalFormat, formatZH, formatDays } from '../../assets/js/dateFormat'
import { gethotelTime } from '../../assets/js/gethotelTime'
import '../addOrder/addOrder.css'

const nowTimeStamp = Date.now();
const leaveTimeStamp = Date.now() + 24 * 60 * 60 * 1000
const now = new Date(nowTimeStamp);
const leaveTime = new Date(leaveTimeStamp);
const id = sessionStorage.getItem('manager_hotelId')

class ChangeOrder extends Component {
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
                orderId: ''
            },
            homes: []
        }
    }
    componentDidMount() {
        const { type, name, idCard, phone, inTime, leaveTime, house_id, roomId } = this.props.location.state

        if (type) {
            this.setState({
                form: {
                    ...this.state.form,
                    name: name,
                    idCard: idCard,
                    phone: phone
                },
                stay: formatZH(inTime),
                leave: formatZH(leaveTime)
            })
        }
        gethotelTime(id).then(data => {
            const stay = format(this.state.stay) + ' ' + data.result[0].inTime
            const leave = format(this.state.leave) + ' ' + data.result[0].leaveTime
            const obj = {
                id: house_id,
                name: roomId,
                inTime: data.result[0].inTime,
                leaveTime: data.result[0].leaveTime
            }

            getHotelList(id, stay, leave).then((data) => {
                this.setState({
                    homes: data.result.concat(obj),
                    form: {
                        ...this.state.form,
                        selectVal: data.result[0].name,
                        source: 0
                    }
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
        const { orderId } = this.props.location.state
        const hotelId = sessionStorage.getItem('manager_hotelId')
        const price = formatDays(stay, leave) * this.state.homes[index].defaultPrice
        const { name, phone, idCard } = this.state.form
        console.log(stay, leave, this.state.homes)

        Toast.loading('Loading...', 3, () => {
            changeOrder(orderId, hotelId, houseId, stay, leave, name, phone, idCard, sourceIndex, price).then(data => {
                if (data.success) {
                    Toast.hide()
                    this.props.history.push('/hadOrder')
                }else{
                    Toast.info(data.msg)
                }
            });
        })
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
    render() {
        const { homes } = this.state
        const obj = this.props.location.state
        const { roomId, type, orderId, name, idCard, phone } = obj == undefined ? this.state.form : obj
        console.log(this.state.stay,this.state.leave)
        // if(homes.length != 0)
        return (
            <div className="add-order">
                <p className="order-id">订单号: {orderId}</p>
                <div className="select-home">
                    房间选择
                    <select
                        defaultValue={roomId}
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
                            onChange={stay => this.setState({ stay })}>
                            <List.Item arrow="horizontal">入住时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="date"
                            title="选择时间"
                            minDate={new Date(leaveTimeStamp)}
                            extra="Optional"
                            value={this.state.leave}
                            onChange={leave => this.setState({ leave })}>
                            <List.Item arrow="horizontal">离店时间</List.Item>
                        </DatePicker>
                        <List.Item>
                            <span className="title">入住人</span>
                            <input className="order-input clear"
                                type="text"
                                defaultValue={name}
                                placeholder="请填写入住人姓名"
                                onChange={this.handleChange.bind(this, 'name')}
                            />
                        </List.Item>
                        <List.Item>
                            <span className="title">身份证号</span>
                            <input className="order-input clear"
                                ref="idCard"
                                type="text"
                                defaultValue={idCard}
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
                                defaultValue={phone}
                                placeholder="请填写手机号"
                                onChange={this.handleChange.bind(this, 'phone')}
                            />
                        </List.Item>
                        <div className="select-home">
                            来源
                            <select
                                defaultValue={data[obj.source].come}
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

export default withRouter(ChangeOrder);