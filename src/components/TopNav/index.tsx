import { Button, HStack, Text } from "@chakra-ui/react";
import ConnectButton from "../ConnectButton";

const TopNav = () => {
  return (
    <HStack py={6} px={6} justify="space-between" w="full" borderBottom="1px" borderColor="gray.300" align="left">
      <Text fontSize="2rem" lineHeight="2rem" fontWeight={700}>
        Pottery
      </Text>
      <ConnectButton />
    </HStack>
  );
};

export default TopNav;
