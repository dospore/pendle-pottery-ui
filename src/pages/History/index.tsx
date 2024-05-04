import { Box, Card, Flex, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import TitleBox from "../../components/TitleBox";
import { useHistory } from "../../providers/history";
import { Draw } from "../../types/lottery";
import DrawTable from "./DrawTable";

export default function History() {
  const { pastDraws } = useHistory();

  return (
    <Box w="896px" mx="auto" mt={24}>
      <TitleBox headingText={"History"} subText="Check out all the times you've won (or lost)" />
      <VStack align="left" spacing="22px">
        <Card p={6}>
          <Text variant="label">Lotto history</Text>
          <DrawTable draws={pastDraws} />
        </Card>
      </VStack>
    </Box>
  );
}
