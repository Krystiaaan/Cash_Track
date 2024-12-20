import { Text, Divider, Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { MainMenuProps } from "../../interfaces/MainPageInterface";
import { FuncCard } from "./FuncCard";
import { CreateCardModal } from "./CreateCardModal";

export const MainCard = ({ user }: MainMenuProps) => {
  const [currentDate, setCurrentDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetchedData, setFetchedData] = useState<
    { type: string; data: any; position: { x: number; y: number } }[]
  >([]);

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

  const handleFetchedData = (data: any, item: string) => {
    const newCard = {
      type: item,
      data: Array.isArray(data) ? data : [data],
      position: { x: 0, y: 0 }, // Default position
    };

    setFetchedData((prev) => {
      const updatedData = [...prev, newCard];
      localStorage.setItem("fetchedData", JSON.stringify(updatedData)); // Save to localStorage
      return updatedData;
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("fetchedData");
    if (storedData) {
      setFetchedData(JSON.parse(storedData));
    }
  }, []);

  const handleDeleteCard = (index: number) => {
    setFetchedData((prev) => {
      const updatedData = prev.filter((_, i) => i !== index);
      localStorage.setItem("fetchedData", JSON.stringify(updatedData)); // Update localStorage
      return updatedData;
    });
  };

  const handleDrag = (index: number, position: { x: number; y: number }) => {
    setFetchedData((prev) => {
      const updatedData = prev.map((card, i) =>
        i === index ? { ...card, position } : card
      );
      localStorage.setItem("fetchedData", JSON.stringify(updatedData)); // Save updated positions
      return updatedData;
    });
  };

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
          <Draggable
            key={index}
            bounds="parent"
            position={card.position}
            onStop={(_, data) => handleDrag(index, { x: data.x, y: data.y })}
          >
            <Box pos={"absolute"}>
              <FuncCard
                fetchedData={card.data}
                type={card.type}
                onDelete={() => handleDeleteCard(index)}
              />
            </Box>
          </Draggable>
        ))}
      </Box>

      <CreateCardModal isOpen={isOpen} onClose={onClose} user={user} onFetchedData={handleFetchedData} />
    </Box>
  );
};
