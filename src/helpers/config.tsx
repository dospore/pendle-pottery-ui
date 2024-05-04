import { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";
import type { SupportedNetwork } from "../types/shared";

export const chainConfig: Record<SupportedNetwork, Config> = {
  [arbitrum]: {
    kilnAddresses: [],
  },
  [arbitrumSepolia]: {
    kilnAddresses: [],
  },
  [mantle]: {
    kilnAddresses: [],
  },
  [base]: {
    kilnAddresses: [],
  },
};

const emptyConfig: Config = {
  kilnAddresses: [],
};

export const getConfig = (chainId: number) => {
  const config = chainConfig[chainId];
  if (!config) {
    console.log(`Chain id ${chainId} not supported`);
    return emptyConfig;
  }
  return config;
};
