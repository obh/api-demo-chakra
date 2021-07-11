import React from 'react'
import {
    Box,
    Input,
    InputGroup,
    InputLeftAddon,
    Text
 } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import {updateParamValue} from '../features/counters/counterSlice'

function InputBox(props){
    const {inputName, group, inputParamKey, inputDefault, inputValidator, inputDesc} = props
    //we use two states- value and errors in the input
    const [value, setValue] = React.useState("")
    const [error, setError] = React.useState("")

    //we will also need to use hooks to update the code
    const dispatch = useDispatch()

    function handleChange(event){
        const [newVal, err] = inputValidator(event.target.value)
        if(err) {
            setError(err)
        } else {
            dispatch(updateParamValue([group, inputParamKey, newVal]))
            setValue(newVal)
            setError("")
        }
    }

    return (
        <Box mb={2} mt={2}>
        <Text fontSize="sm">{inputDesc}</Text>
        <InputGroup>
            <InputLeftAddon children={inputParamKey} />
            <Input variant="outline" key={inputParamKey} placeholder={inputDefault}
         isInvalid={error.length > 0} onBlur={handleChange}/>
         </InputGroup>
        {error === "" ? null : <Text fontSize="sm" color="red">{error}</Text>}
         </Box>
    )
}

export default InputBox