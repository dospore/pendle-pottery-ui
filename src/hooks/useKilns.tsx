import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";

export const useKilns = (
  kilnContractAddresses: string[],
  account?: string,
): {
  kilns: any[];
  refetch: () => void;
  dataUpdatedAt: numberl;
  isPending: boolean;
} => {
  const calls = useMemo(
    () =>
      kilnContractAddresses.map((contract) => [
        {
          address: contract,
          abi: kilnAbi,
          functionName: "ID",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "lotteryEnd",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "mintWindowEnd",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "ticketIdCounter",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "balanceOf",
          args: [account],
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "yt",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "ticketCost",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "getRewardTokens",
        },
        {
          address: contract,
          abi: kilnAbi,
          functionName: "calculateWinner",
        },
      ]),
    [account, kilnContractAddresses],
  );

  const { data, isFetching, isPending, refetch, dataUpdatedAt } = useReadContracts({
    contracts: calls.reduce((o, a) => o.concat(a), []),
    multicallAddress: "0xca11bde05977b3631167028862be2a173976ca11",
    query: {
      refetchInterval: 5 * 1000,
    },
  });

  return {
    kilns: data,
    isPending,
    refetch,
    dataUpdatedAt,
  };
};
