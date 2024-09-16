import { Flex, Box, Text, Image } from "@chakra-ui/react";

export const TrackingCard = () => {
  return (
    <Box p="4rem" borderRadius={"md"} width={"100%"}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        mt={"5rem"}
      >
        
        <Text
              color="#1ABC9C"
              fontSize="1.8em"
              fontWeight="500"
              textAlign="center"
              mb={"2rem"}
            >Income & Expense Tracking
                </Text>
      </Flex>
    </Box>
  );
};
