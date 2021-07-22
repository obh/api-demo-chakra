import React from 'react'
import {
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
    VStack,
  } from '@chakra-ui/react';
import Stepper from '../components/Stepper';
import {stepData} from './APIStepper'
import PrismCode from '../components/Prismcode';
import InlineCode from '../components/InlineCode';
import FooterNav from '../components/FooterNav';

function ReturnHandling(props){
    const paymentUrlCode = 
    `
> Request
curl --request GET 
    --url https://sandbox.cashfree.com/pg/orders/<your_order_id> 
    --header 'Content-Type: application/json' 
    --header 'x-api-version: 2021-05-22' 
    --header 'x-client-id: <app_id>' 
    --header 'x-client-secret: <secret_key>'
}
> Sample Response
{
  "cf_order_id": 1539553,
  "created_at": "2021-07-19T16:13:35+05:30",
  "customer_details": {
    "customer_id": "7112AAA812234",
    "customer_name": null,
    "customer_email": "john@cashfree.com",
    "customer_phone": "9908734801"
  },
  "entity": "order",
  "order_amount": 5.01,
  "order_currency": "INR",
  "order_expiry_time": "2021-08-18T16:13:34+05:30",
  "order_id": "order_271vWwzSQOHe01ZVXpEcguVxQSRqr",
  "order_meta": {
    "return_url": "https://b8af79f41056.eu.ngrok.io?order_id={order_id}&order_token={order_token}",
    "notify_url": "https://b8af79f41056.eu.ngrok.io/webhook.php",
    "payment_methods": null
  },
  "order_note": null,
  "order_status": "PAID",
  "order_token": "BtJEHHxOB9bFpNsaHmEL",
  "payment_link": "https://payments-test.cashfree.com/order/#BtJEHHxOB9bFpNsaHmEL",
  "payments": {
    "url": "https://sandbox.cashfree.com/pg/orders/order_271vWwzSQOHe01ZVXpEcguVxQSRqr/payments"
  },
  "refunds": {
    "url": "https://sandbox.cashfree.com/pg/orders/order_271vWwzSQOHe01ZVXpEcguVxQSRqr/refunds"
  },
  "settlements": {
    "url": "https://sandbox.cashfree.com/pg/orders/order_271vWwzSQOHe01ZVXpEcguVxQSRqr/settlements"
  }
}
`

    const name = "return url handling"
    const description = "All redirection based payment flows take the customer away from your website to the " +
        "banks website. However, after customers confirm the payment on the bank website, they will be redirected" +
        "back to your website. The customer will be redirected to the `return_url`. "

    return (
    <Box bg="#fafafa">
      <Stepper activeIndex={2} stepDetails={stepData}/>
          <Box ml="4" mr="4">
            <Box pb={4}>
                <Heading pb={2} as="h2" size="xl">
                    <Badge variant="outline" colorScheme="blue"  fontSize="0.7em" mr={2}> 3 </Badge>
                    {name}
                    <CircularProgress  ml={2} value={10} color="green.400" size="40px" thickness="6px">
                    <CircularProgressLabel>5 min</CircularProgressLabel>
                    </CircularProgress>
                </Heading>
            <Text fontSize="xl">{description}</Text>
            </Box>                            
        <Grid pt={8} templateColumns="repeat(6, 1fr)" gap={4} bg="#fafafa" >
            <GridItem ml={4} mr={2} rowSpan={2} colSpan={3}>
            <Box  pt={4} pl={2}>
            <VStack spacing="24 px">
                <Box>
                The merchant needs to pass the return url as part of the order creation API. If you
                do not pass the return url, Cashfree will redirect the customer to it's own thank you page.
                The return url format that you provide in order creation API must have two placeholders - order_id and
                order_token. </Box>
                <Box pt={4}>The customer will be redirected to this return_url by updating the order_id and order_token
                with specific values and using a GET request. Once you receive this request, you should check your database
                for the status of this order. If the order is not yet paid in your system, you should check 
                the /orders API to get the order status. </Box>
                <Alert status="info" variant="subtle" mt={6}>
                    <AlertIcon />
                    <Text fontSize="sm">A sample redirect_url can look something like this - 
                    https://merchantwebsite.com/cashfree?order_id=order_1234123&order_token=7yqw123df123</Text>
                </Alert>
            </VStack>
            <Text mt={4}>
            To get the order status you will need to query the /orders/:order_id endpoint. A simple HTTP GET request
            is required to get the order details. From the response you should match the <InlineCode>order_id</InlineCode>
            and use the <InlineCode>order_status</InlineCode> to confirm the payment. Note a succesfully processed order
            will have its order_status as "PAID". 
            
            </Text>
            </Box>
            </GridItem>
            <GridItem rowSpan={2} colSpan={3} mr={4}>
            <PrismCode code={paymentUrlCode} language="js" ></PrismCode></GridItem>
        </Grid>
        </Box>
        <FooterNav prevPage={"/pay-order"} nextPage={"/thankyou"}/>
    </Box>
    )
}

export default ReturnHandling