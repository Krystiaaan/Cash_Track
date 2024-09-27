import { Text, Flex, Box, Image } from "@chakra-ui/react";
import cash from "../../../assets/cash-flow.png"
export const BudgetCard = () => {
  return (
    <Box p={"4rem"} width={"100%"}>
      <Flex flexDirection={"row"} alignItems={"center"} height={"100%"} mt={"8rem"}>
        <Flex
          flexDirection={"column"}
          alignItems={"flex-start"}
          height={"100%"}
    
        >
          <Box textAlign={"center"} maxW={"35%"} height={"100%"}>
            <Text
              color="#1ABC9C"
              fontSize="2em"
              fontWeight="700"
              textAlign="center"
              mb={"2rem"}
            >
              Budget Management
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}
            >
              Set personalized budgets and stay within your limits.
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
            >
              Our alerts will notify you when you're nearing your budget cap,
              helping you spend wisely.
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center">
        <Image
            src={cash}
            alt="Cash flow"
            mr={"4rem"}
            pos={"relative"}
            top={"-7rem"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
