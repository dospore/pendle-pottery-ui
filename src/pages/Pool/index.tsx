import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Flex,
  HStack,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatUsd } from "../../helpers/util";
import { usePool } from "../../providers/pool";

import BuyWithTokens from "./BuyWithTokens";
import BuyWithYT from "./BuyWithYT";

enum TabType {
  BuyWithYT = 0,
  BuyWithTokens = 1,
}

export default function Pool() {
  const {
    ytTokenBalance,
    ytTokenSymbol,
    prizePoolUsd,
    onMint,
    ytMintPending,
    ytMintError
  } = usePool();

  const [tab, setTab] = useState<number>(0);

  const isReadyToBuy = ytTokenBalance && ytTokenBalance > BigInt(0);

  return (
    <Box w="700px" mx="auto" mt={24}>
      <Link to="/pools">
        <Box cursor="pointer" opacity={0.8} _hover={{ opacity: 0.5 }} transition="0.3s" mb={6}>
          <ArrowLeftIcon boxSize="0.8rem" />
          <Text as="span" ml={1}>
            Back
          </Text>
        </Box>
      </Link>
      <Box>
        <Text variant="label">Enter for a chance to win {formatUsd(prizePoolUsd)}</Text>
      </Box>
      <VStack spacing="16px" align="left">
        <Card p={6}>
          <Box mb={4}>
            <Text variant="label">Step 1. Select token</Text>
            <Text fontSize="sm" opacity={0.7}>
              You can either buy tickets with Pendle YT tokens or LP to Pendle with any supported ERC20 token.
            </Text>
            <Text fontSize="sm" opacity={0.7}>
              When buying with ERC20 tokens our contracts auto swap minted YT into tickets but you will still keep your
              PT tokens.
            </Text>
          </Box>
          <Tabs isFitted variant="soft-rounded" onChange={setTab}>
            <TabList mb="1em">
              <Tab>Buy with YT</Tab>
              <Tab>Pendle LP</Tab>
            </TabList>
          </Tabs>
        </Card>
        <Card p={6}>
          <Text variant="label">Step 2. {tab === TabType.BuyWithTokens ? "Mint YT and PT" : "Buy tickets"}</Text>
          <Box pt={6}>
            {tab === TabType.BuyWithYT && (
              <BuyWithYT 
                onMint={onMint}
                ytMintPending={ytMintPending}
                ytMintError={ytMintError}
                ytTokenSymbol={ytTokenSymbol}
                ytTokenBalance={ytTokenBalance}
              />
            )}
            {tab === TabType.BuyWithTokens && <BuyWithTokens />}
          </Box>
        </Card>
        {tab === TabType.BuyWithTokens && (
          <Card p={6}>
            <Text variant="label">Step 3. Buy tickets</Text>
            <Box pt={6}>
              <BuyWithYT
                onMint={onMint}
                ytMintPending={ytMintPending}
                ytMintError={ytMintError}
                ytTokenSymbol={ytTokenSymbol}
                ytTokenBalance={ytTokenBalance}
                disabled={!isReadyToBuy}
              />
            </Box>
          </Card>
        )}
      </VStack>
    </Box>
  );
}
