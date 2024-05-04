import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { NavRouteIndex } from "../../types/nav";

import PotteryLogo from "../PotteryLogo";

import pools_icon from "../../assets/ticket.svg";
import ticket_icon from "../../assets/ticket.svg";

const PATHS: {
  text: string;
  icon: any;
  key: NavRouteIndex;
}[] = [
  {
    text: "Pools",
    icon: pools_icon,
    key: NavRouteIndex.Pools,
    route: "/pools",
  },
  {
    text: "Tickets",
    icon: ticket_icon,
    key: NavRouteIndex.Tickets,
    route: "/tickets",
  },
];

type Props = {
  selectedNavIndex?: NavRouteIndex;
};

const SideNav = ({ selectedNavIndex }: Props) => {
  return (
    <Box p={4} borderRight="1px" w="100px" h="full" borderColor="gray.300">
      <Link to={window.location.origin}>
        <PotteryLogo mb={10} mx="auto" cursor="pointer" />
      </Link>
      <VStack align="middle" spacing={4}>
        {PATHS.map(({ text, route, icon, key }) => (
          <Link to={route}>
            <VStack
              gap={"2px"}
              cursor="pointer"
              transition="0.3s"
              _hover={{ opacity: 1 }}
              opacity={selectedNavIndex === key ? 1 : 0.5}
            >
              <Image src={icon} w="2rem" />
              <Text>{text}</Text>
            </VStack>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default SideNav;
