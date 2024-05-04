import { ChakraProvider as ChakraProvider_ } from "@chakra-ui/react";

import { theme } from "../chakra-theme";
import type { Children } from "../types/react";

export default function ChakraProvider({ children }: Children) {
  return <ChakraProvider_ theme={theme}>{children}</ChakraProvider_>;
}
