import type { Draw } from "../types/lottery";

const drawTime = Date.now() + 1000 * 1000;

export const useDraws = (): {
  jackpot: Draw;
  miniJackpot: Draw;
  remainingDraws: Draw[];
} => {
  // TODO

  return {
    jackpot: {
      id: 1,
      prizePool: BigInt(8900000000000000000),
      prizePoolUsd: BigInt(8900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 42000,
      players: 69,
      drawTime,
    },
    miniJackpot: {
      id: 2,
      prizePool: BigInt(900000000000000000),
      prizePoolUsd: BigInt(900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 1600,
      players: 15,
      drawTime,
    },
    remainingDraws: [
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
