import { createContext, useContext, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useDraws } from "../hooks/useDraws";
import type { Children } from "../types/react";
import { IntlCurrency, TimeFilterRange } from "../types/shared";

type State = {
  jackpot: Draw;
  miniJackpot: Draw;
  remainingDraws: Draw[];
};

const TicketsContext = createContext<State | null>(null);

const TicketsProvider = ({ children }: Children) => {
  const { jackpot, miniJackpot, remainingDraws } = useDraws();

  return (
    <TicketsContext.Provider
      value={{
        jackpot,
        miniJackpot,
        remainingDraws,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

const useTickets = (): State => {
  const context = useContext(TicketsContext);
  if (context === null) {
    throw Error("Cannot consume context outside of TicketsProvider");
  }
  return context;
};

export { useTickets, TicketsContext };
export default TicketsProvider;
