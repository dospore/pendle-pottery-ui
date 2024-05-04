import { Box, Flex, type FlexProps, keyframes } from "@chakra-ui/react";
import { Status } from "../../types/lottery";

const config: Record<
  Status,
  {
    bg: string;
    keyFrames?: any;
  }
> = {
  [Status.LOCKED]: {
    bg: "#0A5ED9",
    keyFrames: keyframes({
      "0%": {
        boxShadow: "0 0 0 0px rgba(10, 94, 217, 0.4)",
      },
      "100%": {
        boxShadow: "0 0 0 8px rgba(10, 94, 217, 0)",
      },
    }),
  },
  [Status.LIVE]: {
    bg: "#38A169",
    keyFrames: keyframes({
      "0%": {
        boxShadow: "0 0 0 0px rgba(56, 161, 105, 1)",
      },
      "100%": {
        boxShadow: "0 0 0 8px rgba(56, 161, 105, 0)",
      },
    }),
  },
  [Status.CLOSED]: {
    bg: "#AAA",
  },
};

const PulseIcon = (props: FlexProps & { status?: Status }) => {
  const styles = config[props.status];
  return (
    <Flex w={props.w ?? 4} h={props.h ?? 4} justifyContent="center" alignItems="center" {...props}>
      <Box
        bgColor={styles.bg}
        width={2}
        height={2}
        borderRadius="9999px"
        boxShadow="0px 0px 1px 1px #0000001a"
        animation={styles?.keyFrames ? `${styles.keyFrames} 2s infinite` : undefined}
      />
    </Flex>
  );
};

export default PulseIcon;
