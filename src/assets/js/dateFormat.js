import moment from 'moment'

export const format = (date) =>{
    return moment(date).format("YYYY-MM-DD")
}
export const iosFormat = (date) =>{
    return moment(date).format("YYYY/MM/DD HH:mm:ss")
}

export const formatZH = (date) =>{
    console.log(new Date(Date.parse(date)))
    return new Date(Date.parse(date))
}

export const noYearFormat = (date) =>{
    return moment(date).format("MM-DD")
}

export const normalFormat = (date) =>{
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

export const formatWeek = (date) =>{
    const weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
    return weekArray[new Date(date).getDay()]
}

export const formatDays = (stay,leave) =>{
    var stay = moment(stay).format("YYYY/MM/DD HH:mm:ss")
    var leave = moment(leave).format("YYYY/MM/DD HH:mm:ss")
    console.log(stay,leave)
    const sDate1 = new Date(stay).getTime();
    const sDate2 = new Date(leave).getTime();
    const dateSpan = Math.abs(sDate2 - sDate1);
    console.log(sDate1,sDate2)
    return Math.ceil(dateSpan / (24 * 3600 * 1000));
}