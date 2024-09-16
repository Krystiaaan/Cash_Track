import { WelcomeCard } from "./components/WelcomeCard";
import { WhyCard } from "./components/WhyCard";
import { TrackingCard } from "./components/TrackingCard";
import { Flex } from "@chakra-ui/react"

export const LandingPage = () =>{
    return(
        <Flex flexDirection="column" gap="2em" marginLeft="5em">
        <WelcomeCard/>
        <WhyCard/>
        <TrackingCard/>
        </Flex>
    )
}