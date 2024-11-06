import {Box, Card, CardHeader, Text, Divider, CardBody} from "@chakra-ui/react"
export const FuncCard = () => {

    return (
    
        <Box>
            
        <Card width={"25.375rem"} height={"17.375rem"} bg={"#1ABC9C"} borderRadius={"1.6rem"} ml={"2rem"} mt={"2rem"} cursor={"move"}>
            <CardHeader>
                <Text fontSize={"xl"} color={"white"} textAlign={"center"} >Your ...</Text>
                <Divider 
                borderColor="#34495E"
                borderWidth={"0.0625rem"}
                mt={"0.4rem"}
                width={"96%"}
                />
            </CardHeader>
            <CardBody>
                <Text fontSize={"xl"} color={"white"}>Input from Backend</Text>
            </CardBody>
        </Card>
        
      </Box>
    )
}