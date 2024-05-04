import { useMemo } from "react";
import type { TokenInfo } from "../types/shared";
import { useTokenSymbols } from "./useTokenSymbols";

export const useRewardTokens = (
  rewardTokens: string[],
): {
  tokenInfo: Record<string, TokenInfo>;
  isPending: boolean;
  refetch: () => void;
} => {
  const { tokens, isPending, refetch } = useTokenSymbols(rewardTokens);

  const tokenInfo = useMemo(() => {
    const res = {};
    if (!tokens) {
      return res;
    }

    for (let i = 0; i < tokens.length; i++) {
      const address = rewardTokens[i];
      res[address] = {
        symbol: tokens[i].result,
        address: rewardTokens[i],
      };
    }

    return res;
  }, [tokens, rewardTokens]);

  return {
    tokenInfo,
    isPending: rewardTokens.length && isPending,
    refetch,
  };
};
