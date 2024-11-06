import { BaseLayout } from "../../layout/baseLayout";
import { MainMenu } from "./components/MainMenu";
import { MainCard } from "./components/MainCard";
import { Flex } from "@chakra-ui/react";

import { useAuth } from "../../Auth/AuthProvider";

export const MainPage = () => {

    const {user} = useAuth();
  return (
    <BaseLayout>
      <Flex height={"100vh"} overflow={"hidden"}>
        <MainMenu user={user!} />
        <MainCard user={user!}/>
      </Flex>
    </BaseLayout>
  );
};
