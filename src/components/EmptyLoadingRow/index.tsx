import { Skeleton, Td, Tr } from "@chakra-ui/react";

const EmptyLoadingRow = () => (
  <Tr>
    {/* @ts-ignore */}
    <Td colSpan="100%">
      <Skeleton h="40px" />
    </Td>
  </Tr>
);

export default EmptyLoadingRow;
