import { Text, Divider, Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MainMenuProps } from "../../interfaces/MainPageInterface";
import { FuncCard } from "./FuncCard";
import Draggable from "react-draggable";
import { CreateCardModal } from "./CreateCardModal"; 

export const MainCard = ({ user }: MainMenuProps) => {
  const [currentDate, setCurrentDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // State to store fetched data from CreateCardModal
  const [fetchedData, setFetchedData] = useState<{ type: string; data: any }[]>([]);


  useEffect(() => {
    const formatDate = () => {
      const today = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(today);
      setCurrentDate(formattedDate);
    };
    formatDate();
  }, []);

  // Function to handle setting the fetched data from the modal
  const handleFetchedData = (data: any, item: string) => {
    const newCard = { type: item, data: Array.isArray(data) ? data : [data] };
  
    setFetchedData((prev) => {
      const updatedData = [...prev, newCard];
      localStorage.setItem("fetchedData", JSON.stringify(updatedData)); // Speichern im Local Storage
      return updatedData;
    });
  };
  useEffect(() => {
    const storedData = localStorage.getItem("fetchedData");
    if (storedData) {
      setFetchedData(JSON.parse(storedData));
    }
  }, []);
  return (
    <Box flex={1}>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mx="2rem" mt="0.5rem">
          <Text color="white" fontSize="xl">
            Hey, {user.username}!
          </Text>
          <Text cursor="pointer" color="white" fontSize="xl" onClick={onOpen}>
            Create your Card
          </Text>
        </Box>
        <Text ml={"2rem"} mt={"0.5rem"} color={"gray.400"} fontSize={"l"}>
          {currentDate}
        </Text>
        <Divider borderColor="#34495E" borderWidth={"0.0625rem"} mt={"0.4rem"} ml={"2rem"} width={"96%"} />
      </Box>

      <Box width={"83%"} pos={"absolute"} height={"91%"} overflow={"hidden"}>
  {fetchedData.map((card, index) => (
    <Draggable key={index} bounds="parent">
      <Box pos={"absolute"}>
        <FuncCard fetchedData={card.data} type={card.type} />
      </Box>
    </Draggable>
  ))}
</Box>

      <CreateCardModal isOpen={isOpen} onClose={onClose} user={user} onFetchedData={handleFetchedData} />
    </Box>
  );
};
