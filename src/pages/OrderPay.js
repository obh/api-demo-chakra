import React from 'react'
import {
    Alert,
    AlertIcon,
    CircularProgress,
    CircularProgressLabel,
    Box,
    Badge,
    Divider,
    Grid,
    GridItem,
    Heading,
    Text,
    Tag,
    TagLabel,
  } from '@chakra-ui/react';
import Stepper from '../components/Stepper';
import {stepData} from './CreateOrderData'
import {ORDER_PAY_GROUP} from '../features/constants'
import { ValidateOrderId} from '../components/Validation'
import InputBox from '../components/InputBox';
import { PrismCode } from '../components/Prismcode';
import OrderPayCode from './OrderPayCode'

function PrebuiltCheckout(props){
    const paymentUrlCode = 
    `{
..
  "payment_link": "https://payments.cashfree.com/order#AqtC88khqWACIEPcXGgO",
..
}`
    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >
        <GridItem ml={4} mr={2} rowSpan={2} colSpan={3}>
        <Tag size="lg" colorScheme="red" borderRadius="full">
            <TagLabel>Prebuilt Checkout</TagLabel>
        </Tag>
        <CircularProgress  ml={2} value={10} color="green.400" size="40px" thickness="6px">
          <CircularProgressLabel>5 min</CircularProgressLabel>
        </CircularProgress>
        <Box  pt={4} pl={2}>
        <Text color="#2a2a2a" mb={8}>
            <p pb={4}>The prebuilt checkout is a cashfree hosted payments page. This is the easiest way to
            accept payments without worrying about PCI compliance.
            You can configure the payment page with your brand logo and theme color. See here for more
            customizations.</p>
            <Alert status="info" variant="subtle" mt={6}>
                <AlertIcon />
                <Text fontSize="sm">You need to redirect user to the payment_link url!</Text>
            </Alert>
        </Text>
        </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} mr={4}>
        <PrismCode code={paymentUrlCode} language="js" ></PrismCode></GridItem>
        </Grid>
    )
}

function CustomCheckout(props){
    const paymentUrlCode = 
    `{
..
  "payment_link": "https://payments.cashfree.com/order#AqtC88khqWACIEPcXGgO",
..
}`
    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >
        <GridItem ml={4} mr={2} rowSpan={2} colSpan={6}>
        <Tag size="lg" colorScheme="telegram" borderRadius="full">
            <TagLabel>Custom Checkout</TagLabel>
        </Tag>
        <CircularProgress  ml={2} value={40} color="green.400" size="40px" thickness="6px">
          <CircularProgressLabel>20 min</CircularProgressLabel>
        </CircularProgress>
        <Box  pt={4} pl={2}>
        <Text color="#2a2a2a" mb={8}>
            The custom checkout allows you to build a completley customized payment flow.
            You must build your own user interface to collect payment details and use the below APIs to
            process payments. If you accept card details on your page you might have to look at scope 
            of PCI compliance which impacts your product.   
        </Text>
        </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
            <Heading as="h4" size="md">Cards</Heading>
            To accept card payments, you must build a custom card form. Once the card details are captured
            by your html, you can directly send those to Cashfree using a javascript call. We will show you 
            how to make this call. <Box mb={4}></Box>
            Card payments in India mandatorily require a second factor of authentication. This 2FA usually
            involves redirection to bank's OTP page where the customer enters the OTP and is then redirected
            back to the merchant website. 
            <InputBox group={ORDER_PAY_GROUP} inputDefault={4242424242424242} 
                    key="card_number" inputName="Card Expiry" 
                  inputParamKey="card_number" inputValidator={ValidateOrderId}  />
            <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                <InputBox group={ORDER_PAY_GROUP} inputDefault={12} 
                    key="card_expiry_mm" inputName="Card Expiry" 
                  inputParamKey="card_expiry_mm" inputValidator={ValidateOrderId}  />
                </GridItem>
                <GridItem colSpan={2}>
                <InputBox group={ORDER_PAY_GROUP} inputDefault={24} 
                    key="card_expiry_yy" inputName="Card Expiry" 
                  inputParamKey="card_expiry_yy" inputValidator={ValidateOrderId}  />
                </GridItem>
                <GridItem colSpan={2}>
                <InputBox group={ORDER_PAY_GROUP} inputDefault={123} 
                    key="card_cvv" inputName="Card CVV" 
                  inputParamKey="card_cvv" inputValidator={ValidateOrderId}  />
                </GridItem>
            </Grid>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
            <OrderPayCode/>
        </GridItem>
        </Grid>
    )
}

function OrderPay(props){
    const name = "order pay api"
    const description = "To complete the payment you can either use a prebuilt checkout or build your own" +
        " custom checkout. Follow the steps below to see how these can be done!"
    const step = 1

    return (
        <div>
      <Stepper activeIndex={1} stepDetails={stepData}/>
      {/* <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >
        <GridItem rowSpan={2} colSpan={3}> */}
          <Box ml="4" mr="2" bg="#fafafa">
            <Box pb={4}>
                <Heading pb={2} as="h2" size="xl">
                    <Badge variant="outline" colorScheme="blue"  fontSize="0.7em" mr={2}> 2 </Badge>
                    {name}
                </Heading>
            <Text fontSize="xl">{description}</Text>
            </Box>                
          </Box>
        {/* </GridItem> */}
      {/* </Grid> */}
      <PrebuiltCheckout/>        
      <Divider />
      <CustomCheckout/>
        </div>
    )
}

export default OrderPay