import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import ChakraProvider from "./providers/chakra";
import ConfigProvider from "./providers/config";
import Web3Provider from "./providers/web3";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
);
