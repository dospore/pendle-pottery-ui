import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useAccount, useReadContracts } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";

export const useKilns = (
  kilnContractAddresses: string[],
  account?: string,
): {
  kilns: any[];
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
      ]),
    [account, kilnContractAddresses],
  );

  const { data, isPending, refetch } = useReadContracts({
    contracts: calls.reduce((o, a) => o.concat(a), []),
    multicallAddress: "0xca11bde05977b3631167028862be2a173976ca11",
  });

  return {
    kilns: data,
    isPending,
    refetch,
  };
};
