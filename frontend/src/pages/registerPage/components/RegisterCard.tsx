import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";

export const RegisterCard = () => {
  return (
    <VStack h="100vh" justifyContent="center" alignItems="center">
      <Box
        bg={"#1ABC9C"}
        width={"35rem"}
        height={"35rem"}
        p={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        textAlign={"center"}
        borderRadius={"2rem"}
      >
        <Heading size="md" mb={2} mt={"2rem"}>
          Register
        </Heading>
        <FormControl>
          <FormLabel></FormLabel>
          <Input
            name="username"
            placeholder="Your Username"
            bg={"#D9D9D9"}
            width={"20rem"}
            borderRadius={"1rem"}
            textAlign="center"
            mb="1.5rem"
            mt="2rem"
          />
        </FormControl>
        <FormControl>
          <FormLabel></FormLabel>
          <Input 
          name="email"
          placeholder="Your Email"
          bg={"#D9D9D9"}
          width={"20rem"}
          borderRadius={"1rem"}
          textAlign={"center"}
          mb="1.5rem"/>
        </FormControl>
        <FormControl>
          <FormLabel></FormLabel>
          <Input 
          name="password"
          placeholder="Your Password"
          type="password"
          bg={"#D9D9D9"}
          width={"20rem"}
          borderRadius={"1rem"}
          textAlign={"center"}
          mb="1.5rem"
          />
        </FormControl>
        <FormControl>
          <FormLabel></FormLabel>
          <Input 
          name="confirmPassword"
          placeholder="Confirm your Password"
          type="password"
          bg={"#D9D9D9"}
          width={"20rem"}
          borderRadius={"1rem"}
          textAlign={"center"}
          mb={"1.5rem"}
          />
        </FormControl>
        <FormControl>
          <FormLabel></FormLabel>
          <Select placeholder="Select your Currency"
          name="currency"
          bg={"#D9D9D9"}
          width={"20rem"}
          borderRadius={"1rem"}
          mx="auto"
          mb={"1.5rem"}>
              <option value='eur'>EUR</option>
              <option value='usd'>USD</option>
          </Select>
        </FormControl>
        <Button value ="Register" type="submit" width={"20rem"} borderRadius={"1rem"}>Register</Button>
      </Box>
    </VStack>
  );
};
