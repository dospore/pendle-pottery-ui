import { useEffect, useMemo, useState } from "react";
import { useReadContract } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import { delay } from "../helpers/time";
import { formatBigInt } from "../helpers/util";

const SECONDS_IN_YEAR = 60 * 60 * 24 * 365;

export const usePrizePool = (
  ytToken: address,
  kilnAddress: string,
  yieldDuration: number,
): {
  prize: bigint;
  prizeUsd: bigint;
} => {
  const [apr, setApr] = useState();
  const [ytTokenPrice, setYTTokenPrice] = useState();

  const {
    data: ytBalance,
    isPending,
    refetch,
  } = useReadContract({
    abi: ytAbi,
    address: ytToken,
    functionName: "balanceOf",
    args: [kilnAddress],
  });

  useEffect(() => {
    // TODO fetch yield bearing token apr fetchApr(ytToken);
    // TODO fetch yield bearing token price fetchTokenPrice(ytToken);
    delay(2000).then(() => {
      // hardcoded to 0.05
      setApr(0.05);
      // hardcoded to $1
      setYTTokenPrice(1);
    });
  }, []);

  const ytPrize = useMemo(() => {
    if (!ytBalance) {
      return {
        returns: BigInt(0),
        returnsUsd: BigInt(0),
      };
    }

    const principal = formatBigInt(ytBalance);
    const returns = principal * (1 + (apr * yieldDuration) / SECONDS_IN_YEAR) - principal;
    const returnsUsd = returns * ytTokenPrice;

    return {
      returns,
      returnsUsd,
    };
  }, [apr, ytTokenPrice, ytBalance]);

  return {
    prize: ytPrize.returns,
    prizeUsd: ytPrize.returnsUsd,
    isPending: isPending || !apr || !ytTokenPrice,
    refetch,
  };
};
