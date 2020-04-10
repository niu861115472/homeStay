import wx from 'weixin-js-sdk'
import { request, config } from '../api/index'
import { createHashHistory } from 'history'

const history = createHashHistory()

export const wxPay = (price,id) => {
    request.post(config.api.getWXPayInfo,{
        openId:localStorage.getItem('userInfo'),
        id:id,
        totalFee:price
    })
    .then(data =>{
        const result = data.requestParam
        console.log(result)
        wx.config({
            debug: false,
            appId: result.appId,
            timestamp: result.timeStamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: ['chooseWXPay']
        });
        wx.ready(function () {
            wx.chooseWXPay({
                timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用    timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: result.paySign, // 支付签名
                success: function (res) {
                    history.push('/order')
                },
                cancel: function (res) {
                    alert('已取消支付');
                },
                fail: function (res) {
                    alert('购买失败')
                }
            })
        })
    })
}
