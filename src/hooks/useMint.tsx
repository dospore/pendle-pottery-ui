import { useState } from "react";
import { useWriteContract } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";
import ytAbi from "../contracts/ytAbi.json";

export const useMint = (): {
  mint: (amount: bigint, kilnAddress: string) => void;
} => {
  const { writeContractAsync } = useWriteContract();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const mint = async (ytAmount: bigint, tickets: bigint, kilnAddress: string, ytAddress: string) => {
    console.log(ytAmount, tickets, kilnAddress, ytAddress);
    setCalling(true);

    const approveRes = await writeContractAsync({
      abi: ytAbi,
      address: ytAddress,
      functionName: "approve",
      args: [kilnAddress, ytAmount],
    })

    const res = await writeContractAsync({
      abi: kilnAbi,
      address: kilnAddress,
      functionName: "depositYT",
      args: [tickets],
    })
      .catch((err) => {
        console.log("error", err);
        setError("Transaction failed");
      })
      .finally(() => {
        setCalling(false);
      });
    console.log("Finished depositing YT", res);
  };

  return {
    mint,
    calling,
    error,
  };
};
