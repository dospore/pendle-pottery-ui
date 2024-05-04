import { Box, VStack, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Box w="896px" mx="auto" mt={24}>
            <VStack>
                <Heading fontSize="52px" as="h1">Pottery</Heading>
                <Text textAlign="center" fontSize="xl">
                    Welcome to Pottery, your gateway to thrilling lotteries built on top of Pendle's innovative yield-bearing tokens. Pottery combines the excitement of lotteries with the potential for passive income through yield-bearing assets, creating a unique and rewarding experience for participants.
                </Text>
                <Link to="/pools">
                    <Button>Buy Now</Button>
                </Link>
            </VStack>
        </Box>
    )
}

export default Landing;
