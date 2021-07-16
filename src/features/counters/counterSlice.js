import { createSlice } from '@reduxjs/toolkit'
import {CREATE_ORDER_GROUP, CARD_PAY_GROUP, UPI_PAY_GROUP, NB_PAY_GROUP, APP_PAY_GROUP} from '../constants'

const initialState = { 
    value: 0,
    active_step: 0,
    order_id: 0,
    lineEdited: -1,

    createOrder: {
      "order_id": "order_" + Date.now(),
      "order_amount": 10.12,
      "order_currency": "INR",
      "customer_id": "12345",
      "customer_email": "techsupport@cashfree.com",
      "customer_phone": "9816512345",
      "return_url": "https://ngrok.io/cf/return?order={order_id}&token={order_token}",
      "notify_url": "https://ngrok.io/cf/notfiy.php"
    },
    createOrderUpdatedKey: "" ,

    orderPay: {
      "order_token": "temporaryToken",
      "channel": "link",
      "card_number": "4242424242424242",
      "card_expiry_mm": "12",
      "card_expiry_yy": "24",
      "card_cvv": "123",
      "cf_bank_code": 3021,
    },
    orderPayUpdatedKey: "",

    upiPay: {
      "channel": "link",   
      "upi_id": "7760752123@ybl",
      "phone": "7760752123"
    },
    upiPayUpdatedKey: "",

    nbPay: {
      "netbanking_bank_code": "3021"
    },

    appPay: {
      "channel": "gpay",
      "phone": "9999912345"
    },
    appPayUpdatedKey: "",
}


export const counterSlice = createSlice({
  name: 'counter',
  
  initialState: initialState,

  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
      console.log("Incremented by 1, curr value: ", state.value)
    },
   
    setOrderId: (state, action) => {
        state.create_order_order_id = action.payload
        console.log("action is ", action)  
    },

    updateParamValue: (state, action) => {
      const groupID = action.payload[0]
      if(groupID === CREATE_ORDER_GROUP){
        state.createOrder[action.payload[1]] = action.payload[2]
        state.createOrderUpdatedKey = action.payload[1]
      } else if(groupID === CARD_PAY_GROUP){
        state.orderPay[action.payload[1]] = action.payload[2]
        state.orderPayUpdatedKey = action.payload[1]
      } else if(groupID === UPI_PAY_GROUP){
        state.upiPay[action.payload[1]] = action.payload[2]
        state.upiPayUpdatedKey = action.payload[1]
      } else if(groupID === NB_PAY_GROUP){
        state.nbPay[action.payload[1]] = action.payload[2]
      } else if(groupID === APP_PAY_GROUP){
        state.appPay[action.payload[1]] = action.payload[2]
        state.appPayUpdatedKey = action.payload[1]
      }
      console.log("updated param value")
    },
  }

})

// Action creators are generated for each case reducer function
export const { increment, setOrderId, updateParamValue } = counterSlice.actions

export default counterSlice.reducer