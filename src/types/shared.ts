import { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";

export type Token = "string";
export type YTToken = "string";

export type TokenInfo = {
  address: string;
  symbol: string;
  balance?: bigint;
};

// arbitrum sepoila, arb mainnet, mantle, base
export type SupportedNetwork = typeof arbitrum.id | typeof arbitrumSepolia.id | typeof mantle.id | typeof base.id;

export type Config = {
  chainId: SupportedNetwork;
  kilnAddresses: string[];
  depositAddresses: {
    address: string;
    symbol: string;
  }[];
};
