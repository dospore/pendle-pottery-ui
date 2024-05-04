import { createContext, useContext } from "react";
import { useDraws } from "../hooks/useDraws";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

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
