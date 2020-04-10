import React, { Component } from 'react';
import { Icon } from 'antd-mobile'
import { Link, withRouter } from 'react-router-dom'
import { request, config } from '../../../assets/api/index'
import './loginForm.css'

const defaultTel = localStorage.getItem('tel')
const defaultCapth = sessionStorage.getItem('capth')

console.log(defaultTel,defaultCapth)

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
    getPassword() {
        request.post(config.api.getPassword, {
            telephone: this.state.tel || defaultTel
        })
            .then(data => {
                console.log(data)
            })
    }
    getLogin() {
        request.post(config.api.getLogin, {
            telephone: this.state.tel || defaultTel,
            password: this.state.capth || defaultCapth
        })
            .then(data => {
                if (data.success) {
                    localStorage.setItem('tel',this.state.tel || this.refs.phone.value)
                    sessionStorage.setItem('capth',this.state.capth || this.refs.capth.value)
                    this.props.history.push('/home')
                }
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
    handlePhoneChange(e){
        this.setState({
            tel:e.target.value
        })
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
                        ref='phone'
                        defaultValue={defaultTel}
                        placeholder="请输入手机号"
                        onChange={this.handlePhoneChange.bind(this)}
                    />
                </div>
                <div className="capcha">
                    <div className="left">
                        <span>验证码</span>
                        <input
                            className="cap-input input"
                            type="text"
                            defaultValue={defaultCapth}
                            ref="capth"
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