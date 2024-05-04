import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import type { Draw } from "../types/lottery";
import { Status } from "../types/lottery";
import { useKilns } from "./useKilns";

export const useDraw = (): Draw => {
  const location = useLocation();
  const kilnAddress = location.pathname.split("/")?.[2];

  const { address } = useAccount();
  const { kilns } = useKilns(kilnAddress ? [kilnAddress] : [], address);

  return useMemo(() => {
    const now = Date.now();

    // collate all of it to be state
    const res = {
      id: 0,
      kilnAddress: "",
      prizePool: BigInt(0),
      prizePoolUsd: BigInt(0),
      rewardTokens: [],
      tickets: 0,
      lotteryEndTimestamp: 0,
      mintWindowEndTimestamp: 0,
      ytTokenAddress: "",
      ytTokenSymbol: "",
      ytTokenBalance: BigInt(0),
    };

    if (!kilns) {
      return res;
    }

    const id = kilns[0].result;
    const lotteryEnd = kilns[1].result;
    const mintWindowEnd = kilns[2].result;
    const supply = kilns[3].result;
    const balance = kilns[4].result;
    const ytTokenAddress = kilns[5].result;
    const ticketCost = kilns[6].result;

    const lotteryEndTimestamp = Number(lotteryEnd) * 1000;
    const mintWindowEndTimestamp = Number(mintWindowEnd) * 1000;

    const kiln = {
      id: Number(id),
      kilnAddress,
      rewardTokens: ["ETH"],
      prizePool: BigInt(0),
      prizePoolUsd: BigInt(0),
      tickets: Number(supply),
      userTickets: Number(balance),

      lotteryEndTimestamp,
      mintWindowEndTimestamp,
      ytTokenAddress,
      ticketCost,
    };

    if (now > lotteryEndTimestamp) {
      kiln.status = Status.CLOSED;
    } else if (now > mintWindowEndTimestamp) {
      kiln.status = Status.LOCKED;
    } else {
      kiln.status = Status.LIVE;
    }

    return kiln;
  }, [kilns]);
};
