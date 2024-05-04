import { createContext, useContext, useState } from "react";
import { useAllDraws } from "../hooks/useAllDraws";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

type State = {
  liveDraws: Draw[];
  clearingDraws: Draw[];
  closedDraws: Draw[];
  isFetchingAllDraws: boolean;
};

const PoolsContext = createContext<State | null>(null);

const PoolsProvider = ({ children }: Children) => {
  const { liveDraws, clearingDraws, closedDraws, isPending: isFetchingAllDraws } = useAllDraws();

  return (
    <PoolsContext.Provider
      value={{
        liveDraws,
        clearingDraws,
        closedDraws,
        isFetchingAllDraws,
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
