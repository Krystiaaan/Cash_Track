import {
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MainMenuProps } from "../../interfaces/MainPageInterface";
import { FuncCard } from "./FuncCard";
import Draggable from "react-draggable";

export const MainCard = ({ user }: MainMenuProps) => {
  const [currentDate, setCurrentDate] = useState("");

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

  return (
    <Box flex={1}>
      <Box>
        <Text ml={"2rem"} mt={"0.5rem"} color={"white"} fontSize={"xl"}>
          Hey, {user.username}!
        </Text>
        <Text ml={"2rem"} mt={"0.5rem"} color={"gray.400"} fontSize={"l"}>
          {currentDate}
        </Text>
        <Divider
          borderColor="#34495E"
          borderWidth={"0.0625rem"}
          mt={"0.4rem"}
          ml={"2rem"}
          width={"96%"}
          
        />
      </Box>
      <Box width={"83%"} pos={"absolute"} height={"91%"}overflow={"hidden"}  >
      </Box>
      
    </Box>
  );
};
