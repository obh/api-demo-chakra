import React from 'react'
import {
    Alert,
    AlertIcon,
    CircularProgress,    
    CircularProgressLabel,
    Collapse,
    Box,
    Badge,
    Code,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Switch,
    Text,
    Tag,
    TagLabel,
  } from '@chakra-ui/react';

import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import Stepper from '../components/Stepper';
import {stepData} from './APIStepper'
import {CARD_PAY_GROUP, UPI_PAY_GROUP, NB_PAY_GROUP, APP_PAY_GROUP} from '../features/constants'
import { 
    ValidateCard, 
    ValidateCardExpiryMM,
    ValidateCardExpiryYY,
    ValidateCardCVV,
    ValidateUPIChannel,
    ValidateUPIID,
    ValidateNBCode,
    ValidateAppChannel,
    ValidateCustomerPhone
} from '../components/Validation'
import InputBox from '../components/InputBox';
import InlineCode from '../components/InlineCode';
import PrismCode from '../components/Prismcode';
import FooterNav from '../components/FooterNav';
import OrderPayCode from './code/CardPayCode'
import UPIPayCode from './code/UPIPayCode';
import NBPayCode from './code/NBPayCode';
import AppPayCode from './code/AppPayCode';

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
          <CircularProgressLabel><b>5 min</b></CircularProgressLabel>
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
    const [showAdvanced, setShowAdvanced] = React.useState(false)
    
    return (
        <div>        
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa">
        <GridItem ml={4} mr={2} rowSpan={2} colSpan={6}>
        <Tag size="lg" colorScheme="telegram" borderRadius="full">
            <TagLabel>Custom Checkout</TagLabel>
        </Tag>
        <CircularProgress  ml={2} value={40} color="green.400" size="40px" thickness="4px">
          <CircularProgressLabel><b>20 min</b></CircularProgressLabel>
        </CircularProgress>
        <Box  pt={4} pl={2}>
        <Text color="#2a2a2a" mb={8} ml={4}>
            The custom checkout allows you to build a completley customized payment flow.
            You must build your own user interface to collect payment details and use the below APIs to
            process payments. If you accept card details on your page you might have to look at scope 
            of PCI compliance which impacts your product.   
        </Text>
        </Box>
        </GridItem>
        </Grid>
        <HStack ml={8}>
        {!showAdvanced ? <LockIcon w={6} h={6}  /> : <UnlockIcon w={6} h={6} />}
        <Text ml={2} fontSize="smm">View Custom checkout details
          <Switch ml={2} colorScheme="red" onChange={() => {setShowAdvanced(!showAdvanced)}}/> 
        </Text>          
        </HStack>
        <Collapse in={showAdvanced} animateOpacity>
        <CardPay/>
        <Divider></Divider>
        <UPIPay/>
        <Divider/>
        <NetBankingPay/>
        <Divider/>
        <CustomAppPay/>
        </Collapse>
        </div>
    )
}

function CardPay(props){
    const cardPayResponse = `
{
    "payment_method": "card",
    "channel": "link",
    "action": "link",
    "data": {
        "url": "https://prod.cashfree.com/pgnextgenapi-test/redirect/v1/gateway/9CJh6ksdqpZaQ27c5dzlfbc750480086fbd218881252a3d4fd62",
        "payload": null,
        "content_type": null,
        "method": null
    }
}`
    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa">
            <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
                <Heading as="h4" size="md">Cards</Heading>
                To accept card payments, you must build a custom card form. Once the card details are captured
                by your html, you can directly send those to Cashfree using a javascript call. We will show you 
                how to make this call. <Box mb={4}></Box>
                Card payments in India mandatorily require a second factor of authentication. This 2FA usually
                involves redirection to bank's OTP page where the customer enters the OTP and is then redirected
                back to the merchant website. 
                <InputBox group={CARD_PAY_GROUP} inputDefault={4242424242424242} 
                    key="card_number" inputName="Card Expiry" 
                    inputParamKey="card_number" inputValidator={ValidateCard}  />
                <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                    <InputBox group={CARD_PAY_GROUP} inputDefault={12} 
                        key="card_expiry_mm" inputName="Card Expiry" 
                    inputParamKey="card_expiry_mm" inputValidator={ValidateCardExpiryMM}  />
                    </GridItem>
                    <GridItem colSpan={2}>
                    <InputBox group={CARD_PAY_GROUP} inputDefault={24} 
                        key="card_expiry_yy" inputName="Card Expiry" 
                    inputParamKey="card_expiry_yy" inputValidator={ValidateCardExpiryYY}  />
                    </GridItem>
                    <GridItem colSpan={2}>
                    <InputBox group={CARD_PAY_GROUP} inputDefault={123} 
                        key="card_cvv" inputName="Card CVV" 
                    inputParamKey="card_cvv" inputValidator={ValidateCardCVV}  />
                    </GridItem>
                </Grid>
            </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
        <OrderPayCode/>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
        <Heading as="h5" size="sm">Response</Heading>
        If your account has card processing enabled and you have passed in the correct details. Cashfree will
        return a redirect url in response to this call. This url will take the customer to the bank's OTP page.
        Once there, the customer will enter the OTP (or 2FA) details and be redirected back to your website.

        The response will contain few other parameters as well. The <InlineCode>payment_method</InlineCode> 
         parameter will always be <InlineCode>card</InlineCode>. The <InlineCode>channel</InlineCode> 
        and parameter will be <InlineCode>link</InlineCode> and the 
        <InlineCode>action</InlineCode> parameter will be <InlineCode>link</InlineCode>. 
        The <InlineCode>data</InlineCode> payload will contain the 
        actual parameters to redirect. 
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
            <PrismCode code={cardPayResponse} language="js"/>
        </GridItem>
    </Grid>
    )
}

function NetBankingPay(props){
    const cardPayResponse = `
{
    "payment_method": "netbanking",
    "channel": "link",
    "action": "link",
    "data": {
        "url": "https://payments.cashfree.com/api/redirect/v1/gateway/9CJh6ksdqpZaQ27c5dzl0ed24239e0d9f67e1a4d647facdec2de",
        "payload": null,
        "content_type": null,
        "method": null
    }
}`
    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa">
            <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
                <Heading as="h4" size="md">Net Banking</Heading>
                <Text>To accept payments directly from customers bank account you need to integrate with the 
                net banking mode. This mode refers to all payments where customers pay using the internet banking
                portal provided by their respective banks. </Text>
                <Text mb={6}>You can view the complete 
                    <Link href="https://dev.cashfree.com/payment-gateway/payments/netbanking" color="blue" isExternal> 
                    &nbsp;list of bank codes here.</Link></Text>
                <InputBox group={NB_PAY_GROUP} inputDefault={3021} 
                    key="netbanking_bank_code" inputName="Bank Code" 
                    inputParamKey="netbanking_bank_code" inputValidator={ValidateNBCode}  />
            </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
        <NBPayCode/>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
        <Heading as="h5" size="sm">Response</Heading>
        A successful response to the above request will return a redirection link. The merchant needs to
        redirect the customer to this link which will take them to the bank's internet banking portal.
        After the user enters their credentials and completes the payment, they will be redirected back
        to the merchant website. 
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
            <PrismCode code={cardPayResponse} language="js"/>
        </GridItem>
    </Grid>
    )
}

function CustomAppPay(props){
    const cardPayResponse = `
{
    "payment_method": "app",
    "channel": "phonepe",
    "action": "link",
    "data": {
        "url": "https://mercury-t2.phonepe.com/transact?token=OWNiZTY0NjI5MTBiNzJkMDNlZjE2YThkOTYyM2EyNzU3MDg3Y2E5NDFmODU4Y2FkOTU5OGQ3Yzk0ZWU2YmIwYzU2NmE5NDA5ZTgwOTZiYWM2YmUwMzA4MzZkMzQ6YzI3MTIwMTRjNWUwNjQ0MjIxMjA5YzAzZDM2NWExOTQ",
        "payload": null,
        "content_type": null,
        "method": null
    }
}`
    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa">
            <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
                <Heading as="h4" size="md">Apps</Heading>
                <Text>Cashfree can help you accept payments through many different apps. These apps can 
                    range from Google Pay, Amazon pay, Paytm, Phonepe etc. </Text>
                <Text mb={6}>You can view 
                    <Link href="https://dev.cashfree.com/payment-gateway/payments/netbanking" color="blue" isExternal> 
                    &nbsp;list of all apps here.</Link></Text>
                <InputBox group={APP_PAY_GROUP} inputDefault={"gpay"} 
                    key="channel" inputName="Channel" 
                    inputParamKey="channel" inputValidator={ValidateAppChannel}  />
                <InputBox group={APP_PAY_GROUP} inputDefault={"9999912345"} 
                    key="phone" inputName="Phone" 
                    inputParamKey="phone" inputValidator={ValidateCustomerPhone}  />
            </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
        <AppPayCode/>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
        <Heading as="h5" size="sm">Response</Heading>
        Most apps have a redirection flow where Cashfree will return you a link using which the customer
        can complete the payment. This response is quite similar to the the response for cards and net banking.

        The response for Google pay is unique because it requires no further action from the user. Once you make
        the above API call, Cashfree will automatically send a notification to the user on their GPay app 
        to accept the payment. 
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
            <PrismCode code={cardPayResponse} language="js"/>
        </GridItem>
    </Grid>
    )
}

function UPIPay(props){
    const upiPayResponse = `
    // Response for Link
    {
        "payment_method": "upi",
        "channel": "link",
        "action": "custom",
        "data": {
          "url": null,
          "payload": {
            "bhim": "bhim://upi/pay?pa=cashfree.pay@indus&pn=Cashfree&tr=237571000&am=12.22&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Payment",
            "default": "upi://pay?pa=cashfree.pay@indus&pn=Cashfree&tr=237571000&am=12.22&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Payment",
            "gpay": "tez://upi/pay?pa=cashfree.pay@indus&pn=Cashfree&tr=237571000&am=12.22&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Payment",
            "paytm": "paytm://upi/pay?pa=cashfree.pay@indus&pn=Cashfree&tr=237571000&am=12.22&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Payment",
            "phonepe": "phonepe://pay?pa=cashfree.pay@indus&pn=Cashfree&tr=237571000&am=12.22&cu=INR&mode=00&purpose=00&mc=5732&tn=Cashfree%20Payment"
          },
          "content_type": null,
          "method": null
        }
    }
    // Response for QR code
    {
        "payment_method": "upi",
        "channel": "qrcode",
        "action": "custom",
        "data": {
          "url": null,
          "payload": {
            "qrcode": "data:image/png;base64,iVBORw0KGgoAkJggg=="
          },
          "content_type": null,
          "method": null
        }
    }
    // Response for Collect
    {
        "payment_method": "upi",
        "channel": "collect",
        "action": "custom",
        "data": {
          "url": null,
          "payload": null,
          "content_type": null,
          "method": null
        }
    }
`
    const [startHighlight, setStartHighlight] = React.useState(0);
    const [endHighlight, setEndHighlight] = React.useState(0);

    return (
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa">
            <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
                <Heading as="h4" size="md">UPI</Heading>
                UPI is one of the most popular payment methods in India. There are many ways to pay using UPI - 
                you can either generate a QR code, an Intent link or send a request directly to customers UPI app.
                 <Box mb={4}></Box>
                Almost all of UPI payments are asynchronous in nature. It means that once you have raised the UPI
                request, you need to wait for the customer to approve the payment from their mobile phone. Below we will
                see how to raise each of these UPI requests. 
                
                <InputBox group={UPI_PAY_GROUP} inputDefault={"link"} 
                    key="channel" inputName="channel" 
                    inputParamKey="channel" inputValidator={ValidateUPIChannel}  />
                <InputBox group={UPI_PAY_GROUP} inputDefault={"9999999999@ybl"} 
                    key="upi_id" inputName="upi_id" 
                    inputParamKey="upi_id" inputValidator={ValidateUPIID}  />
                <Alert status="info" variant="subtle" mt={6}>
                <AlertIcon />
                <Text fontSize="sm">You need to pass the upi ID only when channel is set as <InlineCode>collect</InlineCode></Text>
                </Alert>    
            </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>   
        <UPIPayCode/>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4} mt={4}>  
        <Heading as="h5" size="sm">Response</Heading>
        The api response for each <InlineCode>channel</InlineCode> is different. The next action from the user is
        encapsulated in the response. 
             <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
                 pt={2} pb={2} pr={2} pl={2}
                 onMouseEnter={() => {setStartHighlight(2); setEndHighlight(18)}}
                 onMouseLeave={() => {setStartHighlight(0); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>channel == link</Heading> 
                <Text mb={4}>If channel is set as link, cashfree will return you UPI intent links which can be used on
                mobile devices. The generic intent link <InlineCode>upi://pay?pa=.....</InlineCode> is only supported in android.
                </Text>
                Every UPI app has a custom scheme which can be used for iOS devices. The easiest way to built intent flows
                is to use the `a` tag with `href` set to the link value. 
                <Code>&lt;a id="ios_gpay"
                    href="tez://upi/pay?pa=cashfree@yesbank&cu=INR&am=2&tr=1234&pn=Rohit&tn=test&mc=6011"&gt;
                    Click to Pay using Gpay&lt;/a&gt;</Code>
            </Box>
            <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
                 pt={2} pb={2} pr={2} pl={2}
                 onMouseEnter={() => {setStartHighlight(20); setEndHighlight(32)}}
                 onMouseLeave={() => {setStartHighlight(0); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>channel == link</Heading> 
            <Text mb={4}>If channel is set as qrcode, cashfree will return a UPI QR code which can be displayed
            to the customer. The customer can scan the QR code using any UPI application and complete the payment.
            Once the payment is completed we will send you a webhook notification with the payment status. 
            </Text>
            Use to img tag to display this qrcode. <Code>&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhE...." /&gt;</Code>
            </Box>   
            <Box mt={8} ml={4} mr={4} borderWidth="1px" borderRadius="lg" overflow="hidden"          
                 pt={2} pb={2} pr={2} pl={2}
                 onMouseEnter={() => {setStartHighlight(34); setEndHighlight(44)}}
                 onMouseLeave={() => {setStartHighlight(0); setEndHighlight(-1)}}>
              <Heading size="md" mb={4}>channel == collect</Heading> 
            <Text mb={4}>If channel is set as collect, Cashfree will directly send the UPI request to customers UPI app.
            The next step for the merchant is to call the /order api to get the order status. Alternatively, the
            merchant can also wait for a webhook to be received once customer approves the payment request. 
            </Text>
            If the merchant does not approve the UPI request, the merchant might not receive any webhook. However, 
            Cashfree has a provision to close out all payments after a configurable time, in which case the merchant
            will receive a webhook with USER_DROPPED payment status. 
            </Box>   
        </GridItem>         
        <GridItem rowSpan={2} colSpan={3} ml={6} mr={4}>  
            <PrismCode code={upiPayResponse} language="js" highlightStart={startHighlight} 
                highlightEnd={endHighlight} />
        </GridItem>
    </Grid>
    )
}


function OrderPay(props){
    const name = "order pay api"
    const description = "To complete the payment you can either use a prebuilt checkout or build your own" +
        " custom checkout. Follow the steps below to see how these can be done!"

    return (
    <Box bg="#fafafa">
      <Stepper activeIndex={1} stepDetails={stepData}/>
          <Box ml="4" mr="4">
            <Box pb={4}>
                <Heading pb={2} as="h2" size="xl">
                    <Badge variant="outline" colorScheme="blue"  fontSize="0.7em" mr={2}> 2 </Badge>
                    {name}
                </Heading>
            <Text fontSize="xl">{description}</Text>
            </Box>                
          </Box>
      <PrebuiltCheckout/>        
      <Divider />
      <CustomCheckout/>
      <Divider mt={2}/>
      <FooterNav prevPage="/create-order" nextPage="/return-order"/>
    </Box>
    )
}

export default OrderPay