import { Button, HStack, Image, Text } from "@chakra-ui/react";
import nouns_icon from "../../assets/nouns.png";
import ConnectButton from "../ConnectButton";
import NetworkButton from "../NetworkButton";

const TopNav = () => {
  return (
    <HStack py={6} px={6} justify="space-between" w="full" borderBottom="1px" borderColor="gray.300" align="left">
      <HStack>
        <Text fontSize="2rem" lineHeight="2rem" fontWeight={700}>
          Pottery
        </Text>
        <Image src={nouns_icon} w="4rem" />
      </HStack>
      <HStack>
        <NetworkButton />
        <ConnectButton />
      </HStack>
    </HStack>
  );
};

export default TopNav;
