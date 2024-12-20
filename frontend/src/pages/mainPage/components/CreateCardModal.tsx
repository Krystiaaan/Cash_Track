import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string };
  onFetchedData: (data: any, selectedItem: string) => void; // Modify to accept selectedItem as well
}

export const CreateCardModal = ({
  isOpen,
  onClose,
  user,
  onFetchedData,
}: CreateCardModalProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleFetchItems = async (selectedItem: string) => {
    if (!selectedItem) {
      alert("Please select an item!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const endpoint = `http://localhost:3000/${selectedItem
        .toLowerCase()
        .replace(/\s+/g, "")}/${user.id}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch items for ${selectedItem}`);
      }

      const data = await response.json();
      onFetchedData(data, selectedItem);
      alert(`${selectedItem} items fetched successfully!`);
    } catch (error) {
      console.error(error);
      alert("Error fetching items");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={"#1ABC9C"} // Hintergrundfarbe anpassen
        borderRadius={"1.6rem"}
        alignSelf={"center"}
      >
        <ModalHeader textAlign={"center"} color={"white"}>
          {selectedItem ? `Fetch ${selectedItem} Items` : "Fetch Items"}
        </ModalHeader>
        <Divider
          borderColor="#34495E"
          borderWidth={"0.0625rem"}
          mt={"0.4rem"}
          ml={"2rem"}
          width={"85%"}
        />
        <ModalBody>
          {[
            "Accounts",
            "Transactions",
            "Budget",
            "Saving Goals",
            "Reports",
            "Notifications",
            "Categories",
          ].map((item) => (
            <Radio
              key={item}
              cursor={"pointer"}
              w={"full"}
              py={"1"}
              px={"2"} // Padding wie im MainModal
              _hover={{ bg: "#16A085", color: "white" }}
              _checked={{
                bg: "#16A085",
                color: "white",
              }}
              onClick={() => handleItemClick(item)}
              value={item}
              isChecked={selectedItem === item}
            >
              {item}
            </Radio>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            bg={"#34495E"}
            color={"white"}
            _hover={{ bg: "#16A085" }}
            borderRadius={"1.6rem"}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            bg={"#34495E"}
            color={"white"}
            _hover={{ bg: "#16A085" }}
            borderRadius={"1.6rem"}
            onClick={() => handleFetchItems(selectedItem)}
          >
            Fetch Items
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
