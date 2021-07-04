import React from 'react'
import {
    Input,
    InputGroup
 } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import {setInputParamValue} from '../features/counters/counterSlice'

function InputBox(props){
    const {inputName, inputParamKey, inputDefault, inputValidator} = props
    //we use two states- value and errors in the input
    const [value, setValue] = React.useState("")
    const [errors, setErrors] = React.useState("")

    //we will also need to use hooks to update the code
    const dispatch = useDispatch()

    function handleChange(event){
        console.log("what is validatory?", inputValidator)
        let err = inputValidator(event.target.value)
        dispatch(setInputParamValue(["order_id", event.target.value]))
        setValue(event.target.value)
    }

    return (
        <InputGroup>
            <Input variant="outline" key={inputParamKey} placeholder={inputDefault}
         isInvalid={errors.length > 0} onBlur={handleChange}/>
         </InputGroup>
    )
}

export default InputBox