import { defaultStandaloneParam } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
import InputData from '../../data'

const initialState = { 
    value: 0,
    active_step: 0,
    order_id: 0,
    code: InputData
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

      return {
        ...state,
        code: state.code.map(inputGroup => {
          return { ...inputGroup,
            inputs: inputGroup.inputs.map(input => {
              if(input.inputParamKey !== action.payload[0]){
                return input
              }
              return {
                ...input,
                value: action.payload[1]
              }
            })
          }
        })
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setOrderId, setInputParamValue } = counterSlice.actions

export default counterSlice.reducer