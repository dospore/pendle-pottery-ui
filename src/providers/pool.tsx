import { createContext, useContext, useState } from "react";
import { parseBigInt } from "../helpers/util";
import { useDepositTokens } from "../hooks/useDepositTokens";
import { useDraw } from "../hooks/useDraw";
import { useMint } from "../hooks/useMint";
import { useYTToken } from "../hooks/useYTToken";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";
import type { TokenInfo } from "../types/shared";

type State = Draw & {
  mint: () => void;
  ytMintPending: boolean;
  ytMintError?: string;
  depositTokens: TokenInfo[];
};

const PoolContext = createContext<State | null>(null);

const PoolProvider = ({ children }: Children) => {
  const draw = useDraw();
  const { tokenInfo: depositTokens, refetch: depositTokenRefetch } = useDepositTokens();
  const { tokenInfo: ytTokenInfo, refetch: ytTokenRefetch } = useYTToken(draw.ytTokenAddress);
  const { mint, calling: ytMintPending, error: ytMintError } = useMint();

  console.log("de", depositTokens);

  const onMint = async (ytAmount: bigint) => {
    const ytAmountBn = parseBigInt(ytAmount);
    const tickets = ytAmountBn / draw.ticketCost;

    mint(ytAmountBn, tickets, draw.kilnAddress, draw.ytTokenAddress)
      .then(() => {
        ytTokenRefetch();
      })
      .catch((err) => {
        console.debug("Failed to mint", err);
      });
  };

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
        ytMintError,

        depositTokens,
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
