import React from 'react'
import {
  HStack,
  Link,
  Button,
  Spacer
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

function FooterNav(props){
  const {prevPage, nextPage} = props

  return (
    <HStack ml={4} mr={4} mt={8}>
    {prevPage ? <Link href={prevPage}>
      <Button leftIcon={<ArrowBackIcon />} colorScheme="black" variant="outline">
        Previous Step
      </Button>
    </Link> : null}
    <Spacer/>
    {nextPage ? <Link href={nextPage}>
      <Button rightIcon={<ArrowForwardIcon />} colorScheme="black" variant="outline">
        Next Step
      </Button>
    </Link> : null}
    </HStack>
  )
}

export default FooterNav