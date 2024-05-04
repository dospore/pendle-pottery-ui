import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import type { TokenInfo } from "../types/shared";

export const useTokens = (
  tokens: string[],
  account?: string,
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
        {
          address: contract,
          abi: ytAbi,
          functionName: "balanceOf",
          args: [account],
        },
      ]),
    [account, tokens],
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
