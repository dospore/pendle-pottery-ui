import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useAccount, useReadContracts } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import type { YTTokenInfo } from "../types/shared";

export const useTokens = (
  tokens: string[],
  account?: string,
): {
  tokens: YTTokenInfo[];
  isPending: boolean;
} => {
  const calls = useMemo(
    () =>
      tokens.map((contract) => [
        {
          address: contract,
          abi: ytAbi,
          functionName: "symbol",
        },
        {
          address: contract,
          abi: ytAbi,
          functionName: "balanceOf",
          args: [account],
        },
      ]),
    [account, tokens],
  );

  const { data, isPending } = useReadContracts({
    contracts: calls.reduce((o, a) => o.concat(a), []),
  });

  return {
    tokens: data,
    isPending,
  };
};
