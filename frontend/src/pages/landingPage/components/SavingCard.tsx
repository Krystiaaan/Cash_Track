import { Text, Flex, Image, Box } from "@chakra-ui/react";

import invesment from "../../../assets/invesment.png"

export const SavingCard = () => {
  return (
    <Box p={"4rem"} height={"100%"} mt={"8rem"}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="stretch" height="100%">
        <Flex flexDirection="column" alignItems="flex-start" flex="1" height="100%">
          <Flex flexDirection="column" alignItems="flex-start" height="100%">
            <Image src={invesment} alt="Invesment"pos={"relative"} top={"-3rem"} />
          </Flex>
        </Flex>

        <Flex justifyContent="flex-end" width="50%" height="100%" flex="1" mr={"5rem"}>
          <Box textAlign={"center"} maxW={"65%"} height={"100%"} >
            <Text
              color="#1ABC9C"
              fontSize="2em"
              fontWeight="700"
              textAlign="center"
              mb={"2rem"}
            >
              Savings Goals
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}
            >
              Dream big, save bigger.
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}
            >
              Whether you're planning a vacation, buying a car, or building an
              emergency fund, our goal-setting feature helps you stay on track.
            </Text>
          </Box>
        </Flex>
        
      </Flex>
    </Box>
  );
};
