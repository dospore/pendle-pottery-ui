import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import TokenInput from "../../../components/TokenInput";
import TokenSelectModal from "../../../components/TokenSelectModal";

type Props = {};

const MOCK_TOKENS = [
  {
    token: "weth",
    balance: BigInt(8900000000000000000),
  },
  {
    token: "dai",
    balance: BigInt(8900000000000000000),
  },
  {
    token: "usdc",
    balance: BigInt(8900000000000000000),
  },
];

const BuyWithTokens = ({}: Props) => {
  const {
    isOpen: isTokenSelectModalOpen,
    onOpen: onTokenSelectModalOpen,
    onClose: onTokenSelectModalClose,
  } = useDisclosure();
  const [depositAmount, setDepositAmount] = useState<string | undefined>();
  const [selectedToken, setSelectedToken] = useState<Token | undefined>();
  const tokenBalance = BigInt(8900000000000000000);

  const onTokenSelect = (token: Token) => {
    setSelectedToken(token);
    onTokenSelectModalClose();
  };

  return (
    <Box>
      <TokenInput
        selectedToken={selectedToken}
        onTokenSelect={onTokenSelectModalOpen}
        value={depositAmount}
        setValue={setDepositAmount}
        tokenBalance={tokenBalance}
      />
      <TokenSelectModal
        isOpen={isTokenSelectModalOpen}
        onClose={onTokenSelectModalClose}
        tokens={MOCK_TOKENS}
        onTokenSelect={onTokenSelect}
      />
    </Box>
  );
};

export default BuyWithTokens;
