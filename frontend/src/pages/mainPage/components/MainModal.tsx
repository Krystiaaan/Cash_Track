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
        setAccounts(Array.isArray(accountsData) ? accountsData : []);

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
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
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
  };
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
              placeholder="Select Category Type"
              name="categoryId"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
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
      case "Categories":
        return (
          <>
            <Input
              placeholder="Category Name"
              name="categoryName"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Select
              placeholder="Select Category Type"
              name="CategoryType"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Select>
          </>
        );
      case "Budget":
        return (
          <>
            <Input
              placeholder="Budget Name"
              name="budgetName"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Budget Amount"
              name="amount"
              type="number"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Start Date"
              name="start_date"
              type="Date"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="End Date"
              name="end_date"
              type="Date"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Select
              placeholder="Select Category Type"
              name="categoryId"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </Select>
          </>
        );
      case "Saving Goals":
        return (
          <>
            <Input
              placeholder="Goal Name"
              name="goalName"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Target Amount"
              name="targetAmount"
              type="number"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Current Amount"
              name="currentAmount"
              type="number"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Goal Date"
              name="targetDate"
              type="date"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
          </>
        );
      case "Reports":
        return (
          <>
            <Select
              placeholder="Report Type"
              name="reportType"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              <option value="Income vs. Expenses">Income vs. Expenses</option>
              <option value="Category Breakdown">Category Breakdown</option>
              <option value="Budget Report">Budget Report</option>
              <option value="Balance Sheet">Balance Sheet</option>
            </Select>
            <Input
              placeholder="Generated Date"
              name="generatedDate"
              type="date"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
            <Input
              placeholder="Parameters"
              name="parameters"
              type="JSON"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />
          </>
        );
        case "Notifications":
          return (
            <>
            <Select
              placeholder="Notification Type"
              name="notificationType"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            >
              <option value="Budget Limit Reached">Budget Limit Reached</option>
              <option value="Upcoming Bill Due">Upcoming Bill Due</option>
              <option value="Payment Successful">Payment Successful</option>
              <option value="Account Alert">Account Alert</option>
              <option value="Report Ready">Report Ready</option>
            </Select>
            <Input
              placeholder="Message"
              name="message"
              type="message"
              onChange={handleChange}
              bg={"#C0BFBF"}
              mb={4}
              border={"none"}
              borderRadius={"1.6rem"}
            />

            </>
          )
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
              <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                Add your {title}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
