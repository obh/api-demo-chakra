import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Alert,
  AlertIcon,
  Box,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Heading,
  Text,
  Collapse,
  PopoverTrigger,
  Portal,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { InfoOutlineIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { ValidateOrderId, 
  ValidateOrderAmount, 
  ValidateOrderCurrency,
  ValidateCustomerID,
  ValidateCustomerEmail,
  ValidateCustomerPhone,
  ValidateReturnUrl,
  ValidateNotifyUrl
  } from '../components/Validation'
import InputBox from '../components/InputBox';
import Code from './code/CreateOrderAPI';
import Stepper from '../components/Stepper';
import PrismCode from '../components/Prismcode';
import {CREATE_ORDER_GROUP} from '../features/constants'
import {stepData} from './APIStepper'
import FooterNav from '../components/FooterNav';
import InlineCode from '../components/InlineCode';


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

const createOrderResponse = `{
  "cf_order_id": 498327264,
  "order_id": "order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a",
  "entity": "order",
  "order_currency": "INR",
  "order_amount": 1.01,
  "order_expiry_time": "2021-08-05T18:19:18+05:30",
  "customer_details": {
    "customer_id": "718234",
    "customer_name": null,
    "customer_email": "john@cashfree.com",
    "customer_phone": "9908734801"
  },
  "order_meta": {
    "return_url": null,
    "notify_url": "https://cashfree.com/pg/process_webhook",
    "payment_methods": null
  },
  "settlement_details": {
    "url": "https://prod.cashfree.com/pgnextgenapi-test/api/v1/settlements?order_id=order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a"
  },
  "payment_attempts": {
    "url": "https://prod.cashfree.com/pgnextgenapi-test/api/v1/payments?order_id=order_18481uwTfzyNLoNc8RAC5ojOSv3Xv2a"
  },
  "payment_link": "https://prod.cashfree.com/pgbillpaywebapp/#DYJNGsCOOeK8XozEWHjI",
  "order_status": "ACTIVE",
  "order_token": "AqtC88khqWACIEPcXGgO",
  "order_note": null
}
`

function APIResponse(){
  const [startHighlight, setStartHighlight] = React.useState(0);
  const [endHighlight, setEndHighlight] = React.useState(0);
  const [showResponse, setShowResponse] = React.useState(false)

  console.log("Highlight range: ", startHighlight, endHighlight)

  
  return (
    <Box pl={4} pt={4} pr={4}>
      <Heading as="h4" size="md">Response</Heading>
      <Text>The response to the above API call contains the order object. You should save the 
        <InlineCode>order_id</InlineCode> and <InlineCode>order_token</InlineCode> from the response in
        your database. 
      </Text>
      <Box mt={4} borderWidth="1px" borderRadius="md">
      <Stack pt={2} pb={4} spacing={4} direction="row">      
        {!showResponse ? <LockIcon w={6} h={6}  /> : <UnlockIcon w={6} h={6} />}
        <Text fontSize="smm">View detailed api response</Text>        
        <Switch ml={2} colorScheme="red" onChange={() => {setShowResponse(!showResponse)}}/> 
      </Stack>
      </Box>

      <Collapse in={showResponse} animateOpacity>
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >          
        <GridItem rowSpan={2} colSpan={3} >
        <div>      
          <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
            pt={2} pb={2} pr={2} pl={2}
            onMouseEnter={() => {setStartHighlight(1); setEndHighlight(6)}}
            onMouseLeave={() => {setStartHighlight(0); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>Basic details</Heading>
            For every order creation we share back essential details with you. The <code>order_id</code> represents
            your identifier. The <code>cf_order_id</code> represents the same resource at Cashfree. 
            The <code>entity</code> represents the order. <code>order_amount</code> and <code>order_currency</code>
            are details about the order at Cashfree's end. 
          </Box>
          <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
            pt={2} pb={2} pr={2} pl={2}
            onMouseEnter={() => {setStartHighlight(7); setEndHighlight(12)}}
            onMouseLeave={() => {setStartHighlight(-1); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>Customer details</Heading>
            The customer details are used to display saved cards (we use phone number as a 2FA).
            Other details are used as risk checks and in processing payments with our banking partners.
          </Box>
          <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
            pt={2} pb={2} pr={2} pl={2}
            onMouseEnter={() => {setStartHighlight(13); setEndHighlight(23)}}
            onMouseLeave={() => {setStartHighlight(-1); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>Additional details</Heading>
            This <code>return_url</code> tell us where to redirect the user after they have entered the OTP on the bank page.
            The <code>notify_url</code> is used to send notification after every successful payment. 
            The <code>settlement_details</code> and <code>payment_details</code> APIs can be used to get more information
            on the payment and settlement details. Read more here. 
          </Box>
          <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
            pt={2} pb={2} pr={2} pl={2}
            onMouseEnter={() => {setStartHighlight(24); setEndHighlight(27)}}
            onMouseLeave={() => {setStartHighlight(-1); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>Order Token and status</Heading>
            This <code>order_status</code> tells the status of this order. The <code>order_token</code> is the client token
            created for this order. We will use this token to initiate the payment. 
          </Box>
        </div>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} >
      <PrismCode code={createOrderResponse} language="js" 
          highlightStart={startHighlight} highlightEnd={endHighlight} />
      </GridItem>
      </Grid></Collapse>
      </Box>
  )
}

const CreateOrder = () => {
  const name = "create order api"
  const description = "The create order API is the first step to process payments. \
  This API will fetch you an order token which can be used to complete the payment."
  
  return (
    <div>
      <Stepper activeIndex={0} stepDetails={stepData}/>
      <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >
        <GridItem rowSpan={2} colSpan={3} >
        <Box ml="4" mr="2">
          <Box pb={4}>
            <Heading pb={2} as="h2" size="xl">
              <Badge variant="outline" colorScheme="blue"  fontSize="0.7em" mr={2}> 1 </Badge>
              {name}
              <CircularProgress  ml={2} value={10} color="green.400" size="40px" thickness="6px">
                <CircularProgressLabel>5 min</CircularProgressLabel>
              </CircularProgress>
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="order_123" key="order_id" inputName="Order Id" 
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault={10.1} key="order_amount" inputName="Order amount" 
                  inputParamKey="order_amount" inputValidator={ValidateOrderAmount}  />
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="INR" key="order_currency" inputName="Order Currency" 
                  inputParamKey="order_currency" inputValidator={ValidateOrderCurrency} />
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
            <Text fontSize="md">You need to send customer details for every order. 
            CustomerID is a unique identifier at your end which you need to pass to Cashfree. 
            If you do not have such an identifier, you can provide the phone number in this field.</Text>
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="12345" key="customer_id" inputName="Customer ID" 
                  inputParamKey="customer_id" inputValidator={ValidateCustomerID}  />
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="techsupport@cashfree.com" key="customer_email" inputName="Customer Email" 
                  inputParamKey="customer_email" inputValidator={ValidateCustomerEmail}  />
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="9816512345" key="customer_phone" inputName="Customer Phone" 
                  inputParamKey="customer_phone" inputValidator={ValidateCustomerPhone}  />                  
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="https://ngrok.io/cf/return?order={order_id}&token={order_token}" key="return_url" inputName="Return URL" 
                  inputParamKey="return_url" inputValidator={ValidateReturnUrl}  />
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="https://ngrok.io/cf/notfiy.php" key="notify_url" inputName="Notification URL" 
                  inputParamKey="notify_url" inputValidator={ValidateNotifyUrl}  />                  
            </AccordionPanel>            
          </AccordionItem>
        </Accordion>
        </Box>
        <Alert status="warning" mt={12} ml={4}>
        <AlertIcon />
        <Text fontSize="sm">You cannot try this API from the browser! </Text>
        </Alert>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} >
          <Box ml="2" mr="4">
            <Code/>
          </Box>
        </GridItem>
    </Grid>
    <APIResponse />
    <FooterNav nextPage="/pay-order"/>
    </div>
)
}

export default CreateOrder
