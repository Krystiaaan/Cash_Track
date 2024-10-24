import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Select,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const RegisterCard = () => {
  
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        conf_pass: "",
        currency: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username is required")
          .min(6, "Username needs to be at least 6 characters"),
        email: Yup.string()
          .email("Need to be a valid Email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password needs to be at least 6 characters"),
        conf_pass: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match"
        ),
        currency: Yup.string()
          .oneOf(["Eur", "Usd"], "Currency must be either EUR or USD")
          .required("Currency is required"),
      })}
      onSubmit={async (values, {setSubmitting}) => {
        try {
          const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email:values.email,
              passwordHash: values.password,
              currency: values.currency,
            }),
          });
          if(response.ok){
            alert("Registration successful!");
          }
        } catch (err){
          console.error("Registration failed:", err);
        }finally{
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <VStack h="100vh" justifyContent="center" alignItems="center">
          <Form>
            <Box
              bg={"#1ABC9C"}
              width={"35rem"}
              height={"40rem"}
              p={4}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              textAlign={"center"}
              borderRadius={"2rem"}
            >
              <Heading mb={2} mt={"2rem"} color={"white"}>
                Register
              </Heading>

              {/* Username Field */}
              <FormControl
                isInvalid={formik.touched.username && !!formik.errors.username}
              >
                <FormLabel></FormLabel>
                <Field
                  name="username"
                  as={Input}
                  placeholder="Your Username"
                  bg={"#D9D9D9"}
                  width={"25rem"}
                  borderRadius={"1.5rem"}
                  textAlign="center"
                  mb="1.5rem"
                  mt="2rem"
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              {/* Email Field */}
              <FormControl
                isInvalid={formik.touched.email && !!formik.errors.email}
              >
                <FormLabel></FormLabel>
                <Field
                  name="email"
                  as={Input}
                  placeholder="Your Email"
                  bg={"#D9D9D9"}
                  width={"25rem"}
                  borderRadius={"1.5rem"}
                  textAlign={"center"}
                  mb="1.5rem"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              {/* Password Field */}
              <FormControl
                isInvalid={formik.touched.password && !!formik.errors.password}
              >
                <FormLabel></FormLabel>
                <Field
                  name="password"
                  as={Input}
                  placeholder="Your Password"
                  type="password"
                  bg={"#D9D9D9"}
                  width={"25rem"}
                  borderRadius={"1.5rem"}
                  textAlign={"center"}
                  mb="1.5rem"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              {/* Confirm Password Field */}
              <FormControl
                isInvalid={
                  formik.touched.conf_pass && !!formik.errors.conf_pass
                }
              >
                <FormLabel></FormLabel>
                <Field
                  name="conf_pass"
                  as={Input}
                  placeholder="Confirm your Password"
                  type="password"
                  bg={"#D9D9D9"}
                  width={"25rem"}
                  borderRadius={"1.5rem"}
                  textAlign={"center"}
                  mb="1.5rem"
                />
                <FormErrorMessage>{formik.errors.conf_pass}</FormErrorMessage>
              </FormControl>

              {/* Currency Field */}
              <FormControl
                isInvalid={formik.touched.currency && !!formik.errors.currency}
              >
                <FormLabel></FormLabel>
                <Field
                  name="currency"
                  as={Select}
                  placeholder="Select your Currency"
                  bg={"#D9D9D9"}
                  width={"25rem"}
                  borderRadius={"1.5rem"}
                  mx="auto"
                  mb="1.5rem"
                >
                  <option value="Eur">EUR</option>
                  <option value="Usd">USD</option>
                </Field>
                <FormErrorMessage>{formik.errors.currency}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button
                value="Register"
                type="submit"
                width={"25rem"}
                borderRadius={"1.5rem"}
                bg={"#2C3E50"}
                color={"white"}
                mb="1rem"
                isLoading={formik.isSubmitting}
              >
                Register
              </Button>
                
              <Text color={"white"}>
                Already have an Account?{" "}
                <Text as={"span"} color={"#2C3E50"} style={{ cursor: "pointer" }}>
                  Login now!
                </Text>
              </Text>
            </Box>
          </Form>
        </VStack>
      )}
    </Formik>
  );
};