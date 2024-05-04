import { arbitrum, arbitrumSepolia, base, mainnet, mantle } from "wagmi/chains";
import type { SupportedNetwork } from "../types/shared";

export const chainConfig: Record<SupportedNetwork, Config> = {
  [arbitrum.id]: {
    kilnAddresses: [],
  },
  [arbitrumSepolia.id]: {
    kilnAddresses: ["0x6C83Eb8daA2ed7970b3e158D8820139fC6721704"],
  },
  [mantle.id]: {
    kilnAddresses: [],
  },
  [base.id]: {
    kilnAddresses: [],
  },
};

const emptyConfig: Config = {
  kilnAddresses: [],
};

export const getConfig = (chainId: number) => {
  const config = chainConfig[chainId];
  if (!config) {
    console.debug(`Chain id ${chainId} not supported`);
    return emptyConfig;
  }
  return config;
};
