import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Radio,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  interface CreateCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { id: string };
    onFetchedData: (data: any, selectedItem: string) => void; // Modify to accept selectedItem as well
  }
  
  export const CreateCardModal = ({ isOpen, onClose, user, onFetchedData }: CreateCardModalProps) => {
    const [selectedItem, setSelectedItem] = useState<string>("");
  
    const handleItemClick = (item: string) => {
      setSelectedItem(item);
    };
  
    // Modify the handleFetchItems to accept both selectedItem and fetched data
    const handleFetchItems = async (selectedItem: string) => {
      if (!selectedItem) {
        alert("Please select an item!");
        return;
      }
  
      try {
        const token = localStorage.getItem("token");
        const endpoint = `http://localhost:3000/${selectedItem.toLowerCase().replace(/\s+/g, '')}/${user.id}`;
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch items for ${selectedItem}`);
        }
  
        const data = await response.json();
        console.log(data)
        onFetchedData(data, selectedItem); // Pass both data and selectedItem to MainCard
        alert(`${selectedItem} items fetched successfully!`);
      } catch (error) {
        console.error(error);
        alert("Error fetching items");
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* Dynamically change the modal header based on selectedItem */}
          <ModalHeader>
            {selectedItem ? `Fetch ${selectedItem} Items` : "Fetch Items"}
          </ModalHeader>
          <ModalBody>
            {['Accounts', 'Transactions', 'Budget', 'Saving Goals', 'Reports', 'Notifications', 'Categories'].map((item) => (
              <Radio
                key={item}
                cursor={"pointer"}
                _hover={{ color: 'teal.600', px: "2" }}
                w={"full"}
                py={"1"}
                onClick={() => handleItemClick(item)}
                value={item}
                isChecked={selectedItem === item}
              >
                {item}
              </Radio>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Pass selectedItem to handleFetchItems when clicked */}
            <Button variant="ghost" onClick={() => handleFetchItems(selectedItem)}>
              Fetch Items
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  