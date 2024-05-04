import { useEffect, useMemo, useState } from "react";
import { type BaseError, type UseReadContractsReturnType, useAccount } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import { useConfig } from "../providers/config";
import type { TokenInfo } from "../types/shared";
import { useTokens } from "./useTokens";

export const useDepositTokens = (): {
  tokenInfo: TokenInfo[];
  isPending: boolean;
  refetch: () => void;
} => {
  const { address } = useAccount();
  const config = useConfig();
  const depositTokens = config.depositTokens;

  const { tokens, isPending, refetch } = useTokens(
    depositTokens.map((t) => t.address),
    address,
  );

  const tokenInfo = useMemo(() => {
    const res = [];
    if (!tokens) {
      return res;
    }

    const l = 2;
    let tokenIndex = 0;
    for (let i = 0; i < tokens.length; i += l) {
      const tokenInfo = {
        symbol: depositTokens[i].symbol,
        address: depositTokens[i].address,
        balance: tokens[i + 1].result,
      };

      res.push(tokenInfo);
      tokenIndex += 1;
    }

    return {
      symbol: tokens[0].result,
      address: ytToken,
      balance: tokens[1].result,
    };
  }, [tokens, depositTokens]);

  return {
    tokenInfo,
    isPending,
    refetch,
  };
};
