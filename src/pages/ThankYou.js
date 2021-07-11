import React from 'react'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
} from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';

const checklist = [
    {
        "id": 0,
        "title": "Authentication" ,
        "text": "Never expose your secret key on the client side - be it an app or a website!",
    },
    {
        "id": 1,
        "title": "Credentials" ,
        "text": "Make sure to use only your production credentials in production setting! Never share them with anyone",
    },
    {
        "id": 2,
        "title": "Webhook" ,
        "text": "Do test your webhook endpoint. Also verify the webhook signature for every request" + 
            "You can also enable webhooks for failed and dropped payments by contacting techsupport.",
    },
    {
        "id": 3,
        "title": "Webhook idempotency" ,
        "text": "Webhook handler should be idempotent, as you might receive multiple requests for a payment"
    },
    {
        "id": 4,
        "title": "Confirming payment" ,
        "text": "In addition to using the webhook, we strongly suggest you call the /orders endpoint before confirming every order.",
    }
]

function ThankYou(){
    return (
        <Box p={4}>
          <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={'3xl'}>This is the headline</Heading>
            <Text color={'gray.600'} fontSize={'xl'}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua.
            </Text>
          </Stack>
    
          <Container maxW={'6xl'} mt={10}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {checklist.map((item) => (
                <HStack key={item.id} align={'top'}>
                  <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>{item.title}</Text>
                    <Text color={'gray.600'}>{item.text}</Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      );
}

export default ThankYou