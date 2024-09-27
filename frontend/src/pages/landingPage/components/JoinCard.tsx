import {Text, Flex, Box, Image} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import signup from "../../../assets/signup.png"

export const JoinCard = () => {
  const navigate = useNavigate();

  const handleImageClick = () =>{
    navigate("/register");
  }
    return(
        <Box p={"4rem"} width={"100%"} mt={"8rem"}>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
            <Text color="#ECF0F1" fontSize="5rem" fontWeight="400" mb="2rem">
                Join{" "}
                <Text as="span" color="#1ABC9C" fontWeight="700">
                  Cash Track {" "}
                </Text>
                 Today!
              </Text>
              <Flex flexDirection={"row"} width={"100%"} alignItems={"center"}>
            </Flex>
              <Text color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center">
                Start your journey towards financial freedom with a tool that simplifies money management.
              </Text>
              <Text color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}> Sign up now and see how easy it is to take control of your finances!</Text>
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} alignItems={"center"}>
              <Image src={signup} alt="Signup button" onClick={handleImageClick} style={{ cursor: "pointer" }} />
              </Flex>
              <Text color="#ECF0F1"
              fontSize="1.8em"
              fontWeight="400"
              textAlign="center"
              mb={"2rem"}>Or {" "}<Text as="span" color="#1ABC9C" fontWeight="700">
              Login {" "}
            </Text>
              if you already have an account.
             </Text>
        </Box>
    )
}