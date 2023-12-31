import { extendTheme } from "@chakra-ui/react";
import "@fontsource/lora/400.css";
import "@fontsource/lora/700.css";

const theme = extendTheme({
  fonts: {
    heading: "Lora, serif",
    body: "Lora, serif",
  },
})

export default theme;