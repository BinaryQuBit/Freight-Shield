// React Import
import { Dimensions } from "react-native";

// Dynamic Logo Move
export const DynamicLogo = (visible, multiplier) => {
  if (visible) {
    return -(Dimensions.get("window").height * multiplier);
  }
  return 0;
};
