import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatBigInt } from "../../helpers/util";
import type { Token } from "../../types/shared";
import TokenLogo from "../TokenLogo";

type Props = {
  isOpen: boolean;
  tokens: {
    token: Token;
    balance: bigint;
  }[];
  onClose: () => void;
  onTokenSelect: (token: Token) => void;
};

const TokenSelectModal = ({ isOpen, onClose, tokens, onTokenSelect }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent top="20%">
        <ModalHeader>Token select</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} maxHeight="350px" overflow="scroll">
          <TableContainer>
            <Table variant="tokens">
              <Thead>
                <Tr>
                  <Th>Token</Th>
                  <Th>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tokens.map(({ token, balance }) => (
                  <Tr
                    transition="0.3s"
                    onClick={() => onTokenSelect(token)}
                    cursor="pointer"
                    _hover={{ bg: "gray.300" }}
                  >
                    <Td>
                      <TokenLogo token={token} withText />
                    </Td>
                    <Td>{formatBigInt(balance)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TokenSelectModal;
