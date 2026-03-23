import AppButton from "@/components/ui/AppButton";
import CardTotalTag from "@/components/ui/CardTotalTag";
import FeaturedRecipeCard from "@/components/ui/FeaturedRecipeCard";
import ScreenWrapper from "@/components/ui/ScreenWrapper";
import { typography } from "@/theme/themeTokens";
import { getCurrentDate } from "@/utils/date";
import { getCurrentHour } from "@/utils/hour";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const homeScreen = () => {
  const user = "Mary";

  const { capitalizeDate } = getCurrentDate();
  const { hour } = getCurrentHour();

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 👋 Header */}
        <View className="px-6">
          <Text className={`${typography.titleSemiBoldItalic}`}>
            Buenos días {user} 👋
          </Text>
          <View className="mt-2">
            <Text
              className={`${typography.titleLight} text-secondary text-right`}
            >
              {capitalizeDate}
            </Text>
            <Text
              className={`${typography.titleLight} text-secondary text-right`}
            >
              {hour}h
            </Text>
          </View>
        </View>
        {/* 🍳 Título */}
        <View>
          <FeaturedRecipeCard
            title="¿Qué vamos a cocinar hoy?"
            subtitle="Receta destacada"
            // className="text-small font-titleSemiBoldItalic"
            imageUri="https://plus.unsplash.com/premium_photo-1729624130843-d8fcadd95c3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </View>

        {/* 🔘 Botones */}
        <View className="flex-row gap-3 mt-3 mb-4 mx-6 justify-center">
          <AppButton
            onPress={() =>
              router.push("/(tabs)/recipes-stack/recipe/recipesList")
            }
            variant="primary"
            label="Buscar recetas"
          />
          <AppButton
            onPress={() =>
              router.push("/(tabs)/meal-planner-stack/meal-planner")
            }
            variant="outline"
            label="Planear comidas"
          />
        </View>

        {/* 🧠 Texto sección */}
        <View className=" mx-6 py-6">
          <Text className={`${typography.titleRegular}`}>
            Descubre nuevas recetas, agrega alguna que encontraste y organiza
            tus comidas.
          </Text>
        </View>

        {/* 📊 Stats */}
        <View className="flex-row flex-wrap gap-3 px-4">
          <CardTotalTag />
        </View>
        {/* 🧠 Texto sección */}
        <View className="mt-16 pt-6 pb-5 bg-primary rounded-t-lg">
          <Text
            className={`${typography.titleLightItalic} text-muted text-center `}
          >
            Mariela Rodriguez Maggi | mariela.rg.maggi@gmail.com
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default homeScreen;
