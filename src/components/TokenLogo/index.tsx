import { HStack, Image, type ImageProps, Text } from "@chakra-ui/react";
import type { Token } from "../../types/shared";

import dai from "../../assets/tokens/dai.webp";
import weth from "../../assets/tokens/eth.webp";
import generic from "../../assets/tokens/generic.svg";
import usdc from "../../assets/tokens/usdc.webp";
import usde from "../../assets/tokens/usde.svg";
import silo from "../../assets/tokens/silo.svg";

const LOGOS: Record<Token, any> = {
  weth: weth,
  usdc: usdc,
  dai: dai,
  rwt: weth,
  usde: usde,
  silo: silo
};

const TokenLogo = (props: ImageProps & { token: Token; withText?: boolean }) => (
  <HStack>
    <Image src={LOGOS[props.token?.toLowerCase() ?? ""] ?? generic} {...props} w="1rem" />
    {props.withText && (
      <Text as="span" textTransform="uppercase" fontWeight={600} opacity={0.8} letterSpacing="0.5px">
        {props.token}
      </Text>
    )}
  </HStack>
);

export default TokenLogo;
