import { useState } from "react";
import { useWriteContract } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";

export const useMint = (): {
  mint: (amount: bigint, kilnAddress: string) => void;
} => {
  const { writeContractAsync } = useWriteContract();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const mint = async (amount: bigint, kilnAddress: string) => {
    setCalling(true);

    const res = await writeContractAsync({
      abi: kilnAbi,
      address: kilnAddress,
      functionName: "depositYT",
      args: [amount],
    })
      .catch((err) => {
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
    error
  };
};
