import { Box, Button, Card, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Box w="896px" mx="auto" mt={24}>
      <VStack spacing="24px" fontSize="lg">
        <Heading fontSize="52px" as="h1">
          Pottery
        </Heading>
        <Text textAlign="center" fontSize="2xl">
          Welcome to Pottery, your gateway to thrilling lotteries built on top of Pendle's innovative yield-bearing
          tokens. Pottery combines the excitement of lotteries with the potential for passive income through
          yield-bearing assets, creating a unique and rewarding experience for participants.
        </Text>
        <HStack>
          <Card p={6}>
            <Text variant="label" mb={2}>
              Win'em
            </Text>
            <Text>Swap your YT for minted tickets that have a chance at the grand prize</Text>
          </Card>
          <Card p={6}>
            <Text variant="label" mb={2}>
              Buy'em
            </Text>
            <Text>Buy tickets on the secondary market after minting closes</Text>
          </Card>
          <Card p={6}>
            <Text variant="label" mb={2}>
              Arb'em
            </Text>
            <Text>
              Counterparty aping too hard into the points meta, sell your tickets on the secondary market for profit
            </Text>
          </Card>
        </HStack>
        <Link to="/pools">
          <Button>Explore Now</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Landing;
