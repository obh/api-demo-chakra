import React from 'react'
import {
    Box,
    Input,
    InputGroup,
    InputLeftAddon
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
        console.log("what is validatory?", event)
        //let err = inputValidator(event.target.value)
        dispatch(setInputParamValue([inputParamKey, event.target.value]))
        setValue(event.target.value)
    }

    return (
        <Box mb={2} mt={2}>
        <InputGroup>
            <InputLeftAddon children={inputParamKey} />
            <Input variant="outline" key={inputParamKey} placeholder={inputDefault}
         isInvalid={errors.length > 0} onBlur={handleChange}/>
         </InputGroup>
         </Box>
    )
}

export default InputBox