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
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  LinkOverlay,
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
  Spacer, 
  Stack,
  Switch,
} from '@chakra-ui/react';
import { InfoOutlineIcon, LockIcon, UnlockIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { ValidateOrderId} from '../components/Validation'
import InputBox from '../components/InputBox';
import Code from './CreateOrderAPI';
import Stepper from '../components/Stepper';
import { PrismCode } from '../components/Prismcode';
import {CREATE_ORDER_GROUP} from '../features/constants'
import {stepData, createOrderResponse} from './CreateOrderData'


// function StatsCard(props) {
//   const { paramId, stat } = props;
//   const [value, setValue] = React.useState("")
//   const [errors, setErrors] = React.useState("")
  
//   const dispatch = useDispatch()
//   //const handleChange = (event) => setValue(event.target.value)

//   function handleChange(event) {
//     let err = Validate(paramId, event.target.value)
//     dispatch(setOrderId(event.target.value))
//     console.log(event)
//     setValue(event.target.value)
//     setErrors(err)
//   }

//   return (
//       <Accordion allowToggle>
//         <AccordionItem>
//           <h2>
//           <AccordionButton>
//             <Box flex="1" textAlign="left">
//                 {paramId}
//             </Box>
//             <AccordionIcon/>
//           </AccordionButton>
//           </h2>
//           <AccordionPanel pb={4}>
//             hello to the fucking world!
//             {stat}
//             <Input isInvalid={errors.length > 0} onBlur={handleChange} variant="outline" placeholder="Outline" />
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//   );
// }

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

function APIResponse(){
  const [startHighlight, setStartHighlight] = React.useState(0);
  const [endHighlight, setEndHighlight] = React.useState(0);
  const [showResponse, setShowResponse] = React.useState(false)

  console.log("Highlight range: ", startHighlight, endHighlight)

  
  return (
    <div>
      <Box height="50px" bg="#fafafa"></Box>
      <Stack direction="row">      
      
      <Alert status="info" ml={4} mr={4} height="60px">        
        {!showResponse ? <LockIcon w={6} h={6}  /> : <UnlockIcon w={6} h={6} />}
        <Text ml={2} fontSize="smm">View api response 
          <Switch ml={2} colorScheme="red" onChange={() => {setShowResponse(!showResponse)}}/> </Text>
          <Spacer/>
          <LinkOverlay href="/pay-order">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="black" variant="outline">
            Next Step
            </Button>
          </LinkOverlay>
      </Alert>
        
        </Stack>
        <Collapse in={showResponse} animateOpacity>
       <Grid
      pt={8}
      templateColumns="repeat(6, 1fr)"
      gap={4} bg="#fafafa" >
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
      </div>
  )
}

const CreateOrder = () => {
  const name = "create order api"
  const description = "The create order API is the first step to process payments. \
  This API will fetch you an order token which can be used to complete the payment."
  const step = 0
  
  return (
    <div>
      <Stepper activeIndex={1} stepDetails={stepData}/>
      <Grid
      pt={8}
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="INR" key="order_currency" inputName="Order Currency" 
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="techsupport@cashfree.com" key="customer_email" inputName="Customer Email" 
                  inputParamKey="customer_email" inputValidator={ValidateOrderId}  />
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="9816512345" key="customer_phone" inputName="Customer Phone" 
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
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="https://ngrok.io/cf/return?order={order_id}&token={order_token}" key="return_url" inputName="Return URL" 
                  inputParamKey="return_url" inputValidator={ValidateOrderId}  />
              <InputBox group={CREATE_ORDER_GROUP} inputDefault="https://ngrok.io/cf/notfiy.php" key="notify_url" inputName="Notification URL" 
                  inputParamKey="notify_url" inputValidator={ValidateOrderId}  />                  
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
    </div>
)
}

export default CreateOrder
