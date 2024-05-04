import { Box, Card, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import lotto_banner from "../../assets/lotto_banner.png";
import PulsingIcon from "../../components/PulsingIcon";
import { usePools } from "../../providers/pools";
import DrawTable from "./DrawTable";

export default function Pools() {
  const { liveDraws, upcomingDraws, closedDraws } = usePools();

  return (
    <Box w="896px" mx="auto" mt={24}>
      <Box mb={12}>
        <Heading variant="main-heading">Deposit</Heading>
        <Text fontSize="md" opacity={0.7}>
          Deposit Pendle YT tokens or yield bearing assets into Pendle for a chance to win
        </Text>
      </Box>
      <VStack align="left" spacing="22px">
        <Box>
          <HStack>
            <PulsingIcon status="live" />
            <Text variant="label">Live</Text>
          </HStack>
          <Card p={6}>
            <DrawTable draws={liveDraws} />
          </Card>
        </Box>
        <Box>
          <HStack>
            <PulsingIcon status="upcoming" />
            <Text variant="label">Upcoming</Text>
          </HStack>
          <Card p={6}>
            <DrawTable draws={upcomingDraws} />
          </Card>
        </Box>
        <Box>
          <HStack>
            <PulsingIcon status="closed" />
            <Text variant="label">Closed</Text>
          </HStack>
          <Card p={6}>
            <DrawTable draws={upcomingDraws} />
          </Card>
        </Box>
      </VStack>
    </Box>
  );
}
