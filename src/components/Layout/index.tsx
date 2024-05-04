import { Box, Grid, Hide, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavRouteIndex } from "../../types/nav";
import MobilePlaceHolder from "../MobilePlaceHolder";
import SideNav from "../SideNav";
import TopNav from "../TopNav";

import { useAccess } from "../../providers/access";
import type { Children } from "../../types/react";

const paths: Record<string, number> = {
  pools: NavRouteIndex.Pools,
  pool: NavRouteIndex.Pools,
  tickets: NavRouteIndex.Tickets,
};

type Props = {} & Children;

function Layout({ children }: Props) {
  const location = useLocation();
  const page = location.pathname.split("/")[1];

  return (
    <>
      <Show above="1100px">
        <Grid gridTemplateColumns="100px 100%" minHeight="100vh" overflowX="hidden">
          <Box>
            <SideNav selectedNavIndex={paths[page]} />
          </Box>
          <Box w="full" maxWidth={"calc(100vw - 100px)"} overflow="hidden">
            <TopNav />
            <Box w="full">{children}</Box>
          </Box>
        </Grid>
      </Show>
      <Hide above="1100px">
        <Box h="100vh" overflow="hidden">
          <MobilePlaceHolder />
        </Box>
      </Hide>
    </>
  );
}

export default Layout;
