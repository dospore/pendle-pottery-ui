import { useMemo } from "react";
import { useAccount } from "wagmi";
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
