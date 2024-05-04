import { cssVar, extendTheme } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

// const fonts = "Inter Variable, sans-serif";
const fonts = "Oswald Variable, sans-serif";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#fff -webkit-radial-gradient(100% 100%, 80% 100%, rgba(255,215,0,.2), rgba(0,0,0,0))",
      },
    },
  },
  fonts: {
    heading: fonts,
    body: fonts,
  },
  colors: {
    gradients: {
      gold: "#fff -webkit-radial-gradient(90% 100%, 80% 100%, rgba(255,215,0,.2), rgba(0,0,0,0))",
      silver: "#fff -webkit-radial-gradient(90% 100%, 80% 100%, rgba(0,0,0,.2), rgba(0,0,0,0))",
    },
    gray: {
      "50": "#3D3D3DB3",
      "100": "#F0F0F0",
      "200": "#E4E4E4",
      "300": "#E0E0E0",
      "400": "#C3C3C3",
      "500": "#A9A9A9",
      "600": "#626265",
      "700": "#3D3D3D",
      "800": "#2D2D30",
    },
    orange: {
      "500": "#FF7A00",
    },
    blue: {
      "400": "#5B5FB4",
      "500": "#373B96",
    },
  },
  components: {
    Table: {
      variants: {
        tokens: {
          th: {
            px: "2!important",
            "&:last-child": {
              textAlign: "right",
            },
          },
          td: {
            px: "2!important",
            "&:last-child": {
              textAlign: "right",
            },
          },
        },
      },
      baseStyle: {
        th: {
          "&:first-child": {
            pl: 0,
          },
          "&:last-child": {
            pr: 0,
          },
        },
        td: {
          "&:first-child": {
            pl: 0,
          },
          "&:last-child": {
            pr: 0,
          },
        },
      },
    },
    Text: {
      variants: {
        label: {
          fontWeight: 700,
        },
      },
    },
    Heading: {
      variants: {
        "main-heading": {
          fontSize: "3.5rem",
          lineHeight: "3.5rem",
          fontWeight: 700,
          testTransform: "uppercase",
        },
      },
    },
    Tabs: {
      baseStyle: {
        tabpanel: {
          px: 0,
        },
      },
    },
    Skeleton: {
      baseStyle: {
        opacity: 0.2,
        _light: {
          [$startColor.variable]: "colors.yellow.200",
          [$endColor.variable]: "colors.yellow.500",
        },
        _dark: {
          [$startColor.variable]: "colors.yellow.800",
          [$endColor.variable]: "colors.yellow.600",
        },
      },
    },
    Popover: {
      variants: {
        account: {
          content: {
            width: "150px",
            border: "none",
            borderRadius: "2px",
          },
          body: {
            p: 0,
          },
        },
      },
    },
  },
});
