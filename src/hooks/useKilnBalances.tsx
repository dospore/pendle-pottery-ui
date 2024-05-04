import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useAccount, useReadContracts } from "wagmi";
import kilnAbi from "../contracts/kilnAbi.json";

export const useKilnBalances = (kilnContractAddresses: string[], account?: string): UseReadContractsReturnType => {
  const balances = useMemo(
    () =>
      kilnContractAddresses.map((contract) => ({
        address: contract,
        abi: kilnAbi,
        functionName: "balanceOf",
        args: [account],
      })),
    [account, kilnContractAddresses],
  );

  return useReadContracts({
    contracts: balances,
  });
};
