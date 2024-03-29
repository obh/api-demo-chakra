import {
  Box,
  Flex,
  Image,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Links = ['Dashboard', 'Projects', 'Team'];
const LinkMap = {
  'Payments API Guide' : '/',
}

function MyNavLink(props) {
  
  return (<>
      <Link px={2} py={1} rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={props.href}>{props.val}</Link></>)
}

function CNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Image src="https://cashfreelogo.cashfree.com/merchant/referrer/merchant.png"
              htmlWidth="150px" ></Image></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Object.keys(LinkMap).map((k) => 
                <MyNavLink key={k} val={k} href={LinkMap[k]}></MyNavLink>
              )}
              
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link px={2} py={1} rounded={'md'} isExternal href="https://merchant.cashfree.com" ><Button>Sign-In</Button></Link>
            <Link px={2} py={1} rounded={'md'} isExternal href="https://dev.cashfree.com"><Button>Docs</Button></Link>
          </Flex>
        </Flex>
      </Box>
        
      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}

export default CNavBar
