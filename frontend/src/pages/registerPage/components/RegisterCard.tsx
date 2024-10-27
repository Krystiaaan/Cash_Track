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
import { useNavigate } from "react-router-dom";
export const RegisterCard = () => {
const navigate = useNavigate();

const handleLoginClick = () => {
  navigate("/login");
}

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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              passwordHash: values.password,
              currency: values.currency,
            }),
          });
          if (response.ok) {
            alert("Registration successful!");
          }else {
            const errorData : {errors?: string[]} = await response.json();
            if(errorData.errors){
              const formErrors: { email?: string; username?: string } = {};
              errorData.errors.forEach((error: string) => {
                if (error.includes("Email")) formErrors.email = "This email is already in use.";
                if (error.includes("Username")) formErrors.username = "This username is already taken.";
              });
              setErrors(formErrors);
            }
          }
        } catch (err) {
          console.error("Registration failed:", err);
        } finally {
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
              <Heading mb={"3rem"} mt={"2rem"} color={"white"}>
                Register
              </Heading>

              {/* Username Field */}
              <FormControl isInvalid={formik.touched.username && !!formik.errors.username} mb="2rem" position="relative">
                <Box pos="relative">
                  <Field as={Input}  width={"25rem"} borderRadius={"1.5rem"} name="username" className="peer" placeholder="" bg={"#D9D9D9"} />
                  <FormLabel
                    sx={{
                      pos: "absolute",
                      px: "4rem",
                      top: "-7",
                      fontWeight: "normal",
                      transition: "0.2s",
                      insetStart: "2",
                      _peerPlaceholderShown: {
                        color: "black",
                        top: "2.5",
                        insetStart: "2",
                      },
                      _peerFocusVisible: {
                        color: "black",
                        top: "-7",
                        insetStart: "2",
                      },
                    }}
                  >
                    Enter your Username:
                  </FormLabel>
                </Box>
                <Box position="absolute" top="100%" left="0" width="100%" mb="1.5rem">
                <FormErrorMessage ml="4.5rem" color="red.500" fontSize="sm">{formik.errors.username}</FormErrorMessage>
                </Box>
              </FormControl>

              {/* Email Field */}
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email} mb="2rem" position="relative">
                <Box pos="relative">
                  <Field as={Input} width={"25rem"} borderRadius={"1.5rem"} name="email" className="peer" placeholder="" bg={"#D9D9D9"} />
                  <FormLabel
                    sx={{
                      pos: "absolute",
                      px: "4rem",
                      top: "-7",
                      fontWeight: "normal",
                      transition: "0.2s",
                      insetStart: "2",
                      _peerPlaceholderShown: {
                        color: "black",
                        top: "2.5",
                        insetStart: "2",
                      },
                      _peerFocusVisible: {
                        color: "black",
                        top: "-7",
                        insetStart: "2",
                      },
                    }}
                  >
                    Enter your Email:
                  </FormLabel>
                </Box>
                <Box position="absolute" top="100%" left="0" width="100%" mt="0.5rem">
                <FormErrorMessage ml="4.5rem" color="red.500" fontSize="sm">{formik.errors.email}</FormErrorMessage>
                </Box>
              </FormControl>

              {/* Password Field */}
              <FormControl isInvalid={formik.touched.password && !!formik.errors.password} mb="2rem" position="relative">
                <Box pos="relative">
                  <Field as={Input} width={"25rem"} borderRadius={"1.5rem"} name="password" type="password" className="peer" placeholder="" bg={"#D9D9D9"} />
                  <FormLabel
                    sx={{
                      pos: "absolute",
                      px: "4rem",
                      top: "-7",
                      fontWeight: "normal",
                      transition: "0.2s",
                      insetStart: "2",
                      _peerPlaceholderShown: {
                        color: "black",
                        top: "2.5",
                        insetStart: "2",
                      },
                      _peerFocusVisible: {
                        color: "black",
                        top: "-7",
                        insetStart: "2",
                      },
                    }}
                  >
                    Enter your Password:
                  </FormLabel>
                </Box>
                <Box position="absolute" top="100%" left="0" width="100%" mt="0.5rem">
                <FormErrorMessage ml="4.5rem" color="red.500" fontSize="sm">{formik.errors.password}</FormErrorMessage>
                </Box>
              </FormControl>

              {/* Confirm Password Field */}
              <FormControl isInvalid={formik.touched.conf_pass && !!formik.errors.conf_pass} mb="2rem" position="relative">
                <Box pos="relative">
                  <Field as={Input} width={"25rem"} borderRadius={"1.5rem"} name="conf_pass" type="password" className="peer" placeholder="" bg={"#D9D9D9"} />
                  <FormLabel
                    sx={{
                      pos: "absolute",
                      px: "4rem",
                      top: "-7",
                      fontWeight: "normal",
                      transition: "0.2s",
                      insetStart: "2",
                      _peerPlaceholderShown: {
                        color: "black",
                        top: "2.5",
                        insetStart: "2",
                      },
                      _peerFocusVisible: {
                        color: "black",
                        top: "-7",
                        insetStart: "2",
                      },
                    }}
                  >
                    Confirm your Password:
                  </FormLabel>
                </Box>
                <Box position="absolute" top="100%" left="0" width="100%" mt="0.5rem">
                <FormErrorMessage ml="4.5rem" color="red.500" fontSize="sm">{formik.errors.conf_pass}</FormErrorMessage>
                </Box>
              </FormControl>

              {/* Currency Field */}
              <FormControl isInvalid={formik.touched.currency && !!formik.errors.currency} mb="2rem" position="relative">
                <Field
                  name="currency"
                  as={Select}
                  placeholder="Select your Currency"
                  bg={"#D9D9D9"}
                  borderRadius={"1.5rem"}
                  width={"25rem"}
                  textAlign={"center"}
                  ml={"4rem"}
                >
                  <option value="Eur">EUR</option>
                  <option value="Usd">USD</option>
                </Field>
                <Box position="absolute" top="100%" left="0" width="100%" mt="0.5rem">
                <FormErrorMessage ml="4.5rem" color="red.500" fontSize="sm">{formik.errors.currency}</FormErrorMessage>
                </Box>
              </FormControl>

              {/* Submit Button */}
              <Box width="100%" display="flex" justifyContent="center">
                <Button
                  type="submit"
                  width={"25rem"}
                  minWidth={"25rem"}
                  borderRadius={"1.5rem"}
                  bg={"#2C3E50"}
                  color={"white"}
                  mb="1rem"
                  mt={"1rem"}
                  isLoading={formik.isSubmitting}
                >
                  Register
                </Button>
              </Box>

              <Text color={"white"}>
                Already have an Account?{" "}
                <Text as={"span"} color={"#2C3E50"} style={{ cursor: "pointer" }} onClick={handleLoginClick}>
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
