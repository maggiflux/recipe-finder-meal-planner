import { useFetchRecipes } from "@/hooks/recipes/useFetchRecipes";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

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
    <View>
      <View>
        <Text>Tus recetas</Text>
        <Text>Descubre y cocina lo que más te gusta.</Text>
      </View>
      <View>
        <Text>Encontremos que comer</Text>
      </View>
      <View>
        {/* FILTER NAME */}
        <TextInput
          placeholder="Busca por receta…"
          value={titleSearch}
          onChangeText={setTitleSearch}
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />

        {/* --------------------- BEGINNING OF FILTER CHIP --------------------- */}
        <View className="bg-cyan-400 rounded-2xl px-6 py-6 w-1/2">
          {!selectedTags ? (
            <Pressable onPress={onPressTagList}>
              <Text className="text-indigo-700 text-sm">Busca por tag…</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={onDeleteTagChip}
              className="flex-row items-center bg-indigo-100 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-indigo-700 text-sm">{selectedTags}</Text>
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

        {/* FILTER INGREDIENT */}
        <TextInput
          placeholder="Busca por ingrediente…"
          value={ingredientSearch}
          onChangeText={setIngredientSearch}
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />
      </View>

      {/* LIST */}
      {recipesQuery.isLoading ? (
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#eee",
          }}
          source={require("../../../../assets/animations/preparing-food.json")}
        />
      ) : recipesQuery.data?.length === 0 ? (
        <Text>Aún no has agregado recetas!</Text>
      ) : (
        filteredRecepies.map((recipe) => (
          <Pressable
            key={recipe.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/recipes-stack/recipe/[recipe]/recipe",
                params: { recipe: recipe.id },
              })
            }
            className="flex-row gap-5 cursor-pointer"
          >
            <Text>{recipe.title}</Text>
            <Text>{recipe.origin}</Text>
            <Text>{recipe.level}</Text>
            <Text>{recipe.tag}</Text>
          </Pressable>
        ))
      )}

      {/* BUTTON ANOTHER VIEW */}
      <View>
        <Text>Tienes una receta nueva? hay que mejorar alguna?</Text>
        <Button
          title="+ Ir a crear"
          onPress={() =>
            router.push("/recipes-stack/create-recipe/createRecipeForm")
          }
        />
      </View>
    </View>
  );
};

export default recipesListScreen;
