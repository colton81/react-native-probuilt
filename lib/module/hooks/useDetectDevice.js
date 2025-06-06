"use strict";

import { Dimensions, PixelRatio, Platform } from "react-native";
const {
  width,
  height
} = Dimensions.get("window");
const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return pixelDensity === 2 && (adjustedWidth >= 1824 || adjustedHeight >= 1824);
  }
};
const useDetectDevice = {
  isAndroid: Platform.OS === "android",
  isIOS: Platform.OS === "ios",
  isTablet: isTablet()
};
export { useDetectDevice };
//# sourceMappingURL=useDetectDevice.js.map