import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { shortenAddress } from "../../helpers/util";
import AccountIcon from "../AccountIcon";

type Props = {};

function ConnectButton({}: Props) {
  return <ConnectKitButton />;
}

export default ConnectButton;
