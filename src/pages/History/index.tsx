import { Box, Card, HStack, Switch, Text, VStack } from "@chakra-ui/react";
import TitleBox from "../../components/TitleBox";
import { useHistory } from "../../providers/history";
import DrawTable from "./DrawTable";

export default function History() {
  const { closedDraws, filterForAccount, toggleFilterForAccount, isFetchingDraws } = useHistory();

  const isLoading = isFetchingDraws;

  return (
    <Box w="896px" mx="auto" mt={24}>
      <TitleBox headingText={"History"} subText="Check out all the lottos." />
      <VStack align="left" spacing="22px">
        <Card p={6}>
          <HStack justify="space-between" mb={2}>
            <Text variant="label">Lotto history</Text>
            <HStack spacing={2}>
              <Text fontSize="sm" opacity={0.7}>
                Only show particpated lotto's
              </Text>
              <Switch isChecked={filterForAccount} onChange={toggleFilterForAccount} />
            </HStack>
          </HStack>
          <DrawTable draws={closedDraws} isLoading={isLoading} />
        </Card>
      </VStack>
    </Box>
  );
}
