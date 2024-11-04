import {
  Box,
  Flex,
  VStack,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  Avatar,
  
} from "@chakra-ui/react";
import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../Auth/AuthProvider";
export const MainCard = () => {
    const { user } = useAuth();
    console.log(user);
  return (
    <Box
      bg={"#1ABC9C"}
      color={"white"}
      w={"300px"}
      h={"100vh"}
      p={"4"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      borderRightRadius={"1.6rem"}
    >
      <VStack align={"start"}>  
      {/* Header with user info */}
        <Flex align={"center"}>
          <Box ml={"3"}>
            <Text fontWeight={"bold"}>{user?.username}</Text>
            <Text fontSize={"sm"}>{user?.email}</Text>
          </Box>
        </Flex>
        <Divider
          borderColor="#34495E"
          borderWidth={"0.0625rem"}
          mt={"0.5rem"}
        />
        <Box w={"80%"} alignSelf={"center"} mt={"2rem"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="white" />}
            />
            <Input
              placeholder="Search"
              bg={"#C0BFBF"}
              _placeholder={{ color: "#808080" }}
              rounded={"md"}
              py={"2"}
              px={"3"}
              border={"none"}
              borderRadius={"1.6rem"}
            />
          </InputGroup>
        </Box>
        <VStack align={"start"} spacing={"3"}  ml={"3rem"} mt={"2rem"}>
            {['Dashboard', 'Accounts','Transactions','Budget', 'Saving Goals', 'Reports', 'Notifications'].map((item) =>(
                <Text
                key={item}
                cursor={"pointer"}
                _hover={{color: 'teal.600', px:"2"}}
                w={"full"}
                py={"1"}
                >
                    {item}
                </Text>
            ))}
        </VStack>
        
      </VStack> 
      <Divider
          borderColor="#34495E"
          borderWidth={"0.0625rem"}
          mt={"auto"}
        />
        <Box alignSelf={"center"}>
            <Flex flexDirection={"column"}>

           <IconButton 
           icon={<Avatar size={"xs"} />}
           aria-label="User Profile"
           variant={"ghost"}
           color={"white"}
           _hover={{  transform: "scale(1.2)", bg: "transparent" }} 
           transition={"transform 0.2s"}  
           />
           <IconButton 
           icon={<SettingsIcon />}
           aria-label="Settings"
           variant={"ghost"}
           color={"white"}     
           _hover={{ transform: "scale(1.2)", bg: "transparent" }} 
           transition={"transform 0.2s"}  
           />
           </Flex>
            </Box>
    </Box>
  );
};
