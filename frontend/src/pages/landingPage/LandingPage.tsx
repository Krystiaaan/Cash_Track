import { WelcomeCard } from "./components/WelcomeCard";
import { WhyCard } from "./components/WhyCard";
import { TrackingCard } from "./components/TrackingCard";
import { Flex } from "@chakra-ui/react";
import { BudgetCard } from "./components/BudgetCard";
import { SavingCard } from "./components/SavingCard";
import { ReportCard } from "./components/ReportCard";
import { SecureCard } from "./components/SecureCard";
import { JoinCard } from "./components/JoinCard";

export const LandingPage = () => {
  return (
    <Flex flexDirection="column" gap="2em" marginLeft="5em">
      <WelcomeCard />
      <WhyCard />
      <TrackingCard />
      <BudgetCard />
      <SavingCard />
      <ReportCard />
      <SecureCard />
      <JoinCard />
    </Flex>
  );
};
