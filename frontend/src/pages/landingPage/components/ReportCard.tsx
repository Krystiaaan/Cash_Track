import { Text, Flex, Box, Image } from "@chakra-ui/react";

import business from "../../../assets/business-report.png"

export const ReportCard = () => {
  return (
    <Box p={"4rem"} width={"100%"} mt={"8rem"}>
        <Flex flexDirection={"row"} alignItems={"flex-start"} width={"100%"}>
          <Box alignItems={"center"} maxW={"35%"} height={"100%"}>
            <Text
              color="#1ABC9C"
              fontSize="2em"
              fontWeight="700"
              textAlign="center"
              mb={"2rem"}
            >
              Detailed Reports & Analytics
            </Text>
            <Text
              color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}
            >
              Dive deep into your financial data with custom repots and
              analytics. Identify trends, spot opportunities and make informed
              decisions.
            </Text>
          </Box>
          <Flex justifyContent="flex-end" flex={"1"}>
        <Image
            src={business}
            alt="Business report"
            mr={"4rem"}
            pos={"relative"}
            top={"-3rem"}
          />
        </Flex>
        </Flex>
        
    </Box>
  );
};
