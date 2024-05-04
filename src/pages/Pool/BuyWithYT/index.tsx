import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import MintSummary from "../../../components/MintSummary";
import TokenInput from "../../../components/TokenInput";
import { parseBigInt } from "../../../helpers/util";
import type { YTToken } from "../../../types/shared";

type Props = {
  onMint: (amount: bigint, callback?: () => void) => void;
  ytMintPending: boolean;
  ytMintError?: string;
  ytTokenSymbol: YTToken;
  ytTokenBalance?: bigint;
  ticketCost: bigint;
  disabled?: boolean;
  isLoading: boolean;
};

const BuyWithYT = ({
  ytTokenSymbol,
  ytTokenBalance,
  onMint,
  ytMintPending,
  ytMintError,
  ticketCost,
  disabled,
  isLoading,
}: Props) => {
  const [depositAmount, setDepositAmount] = useState<string | undefined>();

  const depositAmountBn = depositAmount ? parseBigInt(Number(depositAmount)) : BigInt(0);

  const mintDisabled =
    disabled ||
    ytMintPending ||
    !depositAmount ||
    !ytTokenBalance ||
    depositAmountBn === BigInt(0) ||
    depositAmountBn > ytTokenBalance;

  const onFinishMinting = () => {
    setDepositAmount(undefined);
  };

  return (
    <Box>
      <TokenInput
        value={depositAmount}
        setValue={setDepositAmount}
        selectedToken={ytTokenSymbol}
        tokenBalance={ytTokenBalance}
        disabled={disabled}
        isLoading={isLoading}
      />
      <Box mt={4} w="full">
        {ytMintError && (
          <Text fontSize="xs" color="red" mb={2}>
            {ytMintError}
          </Text>
        )}
        <MintSummary depositAmountBn={depositAmountBn} ytTokenSymbol={ytTokenSymbol} ticketCost={ticketCost} />
        <Button w="full" onClick={() => onMint(depositAmountBn, onFinishMinting)} isDisabled={mintDisabled}>
          {ytMintPending ? <Spinner /> : `Mint`}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyWithYT;
