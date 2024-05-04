import { useChainId } from "wagmi";

import { createContext, useContext } from "react";
import { getConfig } from "../helpers/config";
import type { Children } from "../types/react";
import type { Config } from "../types/shared";

type State = {
  config: Config;
};

const ConfigContext = createContext<State | null>(null);

const ConfigProvider = ({ children }: Children) => {
  const chainId = useChainId();
  const config = getConfig(chainId);

  return (
    <ConfigContext.Provider
      value={{
        config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const useConfig = (): State => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw Error("Cannot consume context outside of ConfigProvider");
  }
  return context;
};

export { useConfig, ConfigContext };
export default ConfigProvider;
