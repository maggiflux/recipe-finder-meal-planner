import { colors } from "@/theme/themeTokens";
import React from "react";
import { Image, View } from "react-native";

type Props = {
  children?: React.ReactNode;
};
const ScreenWrapper = ({ children }: Props) => {
  return (
    <View className={`flex-1 ${colors.neutral}`}>
      <Image
        // source={require("@/assets/images/premium_vector-1713175645482-748d35fd8ede.png")}
        source={require("@/assets/images/premium_vector-1736967030428-9f0ba6a92913.png")}
        style={{
          position: "absolute",
          opacity: 0.1,
        }}
        resizeMode="contain"
      />

      {children}
    </View>
  );
};

export default ScreenWrapper;
