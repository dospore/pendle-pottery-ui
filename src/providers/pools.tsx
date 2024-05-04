import { createContext, useContext } from "react";
import { useAllDraws } from "../hooks/useAllDraws";
import { useRewardTokens } from "../hooks/useRewardTokens";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";
import type { TokenInfo } from "../types/shared";

type State = {
  liveDraws: Draw[];
  clearingDraws: Draw[];
  closedDraws: Draw[];
  isFetchingAllDraws: boolean;
  rewardTokens: Record<string, TokenInfo>;
  isFetchingRewardTokens: boolean;
};

const PoolsContext = createContext<State | null>(null);

const PoolsProvider = ({ children }: Children) => {
  const { liveDraws, clearingDraws, closedDraws, isPending: isFetchingAllDraws, allRewardTokens } = useAllDraws();
  const { tokenInfo: rewardTokens, isPending: isFetchingRewardTokens } = useRewardTokens(allRewardTokens);

  return (
    <PoolsContext.Provider
      value={{
        liveDraws,
        clearingDraws,
        closedDraws,
        isFetchingAllDraws,
        rewardTokens,
        isFetchingRewardTokens,
      }}
    >
      {children}
    </PoolsContext.Provider>
  );
};

const usePools = (): State => {
  const context = useContext(PoolsContext);
  if (context === null) {
    throw Error("Cannot consume context outside of PoolsProvider");
  }
  return context;
};

export { usePools, PoolsContext };
export default PoolsProvider;
