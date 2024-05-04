import { Box, Flex, type FlexProps, keyframes } from "@chakra-ui/react";

type Status = "upcoming" | "live" | "closed";

const config: Record<
  Status,
  {
    bg: string;
    keyFrames?: any;
  }
> = {
  upcoming: {
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
  live: {
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
  closed: {
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
