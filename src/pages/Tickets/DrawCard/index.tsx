import { Box, Card, Collapse, Flex, HStack, Heading, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";
import down_icon from "../../../assets/down.svg";
import Countdown from "../../../components/Countdown";
import { formatBigInt, formatUsd } from "../../../helpers/util";
import type { Draw } from "../../../types/lottery";

const SeperatedRow = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <HStack justify="space-between">
    <Text fontWeight={600} opacity={0.8}>
      {left}
    </Text>
    <Text textAlign="left" w="full">
      {right}
    </Text>
  </HStack>
);

const DrawCard = ({
  title,
  draw,
  position,
  icon,
  imageWidth,
}: { title: string; draw: Draw; position: number; icon: any; imageWidth?: string }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card p={6} transition={"0.3s"}>
      <Text variant="label" mb={2}>
        {title}
      </Text>
      <Box position="absolute" borderRadius="4px" border="1px" borderColor="gray.100" right={6} top={3} p={2}>
        <Countdown date={draw.drawTime} />
      </Box>
      <HStack>
        <Flex w="100px" h="100px" mr={4}>
          <Image src={icon} mr={4} w={imageWidth} mx="auto" mt="auto" />
        </Flex>
        <VStack align="left" gap={0} mb="auto">
          <Text fontSize="xs">Prize Pool (ETH)</Text>
          <Text fontSize="2xl" fontWeight={700}>
            {formatBigInt(draw.prizePool)}
          </Text>
          <Text fontSize="xs">{formatUsd(draw.prizePoolUsd)}</Text>
        </VStack>
      </HStack>
      <Box
        position="absolute"
        cursor="pointer"
        p={2}
        onClick={onToggle}
        transition="0.3s"
        _hover={{ bg: "gray.300" }}
        opacity={0.7}
        border="1px"
        borderColor="gray.300"
        borderRadius="4px"
        right={6}
        bottom={6}
      >
        <Image src={down_icon} transition="0.3s" transform={isOpen ? "rotate(180deg)" : ""} boxSize="16px" />
      </Box>
      <Collapse in={isOpen} animateOpacity transition="0.3s" endingHeight={isOpen ? "80px" : "0"}>
        <VStack py={4} w="200px" spacing={"0"} align="left">
          <SeperatedRow left={<Box w="116px">{"Players: "}</Box>} right={draw.players.toLocaleString()} />
          <SeperatedRow left={<Box w="116px">{"Tickets: "}</Box>} right={draw.tickets.toLocaleString()} />
        </VStack>
      </Collapse>
    </Card>
  );
};

export default DrawCard;
