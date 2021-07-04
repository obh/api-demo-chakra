import { isBlock } from '@babel/types'
import React from 'react'
import InputGroup from './InputGroups'
import { Validate, ValidateOrderId } from './Validation'
import inputGroups from '../data'
import InputBox from './InputBox'
import {SimpleGrid, 
    Accordion, 
    AccordionIcon, 
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    } from '@chakra-ui/react'
import InputData from '../data'

function Api(props) {
    const {name, description} = props
    let inputGroups = InputData
    console.log("API object --> ", inputGroups)

    return (
    <div>
        <p>This is the API element. This will contain a list of InputGroups</p>
        <p>Name: {name}</p>
        <p>description: {description}</p>

        <Accordion allowMultiple>
  
        {inputGroups.map(function(item, i){
            //console.log("Inputgroup: ", {item})
            let itemKey = item.type == "object" ? item.groupKey : item.inputParamKey
            return (
                <AccordionItem key={itemKey}>
                <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                    {item.type == "object" ? item.groupName : item.inputName}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>   
                {item.type === "object" ?                  
                  <InputGroup key={item.groupKey} name={item.groupName} description={item.groupDescription} 
                    inputs={item.properties}/>
                : <InputBox inputDefault={item.value} key={item.inputParamKey} inputName={item.inputName} inputParamKey={item.inputParamKey}
                        inputValidator={item.inputValidator} />}
                </AccordionPanel>            
                </AccordionItem>
            )
        })}
        </Accordion>
    </div>
    )
}


export default Api