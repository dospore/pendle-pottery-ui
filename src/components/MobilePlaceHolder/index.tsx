import { Heading, Image, Text, VStack } from "@chakra-ui/react";

function MobilePlaceHolder() {
  return (
    <VStack w="full" h="full" bg="black" color="white" justify="center">
      <Heading color="white">Access via Desktop</Heading>
      <Text textAlign="center">
        No-one uses mobile in web3
        <br />
        (and this is a hackathon project)
      </Text>
    </VStack>
  );
}

export default MobilePlaceHolder;
