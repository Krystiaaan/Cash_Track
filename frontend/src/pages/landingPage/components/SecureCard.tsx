import { Flex, Box, Text, Image } from "@chakra-ui/react";

import verified from "../../../assets/verified.png"
export const SecureCard = () => {
  return (
    <Box p={"4rem"} width={"100%"} mt={"8rem"}>
      <Flex
        flexDirection={"row"}
        alignItems={"center"}
        width={"100%"}
        
      >
        <Flex flexDirection="column" alignItems="flex-start" height="100%">
            <Image src={verified} alt="Verified" />
          </Flex>
        <Flex flexDirection={"column"} alignItems={"flex-end"} width={"100%"} mr={"4rem"}>
          <Box alignItems={"center"} maxW={"35%"} height={"100%"}>
            <Text
              color="#1ABC9C"
              fontSize="2em"
              fontWeight="700"
              textAlign="center"
              mb={"2rem"}
            >
              Secure & Private
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}
            >
              Your data security is our top priority
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
            >
              We use state-of-the-art encryption to ensure your financial
              information is always safe.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
