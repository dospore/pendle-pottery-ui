import { Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import EmptyLoadingRow from "../../../components/EmptyLoadingRow";

import PrizePool from "../../../components/PrizePool";
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
            <Tr key={`${draw.id}-${draw.kilnAddress}`}>
              <Td>{draw.id}</Td>
              <Td>
                <PrizePool
                  ytTokenAddress={draw.ytTokenAddress}
                  kilnAddress={draw.kilnAddress}
                  yieldDuration={draw.lotteryEndTimestamp - draw.mintWindowEndTimestamp}
                />
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
