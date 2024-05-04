import {
  Button,
  Skeleton,
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
import EmptyLoadingRow from "../../../components/EmptyLoadingRow";
import PrizePool from "../../../components/PrizePool";
import RewardTokenList from "../../../components/RewardTokenList";
import { formatBigInt, formatUsd } from "../../../helpers/util";
import { Status } from "../../../types/lottery";
import type { TokenInfo } from "../../../types/shared";

const getAction = (status: Status) => {
  if (status === Status.LIVE) {
    return {
      text: "Mint",
      route: (kilnAddress?: string) => `/pool/${kilnAddress}`,
    };
  } else if (status === Status.CLEARING) {
    return {
      text: "Buy Tickets",
      route: () => "/tickets",
    };
  } else if (status === Status.CLOSED) {
    return {
      text: "View results",
      route: () => "/history",
    };
  }
};

type Props = {
  draws: Draw[];
  isLoading: boolean;
  emptyText: string;
  status: Status;
  rewardTokens: Record<string, TokenInfo>;
};

const DrawTable = ({ draws, isLoading, emptyText, status, rewardTokens }: Props) => {
  const action = getAction(status);

  const now = Date.now();

  return (
    <TableContainer>
      <Table variant="simple">
        {draws.length === 0 && !isLoading && <TableCaption>{emptyText}</TableCaption>}
        <Thead>
          <Tr>
            <Th w="5%">#</Th>
            <Th w="15%">Prize Pool</Th>
            <Th w="15%">Prize</Th>
            <Th isNumeric w="15%">
              Your Entries
            </Th>
            <Th isNumeric w="15%">
              Tickets
            </Th>
            <Th w="20%">{status === Status.LIVE ? "Closes in" : "Winner In"}</Th>
            <Th w="30%" />
          </Tr>
        </Thead>
        <Tbody>
          {draws.length === 0 && isLoading && <EmptyLoadingRow />}
          {draws.map((draw) => {
            const yieldDuration = Math.max(
              draw.lotteryEndTimestamp - now,
              draw.lotteryEndTimestamp - draw.mintWindowEndTimestamp,
            );
            return (
              <Tr key={draw.id}>
                <Td>{draw.id}</Td>
                <Td>
                  <PrizePool
                    ytTokenAddress={draw.ytTokenAddress}
                    kilnAddress={draw.kilnAddress}
                    yieldDuration={yieldDuration}
                  />
                </Td>
                <Td>
                  <RewardTokenList allRewardTokens={rewardTokens} lottoRewardTokens={draw.rewardTokens} />
                </Td>
                <Td isNumeric>{!!draw.userTickets || draw.userTickets === 0 ? draw.userTickets : "-"}</Td>
                <Td isNumeric>{draw.tickets}</Td>
                <Td>
                  <Countdown
                    date={draw.status === Status.LIVE ? draw.mintWindowEndTimestamp : draw.lotteryEndTimestamp}
                  />
                </Td>
                <Td textAlign="right">
                  {action && (
                    <Link to={action.route(draw.kilnAddress)}>
                      <Button>{action.text}</Button>
                    </Link>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DrawTable;
