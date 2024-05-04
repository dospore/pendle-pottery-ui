import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { formatBigInt } from "../../helpers/util";

type Props = {
  ytTokenSymbol: string;
  ticketCost?: bigint;
  tickets: number;
};

const MintSummary = ({ ytTokenSymbol, ticketCost, tickets }: Props) => {
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
        <Text as="span">{tickets} tickets</Text>
      </Box>
    </HStack>
  );
};

export default MintSummary;
