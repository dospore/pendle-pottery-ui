import type { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";

export type Token = "string";
export type YTToken = "string";

// arbitrum sepoila, arb mainnet, mantle, base
export type SupportedNetwork = arbitrum | arbitrumSepolia | mantle | base;

export type Config = {
  chainId: SupportedNetwork;
  kilnAddresses: string[];
};
