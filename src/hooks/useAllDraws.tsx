import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useConfig } from "../providers/config";
import { Status } from "../types/lottery";
import { useKilns } from "./useKilns";

import type { Draw } from "../types/lottery";

type AllDraws = {
  liveDraws: Draw[];
  clearingDraws: Draw[];
  closedDraws: Draw[];
  isPending: boolean;
  allRewardTokens: string[];
};

export const useAllDraws = (): AllDraws => {
  const { address } = useAccount();
  const { config } = useConfig();

  const { kilns, isPending, dataUpdatedAt } = useKilns(config.kilnAddresses, address);

  const res = useMemo(() => {
    // collate all of it to be state
    const res = {
      liveDraws: [],
      clearingDraws: [],
      closedDraws: [],
      allRewardTokens: [],
    };
    if (!kilns) {
      return res;
    }

    const l = 9;
    let kilnIndex = 0;

    const now = Date.now();
    for (let i = 0; i < kilns.length; i += l) {
      const id = kilns[i].result;
      const lotteryEnd = kilns[i + 1].result;
      const mintWindowEnd = kilns[i + 2].result;
      const supply = kilns[i + 3].result;
      const balance = kilns[i + 4].result;
      const ytTokenAddress = kilns[i + 5].result;
      const ticketCost = kilns[i + 6].result;
      const rewardTokens = kilns[i + 7].result;

      let localRewardTokens;
      if (config.fixedRewardTokens) {
        localRewardTokens = [...config.fixedRewardTokens]
      } else {
        localRewardTokens = rewardTokens;
      }

      res.allRewardTokens.push(...localRewardTokens);

      const winner = kilns[i + 8].result;


      const lotteryEndTimestamp = Number(lotteryEnd) * 1000;
      const mintWindowEndTimestamp = Number(mintWindowEnd) * 1000;

      const kiln = {
        id: Number(id),
        kilnAddress: config.kilnAddresses[kilnIndex],
        prizePool: BigInt(0),
        prizePoolUsd: BigInt(0),
        tickets: Number(supply),
        userTickets: Number(balance),
        lotteryEndTimestamp,
        mintWindowEndTimestamp,
        ytTokenAddress,
        ticketCost,
        rewardTokens: localRewardTokens,
        winner,
      };

      if (now > lotteryEndTimestamp) {
        kiln.status = Status.CLOSED;
        res.closedDraws.push(kiln);
      } else if (now > mintWindowEndTimestamp) {
        kiln.status = Status.LOCKED;
        res.clearingDraws.push(kiln);
      } else {
        kiln.status = Status.LIVE;
        res.liveDraws.push(kiln);
      }

      kilnIndex += 1;
    }

    return res;
  }, [kilns, dataUpdatedAt, config.fixedRewardTokens]);

  return {
    isPending,
    liveDraws: res.liveDraws,
    clearingDraws: res.clearingDraws,
    closedDraws: res.closedDraws,
    allRewardTokens: res.allRewardTokens,
  };
};
