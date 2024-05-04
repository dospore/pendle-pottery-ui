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
} => {
  const { address } = useAccount();

  const { tokens, isPending } = useTokens([ytToken], address);

  return useMemo(() => {
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
    };
  }, [tokens]);
};
