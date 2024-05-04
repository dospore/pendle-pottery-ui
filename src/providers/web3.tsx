import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { http, WagmiProvider, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [arbitrum, arbitrumSepolia, mantle, base],
    transports: {
      // RPC URL for each chain
      [arbitrum.id]: http(import.meta.env.VITE_PUBLIC_ARBITRUM_RPC),
      [arbitrumSepolia.id]: http(import.meta.env.VITE_PUBLIC_ARBITRUM_SEPOLIA_RPC),
      [base.id]: http(import.meta.env.VITE_PUBLIC_BASE_RPC),
      [mantle.id]: http(import.meta.env.VITE_PUBLIC_MANTLE_RPC),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Pottery",

    // Optional App Info
    appDescription: "Pendle Yield Lottery",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
