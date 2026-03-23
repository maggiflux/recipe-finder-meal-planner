import AppButton from "@/components/ui/AppButton";
import FeaturedRecipeCard from "@/components/ui/FeaturedRecipeCard";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { useDeleteRecipe } from "@/hooks/recipes/useDeleteRecipe";
import { useFetchRecipe } from "@/hooks/recipes/useFetchRecipe";
import { palette, typography } from "@/theme/themeTokens";
import { formatDate } from "@/utils/date";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const recipeScreen = () => {
  const { recipe } = useLocalSearchParams<{ recipe: string }>();
  const router = useRouter();
  const { recipeQuery } = useFetchRecipe(recipe);
  const recipeData = recipeQuery.data;

  const animation = useRef<LottieView>(null);

  const deleteMutation = useDeleteRecipe();

  const formattedDate = recipeData && formatDate(recipeData.createdAt);
  const handleUpdate = (id: string) => {
    if (!recipeData?.id) return;
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
      <ScreenWrapper>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
        </ScrollView>
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <FeaturedRecipeCard
            title={recipeData?.title}
            subtitle="Dulce"
            // className="text-small font-titleSemiBoldItalic"
            imageUri="https://plus.unsplash.com/premium_photo-1729624130843-d8fcadd95c3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </View>
        <View>
          {recipeData?.imageUri ? (
            <Image
              style={{ width: "100%", height: 300 }}
              source={{ uri: recipeData?.imageUri }}
            />
          ) : (
            <View className="flex-1 bg-greenLight h-[200px] justify-center">
              <FontAwesome6
                size={50}
                name="photo-film"
                color={`${palette.secondary}`}
                className="text-center align-middle"
              />
              <Text className="text-body text-secondary text-center">
                No hay imagen
              </Text>
            </View>
          )}

          <View className="mx-4 bg-tertiary">
            <Text className={`${typography.titleBold}`}>
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
          </View>
          <View className="flex-row gap-4 mx-4 justify-center mt-10 mb-28">
            <AppButton
              label="Editar receta"
              onPress={() => handleUpdate(recipeData?.id)}
            />
            <AppButton
              label="Borrar receta"
              variant={"outline"}
              /* disabled?: boolean;
               loading?: boolean;
               className?: string; */
              onPress={() => recipeData && handleDelete(recipeData?.id)}
              disabled={!recipeData?.id || deleteMutation.isPending}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default recipeScreen;
