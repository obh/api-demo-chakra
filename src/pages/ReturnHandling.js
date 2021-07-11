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
    Flex,
    Grid,
    GridItem,
    Heading,
    Link,
    Tag,
    TagLabel,
    Text,
    VStack,
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
import Stepper from '../components/Stepper';
import {stepData} from './CreateOrderData'
import { PrismCode } from '../components/Prismcode';

function ReturnHandling(props){
    const paymentUrlCode = 
    `{
..
  "payment_link": "https://payments.cashfree.com/order#AqtC88khqWACIEPcXGgO",
..
}`
    const name = "return url handling"
    const description = "All redirection based payment flows take the customer away from your website to the " +
        "banks website. However, after customers confirm the payment on the bank website, they will be redirected" +
        "back to your website. The customer will be redirected to the `return_url`. "
    const step = 1

    return (
    <Box bg="#fafafa">
      <Stepper activeIndex={1} stepDetails={stepData}/>
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
                <Box>The customer will be redirected to this return_url by updating the order_id and order_token
                with specific values and using a GET request. Once you receive this request, you must check your backend
                server for the status of this order. If the order is not yet paid in your system, you should check 
                the /orders API to get the order status. </Box>
                <Alert status="info" variant="subtle" mt={6}>
                    <AlertIcon />
                    <Text fontSize="sm">You need to redirect user to the payment_link url!</Text>
                </Alert>
            </VStack>
            </Box>
            </GridItem>
            <GridItem rowSpan={2} colSpan={3} mr={4}>
            <PrismCode code={paymentUrlCode} language="js" ></PrismCode></GridItem>
        </Grid>
        </Box>
    </Box>
    )
}

export default ReturnHandling