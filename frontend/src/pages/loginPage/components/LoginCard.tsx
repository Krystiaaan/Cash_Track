import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const LoginCard = () => {
    const [serverError, setServerError] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const handleCreateClick = () => {
        navigate("/register");
    }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Need to be a valid Email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setServerError({email: "", password: ""});
        try {
          const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            navigate("/mainpage");
          } else {
            const errors = data.errors || [];
            const emailError = errors.includes("User does not exist")
            ? "User does not exist" : "";
            const passwordError = errors.includes("Incorrect password")
            ? "Incorrect password"
            : "";
            setServerError({email: emailError, password: passwordError});
          }
        } catch (err) {
          console.error("login failed", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <VStack h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Form>
            <Box
              bg={"#1ABC9C"}
              width={"35rem"}
              height={"30rem"}
              p={4}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              textAlign={"center"}
              borderRadius={"2rem"}
            >
              <Heading mb={"3rem"} mt={"2rem"} color={"white"}>
                Login
              </Heading>
              {/*Email Field*/}
              <FormControl
                isInvalid={(formik.touched.email && !!formik.errors.email) || !!serverError.email}
                mb={"2rem"}
                position={"relative"}
              >
                <Box pos={"relative"}>
                  <Field
                    as={Input}
                    width={"25rem"}
                    borderRadius={"1.5rem"}
                    name="email"
                    className="peer"
                    placeholder=""
                    bg={"#D9D9D9"}
                  />
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
                <Box
                  position={"absolute"}
                  top={"100%"}
                  left={"0"}
                  width={"100%"}
                  mb={"1.5rem"}
                >
                  <FormErrorMessage
                    ml={"4.5rem"}
                    color={"red.500"}
                    fontSize={"sm"}
                  >
                    {formik.errors.email || serverError.email}
                  </FormErrorMessage>
                </Box>
              </FormControl>

              {/* Password Field*/}
              <FormControl
                isInvalid={(formik.touched.password && !!formik.errors.password) || !!serverError.password}
                mb={"2rem"}
                position={"relative"}
              >
                <Box pos={"relative"}>
                  <Field
                    as={Input}
                    width={"25rem"}
                    borderRadius={"1.5rem"}
                    name="password"
                    type="password"
                    className="peer"
                    placeholder=""
                    bg={"#D9D9D9"}
                  />
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
                <Box
                  position={"absolute"}
                  top={"100%"}
                  left={"0"}
                  width={"100%"}
                  mb={"1.5rem"}
                >
                  <FormErrorMessage
                    ml={"4.5rem"}
                    color={"red.500"}
                    fontSize={"sm"}
                  >
                    {formik.errors.password || serverError.password}
                  </FormErrorMessage>
                </Box>
              </FormControl>
              {/* Submit Button*/}
              <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  width={"25rem"}
                  minWidth={"25rem"}
                  borderRadius={"1.5rem"}
                  bg={"#2C3E50"}
                  color={"white"}
                  mb={"1rem"}
                  mt={"1rem"}
                  isLoading={formik.isSubmitting}
                >
                  Login
                </Button>
              </Box>
              <Text color={"white"}>
                Dont have an Account?{" "}
                <Text
                  as={"span"}
                  color={"#2C3E50"}
                  style={{ cursor: "pointer" }}
                  onClick={handleCreateClick}
                >
                  Create one now!
                </Text>
              </Text>
            </Box>
          </Form>
        </VStack>
      )}
    </Formik>
  );
};
