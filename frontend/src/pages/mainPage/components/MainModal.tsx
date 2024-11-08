import React, { useState } from 'react'

import {Box, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, Button, Select} from "@chakra-ui/react";
interface MainModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, any>) => void;
}

export const MainModal: React.FC<MainModalProps> = ({title, isOpen, onClose, onSubmit}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});


    //get Accounts/category from endpoint to the user here
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const renderFormFields = () => {
        switch(title) {
            case 'Accounts':
                return (
                    <>
                    <Input
                    placeholder='Account Name'
                    name='accountName'
                    onChange={handleChange}
                    bg={"#C0BFBF"}
                    mb={4}
                    border={"none"}
                    borderRadius={"1.6rem"}
                    />
                     <Input placeholder='Account Type'
                    name='accountType'
                    onChange={handleChange}
                    bg={"#C0BFBF"}
                    mb={4}
                    border={"none"}
                    borderRadius={"1.6rem"}/>
                     <Input placeholder='Balance'
                     type='number'
                    name='balance'
                    onChange={handleChange}
                    bg={"#C0BFBF"}
                    mb={4}
                    border={"none"}
                    borderRadius={"1.6rem"}/>
                    </>
                );
                case 'Transactions':
                return (
                    <>
                        <Input
                            placeholder='Transaction Date'
                            type='date'
                            name='transactionDate'
                            onChange={handleChange}
                            bg={"#C0BFBF"}
                            mb={4}
                            border={"none"}
                            borderRadius={"1.6rem"}
                        />
                        <Input
                            placeholder='Amount'
                            type='number'
                            name='amount'
                            onChange={handleChange}
                            bg={"#C0BFBF"}
                            mb={4}
                            border={"none"}
                            borderRadius={"1.6rem"}
                        />
                        <Input
                            placeholder='Description'
                            name='description'
                            onChange={handleChange}
                            bg={"#C0BFBF"}
                            mb={4}
                            border={"none"}
                            borderRadius={"1.6rem"}
                        />
                        <Select
                            placeholder='Select Transaction Type'
                            name='transactionType'
                            onChange={handleChange}
                            bg={"#C0BFBF"}
                            mb={4}
                            border={"none"}
                            borderRadius={"1.6rem"}
                        >
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                            <option value="Transfer">Transfer</option>
                        </Select>
                    
                    </>
                )
        }
    }

  return (
    <Box>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent  bg={"#1ABC9C"} borderRadius={"1.6rem"} alignSelf={"center"}>
                <ModalHeader textAlign={"center"} color={"white"}>Your {title}</ModalHeader>
                <ModalCloseButton />
                <Divider
          borderColor="#34495E"
          borderWidth={"0.0625rem"}
          mt={"0.4rem"}
          ml={"2rem"}
          width={"85%"}
          
        />
                <ModalBody>
                {renderFormFields()}
                <Box display={"flex"} justifyContent={"center"}>
                <Button mt={4} colorScheme='teal'onClick={() => onSubmit(formData)}>Add your {title}</Button>
                </Box>
                </ModalBody>
            </ModalContent>
        </Modal>

    </Box>
  )
}
