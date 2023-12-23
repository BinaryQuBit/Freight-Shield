import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Lora, serif",
    body: "Lora, serif",
  },
  styles: {
    global: {
      body: {
        bg: 'red', // Sets background color to red
      },
    },
  },
})

export default theme;
