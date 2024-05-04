import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, StackDivider, Text, VStack } from "@chakra-ui/react";
import { formatBigInt } from "../../helpers/util";
import type { Token } from "../../types/shared";
import TokenLogo from "../TokenLogo";

type Props = {
  selectedToken: Token;
  tokenBalance?: bigint;
  value: number;
  setValue: (v: number | string) => void;
  onTokenSelect?: () => void;
  disabled?: boolean;
};

const TokenInput = ({ value, setValue, selectedToken, tokenBalance, onTokenSelect, disabled }: Props) => {
  const balance = tokenBalance ?? BigInt(0);
  const max = Number(formatBigInt(balance));

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <VStack>
      {value}
      <HStack justify="space-between" w="full">
        <Text fontWeight={600}>Token</Text>
        <Text fontWeight={600} textAlign="right">
          Balance: {formatBigInt(balance)}
        </Text>
      </HStack>
      <HStack
        spacing="0"
        h="full"
        w="full"
        border="1px"
        borderRadius="4px"
        borderColor="gray.300"
        px={2}
        position="relative"
      >
        <Box
          w="full"
          cursor={onTokenSelect ? "cursor" : undefined}
          onClick={onTokenSelect}
          borderRight="1px"
          borderColor="gray.300"
          py={3}
        >
          <HStack justify="space-between" w="full">
            <TokenLogo token={selectedToken} withText />
            {onTokenSelect && <ChevronDownIcon boxSize="1.5rem" />}
          </HStack>
        </Box>
        <Box w="full">
          <Button
            variant="unstyled"
            size="xs"
            isDisabled={disabled}
            onClick={() => setValue(max)}
            cursor="pointer"
            position="absolute"
            fontSize="xs"
            top={0}
            right={0}
            px={2}
            py={0}
            transition="0.3s"
            bg="gray.300"
            borderRadius={0}
            borderBottomLeftRadius="8px"
            _hover={{ opacity: 0.8 }}
          >
            <Text>Max</Text>
          </Button>
          <Input
            value={value}
            variant="unstyled"
            w="full"
            px={2}
            placeholder="0.0"
            onChange={onChange}
            isDisabled={disabled}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default TokenInput;
