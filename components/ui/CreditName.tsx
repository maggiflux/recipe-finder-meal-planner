import { typography } from "@/theme/themeTokens";
import React from "react";
import { Text, View } from "react-native";

const CreditName = () => {
  return (
    <View className="mt-16 pt-6 pb-5 bg-primary rounded-t-lg">
      <Text
        className={`${typography.titleLightItalic} text-muted text-center `}
      >
        Mariela Rodriguez Maggi | mariela.rg.maggi@gmail.com
      </Text>
    </View>
  );
};

export default CreditName;
