import { Flex, Box, Text, Image } from "@chakra-ui/react";

import increase from "../../../assets/increase.png";

export const TrackingCard = () => {
  return (
    <Box p="4rem" borderRadius={"md"} width={"100%"} height="100%" mt={"8rem"}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="stretch" height="100%">
        <Flex flexDirection="column" alignItems="flex-start" flex="1" height="100%">
          <Flex flexDirection="column" alignItems="center" height="100%">
            <Image src={increase} alt="Increase" />
          </Flex>
        </Flex>

        <Flex justifyContent="flex-end" width="50%" height="100%" flex="1" mr={"5rem"}>
          <Box textAlign="center" maxW="65%" height="100%">
            <Text color="#1ABC9C" fontSize="2.5rem" fontWeight="700" textAlign="center" mb="2rem">
              Income & Expense Tracking
            </Text>
            <Text color="#ECF0F1" fontSize="1.8rem" fontWeight="400" mb="2rem">
              Easily log and categorize your transactions to understand where your money is going.
            </Text>
            <Text color="#ECF0F1" fontSize="1.8rem" fontWeight="400">
              Our intuitive interface makes it simple to stay on top of your finances.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};