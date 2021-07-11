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
import {stepData} from './CreateOrderData'
import PrismCode from '../components/Prismcode';
import InlineCode from '../components/InlineCode';
import FooterNav from '../components/FooterNav';

function ReturnHandling(props){
    const paymentUrlCode = 
    `
> Request
curl --request GET 
    --url https://next.cashfree.com/api/v1/orders/<your_order_id> 
    --header 'Content-Type: application/json' 
    --header 'x-api-version: 2021-05-22' 
    --header 'x-client-id: <app_id>' 
    --header 'x-client-secret: <secret_key>'
}
> Sample Response
{
    "cf_order_id": 497346692,
    "created_at": "2021-07-05T18:00:34+05:30",
    "customer_details": {
      "customer_id": "8474090552",
      "customer_name": "Shari Gottlieb",
      "customer_email": "mani@cashfree.com",
      "customer_phone": "8474090552"
    },
    "entity": "order",
    "order_amount": 23.12,
    "order_currency": "INR",
    "order_expiry_time": "2021-07-06T16:10:44+05:30",
    "order_id": "order_18481utcGyOSFbFU8o9t8NpEU6tCkTD",
    "order_meta": {
      "return_url": "https://f54a59be8f4e.ngrok.io/pr/return.php?env=PROD&order_id={order_id}&token={order_token}",
      "notify_url": "https://f54a59be8f4e.ngrok.io/pr/return.php?env=PROD",
      "payment_methods": null
    },
    "order_reason": "some order note here",
    "order_status": "PAID",
    "order_token": "TTb06dKJGhWa20VTcm1n",
    "payment_attempts": {
      "url": "https://prod.cashfree.com/pgbillpaywebapp/#/api/v1/payments?order_id=order_18481utcGyOSFbFU8o9t8NpEU6tCkTD"
    },
    "settlement_details": {
      "url": "https://prod.cashfree.com/pgnextgenapi-test/api/v1/settlements?order_id=order_18481utcGyOSFbFU8o9t8NpEU6tCkTD"
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
        <FooterNav nextPage={"/thankyou"}/>
    </Box>
    )
}

export default ReturnHandling