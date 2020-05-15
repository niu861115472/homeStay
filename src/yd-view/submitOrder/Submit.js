import React, { Component } from 'react';
import { Toast } from 'antd-mobile'
import { format, noYearFormat, normalFormat, formatWeek, formatDays } from '../../assets/js/dateFormat'
import MustInfo from './components/mustInfo/MustInfo'
import SelectInfo from './components/selectInfo/SelectInfo'
import { withRouter } from 'react-router-dom'
import { request, config } from '../../assets/api/index'
import './submit.css'

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mustInfo: '',
            selectInfo: '',
            modal: false,
            days: '',
            orderId: ''
        };
    }
    componentDidMount() {
        document.title = '提交订单'
    }
    getChildrenMsg(result, msg) {
        this.setState({
            mustInfo: msg
        })
    }
    getSchildrenMsg(result, msg) {
        this.setState({
            selectInfo: msg
        })
    }
    submitOrder() {
        let data = {
            hotelId: localStorage.getItem('hotelId'),
            houseId: this.props.location.state.houseId,
            liveTime: this.props.location.state.stay,
            leaveTime: this.props.location.state.leave,
            name: this.state.mustInfo.name,
            telephone: this.state.mustInfo.phone,
            idCard: this.state.mustInfo.idCard,
            arriveTime: normalFormat(this.state.selectInfo.time),
            carNumber: this.state.selectInfo.license,
            company: this.state.selectInfo.invoice,
            dutyParagraph: this.state.selectInfo.duty,
            image: sessionStorage.getItem('base64_pic'),
            totaFlee: this.state.days * this.props.location.state.price,
            source: '8',
            type: '2',
            payStatus: '2'
        }
        Toast.loading('Loading...', 3, () => {
            request.post(config.api.submitOrder, data)
                .then((data) => {
                    if (data.success) {
                        Toast.hide()
                        this.props.history.push({
                            pathname: '/orderDetail',
                            state: {
                                orderId: data.result[0].id
                            }
                        })
                    }else{
                        Toast.info(data.msg)
                    }
                })
                .catch(err => console.log(err))
        })
    }
    handleSubmitOrder() {
        this.submitOrder()
    }
    render() {
        const { name, introduce, stay, leave, price } = this.props.location.state || ''
        const stayS = noYearFormat(stay)
        const leaveS = noYearFormat(leave)
        this.state.days = formatDays(stay, leave)
        const fee = this.state.days * price
        return (
            <div className="submit-box">
                <div className="room-info">
                    <p>{name}</p>
                    <p>{stayS}（周{formatWeek(stay)}）/{leaveS}(周{formatWeek(leave)})&nbsp;&nbsp;&nbsp;共{this.state.days}晚</p>
                    <p>{introduce}</p>
                    <div className="save-tip">放心订！10月11日18点前可免费取消</div>
                </div>
                <div className="form">
                    <MustInfo parent={this} />
                    <SelectInfo parentS={this} />
                </div>
                <div className="submit-content">
                    <p>￥{fee}</p>
                    {/* <WingBlank> */}
                    <div className="submit-btn" onClick={this.handleSubmitOrder.bind(this)}>提交订单</div>
                    {/* <WhiteSpace />
                    </WingBlank> */}
                </div>
                {/* <PayModal price={price} modal={this.state.modal} orderId={this.state.orderId}  /> */}
            </div>
        );
    }
}

export default withRouter(Submit); 