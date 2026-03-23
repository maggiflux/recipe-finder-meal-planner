import { Stack } from "expo-router";
import React from "react";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="recipe/recipesList"
        options={{
          title: "Recetas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-recipe/createRecipeForm"
        options={{
          title: "Añadir receta",
        }}
      />
      <Stack.Screen
        name="recipe/[recipe]/recipe"
        options={{
          title: "Receta",
        }}
      />
      <Stack.Screen
        name="recipe/[recipe]/updateRecipe"
        options={{
          title: "Editar Receta",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
