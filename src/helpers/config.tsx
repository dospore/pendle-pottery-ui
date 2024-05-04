import { arbitrum, arbitrumSepolia, base, mainnet, mantle } from "wagmi/chains";
import type { Config, SupportedNetwork } from "../types/shared";

export const chainConfig: Record<SupportedNetwork, Config> = {
  [arbitrum.id]: {
    kilnAddresses: [],
    depositTokens: [
      {
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        symbol: "USDC",
      },
    ],
  },
  [arbitrumSepolia.id]: {
    kilnAddresses: [
      // "0x6C83Eb8daA2ed7970b3e158D8820139fC6721704",
      // "0xa272c0e31814Bf86E60Df80BF2e8F7fEC66deCdD",
      // "0xa12CEB573742e5e5408e33d4746B15308F7C4500",
      // "0x43D290013129C59Cd8A55eD5cda8a82356C2Eb93",
      "0x6C7585eFe8ECE82548fe2BAC8bEcD98Ef26DFcb1",
    ],
    depositTokens: [
      {
        address: "0x5B90C7a90925ea9A52F4646436e616C4D466019a",
        symbol: "USDC",
      },
    ],
  },
  [mantle.id]: {
    kilnAddresses: [],
    depositTokens: [
      {
        address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
        symbol: "USDC",
      },
    ],
  },
  [base.id]: {
    kilnAddresses: [],
    depositTokens: [
      {
        address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        symbol: "USDC",
      },
    ],
  },
};

const emptyConfig: Config = {
  kilnAddresses: [],
  depositTokens: [],
};

export const getConfig = (chainId: number) => {
  const config = chainConfig[chainId];
  if (!config) {
    console.debug(`Chain id ${chainId} not supported`);
    return emptyConfig;
  }
  return config;
};
