import { Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import EmptyLoadingRow from "../../../components/EmptyLoadingRow";

import { formatBigInt, formatUsd } from "../../../helpers/util";
import type { Draw } from "../../../types/lottery";

type Props = {
  draws: Draw[];
  isLoading: boolean;
};

const DrawTable = ({ draws, isLoading }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Are you winning son?</TableCaption>
        <Thead>
          <Tr>
            <Th w="10%">#</Th>
            <Th w="20%">Prize Pool</Th>
            <Th w="5%" isNumeric>
              Your Entries
            </Th>
            <Th w="5%" isNumeric>
              Tickets
            </Th>
            <Th>Winner</Th>
          </Tr>
        </Thead>
        <Tbody>
          {draws.length === 0 && isLoading && (
            <>
              <EmptyLoadingRow />
              <EmptyLoadingRow />
            </>
          )}
          {draws.map((draw) => (
            <Tr key={draw.id}>
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
              <Td isNumeric>{!!draw.userTickets || draw.userTickets === 0 ? draw.userTickets : "-"}</Td>
              <Td isNumeric>{draw.tickets}</Td>
              <Td>{draw.winner}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DrawTable;
