import { Box, Heading, Text } from "@chakra-ui/react";

type Props = {
  headingText: string;
  subText: string;
};

const TitleBox = ({ headingText, subText }: Props) => {
  return (
    <Box mb={12}>
      <Heading variant="main-heading">{headingText}</Heading>
      <Text fontSize="md" opacity={0.7}>
        {subText}
      </Text>
    </Box>
  );
};

export default TitleBox;
