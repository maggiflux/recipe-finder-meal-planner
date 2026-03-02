import { RecipePost } from "@/types/RecipePost";
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { recipesList } from "../../../../assets/data/recipes.mock";
import { db } from "../../../../firebase/init";

const recipesListScreen = () => {
  // ROUTER
  const router = useRouter();

  //TWO FILTERS NAME AND INGREDIENT STATE
  const [recipes, setRecipes] = useState<RecipePost[]>([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");

  // FILTER CHIP STATES
  const [isOpen, setIsOpen] = useState(false); //vista que abre con los tags
  const [selectedTags, setSelectedTags] = useState<Tag | null>(null); // tag seleccionado
  const ALL_TAGS = ["dulce", "salado", "bebidas", "snack"] as const; //los tags
  type Tag = "dulce" | "salado" | "bebidas" | "snack";

  //TRAER RECETAS DEL FIRESTORE
  const fetchRecipes = async () => {
    try {
      const q = query(collection(db, "recipes"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const fetchedRecipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate
          ? doc.data().createdAt.toDate()
          : new Date(),
      })) as RecipePost[];

      // console.log("Cantidad de documentos:", snapshot.size);
      // console.log("Docs crudos:", snapshot.docs);
      setRecipes(fetchedRecipes);
      console.log(recipes);
    } catch (error) {
      console.log("error: ", error);
      setRecipes([]);
    }
  };
  //MONTAR EL COMPONENTE
  useEffect(() => {
    fetchRecipes();
  }, []);
  console.log(recipes);

  //TWO FILTERS NAME AND INGREDIENT FUNCTION
  const filteredRecepies = recipes
    .filter((r) => {
      return r.title.toLowerCase().includes(titleSearch.toLowerCase());
    })
    .filter((r) => {
      return r.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(ingredientSearch.toLocaleLowerCase()),
      );
    })
    .filter((r) => {
      return !selectedTags || r.tag.includes(selectedTags);
    });

  //FILTER CHIP FUNCTIONS
  const onPressTagList = () => {
    if (isOpen === false) setIsOpen(true);
    if (isOpen === true) setIsOpen(false);
  };

  const onPressTagChip = (tag: Tag) => {
    setSelectedTags((prev) => (prev === tag ? null : tag));
    setIsOpen(false);
  };
  const onDeleteTagChip = () => {
    setSelectedTags(null);
  };
  console.log(selectedTags);
  console.log(recipesList);

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

        {/* --------------------- END OF FILTER CHIP --------------------- */}
        {/* FILTER INGREDIENT */}
        <TextInput
          placeholder="Busca por ingrediente…"
          value={ingredientSearch}
          onChangeText={setIngredientSearch}
          className="bg-neutral-500 rounded-2xl px-4 py-3 text-base text-primary"
        />
      </View>
      {/* LIST */}
      {recipes.length === 0 ? (
        <Text>Aún no has agregado recetas!</Text>
      ) : (
        filteredRecepies.map((recipe) => (
          <Pressable
            key={recipe.id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/recipes-stack/recipe/[recipe]",
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
