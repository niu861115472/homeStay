import qs from 'qs'
import 'whatwg-fetch'
import 'es6-promise'
import { Toast } from 'antd-mobile'

export const config = {
    header: {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    api: {
        // base: 'http://192.168.0.52:8888/aijukex/',
        base: 'http://demo.live-ctrl.com/aijukex/',
        getHotelList: 'reserva_getHotelHouses',
        submitOrder:'reserva_submitOrder',
        getOrders:'reserva_getOrders',
        getWXPayInfo:'payHomestayWx',
        getOpenId:'tenement/reserve_getOpenId',
        getPassword:'tenement/manager_hotel_getPassword',
        getLogin:'tenement/manager_hotel_login',
        cancelOrder:'reserva_cancelOrder',
        reviseOrder:'reserva_updateOrder',
        managerLogin:'tenement/hotel_login',
        getManagerPsw:'tenement/hotel_getPassword',
        getUserOrderInfo:'reserva_getOrderInfoByOrderId',
        getWXRefund:'refund',
        getHotelRunTimeInfo:'reserva_getHotelRunTimeInfo'
    }
}

export const request = {
    get(url, params) {
        if (params) {
            url = config.api.base + url + '?' + qs.stringify(params)
        }
        else {
            url = config.api.base + url
        }
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                    if(!data.success){
                        Toast.info(data.msg)
                    }
                })
                .catch(err => reject(err))
        })
    },
    post(url, data) {
        const postUrl = config.api.base + url
        return new Promise((resolve, reject) => {
            fetch(postUrl, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body:qs.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    resolve(data)
                    if(data.success){
                        Toast.info(data.msg)
                    }
                    else{
                        Toast.info(data.msg)
                    }
                })
                .catch(err => reject(err))
        })
    }
}
