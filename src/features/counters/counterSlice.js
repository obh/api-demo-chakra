import { defaultStandaloneParam } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
// import { startAnimation } from 'framer-motion/types/animation/utils/transitions'
import InputData from '../../pages/CreateOrderData'
import {CREATE_ORDER_GROUP, ORDER_PAY_GROUP} from '../constants'

const initialState = { 
    value: 0,
    active_step: 0,
    order_id: 0,
    lineEdited: -1,
    code: InputData,

    createOrder: {
      "order_id": "order_" + Date.now(),
      "order_amount": 10.12,
      "order_currency": "INR",
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
      "vpa": "7760752123@ybl",
      "phone": "7760752123"
    },
    orderPayUpdatedKey: "",
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
      if(groupID == CREATE_ORDER_GROUP){
        state.createOrder[action.payload[1]] = action.payload[2]
        state.createOrderUpdatedKey = action.payload[1]
      } else if(groupID == ORDER_PAY_GROUP){
        state.orderPay[action.payload[1]] = action.payload[2]
        state.orderPayUpdatedKey = action.payload[1]
      }
      console.log("updated param value")
    },

    setInputParamValue: (state, action) => {      
      function updateInputParam(input, action){
        for(const item of input){         
          if(item.type == "object"){
            updateInputParam(item.properties, action)
          }
          else if(item.type == "string" && item.inputParamKey == action.payload[0]){
            console.log("updating param in code: ", action.payload[0])
            item.value = action.payload[1]
            state.lineEdited = item.lineNum
            console.log("Line updated => ", state.lineEdited)
          }
        }
      }      
      console.log("updating code...with action -> ", action)
      updateInputParam(state.code, action)
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, setOrderId, setInputParamValue, updateParamValue } = counterSlice.actions

export default counterSlice.reducer