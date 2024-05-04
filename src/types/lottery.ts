export enum Status {
  CLEARING = "clearing",
  LIVE = "live",
  CLOSED = "closed",
}

export type Draw = {
  status: Status;

  prizePool: bigint;
  prizePoolUsd: bigint;
  rewardTokens: string[];
  players: number;
  tickets: number;

  drawTime: number;
  lotteryEndTimestamp: number;
  mintWindowEndTimestamp: number;

  userTickets?: number;

  ytTokenSymbol: YTToken;
  ytTokenBalance?: bigint;
};
