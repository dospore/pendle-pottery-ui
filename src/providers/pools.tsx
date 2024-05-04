import { createContext, useContext, useState } from "react";
import { useAllDraws } from "../hooks/useAllDraws";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

type State = {
  liveDraws: Draw[];
  upcomingDraws: Draw[];
  closedDraws: Draw[];
};

const PoolsContext = createContext<State | null>(null);

const PoolsProvider = ({ children }: Children) => {
  const { liveDraws, upcomingDraws, closedDraws } = useAllDraws();

  return (
    <PoolsContext.Provider
      value={{
        liveDraws,
        upcomingDraws,
        closedDraws,
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
