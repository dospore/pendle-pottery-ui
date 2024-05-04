import type { Draw } from "../types/lottery";

const drawTime = Date.now() + 1000 * 1000;

export const useDraw = (): {
  draw: Draw;
} => {
  // TODO

  return {
    draw: {
      id: 1,
      prizePool: BigInt(8900000000000000000),
      prizePoolUsd: BigInt(8900000000000000000),
      rewardTokens: ["ETH"],
      tickets: 42000,
      players: 69,
      drawTime,
      ytTokenSymbol: "dai",
      ytTokenBalance: BigInt(696900000000000000000),
    },
  };
};
