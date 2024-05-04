export type Draw = {
  prizePool: bigint;
  prizePoolUsd: bigint;
  rewardTokens: string[];
  players: number;
  tickets: number;
  drawTime: number;
  userTickets?: number;
};
