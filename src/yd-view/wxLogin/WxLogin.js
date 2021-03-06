import React, { Component } from 'react';
import { request, config } from '../../assets/api/index'
import { withRouter } from 'react-router-dom'

class WxLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelId:''
        };
    }
    componentWillMount(){
    }
    componentDidMount() {
        this.getCode()
        console.log(document.referrer)
    }
    //获取code判断是否授权
    getCode() {
        const code = this.getUrlParam("code");
        const appId = localStorage.getItem("appId")
        if (code == null || code == "") {
            var test = 'http://demo.live-ctrl.com/homestay/#/home'
            // wx46c6c44668d85f68
            window.location.href =
                `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` +
                encodeURIComponent(test) +
                "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        } else {
            localStorage.setItem('code', code)
            this.getUserInfo(code)
        }
    }
    // 获取code方法`
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
    // 获取openid接口
    getUserInfo(code) {
        request.get(config.api.getOpenId, {
            code: code
        })
            .then(data => {
                localStorage.setItem('userInfo', data.data.openid)
                this.props.history.push('/home')
            })
        
    }
    render() {
        return (
            <div className="wx-login"></div>
        );
    }
}

export default withRouter(WxLogin);