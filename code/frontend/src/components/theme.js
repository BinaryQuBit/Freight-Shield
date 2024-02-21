// Theme for the whole project

import { extendTheme } from "@chakra-ui/react";
import { darken } from '@chakra-ui/theme-tools';
import "@fontsource/lora/400.css";
import "@fontsource/lora/700.css";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-35px)",
};

const customTheme = extendTheme({
  styles: {
    global: {
      "@keyframes fadeIn": {
        from: { opacity: 0, transform: 'translateY(-20px)', visibility: 'hidden' },
        to: { opacity: 1, transform: 'translateY(0)', visibility: 'visible' },
      },      
      "@keyframes fadeOut": {
        from: { opacity: 1, transform: 'translateY(0)', visibility: 'visible' },
        to: { opacity: 0, transform: 'translateY(-20px)', visibility: 'hidden' },
      },

      '.pac-container': {
        zIndex: '9999 !important',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      

      '.fade-in': {
        animation: 'fadeIn 0.5s ease-out forwards',
      },
      '.fade-out': {
        animation: 'fadeOut 0.5s ease-out forwards',
      },
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _invalid: {
              borderColor: 'none',
              boxShadow: 'none',
            },
          },
        },
      },
    },
    Button: {
      variants: {
        blueForwardButton: (props) => {
          const backgroundColor = props.colorvariant || "#0866FF";
          
          return {
            backgroundColor: backgroundColor,
            color: "white",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            _hover: {
              backgroundColor: darken(backgroundColor, 10),
              ".icon-wrapper": {
                transform: "scale(1, 1)",
                backgroundColor: darken(backgroundColor, 20),
              },
              ".content-wrapper": {
                paddingLeft: "30px",
              },
            },
            ".icon-wrapper": {
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "0 50% 50% 0",
              transform: "scale(0, 1)",
              transformOrigin: "left center",
              transition: "all 0.2s linear",
            },
            ".content-wrapper": {
              transition: "padding-left 0.2s linear",
            },
          };
        },
        blueBackwardButton: (props) => {
          const backgroundColor = props.colorvariant || "#0866FF";

          return {
            color: "white",
            backgroundColor: backgroundColor,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            _hover: {
              backgroundColor: darken(backgroundColor, 10),
              ".icon-wrapper": {
                transform: "scale(1, 1)",
                backgroundColor: darken(backgroundColor, 20),
              },
              ".content-wrapper": {
                paddingRight: "30px",
              },
            },
            ".icon-wrapper": {
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "50% 0 0 50%",
              transform: "scale(0, 1)",
              transformOrigin: "right center",
              transition: "all 0.2s linear",
            },
            ".content-wrapper": {
              transition: "padding-right 0.2s linear",
            },
          };
        },
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) ~ label, .chakra-select__wrapper:not(:placeholder-shown) ~ label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
  colors: {
    customBlue: {
      500: "#0866FF",
    },
  },
  fonts: {
    heading: "Lora, serif",
    body: "Lora, serif",
  },
});

export default customTheme;

