import { Stack, useNavigation } from "expo-router";
import React from "react";

const StackLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="createRecipeFormScreen/index"
        options={{
          title: "Create recipe",
        }}
      />
      <Stack.Screen
        name="[recipe]/index"
        options={{
          title: "Recipe",
        }}
      />
      <Stack.Screen
        name="[recipe]/recipe"
        options={{
          title: "Recipe",
        }}
      />
      <Stack.Screen
        name="[recipe]/update Recipe"
        options={{
          title: "Edit Recipe",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
