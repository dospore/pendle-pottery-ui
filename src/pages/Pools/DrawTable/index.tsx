import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import Countdown from "../../../components/Countdown";
import { formatBigInt, formatUsd } from "../../../helpers/util";

type Props = {
  draws: Draw[];
};

const DrawTable = ({ draws }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Prize Pool</Th>
            <Th isNumeric>Your Entries</Th>
            <Th isNumeric>Players</Th>
            <Th isNumeric>Tickets</Th>
            <Th>Draws in</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {draws.map((draw) => (
            <Tr>
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
              <Td isNumeric>{draw.userEntries ? draw.userEntries : "-"}</Td>
              <Td isNumeric>{draw.players}</Td>
              <Td isNumeric>{draw.tickets}</Td>
              <Td>
                <Countdown date={draw.drawTime} />
              </Td>
              <Td>
                <Link to={`/pool/${draw.id}`}>
                  <Button>Mint</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DrawTable;
