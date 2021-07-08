import React from 'react'
import {    
    Box,
    Center,
    Flex,
    CircularProgress,
    Progress,
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
                    const isCompleted = index + 1 <= 1
                    console.log("in setpper loop, ", isCompleted, index, activeIndex)
                    return(
                        <>
                        <CircularProgress value={isCompleted ? 100 : 0} color="green.400">
                            <CircularProgressLabel>{index}</CircularProgressLabel>
                        </CircularProgress>
                        <Text color={index+1 == activeIndex ? "black": "gray"}>{element.title}</Text>
                        {maxLen != index + 1 ? 
                        <Progress value={isCompleted ? 100 : 0}  colorScheme="green" width="full" mx={5} />:null }
                        </>
                    )
                })}
            </Flex>
            
            <SimpleGrid columns={[2, null, 3]} spacing="40px">
            {stepDetails.map((element, index) => {
                return (<Box shadow="md" height="80px" align="left" paddingLeft={2} 
                    paddingRight={2} paddingTop={2}>
                    <Text color={index+1 == activeIndex ? "black": "gray"}>{element.description}</Text></Box>)
            })}
            </SimpleGrid>
        </Box>
        </Center>
    )
 }

export default Stepper;