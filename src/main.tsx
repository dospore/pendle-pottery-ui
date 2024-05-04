import React from "react";
import ReactDOM from "react-dom/client";
import ChakraProvider from "./providers/chakra";
import ConfigProvider from "./providers/config";
import Web3Provider from "./providers/web3";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

// import "@fontsource/inter";
// import "@fontsource-variable/inter";
// import "@fontsource-variable/inter/wght.css"; // Specify axis

import "@fontsource-variable/oswald";

import "./index.css";

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
