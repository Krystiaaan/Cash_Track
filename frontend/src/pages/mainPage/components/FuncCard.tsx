import {
  Box,
  Card,
  CardHeader,
  Text,
  Divider,
  CardBody,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface FuncCardProps {
  fetchedData: any; 
  type: string; 
  onDelete: () => void;
}

export const FuncCard = ({ fetchedData, type, onDelete }: FuncCardProps) => {
  if (!fetchedData || fetchedData.length === 0) {
    return (
      <Box>
        <Card
          width={"25.375rem"}
          height={"17.375rem"}
          bg={"#1ABC9C"}
          borderRadius={"1.6rem"}
          ml={"2rem"}
          mt={"2rem"}
          cursor={"move"}
        >
          <CardHeader>
            <Text fontSize={"xl"} color={"white"} textAlign={"center"}>
              Your Data
            </Text>
            <Divider
              borderColor="#34495E"
              borderWidth={"0.0625rem"}
              mt={"0.4rem"}
              width={"96%"}
            />
          </CardHeader>
          <CardBody>
            <Text fontSize={"xl"} color={"white"} textAlign="center">
              No data available
            </Text>
          </CardBody>
        </Card>
      </Box>
    );
  }

  const renderData = () => {
    const dataArray = Array.isArray(fetchedData) ? fetchedData : [fetchedData];
  
    if (dataArray.length === 0) {
      return (
        <Text fontSize="xl" color="white" textAlign="center">
          No data available
        </Text>
      );
    }
  
    switch (type) {
      case "Accounts":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((account: any) => (
              <Box key={account.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Account Name: {account.accountName}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Account Type: {account.accountType}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Balance: ${account.balance}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Created At:{" "}
                  {new Date(account.created_at).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "Transactions":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((transaction: any) => (
              <Box key={transaction.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Transaction Type: {transaction.transactionType}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Amount: ${transaction.amount}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Date:{" "}
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Description: {transaction.description || "N/A"}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "Categories":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((category: any) => (
              <Box key={category.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Category Name: {category.categoryName}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Type: {category.categoryType}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Created At:{" "}
                  {new Date(category.created_at).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "SavingGoals":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((savingGoals: any) => (
              <Box key={savingGoals.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Goal Name: {savingGoals.goalName}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Target Amount: ${savingGoals.targetAmount}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Current Amount: ${savingGoals.currentAmount}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Deadline: {new Date(savingGoals.targetDate).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "Budget":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((budget: any) => (
              <Box key={budget.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Budget Name: {budget.budgetName}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Allocated Amount: ${budget.amount}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Start Date: {new Date(budget.start_date).toLocaleDateString()}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  End Date: {new Date(budget.end_date).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "Reports":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((report: any) => (
              <Box key={report.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Report Type: {report.reportType}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Generated On:{" "}
                  {new Date(report.generatedDate).toLocaleDateString()}
                </Text>
                <Text fontSize={"sm"} color={"white"}>
                  Parameters: {JSON.stringify(report.parameters)}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      case "Notifications":
        return (
          <VStack spacing={3} align="stretch">
            {dataArray.map((notification: any) => (
              <Box key={notification.id} p={4} borderRadius={"8px"} width="100%">
                <Text fontSize={"lg"} color={"white"} fontWeight="bold">
                  Notification Type: {notification.notificationType}
                </Text>
                <Text fontSize={"md"} color={"white"}>
                  Message: {notification.message || "No message provided"}
                </Text>
              </Box>
            ))}
          </VStack>
        );
  
      default:
        return (
          <Text fontSize="xl" color="white" textAlign="center">
            No data available for the selected type.
          </Text>
        );
    }
  };
  

  return (
    <Box>
      <Card
        width={"25.375rem"}
        height={"17.375rem"}
        bg={"#1ABC9C"}
        borderRadius={"1.6rem"}
        ml={"2rem"}
        mt={"2rem"}
        cursor={"move"}
      >
        <CardHeader>
          <Text fontSize={"xl"} color={"white"} textAlign={"center"}>
            Your {type}
          </Text>
          <Divider
            borderColor="#34495E"
            borderWidth={"0.0625rem"}
            mt={"0.4rem"}
            width={"96%"}
          />
          <IconButton
            aria-label="Delete card"
            icon={<CloseIcon />}
            size="sm"
            position="absolute"
            top="0.5rem"
            right="0.5rem"
            colorScheme=""
            onClick={onDelete}
          />
        </CardHeader>
        <CardBody>
          <Box
            overflowY="auto" // Enables vertical scrolling
            maxHeight="9rem" // Adjust to fit your design needs
            pr="4" // Add padding to the right for better aesthetics
          >
            {renderData()}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};
