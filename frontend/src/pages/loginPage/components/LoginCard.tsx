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
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

export const LoginCard = () => {
    return (
        <Formik
        initialValues={{
            email: "",
            password:"",
        }}
        validationSchema={Yup.object({
        email: Yup.string()
          .email("Need to be a valid Email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password needs to be at least 6 characters"),
        })}
        onSubmit={async(values, {setSubmitting}) => {
            try {
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values.email,
                        passwordHash: values.password,
                    }),
                });
                if(response.ok){
                    alert("login successfull!");
                }
            }catch(err) {
                console.error("login failed", err);
            }finally {
                setSubmitting(false);
            }
        }}
        >
            
        </Formik>
    )
}