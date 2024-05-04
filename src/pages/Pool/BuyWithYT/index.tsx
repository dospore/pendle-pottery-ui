import { Box, Button, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import MintSummary from "../../../components/MintSummary";
import TokenInput from "../../../components/TokenInput";
import TokenSelectModal from "../../../components/TokenSelectModal";
import { parseBigInt } from "../../../helpers/util";

type Props = {
  onMint: (amount: bigint) => void;
  ytMintPending: boolean;
  ytMintError?: string;
  ytTokenSymbol: YTToken;
  ytTokenBalance: bigint;
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

  const depositAmountBn = depositAmount ? parseBigInt(depositAmount) : BigInt(0);

  const mintDisabled =
    disabled || ytMintPending || !depositAmount || depositAmountBn === BigInt(0) || depositAmountBn > ytTokenBalance;

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
        <Button w="full" onClick={() => onMint(depositAmount, onFinishMinting)} isDisabled={mintDisabled}>
          {ytMintPending ? <Spinner /> : `Mint`}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyWithYT;
