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
      functionName: "transferFrom",
      args: [],
    })
      .catch((err) => {
        setError("Transaction failed");
      })
      .finally(() => {
        setCalling(false);
      });
  };

  return {
    mint,
    calling,
  };
};
