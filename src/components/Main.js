import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import CreateOrder from '../pages/CreateOrder'
//import PayOrder from './PayOrder'
import OrderPay from '../pages/OrderPay'
import ReturnHandling from '../pages/ReturnHandling'
import ThankYou from '../pages/ThankYou'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/create-order' component={CreateOrder}/>
      <Route path='/pay-order' component={OrderPay}/>
      <Route path='/return-order' component={ReturnHandling}/>
      <Route path='/thankyou' component={ThankYou}/>
    </Switch>
  </main>
)

export default Main
