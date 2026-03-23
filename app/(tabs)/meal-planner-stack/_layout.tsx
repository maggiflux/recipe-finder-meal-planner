import { Stack, useNavigation } from "expo-router";
import React from "react";

const StackLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="meal-planner/index"
        options={{
          title: "Meal Planner",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
