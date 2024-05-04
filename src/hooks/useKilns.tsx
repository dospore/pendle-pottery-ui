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
      ]),
    [account, kilnContractAddresses],
  );

  const { data, isPending } = useReadContracts({
    contracts: calls.reduce((o, a) => o.concat(a), []),
  });

  return {
    kilns: data,
    isPending,
  };
};
