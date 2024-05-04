import { ChevronDownIcon, WarningIcon } from "@chakra-ui/icons";
import { HStack, Image } from "@chakra-ui/react";
import { useChainId } from "wagmi";
import { arbitrum, arbitrumSepolia, base, mantle } from "wagmi/chains";
import type { SupportedNetwork } from "../../types/shared";

import arbitrum_icon from "../../assets/networks/arbitrum.webp";

const networkIcons: Record<SupportedNetwork, any> = {
  [arbitrum.id]: arbitrum_icon,
  [arbitrumSepolia.id]: arbitrum_icon,
  [base.id]: arbitrum_icon,
  [mantle.id]: arbitrum_icon,
};

const NetworkIcon = () => {
  const chainId = useChainId();

  const icon = networkIcons[chainId];

  if (!icon) {
    return <WarningIcon />;
  }

  return (
    <HStack spacing={0}>
      <Image src={icon} boxSize="22px" />
      <ChevronDownIcon boxSize={6} />
    </HStack>
  );
};

export default NetworkIcon;
