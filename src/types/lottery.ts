import type { YTToken } from "./shared";

export enum Status {
    CLEARING = "clearing",
    LIVE = "live",
    CLOSED = "closed",
}

export type Draw = {
    status: Status;
    kilnAddress: string;

    prizePool: bigint;
    prizePoolUsd: bigint;
    rewardTokens: string[];
    players: number;
    tickets: number;

    drawTime: number;
    lotteryEndTimestamp: number;
    mintWindowEndTimestamp: number;

    ticketCost: bigint;

    userTickets?: number;

    ytTokenAddress: string;
    ytTokenSymbol: YTToken;
    ytTokenBalance?: bigint;
};
