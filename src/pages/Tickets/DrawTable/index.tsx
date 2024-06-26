import { Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";

import Countdown from "../../../components/Countdown";
import { formatBigInt, formatUsd } from "../../../helpers/util";
import type { Draw } from "../../../types/lottery";

type Props = {
  draws: Draw[];
};

const DrawTable = ({ draws }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Buy tickets before the draw runs out</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Prize Pool</Th>
            <Th isNumeric>Your Entries</Th>
            <Th isNumeric>Tickets</Th>
            <Th>Draws in</Th>
          </Tr>
        </Thead>
        <Tbody>
          {draws.map((draw) => (
            <Tr key={`${draw.id}-${draw.kilnAddress}`}>
              <Td>{draw.id}</Td>
              <Td>
                <VStack spacing={0} align="left">
                  <Text fontSize="md" fontWeight={600}>
                    {formatBigInt(draw.prizePool)}
                  </Text>
                  <Text fontSize="sm" opacity={0.7}>
                    {formatUsd(draw.prizePoolUsd)}
                  </Text>
                </VStack>
              </Td>
              <Td isNumeric>{draw.userTickets ? draw.userTickets : "-"}</Td>
              <Td isNumeric>{draw.tickets}</Td>
              <Td>
                <Countdown date={draw.drawTime} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DrawTable;
