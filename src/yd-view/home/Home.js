import React, { Component } from 'react';
import { DatePicker, List } from 'antd-mobile';
import { format, normalFormat } from '../../assets/js/dateFormat'
import RoomItem from './components/RoomItem'
import NavBar from '../navBar/NavBar'
import { gethotelTime } from '../../assets/js/gethotelTime'
import { request, config } from '../../assets/api/index'
import './home.css'

const nowTimeStamp = Date.now();
const leaveTimeStamp = Date.now() + 24 * 60 * 60 * 1000
const now = new Date(nowTimeStamp);
const leaveTime = new Date(leaveTimeStamp);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType: true,
            stay: now,
            leave: leaveTime,
            rooms: [],
            houseTypes: [],
            cTime: '',
            lTime: ''
        }
    }
    componentDidMount() {
        console.log(document.referrer)
        const id = localStorage.getItem('hotelId')
        gethotelTime(id).then(data => {
            this.setState({
                cTime: data.result[0].inTime,
                lTime: data.result[0].leaveTime
            })
            const stay = format(this.state.stay) + ' ' + this.state.cTime
            const leave = format(this.state.leave) + ' ' + this.state.lTime
            this.getHotelRooms(stay, leave)
        })

    }
    //获取酒店房间
    getHotelRooms(stay, leave) {

        request.get(config.api.getHotelList, {
            hotelId: localStorage.getItem('hotelId'),
            liveTime: stay,
            leaveTime: leave
        })
            .then((data) => {
                const arr = data.result.sort((a, b) => {
                    if (a['houseTypex'] != b['houseTypex']) {
                        return a['houseTypex'].localeCompare(b['houseTypex'])
                    }
                })
                const houseTypes = data.result.map((item) => {
                    return item.houseTypex
                })
                this.setState({
                    rooms: arr,
                    houseTypes: Array.from(new Set(houseTypes))
                })
            })
            .catch(err => console.log(err))
    }
    handleStayTime(stay) {
        this.setState({ stay })
        const stay1 = format(stay) + ' ' + this.state.cTime
        const leave1 = format(this.state.leave) + ' ' + this.state.lTime
        this.getHotelRooms(stay1, leave1)
    }
    handleLeaveTime(leave) {
        this.setState({ leave })
        const stay2 = format(this.state.stay) + ' ' + this.state.cTime
        const leave2 = format(leave) + ' ' + this.state.lTime
        this.getHotelRooms(stay2, leave2)
    }
    render() {
        const { rooms, houseTypes } = this.state
        console.log(houseTypes)
        return (
            <div className="home">
                <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                    <DatePicker
                        mode="date"
                        minDate={new Date(nowTimeStamp)}
                        title="选择时间"
                        extra="Optional"
                        value={this.state.stay}
                        onChange={(stay) => { this.handleStayTime(stay) }}>
                        <List.Item arrow="horizontal">入住时间 {this.state.cTime}</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        minDate={new Date(leaveTimeStamp)}
                        title="选择时间"
                        extra="Optional"
                        value={this.state.leave}
                        onChange={(leave) => { this.handleLeaveTime(leave) }}
                    >
                        <List.Item arrow="horizontal">离店时间 {this.state.lTime}</List.Item>
                    </DatePicker>
                </List>
                <div className="housetype-list">
                    {
                        houseTypes.map((item, index) => {
                            return (
                                <div className="home-list" key={index + item}>
                                    <p className="houseType">{item}</p>
                                    {
                                        rooms.map((childItem, index) => {
                                            return (
                                                <div key={index + childItem}>
                                                    {

                                                        item == childItem.houseTypex ?
                                                            <RoomItem
                                                                
                                                                pic={childItem.picture}
                                                                name={childItem.name}
                                                                introduce={childItem.houseTypex}
                                                                price={childItem.price}
                                                                houseId={childItem.id}
                                                                price={childItem.defaultPrice}
                                                                cTime={format(this.state.stay) + ' ' + childItem.inTime}
                                                                lTime={format(this.state.leave) + ' ' + childItem.leaveTime}
                                                            /> : null

                                                    }
                                                </div>

                                            )
                                        })
                                    }
                                </div>

                            )

                        })
                    }
                </div>
                <NavBar type={this.state.currentType} />
            </div>
        );
    }
}

export default Home;