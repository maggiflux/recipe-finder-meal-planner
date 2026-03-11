import { useDeleteRecipe } from "@/hooks/recipes/useDeleteRecipe";
import { useFetchRecipe } from "@/hooks/recipes/useFetchRecipe";
import { formatDate } from "@/utils/date";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

const recipeScreen = () => {
  const { recipe } = useLocalSearchParams<{ recipe: string }>();
  const router = useRouter();
  const { recipeQuery } = useFetchRecipe(recipe);
  const recipeData = recipeQuery.data;

  const animation = useRef<LottieView>(null);

  const deleteMutation = useDeleteRecipe();

  const formattedDate = recipeData && formatDate(recipeData.createdAt);
  const handleUpdate = (id: string) => {
    router.push({
      pathname: "/(tabs)/recipes-stack/recipe/[recipe]/updateRecipe",
      params: { recipe: recipeData?.id },
    });
  };
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (recipeQuery.isError || !recipeData) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Receta no encontrada</Text>
      </View>
    );
  }
  if (recipeQuery.isLoading) {
    return (
      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#eee",
          }}
          source={require("../../../../../assets/animations/preparing-food.json")}
        />
        <Text>Cargando</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View>
        {recipeData?.imageUri ? (
          <Image
            style={{ width: "100%", height: 300 }}
            source={{ uri: recipeData?.imageUri }}
          />
        ) : (
          <View className="bg-primaryLight h-[200px]">
            <FontAwesome
              size={28}
              name="photo"
              color={"white"}
              className="text-center pt-5"
            />
            <Text className="color-slate-50 text-center">No hay imagen</Text>
          </View>
        )}

        <Text className="font-sans font-black text-primary text-title">
          {recipeData?.title}
        </Text>
        <Text>Ingredientes:</Text>
        {recipeData?.ingredients.map((ingredient, index) => (
          <Text key={index}>- {ingredient.value}</Text>
        ))}

        <Text>{recipeData?.instructions}</Text>
        <Text>{recipeData?.level}</Text>
        <Text>{recipeData?.tag}</Text>
        <Text>{recipeData?.origin}</Text>

        <Text>{formattedDate}</Text>
        <View className="flex-row gap-4">
          <Button
            title="editar receta"
            onPress={() => handleUpdate(recipeData?.id)}
          />
          <Button
            title="BORRAR RECETA"
            onPress={() => recipeData && handleDelete(recipeData?.id)}
            disabled={!recipeData?.id || deleteMutation.isPending}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default recipeScreen;
