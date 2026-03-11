import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Text, View } from "react-native";

const mealPlannerScreen = () => {
  const animation = useRef<LottieView>(null);
  return (
    <View className="flex-1 justify-center align-middle">
      <View className="self-center">
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 300,
            height: 300,
            backgroundColor: "transparent",
          }}
          source={require("../../../../assets/animations/Cooking.json")}
        />
      </View>
      <Text className="text-center text-primary font-bold text-title pb-4">
        mealplanner en construcción
      </Text>
    </View>
  );
};

export default mealPlannerScreen;
