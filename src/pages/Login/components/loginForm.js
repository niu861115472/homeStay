import React, { Component } from 'react';
import { Icon } from 'antd-mobile'
import { Link, withRouter } from 'react-router-dom'
import { request, config } from '../../../assets/api/index'
import './loginForm.css'

const managerTel = localStorage.getItem('managerTel')
const managerCapth = sessionStorage.getItem('managerCapth')

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 60,
            liked: true,
            tel: '',
            capth: ''
        };
    }
    getLogin() {
        request.post(config.api.managerLogin,{
            telephone:this.state.tel || managerTel,
            password:this.state.capth || managerCapth,
            hotelId:sessionStorage.getItem('hotelId')
        })
        .then(data =>{
            localStorage.setItem('managerTel',this.state.tel)
            sessionStorage.setItem('managerCapth',this.state.capth)
            this.props.history.push('/orderSort')
        })
    }
    getPassword() {
        request.post(config.api.getManagerPsw, {
            telephone: this.state.tel || managerTel,
            hotelId:sessionStorage.getItem('hotelId')
        })
            .then(data => {
                console.log(data)
            })
    }
    countDown() {
        const { count } = this.state
        if (count == 1) {
            this.setState({
                count: 60,
                liked: true
            })
        } else {
            this.setState({
                count: count - 1,
                liked: false
            })
            setTimeout(this.countDown.bind(this), 1000);
        }
    }
    handleGetCapth() {
        const { liked } = this.state
        if (!liked) return
        this.countDown()
        this.getPassword()
    }
    render() {
        return (
            <div className="loginForm">
                <div className="phone-input">
                    <span>+86</span>
                    <Icon className="icon-down" type="down" />
                    <input
                        className="input"
                        maxLength="11"
                        type="tel"
                        placeholder="请输入手机号"
                        onChange={(e) => { this.setState({ tel: e.target.value }) }}
                    />
                </div>
                <div className="capcha">
                    <div className="left">
                        <span>验证码</span>
                        <input
                            className="cap-input input"
                            type="text"
                            placeholder="请输入验证码"
                            onChange={(e) => { this.setState({ capth: e.target.value }) }}
                        />
                    </div>
                    <div className="right" onClick={this.handleGetCapth.bind(this)}>
                        {
                            this.state.liked ? "获取验证码" : `${this.state.count}秒后重发`
                        }
                    </div>
                </div>
                <div className="login-btn" onClick={this.getLogin.bind(this)}>登录</div>
            </div>
        );
    }
}

export default withRouter(LoginForm);