import React from 'react'
import {
  HStack,
  Button,
  Spacer
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {Link} from 'react-router-dom'

function FooterNav(props){
  const {prevPage, nextPage} = props

  return (
    <HStack ml={4} mr={4} mt={8}>
    {prevPage ? <Link to={prevPage}>
      <Button leftIcon={<ArrowBackIcon />} colorScheme="black" variant="outline">
        Previous Step
      </Button>
    </Link> : null}
    <Spacer/>
    {nextPage ? <Link to={nextPage}>
      <Button rightIcon={<ArrowForwardIcon />} colorScheme="black" variant="outline">
        Next Step
      </Button>
    </Link> : null}
    </HStack>
  )
}

export default FooterNav