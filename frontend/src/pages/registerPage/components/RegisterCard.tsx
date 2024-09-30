import { Formik, Field } from "formik"
import * as yup from "yup";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Input, VStack} from "@chakra-ui/react";
export const RegisterCard = () => {
  const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    username: yup.string().min(3, 'must be at least 3 characters long').required("Required"),
    password: yup.string().min(6, 'must be at least 6 characters long').required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Paswords must match").required("Required"),
    currency: yup.string().min(3, "Currency must be a 3-letter code").required("Required"),
  });
  return(
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <Box bg="cash.green" p={6} rounded={"md"} w={"128"}>
        <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          currency: "",
        }}
        validationSchema={basicSchema}
        onSubmit={(values)=>{
          alert(JSON.stringify(values, null, 2));
        }}
        >
          {({handleSubmit, errors, touched}) =>(
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align={"flex-start"}>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                  as={Input}
                  id="username"
                  name="username"
                  type="username"
                  variant="filled"/>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  validate={(value:string)=>{
                    let error;

                    if(value.length < 6){
                      error = "Password must contain at least 6 characters";
                    }
                    return error;
                  }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  variant="confirmPassword"
                  validate={(value:string)=>{
                    let error;

                    if(value.length < 6){
                      error = "Password must contain at least 6 characters";
                    }
                    return error;
                  }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="currency">Currency</FormLabel>
                  <Field
                  as={Input}
                  id="currency"
                  name="currency"
                  type="currency"
                  variant="filled"/>
                </FormControl>
                <Button type="submit" color={"white"} bg="cash.bg" width={"full"}>Register</Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}