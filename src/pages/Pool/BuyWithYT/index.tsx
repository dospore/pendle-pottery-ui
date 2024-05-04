import { Box, useDisclosure, Button } from "@chakra-ui/react";
import { useState } from "react";
import { parseBigInt } from '../../../helpers/util';
import TokenInput from "../../../components/TokenInput";
import TokenSelectModal from "../../../components/TokenSelectModal";

type Props = {
  onMint: (amount: bigint) => void;
  ytMintPending: boolean;
  ytMintError?: string;
  ytTokenSymbol: YTToken;
  ytTokenBalance: bigint;
  disabled?: boolean;
};

const MOCK_TOKENS = [
  {
    token: "dai",
    balance: BigInt(8900000000000000000),
  },
  {
    token: "usdc",
    balance: BigInt(8900000000000000000),
  },
  {
    token: "weth",
    balance: BigInt(8900000000000000000),
  },
];

const BuyWithYT = ({ ytTokenSymbol, ytTokenBalance, onMint, ytMintPending, ytMintError, disabled }: Props) => {
  const [depositAmount, setDepositAmount] = useState<string | undefined>();

  const depositAmountBn = depositAmount ? parseBigInt(depositAmount) : BigInt(0);

  const mintDisabled = 
    disabled ||
    ytMintPending ||
    !depositAmount ||
    depositAmountBn === BigInt(0) ||
    (depositAmountBn > ytTokenBalance);

  return (
    <Box>
      <TokenInput
        value={depositAmount}
        setValue={setDepositAmount}
        selectedToken={ytTokenSymbol}
        tokenBalance={ytTokenBalance}
        disabled={disabled}
      />
      <Box mt={4} w="full">
        {ytMintError && <Text fontSize="xs" color="red" mb={2}>{ytMintError}</Text>}
        <Button w="full" onClick={() => onMint(depositAmount)} isDisabled={mintDisabled}>
          Mint
        </Button>
      </Box>
    </Box>
  );
};

export default BuyWithYT;
