import { useEffect, useMemo, useState } from "react";
import { useReadContract } from "wagmi";
import ytAbi from "../contracts/ytAbi.json";
import { delay } from "../helpers/time";
import { parseBigInt } from "../helpers/util";

const MILLI_SECONDS_IN_YEAR = BigInt(60 * 60 * 24 * 365 * 1000);

export const usePrizePool = (
  ytToken: string,
  kilnAddress: string,
  yieldDuration: number,
): {
  prize: bigint;
  prizeUsd: bigint;
  isPending: boolean;
  refetch: () => void;
} => {
  const [apr, setApr] = useState<bigint | undefined>();
  const [ytTokenPrice, setYTTokenPrice] = useState<bigint | undefined>();

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
      // hardcoded to 5%
      setApr(BigInt(100000));
      // hardcoded to $100
      setYTTokenPrice(parseBigInt(100));
    });
  }, []);

  const ytPrize = useMemo(() => {
    if (!ytBalance || !apr || !ytTokenPrice) {
      return {
        returns: BigInt(0),
        returnsUsd: BigInt(0),
      };
    }

    const principal: bigint = ytBalance;
    const returnsInYear = (principal * apr) / BigInt(100);
    const percentOfYear = (BigInt(yieldDuration) * BigInt(10 ** 18)) / MILLI_SECONDS_IN_YEAR;
    const returns: bigint = (returnsInYear * percentOfYear) / BigInt(10 ** 18);
    const returnsUsd: bigint = (returns * ytTokenPrice) / BigInt(10 ** 18);

    return {
      returns: returns,
      returnsUsd: returnsUsd,
    };
  }, [apr, ytTokenPrice, ytBalance]);

  return {
    prize: ytPrize.returns,
    prizeUsd: ytPrize.returnsUsd,
    isPending: isPending || !apr || !ytTokenPrice,
    refetch,
  };
};
