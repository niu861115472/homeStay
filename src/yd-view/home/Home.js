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
            cTime: '',
            lTime: ''
        }
    }
    componentDidMount() {
        const id = sessionStorage.getItem('hotelId')
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
            hotelId: '907003670336145664',
            liveTime: stay,
            leaveTime: leave
        })
            .then((data) => {
                this.setState({
                    rooms: data.result
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
        const { rooms } = this.state
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

                <div className="home-list">
                    {
                        rooms.map((item, index) => {
                            return (
                                <RoomItem
                                    key={index}
                                    pic={item.picture}
                                    name={item.name}
                                    introduce={item.assort + ' ' + item.profiles}
                                    price={item.price}
                                    houseId={item.id}
                                    price={item.defaultPrice}
                                    cTime={format(this.state.stay) + ' ' + item.inTime}
                                    lTime={format(this.state.leave) + ' ' + item.leaveTime}
                                />
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