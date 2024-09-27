import {Text, Flex, Box, Image} from "@chakra-ui/react"


export const JoinCard = () => {
    return(
        <Box p={"4rem"} width={"100%"} mt={"8rem"}>
            <Flex flexDirection={"row"} width={"100%"} alignItems={"center"}>
            <Text color="#ECF0F1" fontSize="1.8rem" fontWeight="400" mt="1rem">
                Join{" "}
                <Text as="span" color="#1ABC9C" fontWeight="700">
                  Cash Track 
                </Text>
                 Today!
              </Text>
            </Flex>
            <Flex flexDirection={"row"} width={"100%"} alignItems={"center"}>
            
              <Text color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}>
                Start your journey towards financial freedom with a tool that simplifies money management.
              </Text>
              <Text color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}> Sign up now and see how easy it is to take control of your finances!</Text>
            </Flex>
        </Box>
    )
}