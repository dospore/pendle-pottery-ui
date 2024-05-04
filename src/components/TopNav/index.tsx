import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import nouns_icon from "../../assets/nouns.png";
import ConnectButton from "../ConnectButton";
import NetworkButton from "../NetworkButton";

const TopNav = () => {
  return (
    <HStack py={6} px={6} justify="space-between" w="full" borderBottom="1px" borderColor="gray.300" align="left">
      <HStack>
        <Link to="/">
          <Text fontSize="2rem" lineHeight="2rem" fontWeight={700}>
            Pottery
          </Text>
        </Link>
        <Link to="https://nouns.wtf/" target="_blank">
          <Image src={nouns_icon} w="4rem" />
        </Link>
      </HStack>
      <HStack>
        <NetworkButton />
        <ConnectButton />
      </HStack>
    </HStack>
  );
};

export default TopNav;
