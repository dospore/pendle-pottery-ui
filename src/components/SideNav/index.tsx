import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { NavRouteIndex } from "../../types/nav";

import PotteryLogo from "../PotteryLogo";

import github_icon from "../../assets/github.png";
import lotto_icon from "../../assets/lotto.png";
import prize_icon from "../../assets/prize.svg";
import ticket_icon from "../../assets/ticket.svg";

const PATHS: {
  text: string;
  icon: any;
  key: NavRouteIndex;
}[] = [
  {
    text: "Pools",
    icon: lotto_icon,
    key: NavRouteIndex.Pools,
    route: "/pools",
  },
  {
    text: "Tickets",
    icon: ticket_icon,
    key: NavRouteIndex.Tickets,
    route: "/tickets",
  },
  {
    text: "History",
    icon: prize_icon,
    key: NavRouteIndex.History,
    route: "/history",
  },
];

type Props = {
  selectedNavIndex?: NavRouteIndex;
};

const SideNav = ({ selectedNavIndex }: Props) => {
  return (
    <Box p={4} borderRight="1px" w="100px" h="full" borderColor="gray.300" position="relative">
      <Link to={window.location.origin}>
        <PotteryLogo mb={10} mx="auto" cursor="pointer" />
      </Link>
      <VStack align="middle" spacing={4}>
        {PATHS.map(({ text, route, icon, key }) => (
          <Link to={route} key={`nav-${route}`}>
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
      <Link target="_blank" to="https://github.com/dospore/pendle-pottery-ui">
        <Flex
          justify="center"
          position="absolute"
          bottom={4}
          align="center"
          left={0}
          right={0}
          opacity={0.6}
          _hover={{ opacity: 0.8 }}
        >
          <Image src={github_icon} boxSize="2rem" />
        </Flex>
      </Link>
    </Box>
  );
};

export default SideNav;
