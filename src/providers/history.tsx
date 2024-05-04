import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import { useAllDraws } from "../hooks/useAllDraws";
import type { Draw } from "../types/lottery";
import type { Children } from "../types/react";

type State = {
  closedDraws: Draw[];
  isFetchingDraws: boolean;
  filterForAccount: boolean;
  toggleFilterForAccount: () => void;
};

const HistoryContext = createContext<State | null>(null);

const HistoryProvider = ({ children }: Children) => {
  const { closedDraws, isPending: isFetchingDraws } = useAllDraws();
  const { isOpen: filterForAccount, onToggle: toggleFilterForAccount } = useDisclosure();

  const filteredDraws = filterForAccount ? closedDraws.filter((d) => d.userTickets && d.userTickets > 0) : closedDraws;

  return (
    <HistoryContext.Provider
      value={{
        closedDraws: filteredDraws,
        isFetchingDraws,
        filterForAccount,
        toggleFilterForAccount,
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
