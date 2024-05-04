import { Box, Card, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import lotto_banner from "../../assets/lotto_banner.png";
import PulsingIcon from "../../components/PulsingIcon";
import TitleBox from "../../components/TitleBox";
import { usePools } from "../../providers/pools";
import DrawTable from "./DrawTable";

export default function Pools() {
  const { liveDraws, clearingDraws, closedDraws } = usePools();

  return (
    <Box w="896px" mx="auto" mt={24}>
      <TitleBox
        headingText="Deposit"
        subText="Deposit Pendle YT tokens or yield bearing assets into Pendle for a chance to win"
      />
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
            <PulsingIcon status="clearing" />
            <Text variant="label">Clearing</Text>
          </HStack>
          <Card p={6}>
            <DrawTable draws={clearingDraws} />
          </Card>
        </Box>
        <Box>
          <HStack>
            <PulsingIcon status="closed" />
            <Text variant="label">Closed</Text>
          </HStack>
          <Card p={6}>
            <DrawTable draws={closedDraws} />
          </Card>
        </Box>
      </VStack>
    </Box>
  );
}
