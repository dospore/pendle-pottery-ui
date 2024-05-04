import { Image, type ImageProps } from "@chakra-ui/react";

import logo from "../../assets/logo.png";

const PotteryLogo = (props: ImageProps) => <Image src={logo} {...props} w="3.5rem" />;

export default PotteryLogo;
