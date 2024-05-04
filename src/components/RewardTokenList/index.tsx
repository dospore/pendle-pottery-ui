import { HStack, Image } from "@chakra-ui/react";
import TokenLogo from "../TokenLogo";

type Props = {
  allRewardTokens: Record<string, TokenInfo>;
  lottoRewardTokens: string[];
};

const RewardTokenList = ({ allRewardTokens, lottoRewardTokens }) => (
  <HStack>
    {lottoRewardTokens.map((address) => {
      const t = allRewardTokens[address]?.symbol;
      return <TokenLogo token={t ?? ""} />;
    })}
  </HStack>
);

export default RewardTokenList;
