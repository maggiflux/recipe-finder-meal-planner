import AppButton from "@/components/ui/AppButton";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { useFetchRecipes } from "@/hooks/recipes/useFetchRecipes";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { colors, typography } from "@/theme/themeTokens";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const recipesListScreen = () => {
  const router = useRouter();

  const ALL_TAGS = ["dulce", "salado", "bebidas", "snack"] as const; //los tags

  const animation = useRef<LottieView>(null);
  const { recipesQuery } = useFetchRecipes();

  const {
    isOpen,
    selectedTags,
    titleSearch,
    setTitleSearch,
    ingredientSearch,
    setIngredientSearch,
    filteredRecepies,
    onPressTagList,
    onPressTagChip,
    onDeleteTagChip,
  } = useFilteredRecipes(recipesQuery.data ?? []);
  console.log(recipesQuery.data);
  if (recipesQuery.isError)
    return <Text>Hubo un error encontrando las recetas</Text>;
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <View className="mx-6">
            <Text className={`${typography.titleBold} text-center`}>
              Tus recetas
            </Text>
            <Text className={`${typography.titleSemiBoldItalic}`}>
              Descubre y cocina lo que más te gusta.
            </Text>
          </View>
          <View className="mx-4">
            {/* FILTER NAME */}
            <TextInput
              placeholder="Busca por receta…"
              value={titleSearch}
              onChangeText={setTitleSearch}
              className={`${colors.greenLight} my-4 px-4 py-3 rounded-md text-text`}
            />
            <View className="flex-row mb-4">
              {/* FILTER INGREDIENT */}
              <TextInput
                placeholder="Busca por ingrediente…"
                value={ingredientSearch}
                onChangeText={setIngredientSearch}
                className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
              />
              {/* --------------------- BEGINNING OF FILTER CHIP --------------------- */}
              <View className="bg-greenLight rounded-2xl px-6 py-6 w-1/2">
                {!selectedTags ? (
                  <Pressable onPress={onPressTagList}>
                    <Text className="text-indigo-700 text-sm">
                      Busca por tag…
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={onDeleteTagChip}
                    className="flex-row h-10 w-1/2 items-center bg-secondary px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-indigo-700 text-sm">
                      {selectedTags}
                    </Text>
                    <Text className="ml-1 text-indigo-700">✕</Text>
                  </Pressable>
                )}

                {isOpen &&
                  ALL_TAGS.map((tag) => (
                    <View key={tag} className="bg-purple-400 ">
                      <Pressable
                        onPress={() => onPressTagChip(tag)}
                        className="px-4 py-3 "
                      >
                        <Text>{tag}</Text>
                      </Pressable>
                    </View>
                  ))}
              </View>
            </View>
          </View>

          {/* LIST */}
          {recipesQuery.isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require("../../../../assets/animations/preparing-food.json")}
              />
              <Text className={`${typography.titleLightItalic} text-text`}>
                Cargando recetas...
              </Text>
            </View>
          ) : recipesQuery.data?.length === 0 ? (
            <Text>Aún no has agregado recetas!</Text>
          ) : (
            filteredRecepies.map((recipe) => {
              return (
                <Pressable
                  key={recipe.id}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/recipes-stack/recipe/[recipe]/recipe",
                      params: { recipe: recipe.id },
                    })
                  }
                  className={`${colors.tertiary} mx-4 mb-4 flex-grow rounded-md overflow-hidden shadow-md min-h-20`}
                >
                  <View className="flex-row min-h-20">
                    <Image
                      source={{
                        uri: "https://plus.unsplash.com/premium_photo-1728412893594-1777fa283b1a?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      resizeMode="cover"
                      className="w-[25%] justify-between mr-3"
                    />
                    <View className="flex justify-center">
                      <Text className={`${typography.titleRegular} text-text`}>
                        {recipe.title}
                      </Text>
                      <View className="flex-row gap-5">
                        <Text className="flex-row  bg-accent px-2 rounded-md">
                          {recipe.origin}
                        </Text>
                        <Text className="flex-row  bg-accent px-2 rounded-md">
                          {recipe.level}
                        </Text>
                        <Text className="flex-row  bg-accent px-2 rounded-md">
                          {recipe.tag}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })
          )}

          {/* BUTTON ANOTHER VIEW */}
          <View className="mx-6 my-5">
            <Text className="pb-2 text-center">¿Tienes una receta nueva?</Text>
            <AppButton
              label="Guardar nuevas recetas"
              onPress={() =>
                router.push("/recipes-stack/create-recipe/createRecipeForm")
              }
              /* variant?: Variant;
              disabled?: boolean;
              loading?: boolean;
              className?: string; */
            />
          </View>
          {/* END BUTTON ANOTHER VIEW */}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default recipesListScreen;
