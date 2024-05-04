import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import PulsingIcon from "../../components/PulsingIcon";
import TitleBox from "../../components/TitleBox";
import { usePools } from "../../providers/pools";
import { Status } from "../../types/lottery";
import DrawTable from "./DrawTable";

export default function Pools() {
  const { liveDraws, clearingDraws, closedDraws, isFetchingAllDraws, rewardTokens, isFetchingRewardTokens } =
    usePools();

  const isLoading = isFetchingAllDraws || isFetchingRewardTokens;

  return (
    <Box w="896px" mx="auto" mt={24}>
      <TitleBox
        headingText="Deposit"
        subText="Deposit Pendle YT tokens or yield bearing assets into Pendle for a chance to win"
      />
      <VStack align="left" spacing="22px">
        <Box>
          <HStack>
            <PulsingIcon status={Status.LIVE} />
            <Text variant="label">Live</Text>
          </HStack>
          <Card p={6}>
            <DrawTable
              draws={liveDraws}
              isLoading={isLoading}
              emptyText="Sorry there are no live auctions. Buy some tickets from the clearing lottos."
              status={Status.LIVE}
              rewardTokens={rewardTokens}
            />
          </Card>
        </Box>
        <Box>
          <HStack>
            <PulsingIcon status={Status.CLEARING} />
            <Text variant="label">Clearing</Text>
          </HStack>
          <Card p={6}>
            <DrawTable
              draws={clearingDraws}
              isLoading={isLoading}
              emptyText="No auctions have cleared. Get buying."
              status={Status.CLEARING}
              rewardTokens={rewardTokens}
            />
          </Card>
        </Box>
        <Box>
          <HStack>
            <PulsingIcon status={Status.CLOSED} />
            <Text variant="label">Closed</Text>
          </HStack>
          <Card p={6}>
            <DrawTable
              draws={closedDraws}
              isLoading={isLoading}
              emptyText="Sorry not sorry, all the auctions must still be open."
              status={Status.CLOSED}
              rewardTokens={rewardTokens}
            />
          </Card>
        </Box>
      </VStack>
    </Box>
  );
}
