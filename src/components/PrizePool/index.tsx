import { Skeleton, Text, VStack } from "@chakra-ui/react";
import { formatBigInt, formatUsd } from "../../helpers/util";
import { usePrizePool } from "../../hooks/usePrizePool";

type Props = {
  ytTokenAddress: string;
  kilnAddress: string;
};

const PrizePool = ({ ytTokenAddress, kilnAddress }) => {
  const { prize, prizeUsd, isPending } = usePrizePool(ytTokenAddress, kilnAddress);

  if (isPending) {
    return (
      <VStack spacing={1} align="left">
        <Skeleton h="14px" />
        <Skeleton h="14px" />
      </VStack>
    );
  }
  return (
    <VStack spacing={0} align="left">
      <Text fontSize="md" fontWeight={600}>
        {formatBigInt(prize)}
      </Text>
      <Text fontSize="sm" opacity={0.7}>
        {formatUsd(prizeUsd)}
      </Text>
    </VStack>
  );
};

export default PrizePool;
