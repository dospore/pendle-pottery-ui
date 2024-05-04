import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { formatBigInt } from "../../helpers/util";

type Props = {
  ytTokenSymbol: string;
  depositAmountBn: bigint;
  ticketCost: bigint;
};

const MintSummary = ({ depositAmountBn, ytTokenSymbol, ticketCost }: Props) => {
  const precision = BigInt(10 ** 18);
  const tickets = !ticketCost ? BigInt(0) : (depositAmountBn * precision) / ticketCost;

  return (
    <HStack align="left" justify="space-between" mb={2}>
      <Box>
        <Text variant="label" as="span">
          Ticket cost:
        </Text>{" "}
        {ticketCost && (
          <Text as="span">
            {formatBigInt(ticketCost)} {ytTokenSymbol} / ticket
          </Text>
        )}
      </Box>
      <Box>
        <Text variant="label" as="span">
          Receive:
        </Text>{" "}
        <Text as="span">{formatBigInt(tickets)} tickets</Text>
      </Box>
    </HStack>
  );
};

export default MintSummary;
