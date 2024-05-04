import { arbitrum, arbitrumSepolia, base, mainnet, mantle } from "wagmi/chains";
import type { Config, SupportedNetwork } from "../types/shared";

export const chainConfig: Record<SupportedNetwork, Config> = {
  [arbitrum.id]: {
    kilnAddresses: ["0x9a36fB56a435f449e66738f88520091929Da5f2a"],
    depositTokens: [
      {
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        symbol: "USDC",
      },
    ],
    fixedRewardTokens: [
      '0x0341c0c0ec423328621788d4854119b97f44e391' // silo
    ]
  },
  [arbitrumSepolia.id]: {
    kilnAddresses: [
      // "0x6C7585eFe8ECE82548fe2BAC8bEcD98Ef26DFcb1",
      // "0xF794411d61fDa4156566f685D3F61Ba49019e618",
      // "0x816396d7B537d410D2e5A9A2351daA566002C649",
      // "0x85BCC08BE776AEE910e1b36F1A7Ae39db696D8e7",
      // "0xdc1caA5642578883f5BC5f6aB75119Bfd68b02d3",
      // "0x2a8D2aC1EB91966f2b0d06dcEbdDB8D8109Cd471",
      // "0xd602ca529298C6330fA1E0499DF4fa6049d8E759",
      // "0x383796d723CF386465ebDd917a757fd2F655acfB",
      // "0x61503351f55747d5A88fE8CDbaCC46F1a09461fD",
      // "0x4633394E4Fd1175273845d7F0d6A5F613309d384",
      "0xE83A6b768ae014CB0dC9976648dA6C0a4B7595A6",
    ],
    depositTokens: [
      {
        address: "0x5B90C7a90925ea9A52F4646436e616C4D466019a",
        symbol: "USDC",
      },
    ],
  },
  [mantle.id]: {
    kilnAddresses: ["0x411B96a921d9d6e7fDd334fa3aBea6cc2bd6eC87"],
    depositTokens: [
      {
        address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
        symbol: "USDC",
      },
    ],
    fixedRewardTokens: [
      '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34' // usde
    ]
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
