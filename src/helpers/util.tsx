export const formatUsd = (n: bigint) => {
  return `$${formatBigInt(n).toLocaleString()}`;
};

// formats BigInt to 3 decimal places
export const formatBigInt = (n: bigint, decimals = 18, displayDecimals_ = 3): number => {
  const displayDecimals = 10 ** displayDecimals_;
  return Number((n * BigInt(displayDecimals)) / BigInt(10 ** decimals)) / displayDecimals;
};

export const shortenAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`;
