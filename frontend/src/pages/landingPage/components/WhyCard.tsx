import { Text, Flex, Box, Image} from "@chakra-ui/react";
import dashboard from "../../../assets/dashboard.png";
import realtime from "../../../assets/real-time.png";

export const WhyCard = () => {
    return (
      <Box p="4rem" borderRadius={"md"} width={"100%"}>
        <Text
          color="#ECF0F1"
          fontSize="2em"
          fontWeight="700"
          textAlign="center"
        >
          Why Choose Cash Track?
        </Text>

        <Flex
          flexDirection="row" 
          justifyContent="space-between" 
          alignItems="center" 
          height="100%"
          mt={"5rem"}
        >
        <Flex flexDirection="column" alignItems="flex-start" flex="1" height="100%">
          <Box textAlign="center" maxW="35%" height="100%">
            <Text
              color="#1ABC9C"
              fontSize="1.8em"
              fontWeight="500"
              textAlign="center"
              mb={"2rem"}
            >
              Comprehensive Dashboard
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
            >
              Get a clear overview of your financial health at a glance. 
            </Text>
            <Text color="#ECF0F1" fontSize="1.8rem" fontWeight="400" mt="2rem">
            See your income, expenses, savings, and budget performance
            </Text>
            <Text color="#1ABC9C" fontSize="2rem" pt="2rem" fontWeight="400">
              all in real-time.
            </Text>
            <Image
              src={realtime}
              alt="Financial Profit"
              ml={"4rem"}
              mt={"2rem"}
            />
          </Box>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center">
          <Image
            src={dashboard}
            alt="Dashboard Overview"
            mr={"4rem"}
            pb={"2rem"}
          />
        </Flex>
        </Flex>
      </Box>
    );
}