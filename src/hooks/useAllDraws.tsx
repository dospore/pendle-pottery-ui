import { useEffect, useMemo, useState } from "react";
import { useAccount, useBlockNumber } from "wagmi";
import { readContract } from '@wagmi/core'
import { useConfig } from "../providers/config";
import { Status } from "../types/lottery";
import { useKilns } from "./useKilns";
import kilnAbi from "../contracts/kilnAbi.json";

import type { Draw } from "../types/lottery";

const drawTime = Date.now() + 1000 * 1000;

type AllDraws = {
  liveDraws: Draw[];
  clearingDraws: Draw[];
  closedDraws: Draw[];
};

const MOCK_STATE = {
  liveDraws: [
    {
      id: 1,
      prizePool: BigInt(8900000000000000000),
      prizePoolUsd: BigInt(8900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 42000,
      players: 69,
      drawTime,
    },
  ],
  clearingDraws: [
    {
      id: 2,
      prizePool: BigInt(900000000000000000),
      prizePoolUsd: BigInt(900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 1600,
      players: 15,
      drawTime,
    },
  ],
  closedDraws: [
    {
      id: 420,
      prizePool: BigInt(900000000000000000),
      prizePoolUsd: BigInt(900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 1600,
      players: 15,
      drawTime,
    },
    {
      id: 69,
      prizePool: BigInt(900000000000000000),
      prizePoolUsd: BigInt(900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 1600,
      players: 15,
      drawTime,
    },
  ],
};

export const useAllDraws = (): AllDraws => {
  const { address } = useAccount();
  const { config } = useConfig();

  const { kilns } = useKilns(config.kilnAddresses, address);


  return useMemo(() => {
    const now = Date.now();

    // collate all of it to be state
    const res = {
      liveDraws: [],
      clearingDraws: [],
      closedDraws: [],
    };
    if (!kilns) {
      return res;
    }

    const l = 6;

    for (let i = 0; i < kilns.length; i += l) {
      const id = kilns[i].result;
      const lotteryEnd = kilns[i + 1].result;
      const mintWindowEnd = kilns[i + 2].result;
      const supply = kilns[i + 3].result;
      const balance = kilns[i + 4].result;
      const yt = kilns[i + 5].result;

      // const ytTokenSymbol = readContract(config, {
      //   abi: kilnAbi,
      //   address: yt,
      //   functionName: "symbol",
      // })

      const lotteryEndTimestamp = Number(lotteryEnd) * 1000;
      const mintWindowEndTimestamp = Number(mintWindowEnd) * 1000;

      const kiln = {
        id: Number(id),
        rewardTokens: ["ETH"],
        prizePool: BigInt(0),
        prizePoolUsd: BigInt(0),
        tickets: Number(supply),
        userTickets: Number(balance),
        ytAddress: yt,
        lotteryEndTimestamp,
        mintWindowEndTimestamp,
      };

      if (now > lotteryEndTimestamp) {
        kiln.status = Status.CLOSED;
        res.closedDraws.push(kiln);
      } else if (now > mintWindowEndTimestamp) {
        kiln.status = Status.CLEARING;
        res.clearingDraws.push(kiln);
      } else {
        kiln.status = Status.LIVE;
        res.liveDraws.push(kiln);
      }
    }

    return res;
  }, [kilns]);
};
