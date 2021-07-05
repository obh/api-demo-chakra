import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Grid,
  GridItem,
  Heading,
  Text,
  Input,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Switch, Route } from 'react-router-dom'
import FullRoster from './FullRoster'
import Player from './Player'
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement, incrementByAmount, setOrderId} from '../features/counters/counterSlice'
import {Validate, ValidateOrderId} from './Validation'
import Api from './Api'
import InputBox from './InputBox';
import Code from './Code';


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

function DocInfoIcon(props){
  const {title, text} = props
  return (
    <Popover>
    <PopoverTrigger>
    <InfoOutlineIcon ml={1} mr={1}/>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader><b>{title}</b></PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {text}
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
  )
}


const CreateOrder = () => {
  const name = "create order api"
  const description = "The create order API is the first step to process payments. \
  This API will fetch you an order token which can be used to complete the payment."
  return (
      <Grid
      h="800px" pt={8}
      templateColumns="repeat(6, 1fr)"
      gap={4} bg="#fafafa" >
        <GridItem rowSpan={2} colSpan={3} >
                  <Box ml="4" mr="2">
        <Box pb={4}>
        <Heading pb={2} as="h2" size="xl">
          <Badge variant="outline" colorScheme="blue"  fontSize="0.7em" mr={2}> 1 </Badge>
          {name}
        </Heading>
        <Text fontSize="xl">{description}</Text>
        </Box>
        <Accordion allowMultiple>
          <AccordionItem key="order_id">
            <h2>
            <AccordionButton _expanded={{ bg: "#262626", color: "white" }}>
                <Box flex="1" textAlign="left">
                  Order Id
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>   
              <InputBox inputDefault="order_123" key="order_id" inputName="Order Id" 
                  inputParamKey="order_id" inputValidator={ValidateOrderId} 
                  inputDesc="OrderID is used to track the payment"/>
      
            </AccordionPanel>            
          </AccordionItem>
          <AccordionItem key="order_amount">
            <h2>
            <AccordionButton _expanded={{ bg: "#262626", color: "white" }}>
                <Box flex="1" textAlign="left">
                  Order Amount
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>   
              <InputBox inputDefault={10.1} key="order_amount" inputName="Order amount" 
                  inputParamKey="order_amount" inputValidator={ValidateOrderId}  />
            </AccordionPanel>            
          </AccordionItem>
          <AccordionItem key="order_currency">
            <h2>
            <AccordionButton _expanded={{ bg: "#262626", color: "white" }}>
                <Box flex="1" textAlign="left">
                Order Currency
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>   
              <InputBox inputDefault="INR" key="order_currency" inputName="Order Currency" 
                  inputParamKey="order_currency" inputValidator={ValidateOrderId}  />
            </AccordionPanel>            
          </AccordionItem>
          <AccordionItem key="customer_details">
            <h2>
            <AccordionButton _expanded={{ bg: "#262626", color: "white" }}>
                <Box flex="1" textAlign="left">
                Customer Details
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>   
            <Text fontSize="md">You need to send customer details for every order.</Text>
              <InputBox inputDefault="support@cashfree.com" key="customer_email" inputName="Customer Email" 
                  inputParamKey="customer_email" inputValidator={ValidateOrderId}  />
              <InputBox inputDefault="9816512345" key="customer_phone" inputName="Customer Phone" 
                  inputParamKey="customer_phone" inputValidator={ValidateOrderId}  />                  
            </AccordionPanel>            
          </AccordionItem>
          <AccordionItem key="orders_meta">
            <h2>
            <AccordionButton _expanded={{ bg: "#262626", color: "white" }} >
                <Box flex="1" textAlign="left">
                Additional details
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>   
            <Text pb={2} fontSize="md">This additional info is used for payment processing and notificaiton. 
            Return url tell us which page to redirect customer to after payment 
              <DocInfoIcon title="Return URL" text="Card and net banking payments require customers to be redirected to banks OTP 
                    page and then be redirected back to merchant website. The returnURL specifies where customer 
                    will return to on your page. Note: you must pass two placeholders in the return url 
                    {order_id} and {order_token}. We will issue a link based redirection to this url." /> </Text>
             <Text pb={2} fontSize="md"> The notification url will be invoked as soon as order is successfully 
             paid. Use services like ngrok, webhook.site to test notifications.</Text> 
              <InputBox inputDefault="support@cashfree.com" key="return_url" inputName="Return URL" 
                  inputParamKey="return_url" inputValidator={ValidateOrderId}  />
              <InputBox inputDefault="9816512345" key="notify_url" inputName="Notification URL" 
                  inputParamKey="notify_url" inputValidator={ValidateOrderId}  />                  
            </AccordionPanel>            
          </AccordionItem>
        </Accordion>
        </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} >
          <Box ml="2" mr="4">
            <Code/>
          </Box>
        </GridItem>
    </Grid>
    
)
}

export default CreateOrder
