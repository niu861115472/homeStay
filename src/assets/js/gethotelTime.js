import { request, config } from '../api/index'

function gethotelTime (hotelId) {
    
    return new Promise((resolve, reject) => {
        request.get(config.api.getHotelRunTimeInfo, {
            hotelId: hotelId
        }).then(data => {
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
}

export {
    gethotelTime
}


