import { readContract, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { useState } from "react";
import { useAccount } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";
import ytAbi from "../contracts/ytAbi.json";

import { config } from "../providers/web3";
import { abi } from "./abi";

export const useMint = (): {
  mint: (amount: bigint, kilnAddress: string) => void;
} => {
  const { address } = useAccount();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const mint = async (ytAmount: bigint, tickets: bigint, kilnAddress: string, ytAddress: string) => {
    setError("");
    if (!address) {
      setError("Failed to mint: Connect account");
      return;
    }
    setCalling(true);

    try {
      const allowance = await readContract(config, {
        abi: ytAbi,
        address: ytAddress,
        functionName: "allowance",
        args: [address, kilnAddress],
      }).catch((err) => {
        throw "Failed to fetch allowance";
      });

      if (allowance < ytAmount) {
        const approveRes = await writeContract(config, {
          abi: ytAbi,
          address: ytAddress,
          functionName: "approve",
          args: [kilnAddress, ytAmount],
        }).catch((err) => {
          throw "Failed to approve";
        });
      }

      const hash = await writeContract(config, {
        abi: kilnAbi,
        address: kilnAddress,
        functionName: "depositYT",
        args: [tickets],
      }).catch((err) => {
        throw "Failed to depositYT";
      });

      const result = await waitForTransactionReceipt(config, {
        hash,
      });
      console.debug("Finished depositing YT", result);
    } catch (err) {
      console.error("Failed to mint", err);
      setError(`Transaction failed: ${err}`);
    } finally {
      setCalling(false);
    }
  };

  return {
    mint,
    calling,
    error,
  };
};
