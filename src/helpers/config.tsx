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
      "0x6C7585eFe8ECE82548fe2BAC8bEcD98Ef26DFcb1",
      "0xF794411d61fDa4156566f685D3F61Ba49019e618",
      "0x816396d7B537d410D2e5A9A2351daA566002C649",
      "0x85BCC08BE776AEE910e1b36F1A7Ae39db696D8e7",
      "0xdc1caA5642578883f5BC5f6aB75119Bfd68b02d3",
      "0x2a8D2aC1EB91966f2b0d06dcEbdDB8D8109Cd471"
    ],
    depositTokens: [
      {
        address: "0x5B90C7a90925ea9A52F4646436e616C4D466019a",
        symbol: "USDC",
      },
    ],
  },
  [mantle.id]: {
    kilnAddresses: ["0xA9abe6Cc1342d73Dbfcd43F8bEBB4906F8A4AeCd"],
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
