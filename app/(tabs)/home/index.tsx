import { getCurrentDate } from "@/utils/date";
import { getCurrentHour } from "@/utils/hour";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const homeScreen = () => {
  const [user, setUser] = useState("Mary");

  const { capitalizeDate } = getCurrentDate();
  const { hour } = getCurrentHour();

  return (
    <View className="flex-1 bg-white px-6">
      <View className="">
        <View className="flex-row">
          <Text className="font-sans text-body font-black text-primary">
            Buenos días{" "}
          </Text>
          <Text className="font-sans text-body font-medium text-primary">
            {user}
          </Text>
        </View>
        <View>
          <Text className="font-sans text-title font-black text-primary">
            ¿Qué vamos a cocinar hoy?
          </Text>
        </View>
        <View>
          <Text>{capitalizeDate}</Text>
          <Text>Hora: {hour}h</Text>
        </View>
        <View className="flex-row gap-2">
          <Button
            onPress={() =>
              router.push("/(tabs)/recipes-stack/recipe/recipesList")
            }
            title="Cocinemos"
          />
          <Button
            onPress={() =>
              router.push(`/(tabs)/meal-planner-stack/meal-planner`)
            }
            title="Guardar recetas"
          />
        </View>
      </View>
      <View>
        <Text>Organiza tus comidas y descubre nuevas recetas.</Text>
        <Text>Así va la lista</Text>
      </View>
      <View className="flex-row flex-wrap mx-3">
        <View className="bg-slate-500 w-1/2 p-2 rounded-tr-lg">
          <FontAwesome size={28} name="home" color={"color-primary"} />
          <Text>12</Text>
          <Text>Recetas dulces</Text>
        </View>
        <View className="bg-slate-500 w-1/2 p-2 rounded-tr-lg">
          <FontAwesome size={28} name="home" color={"color-primary"} />
          <Text>12</Text>
          <Text>Recetas saladas</Text>
        </View>
        <View className="bg-slate-300 w-1/2 p-2 rounded-tr-lg">
          <FontAwesome size={28} name="home" color={"color-primary"} />
          <Text>12</Text>
          <Text>Recetas picoteo</Text>
        </View>
        <View className="bg-slate-300 w-1/2 p-2 rounded-tr-lg">
          <FontAwesome size={28} name="home" color={"color-primary"} />
          <Text>12</Text>
          <Text>Recetas bebidas</Text>
        </View>
      </View>
    </View>
  );
};

export default homeScreen;
