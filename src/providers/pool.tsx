import { createContext, useContext, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import { useYTToken } from "../hooks/useYTToken";
import { useMint } from "../hooks/useMint";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

type State = Draw & {
  mint: () => void,
  ytMintPending: boolean,
  ytMintError?: string
}

const PoolContext = createContext<Draw | null>(null);

const PoolProvider = ({ children }: Children) => {
  const draw = useDraw();
  const ytTokenInfo = useYTToken(draw.ytTokenAddress);
  const { mint, calling: ytMintPending, error: ytMintError } = useMint();

  const onMint = (ytAmount: bigint) => {
    const tickets = ytAmount / draw.ticketPrice;
    mint(tickets, draw.address);
  }

  return (
    <PoolContext.Provider
      value={{
        status: draw.status,
        address: draw.address,

        prizePool: draw.prizePool,
        prizePoolUsd: draw.prizePoolUsd,
        rewardTokens: draw.rewardTokens,
        players: draw.players,
        tickets: draw.tickets,

        lotteryEndTimestamp: draw.lotteryEndTimestamp,
        mintWindowEndTimestamp: draw.mintWindowEndTimestamp,

        userTickets: draw.userTickets,

        ytTokenAddress: draw.ytTokenAddress,
        ytTokenSymbol: ytTokenInfo.symbol,
        ytTokenBalance: ytTokenInfo.balance,

        onMint,
        ytMintPending,
        ytMintError
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};

const usePool = (): State => {
  const context = useContext(PoolContext);
  if (context === null) {
    throw Error("Cannot consume context outside of PoolProvider");
  }
  return context;
};

export { usePool, PoolContext };
export default PoolProvider;
