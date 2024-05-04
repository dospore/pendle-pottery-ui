export const formatUsd = (n: bigint) => {
  return `$${formatBigInt(n).toLocaleString()}`;
};

// formats BigInt to 3 decimal places
export const formatBigInt = (n: bigint, decimals = 18, displayDecimals_ = 3): number => {
  const displayDecimals = 10 ** displayDecimals_;
  return Number((n * BigInt(displayDecimals)) / BigInt(10 ** decimals)) / displayDecimals;
};

export const parseBigInt = (n: number, decimals = 18): bigint => {
  // was getting overflow on things like BigInt(3444.99 * 10**18) so created this to bypass that
  const numSplit = n.toString().split(".");
  if (numSplit.length === 1) {
    return BigInt(Number(numSplit[0])) * BigInt(10 ** decimals);
  }
  const numDecimals = numSplit[1].length;

  const lhs = Number(numSplit[0]);
  const rhs = Number(numSplit[1]);

  return (BigInt(lhs * 10 ** numDecimals) + BigInt(rhs)) * BigInt(10 ** (decimals - numDecimals));
};

export const shortenAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;
