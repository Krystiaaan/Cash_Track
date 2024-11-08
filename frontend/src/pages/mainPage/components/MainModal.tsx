import React, { useState, useEffect } from "react";

import {
  Box,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import {
  MainModalProps,
  Account,
  Category,
} from "../../interfaces/MainPageInterface";

export const MainModal: React.FC<MainModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  userId,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchAccountsAndCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("no Token found");
        }

        const accountsResponse = await fetch(
          `http://localhost:3000/accounts/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const accountsData: Account[] = await accountsResponse.json();
        console.log(accountsData);
        setAccounts(accountsData);

        const categoriesResponse = await fetch(
          `http://localhost:3000/categories/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const categoriesData: Category[] = await categoriesResponse.json();
        console.log(categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching account and categories:", error);
      }
    };
    if (userId) {
      fetchAccountsAndCategories();
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, userId, [name]: value });
  };
  const handleSubmit = () => {
    console.log("Submitting formData:", formData);
    onSubmit(formData);
  }
  const renderFormFields = () => {
    switch (title) {
      case "Accounts":
        return (
          <>
            <Input
              placeholder="Account Name"
              name="accountName"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Account Type"
              name="accountType"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Balance"
              type="number"
              name="balance"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
          </>
        );
      case "Transactions":
        return (
          <>
            <Input
              placeholder="Transaction Date"
              type="date"
              name="transactionDate"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Amount"
              type="number"
              name="amount"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Description"
              name="description"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Select
              placeholder="Select Transaction Type"
              name="transactionType"
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

            <Select
              placeholder="Select Account"
              name="accountId"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </Select>
          </>
        );
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"#1ABC9C"}
          borderRadius={"1.6rem"}
          alignSelf={"center"}
        >
          <ModalHeader textAlign={"center"} color={"white"}>
            Your {title}
          </ModalHeader>
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
              <Button
                mt={4}
                colorScheme="teal"
                onClick={handleSubmit}
              >
                Add your {title}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
