import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useReadContracts } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import type { TokenInfo } from "../types/shared";

export const useTokenSymbols = (
  tokens: string[],
): {
  tokens: TokenInfo[];
  isPending: boolean;
  refetch: () => void;
} => {
  const calls = useMemo(
    () =>
      tokens.map((contract) => [
        {
          address: contract,
          abi: ytAbi,
          functionName: "symbol",
        },
      ]),
    [tokens],
  );

  const { data, isPending, refetch } = useReadContracts({
    contracts: calls.reduce((o, a) => o.concat(a), []),
    multicallAddress: "0xca11bde05977b3631167028862be2a173976ca11",
  });

  return {
    tokens: data,
    isPending,
    refetch,
  };
};
