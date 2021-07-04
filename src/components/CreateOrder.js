import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  chakra,
  Input,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom'
import FullRoster from './FullRoster'
import Player from './Player'
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement, incrementByAmount, setOrderId} from '../features/counters/counterSlice'
import {Validate} from './Validation'
import Api from './Api'


function StatsCard(props) {
  const { paramId, stat } = props;
  const [value, setValue] = React.useState("")
  const [errors, setErrors] = React.useState("")
  
  const dispatch = useDispatch()
  //const handleChange = (event) => setValue(event.target.value)

  function handleChange(event) {
    let err = Validate(paramId, event.target.value)
    dispatch(setOrderId(event.target.value))
    console.log(event)
    setValue(event.target.value)
    setErrors(err)
  }

  return (
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
                {paramId}
            </Box>
            <AccordionIcon/>
          </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            hello to the fucking world!
            {stat}
            <Input isInvalid={errors.length > 0} onBlur={handleChange} variant="outline" placeholder="Outline" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
  );
}


const CreateOrder = () => (
      <Api name="create order api" description="This is the create order API"/>
      // <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
      //   <StatsCard paramId={'order_id'} stat={'Used to track this order'} />
      //   <StatsCard paramId={'order_amount'} stat={'order amount'} />
      //   <StatsCard paramId={'order_currency'} stat={'order amount'} />
      //   <StatsCard paramId={'customer_details'} stat={'Customer details'} />
      // </SimpleGrid>
)

export default CreateOrder
