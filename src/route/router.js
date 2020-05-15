import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login/Login'
import WxLogin from '../yd-view/wxLogin/WxLogin'
import Sort from '../pages/orderSort/Sort'
import AddOrder from '../pages/addOrder/AddOrder'
import HadOrder from '../pages/hadOrder/HadOrder'
import ChangeOrder from '../pages/changeOrder/ChangeOrder'
import YdLogin from '../yd-view/yd-login/Login.js'
import Home from '../yd-view/home/Home'
import OrderList from '../yd-view/orderList/orderList'
import Submit from '../yd-view/submitOrder/Submit'
import OrderDetail from '../yd-view/orderDetail/OrderDetail'
import Replenish from '../yd-view/replenish/Replenish'

// console.log(hotelId)

// const login = `/#/?hotelId=${hotelId}`

function MyRouter() {
    return <Router>
        <Switch>
            {/* <Route path="/wxLogin" component={WxLogin} /> */}
            {/* <Route path="/" component={Login} /> */}
            <Route path="/orderSort" component={Sort} />
            <Route path="/addOrder" component={AddOrder} />
            <Route path="/hadOrder" component={HadOrder} />
            <Route path="/changeOrder" component={ChangeOrder} />
            <Route path="/" exact component={YdLogin} />
            <Route path="/home" component={Home} />
            <Route path="/order" component={OrderList} />
            <Route path="/Submit" component={Submit} />
            <Route path="/orderDetail" component={OrderDetail} />
            <Route path="/replenish" component={Replenish} />
            <Redirect to="/" />
        </Switch>
    </Router>
}

export default MyRouter