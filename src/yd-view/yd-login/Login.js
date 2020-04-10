import React, { Component } from 'react';
import LoginForm from './components/loginForm'
import './Login.css'

class YdLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="login">
                <p className="login-tip">
                    请输入您的手机号码,预订房间！
            </p>
                <LoginForm />
            </div>
        );
    }
}

export default YdLogin