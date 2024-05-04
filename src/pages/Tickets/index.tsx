import { Box, Card, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useTickets } from "../../providers/tickets";
import { Draw } from "../../types/lottery";
import DrawCard from "./DrawCard";
import DrawTable from "./DrawTable";

import gold_icon from "../../assets/gold.svg";
import silver_icon from "../../assets/silver.svg";

export default function Tickets() {
  const { jackpot, miniJackpot, remainingDraws } = useTickets();

  return (
    <Box w="896px" mx="auto" mt={24}>
      <Heading variant="main-heading">TICKETS</Heading>
      <VStack align="left" spacing="22px">
        <DrawCard title="Top Jackpot" draw={jackpot} position={0} icon={gold_icon} />
        <DrawCard title="Mini Jackpot" draw={miniJackpot} position={1} icon={silver_icon} imageWidth="3rem" />
        <Card p={6}>
          <Text variant="label">Remaining Draws</Text>
          <DrawTable draws={remainingDraws} />
        </Card>
      </VStack>
    </Box>
  );
}
