import CreditName from "@/components/ui/CreditName";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { typography } from "@/theme/themeTokens";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";

const mealPlannerScreen = () => {
  const animation = useRef<LottieView>(null);
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* 👋 Header */}
        <View className="flex-1 justify-between">
          <View className="flex-1 justify-center align-middle px-6">
            <View className="self-center px-6">
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
            <View className="w-100 h-100 bg-tertiary rounded-lg py-10 px-6">
              <Text className={`${typography.titleBold}  text-center`}>
                Cocinando el
              </Text>
              <Text className={`${typography.titleBoldItalic} text-center`}>
                meal Planner
              </Text>
            </View>
          </View>

          <CreditName />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default mealPlannerScreen;
