import { Button } from "@chakra-ui/react";
import { useModal } from "connectkit";

import NetworkIcon from "../NetworkIcon";

const NetworkButton = () => {
  const { openSwitchNetworks } = useModal();
  return (
    <Button onClick={openSwitchNetworks} px={2} borderRadius="12px">
      <NetworkIcon />
    </Button>
  );
};

export default NetworkButton;
