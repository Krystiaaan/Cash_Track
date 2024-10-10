import { Formik, Field, Form, FieldProps } from "formik";
import * as yup from "yup";
import { Box, Flex, FormControl, FormErrorMessage, Input, VStack, Text, Button, Select } from "@chakra-ui/react";
import { useState } from "react";

const validationSchema = yup.object({
  username: yup.string().min(6, "Username must be at least 6 characters").required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Please confirm your password"),
  currency: yup.string().required("Currency is Required"),
});

export const RegisterCard = () => {
  const [isFocused, setIsFocused] = useState({ username: false, email: false, password: false, confirmPassword: false, currency: false });
  const [isEmpty, setIsEmpty] = useState({ username: true, email: true, password: true, confirmPassword: true, currency: true });

  const handleFocus = (field: string) => {
    setIsFocused((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (e: any, field: string) => {
    if (!e.target.value) {
      setIsFocused((prevState) => ({ ...prevState, [field]: false }));
      setIsEmpty((prevState) => ({ ...prevState, [field]: true }));
    }
  };

  const handleChange = (e: any, field: any, name: string) => {
    setIsEmpty((prevState) => ({ ...prevState, [name]: !e.target.value }));
    field.onChange(e);
  };

  return (
    <Flex justify={"center"} align={"center"} height={"100vh"}>
      <Box bg="#1ABC9C" p={8} borderRadius={"lg"} boxShadow={"lg"} width={"25rem"}>
        <Text fontSize={"4rem"} mb={"6"} fontWeight={"bold"} textAlign={"center"} color={"white"}>
          Register
        </Text>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            currency: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.resetForm();
          }}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form>
              <VStack spacing={8}> 
      
                <FormControl isInvalid={!!(errors.username && touched.username)}>
                  <Box position="relative" width="100%">
                    <Box
                      as="label"
                      htmlFor="username"
                      position="absolute"
                      top={isFocused.username || !isEmpty.username ? "-0.3rem" : "30%"}
                      left="12px"
                      fontSize={isFocused.username || !isEmpty.username ? "sm" : "md"}
                      color={isFocused.username ? "white" : "white"}
                      transform={isFocused.username || !isEmpty.username ? "translateY(-100%)" : "translateY(-50%)"}
                      transition="all 0.2s ease"
                      pointerEvents="none"
                      bg="#1ABC9C"
                    >
                      Your Username
                    </Box>
                    <Field name="username">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="username"
                          type="text"
                          placeholder={isFocused.username || !isEmpty.username ? "" : "Your Username"}
                          onFocus={() => handleFocus("username")}
                          onBlur={(e) => {
                            handleBlur(e, "username");
                            field.onBlur(e);
                          }}
                          value={field.value}
                          onChange={(e) => handleChange(e, field, "username")}
                          bg="#D9D9D9"
                          color="black"
                          borderRadius="full"
                          height="3rem"
                          _placeholder={{ color: "gray.400" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                {/* Email Field */}
                <FormControl isInvalid={!!(errors.email && touched.email)}>
                  <Box position="relative" width="100%">
                    <Box
                      as="label"
                      htmlFor="email"
                      position="absolute"
                      top={isFocused.email || !isEmpty.email ? "-0.3rem" : "30%"}
                      left="12px"
                      fontSize={isFocused.email || !isEmpty.email ? "sm" : "md"}
                      color={isFocused.email ? "white" : "white"}
                      transform={isFocused.email || !isEmpty.email ? "translateY(-100%)" : "translateY(-50%)"}
                      transition="all 0.2s ease"
                      pointerEvents="none"
                      bg="#1ABC9C"
                    >
                      Your Email
                    </Box>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder={isFocused.email || !isEmpty.email ? "" : "Your Email"}
                          onFocus={() => handleFocus("email")}
                          onBlur={(e) => {
                            handleBlur(e, "email");
                            field.onBlur(e);
                          }}
                          value={field.value}
                          onChange={(e) => handleChange(e, field, "email")}
                          bg="#D9D9D9"
                          color="black"
                          borderRadius="full"
                          height="3rem"
                          _placeholder={{ color: "gray.400" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                {/* Password Field */}
                <FormControl isInvalid={!!(errors.password && touched.password)}>
                  <Box position="relative" width="100%">
                    <Box
                      as="label"
                      htmlFor="password"
                      position="absolute"
                      top={isFocused.password || !isEmpty.password ? "-0.3rem" : "30%"}
                      left="12px"
                      fontSize={isFocused.password || !isEmpty.password ? "sm" : "md"}
                      color={isFocused.password ? "white" : "white"}
                      transform={isFocused.password || !isEmpty.password ? "translateY(-100%)" : "translateY(-50%)"}
                      transition="all 0.2s ease"
                      pointerEvents="none"
                      bg="#1ABC9C"
                    >
                      Your Password
                    </Box>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder={isFocused.password || !isEmpty.password ? "" : "Your Password"}
                          onFocus={() => handleFocus("password")}
                          onBlur={(e) => {
                            handleBlur(e, "password");
                            field.onBlur(e);
                          }}
                          value={field.value}
                          onChange={(e) => handleChange(e, field, "password")}
                          bg="#D9D9D9"
                          color="black"
                          borderRadius="full"
                          height="3rem"
                          _placeholder={{ color: "gray.400" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                {/* Confirm Password Field */}
                <FormControl isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}>
                  <Box position="relative" width="100%">
                    <Box
                      as="label"
                      htmlFor="confirmPassword"
                      position="absolute"
                      top={isFocused.confirmPassword || !isEmpty.confirmPassword ? "-0.3rem" : "30%"}
                      left="12px"
                      fontSize={isFocused.confirmPassword || !isEmpty.confirmPassword ? "sm" : "md"}
                      color={isFocused.confirmPassword ? "white" : "white"}
                      transform={isFocused.confirmPassword || !isEmpty.confirmPassword ? "translateY(-100%)" : "translateY(-50%)"}
                      transition="all 0.2s ease"
                      pointerEvents="none"
                      bg="#1ABC9C"
                    
                    >
                      Confirm Password
                    </Box>
                    <Field name="confirmPassword">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="confirmPassword"
                          type="password"
                          placeholder={isFocused.confirmPassword || !isEmpty.confirmPassword ? "" : "Confirm Password"}
                          onFocus={() => handleFocus("confirmPassword")}
                          onBlur={(e) => {
                            handleBlur(e, "confirmPassword");
                            field.onBlur(e);
                          }}
                          value={field.value}
                          onChange={(e) => handleChange(e, field, "confirmPassword")}
                          bg="#D9D9D9"
                          color="black"
                          borderRadius="full"
                          height="3rem"
                          _placeholder={{ color: "gray.400" }}
                        />
                      )}
                    </Field>
                  </Box>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>

                {/* Currency Field */}
                <FormControl isInvalid={!!(errors.currency && touched.currency)}>
                  <Box position="relative" width="100%">
                    <Box
                      as="label"
                      htmlFor="currency"
                      position="absolute"
                      top={isFocused.currency || !isEmpty.currency ? "-0.3rem" : "30%"}
                      left="12px"
                      fontSize={isFocused.currency || !isEmpty.currency ? "sm" : "md"}
                      color={isFocused.currency ? "white" : "white"}
                      transform={isFocused.currency || !isEmpty.currency ? "translateY(-100%)" : "translateY(-50%)"}
                      transition="all 0.2s ease"
                      pointerEvents="none"
                      bg="#1ABC9C"
                      px={1}
                    >
                      Your Currency
                    </Box>
                    <Field name="currency">
                      {({ field }: FieldProps) => (
                        <Select
                        {...field}
                        id="currency"
                        placeholder={isFocused.currency || !isEmpty.currency ? "" : "Your Currency"}
                        onFocus={() => handleFocus("currency")}
                        onBlur={(e) => {
                          handleBlur(e, "currency");
                          field.onBlur(e);
                        }}
                        value={field.value}
                        onChange={(e) => handleChange(e, field, "currency")}
                        bg="#D9D9D9"
                        color="black"
                        borderRadius="full"
                        height="3rem"
                        _placeholder={{ color: "gray.400" }}
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                      </Select>
                      )}
                    </Field>
                  </Box>
                  <FormErrorMessage>{errors.currency}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  bg={"#2C3E50"}
                  color={"white"}
                  width="100%"
                  height="3rem"
                  borderRadius="full"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
                <Text fontSize="sm" color="white">
                  Already have an account?{" "}
                  <Text as="span" color="#2C3E50" fontWeight="bold" cursor="pointer">
                    Login now!
                  </Text>
                </Text>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
