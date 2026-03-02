import { RecipePost } from "@/types/RecipePost";
import { formatDate } from "@/utils/date";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { db } from "../../../../firebase/init";

const recipeScreen = () => {
  const { recipe } = useLocalSearchParams<{ recipe: string }>();
  console.log("id recibido", recipe);

  const [fullRecipe, setFullRecipe] = useState<RecipePost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipe) return;

      const docRef = doc(db, "recipes", recipe);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setFullRecipe({
          id: snapshot.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt),
        } as RecipePost);
      } else {
        setNotFound(true);
      }
    };

    fetchRecipe();
  }, [recipe]);

  const formattedDate = fullRecipe && formatDate(fullRecipe.createdAt);
  console.log("createdAt real:", fullRecipe?.createdAt);
  console.log("tipo:", typeof fullRecipe?.createdAt);

  const handleSubmit = () => {
    return console.log("hola");
  };

  if (notFound) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        {fullRecipe?.image ? (
          <Image
            style={{ width: "100%", height: 300 }}
            source={{ uri: fullRecipe?.image }}
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
          {fullRecipe?.title}
        </Text>
        <Text>Ingredientes:</Text>
        {fullRecipe?.ingredients.map((ingredient, index) => (
          <Text key={index}>- {ingredient}</Text>
        ))}

        <Text>{fullRecipe?.instructions}</Text>
        <Text>{fullRecipe?.level}</Text>
        <Text>{fullRecipe?.tag}</Text>
        <Text>{fullRecipe?.origin}</Text>

        <Text>{formattedDate}</Text>
        <View className="flex-row gap-4">
          <Button title="editar receta" onPress={() => handleSubmit()} />
          <Button title="borrar receta" onPress={() => handleSubmit()} />
        </View>
      </View>
    </ScrollView>
  );
};

export default recipeScreen;
