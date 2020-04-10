import { request, config } from '../../assets/api/index'

function getHotelList(id, stay, leave) {
    return new Promise((resolve, reject) => {
        request.get(config.api.getHotelList, {
            hotelId: id,
            liveTime: stay,
            leaveTime: leave
        }).then(data => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    })
}

function getOrderDetail(orderId){
    return new Promise((resolve, reject) => {
        request.get(config.api.getUserOrderInfo, {
            orderId:orderId
        }).then(data => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    })
}

function submitOrder(hotelId, houseId, liveTime, leaveTime, name, telephone, idCard, source,price) {
    return new Promise((resolve, reject) => {
        request.post(config.api.submitOrder, {
            hotelId: hotelId,
            houseId: houseId,
            liveTime: liveTime,
            leaveTime: leaveTime,
            name: name,
            telephone: telephone,
            idCard: idCard,
            source: source,
            totaFlee: price,
            type: '1',
            payStatus: '1'
        }).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

function changeOrder(id,hotelId,houseId,liveTime,leaveTime,name,telephone,idCard,source){
    return new Promise((resolve, reject) => {
        request.post(config.api.reviseOrder, {
            id:id,
            hotelId: hotelId,
            houseId: houseId,
            liveTime: liveTime,
            leaveTime: leaveTime,
            name: name,
            telephone: telephone,
            idCard: idCard,
            source: source
        }).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export {
    getHotelList,
    submitOrder,
    changeOrder,
    getOrderDetail
}


