import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useAccount } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import type { TokenInfo } from "../types/shared";
import { useTokens } from "./useTokens";

export const useYTToken = (
  ytToken: string,
): {
  tokenInfo: TokenInfo;
  isPending: boolean;
  refetch: () => void;
} => {
  const { address } = useAccount();

  const { tokens, isPending, refetch } = useTokens([ytToken], address);

  const tokenInfo = useMemo(() => {
    if (!tokens) {
      return {
        symbol: "",
        address: "",
        balance: BigInt(0),
      };
    }
    return {
      symbol: tokens[0].result,
      address: ytToken,
      balance: tokens[1].result,
      refetch,
    };
  }, [tokens, refetch]);

  return {
    tokenInfo,
    isPending,
    refetch,
  };
};
