import {
  Box,
  Flex,
  VStack,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Avatar,
  
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { MainModal } from "./MainModal";
import {MainMenuProps } from "../../interfaces/MainPageInterface";

export const MainMenu = ({user} : MainMenuProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(true);
  }
  const handleClose = () => setIsOpen(false);
  const handleSubmit = async (data: Record<string,any>) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/${selectedItem?.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          user_id: user.id,
        }),
      });
      if(!response.ok){
        throw new Error (`Failed to create ${selectedItem}`);
      }
      alert(`${selectedItem} wurde erfolgreich erstellt!`);
      handleClose();

    }catch(error) {
      console.error(error);
      alert("error on creating");
    }
  }
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
                onClick={() => handleItemClick(item)}
                >
                    {item}
                </Text>
            ))}
        </VStack>
        <MainModal
        title={selectedItem || ''}
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
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
