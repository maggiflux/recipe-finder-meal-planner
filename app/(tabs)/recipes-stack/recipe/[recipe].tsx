import { recipesList } from "@/assets/data/recipes.mock";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

const recipeScreen = () => {
  const { recipe } = useLocalSearchParams();

  const fullRecipe = recipesList.find((r) => {
    return r.id.toString() === recipe;
  });

  console.log(fullRecipe?.ingredients);

  const handleSubmit = () => {
    return console.log("hola");
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: fullRecipe?.image }}
        />
        <Text className="font-sans font-black text-primary text-title">
          {fullRecipe?.title}
        </Text>
        <Text>Ingredientes:</Text>
        {fullRecipe?.ingredients.map((ingredient, index) => (
          <Text key={index}>- {ingredient}</Text>
        ))}

        <Text>{fullRecipe?.instructions}</Text>
        <Text>{fullRecipe?.level}</Text>
        <Text>{fullRecipe?.tag}</Text>
        <Text>{fullRecipe?.createdAt}</Text>
        <View className="flex-row gap-4">
          <Button title="editar receta" onPress={() => handleSubmit()} />
          <Button title="borrar receta" onPress={() => handleSubmit()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default recipeScreen;
