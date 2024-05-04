import { http, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia, base, mantle],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Pottery Lottery" }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [base.id]: http(),
    [mantle.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
