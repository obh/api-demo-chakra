import React from 'react'
import {SimpleGrid} from '@chakra-ui/react'
import InputBox from './InputBox'

function InputGroup(props) {
    const {name, description, inputs} = props

    return (
        <div>
            <p>Description: {description}</p>
                {inputs.map(function(item, index){
                    return (
                        //inputName, inputParamKey, inputDefault, inputValidator
                        <InputBox key={item.inputParamKey} inputName={item.inputName} 
                            inputParamKey={item.inputParamKey} inputDefault={item.value} 
                            inputValidator={item.inputValidator}/>
                    )
                })}
        </div>

    )
}

export default InputGroup