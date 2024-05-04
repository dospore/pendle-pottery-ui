import { createContext, useContext, useState } from "react";
// import { useDraws } from "../hooks/useDraws";
import type { Children } from "../types/react";

type State = {
  pastDraws: Draw[];
};

const HistoryContext = createContext<State | null>(null);

const HistoryProvider = ({ children }: Children) => {
  return (
    <HistoryContext.Provider
      value={{
        pastDraws: [],
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = (): State => {
  const context = useContext(HistoryContext);
  if (context === null) {
    throw Error("Cannot consume context outside of HistoryProvider");
  }
  return context;
};

export { useHistory, HistoryContext };
export default HistoryProvider;
