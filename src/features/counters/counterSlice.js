import { defaultStandaloneParam } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
import InputData, {ParseDataForRedux} from '../../data'

const initialState = { 
    value: 0,
    active_step: 0,
    order_id: 0,
    code: ParseDataForRedux(InputData)
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
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      //state.value += action.payload
      console.log("in increment by amount")
      console.log(action)
    },
    setOrderId: (state, action) => {
        state.create_order_order_id = action.payload
        console.log("action is ", action)  
    },
    setInputParamValue: (state, action) => {
      
      function updateInputParam(input, action){
        for(const item of input){
          if(item.type == "object"){
            return updateInputParam(item.properties, action)
          }
          if(item.inputParamKey == action.payload[0]){
            console.log("updating param in code: ", action.payload[0])
            item.value = action.payload[1]
          }
        }
      }      
      console.log("updating code...with action -> ", action)
      updateInputParam(state.code, action)
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setOrderId, setInputParamValue } = counterSlice.actions

export default counterSlice.reducer