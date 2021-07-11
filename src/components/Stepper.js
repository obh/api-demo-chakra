import React from 'react'
import {    
    Box,
    Center,
    Flex,
    CircularProgress,
    Progress,
    HStack,
    Text,
    Link,
    LinkOverlay,
    SimpleGrid,
    CircularProgressLabel
 } from '@chakra-ui/react'

 function Stepper(props){
    const  {activeIndex, stepDetails} = props;    
    const maxLen = stepDetails.length
    return (
        <Center bg="#fafafa">
        <Box ml={12} mr={12} mt={12} mb={8} align="center" w="800px">
            <Flex justify="center" align="center" mb={4}>           
                {stepDetails.map((element, index) => {
                    //console.log("stepper loop: ", activeIndex, index, activeIndex <= index)
                    return(
                        <HStack>
                        <CircularProgress value={index <= activeIndex ? 100 : 0} color="green.400">
                            {/* because array index starts from 0 and not 1 */}
                            <CircularProgressLabel>{index + 1}</CircularProgressLabel>
                        </CircularProgress>
                        {/* <Text color={index == activeIndex ? "black": "gray"}>{element.title}</Text> */}
                        {maxLen != index + 1 ? 
                        <Progress value={index < activeIndex ? 100 : 0}  colorScheme="green" 
                            width="150px" />:null }
                        </HStack>
                    )
                })}
            </Flex>
            
            <SimpleGrid columns={[2, null, 3]} spacing="40px">
            {stepDetails.map((element, index) => {
                return (<Box key={index} height="80px" align="left" paddingLeft={2} 
                    paddingRight={2} paddingTop={2}>
                    <Text color={index == activeIndex ? "black": "gray"}>{element.description}</Text></Box>)
            })}
            </SimpleGrid>
        </Box>
        </Center>
    )
 }

export default Stepper;