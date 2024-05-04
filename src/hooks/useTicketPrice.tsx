import { readContract } from '@wagmi/core'
import kilnAbi from "../contracts/kilnAbi.json";
import { useConfig } from "../providers/config";

export const useTicketPrice = () => {
  // const { writeContractAsync } = useWriteContract();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const mint = async (kilnAddress: string) => {
    setCalling(true);
    const { config } = useConfig();

    const res = await readContract(config, {
      abi: kilnAbi,
      address: kilnAddress,
      functionName: "ticketCost",
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
