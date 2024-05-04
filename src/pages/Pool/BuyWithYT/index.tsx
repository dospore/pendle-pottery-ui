import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import TokenInput from "../../../components/TokenInput";
import TokenSelectModal from "../../../components/TokenSelectModal";

type Props = {
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

const BuyWithYT = ({ ytTokenSymbol, ytTokenBalance, disabled }: Props) => {
  const [depositAmount, setDepositAmount] = useState<string | undefined>();

  console.log("disabled", disabled);

  return (
    <Box>
      <TokenInput
        value={depositAmount}
        setValue={setDepositAmount}
        selectedToken={ytTokenSymbol}
        tokenBalance={ytTokenBalance}
        disabled={disabled}
      />
    </Box>
  );
};

export default BuyWithYT;
