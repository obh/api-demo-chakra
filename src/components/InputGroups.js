import React from 'react'
import {Text} from '@chakra-ui/react'
import InputBox from './InputBox'

function InputGroup(props) {
    const {name, description, inputs} = props
    console.log("to input group -> ", inputs)
    inputs.map(function(item, i){
        console.log(item)
    })

    return (
        <div>
            <Text fontSize="lg">{description}</Text>
                {inputs.map(function(item, index){
                    return (
                        //inputName, inputParamKey, inputDefault, inputValidator
                        <InputBox key={item.inputParamKey} inputName={item.inputName} 
                            inputParamKey={item.inputParamKey} inputDefault={item.value} 
                            inputValidator={item.inputValidator} inputDesc={item.inputDescription} />
                    )
                })}
        </div>

    )
}

export default InputGroup