import { useEffect, useState } from "react";
import { type BaseError, useAccount, useReadContracts } from "wagmi";
import { useKilnBalances } from "./useKilnBalances";

import type { Draw } from "../types/lottery";

const drawTime = Date.now() + 1000 * 1000;

type State = {
  liveDraws: Draw[];
  upcomingDraws: Draw[];
  closedDraws: Draw[];
};

const fetchDraws = async (): Promise<State> => {
  return {
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
    upcomingDraws: [
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
};

const kilnContractAddresses = ["0xecb504d39723b0be0e3a9aa33d646642d1051ee1"];

export const useAllDraws = (): State => {
  const { address } = useAccount();
  const balances = useKilnBalances(kilnContractAddresses, address);

  const [draws, setDraws] = useState<State>({
    liveDraws: [],
    upcomingDraws: [],
    closedDraws: [],
  });

  // this useEffect runs once on browser mount
  useEffect(() => {
    fetchDraws()
      .then((allDraws) => {
        setDraws(allDraws);
      })
      .catch((err) => {
        console.log("Failed to fetch draws");
      });
  }, []);

  return draws;
};
