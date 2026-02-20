import { Stack, useNavigation } from "expo-router";
import React from "react";

const StackLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="mealPlannerScreen/index"
        options={{
          title: "Meal Planner",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
