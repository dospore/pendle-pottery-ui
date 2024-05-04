import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import TokenInput from "../../../components/TokenInput";
import TokenSelectModal from "../../../components/TokenSelectModal";
import type { TokenInfo } from "../../../types/shared";

type Props = {
  depositTokens: TokenInfo[];
};

const BuyWithTokens = ({ depositTokens }: Props) => {
  const {
    isOpen: isTokenSelectModalOpen,
    onOpen: onTokenSelectModalOpen,
    onClose: onTokenSelectModalClose,
  } = useDisclosure();
  const [depositAmount, setDepositAmount] = useState<string | undefined>();
  const [selectedToken, setSelectedToken] = useState<Token | undefined>();

  const tokenBalance = depositTokens.find((t) => t.symbol.toLowerCase() === selectedToken) ?? BigInt(0);

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
        tokens={depositTokens}
        onTokenSelect={onTokenSelect}
      />
    </Box>
  );
};

export default BuyWithTokens;
