import { Text, Flex, Box, Image} from "@chakra-ui/react";
import location from "../../../assets/location.png";
import financial from "../../../assets/financial-profit.png";

export const WelcomeCard = () =>{
    return (
        <Box p="4rem" borderRadius={"md"} width={"100%"}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="stretch" height="100%">
          <Flex flexDirection="column" alignItems="flex-start" flex="1" height="100%">
            <Flex flexDirection="column" alignItems="center" height="100%" ml={"7rem"}>
              <Text color="#ECF0F1" fontSize="3em" fontWeight="700" textAlign="center">
                Welcome to
              </Text>
              <Text color="#1ABC9C" fontSize="4em" fontWeight="700" textAlign="center">
                Cash Track
              </Text>
            </Flex>
            <Image src={financial} alt="Financial Profit" ml={"2rem"}mt={"4rem"} />
          </Flex>
      
          <Flex justifyContent="flex-end" width="50%" height="100%" flex="1" mr={"5rem"}>
            <Box textAlign="center" maxW="65%" height="100%">
              <Text color="#ECF0F1" fontSize="2rem" fontWeight="500" mb="3rem">
                Take Control of Your Finances, Effortlessly.
              </Text>
              <Text color="#ECF0F1" fontSize="1.8rem" fontWeight="400" mt="1rem">
                Managing your money shouldn't be complicated. At{" "}
                <Text as="span" color="#1ABC9C" fontWeight="700">
                  Cash Track
                </Text>
                , we provide you with the tools you need to gain clarity, track your
                spending, and achieve your financial goals.
              </Text>
              <Text color="#1ABC9C" fontSize="2rem" pt="2rem" fontWeight="400">
                all in one place.
              </Text>
              <Image src={location} alt="Location" ml={"9rem"}mt={"5rem"} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
}