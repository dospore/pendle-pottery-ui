import { createContext, useContext, useState } from "react";
import { useDraw } from "../hooks/useDraw";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

type State = {
  draw: Draw;
};

const PoolContext = createContext<State | null>(null);

const PoolProvider = ({ children }: Children) => {
  const { draw } = useDraw();

  return (
    <PoolContext.Provider
      value={{
        draw,
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
