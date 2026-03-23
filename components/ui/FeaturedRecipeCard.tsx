import { colors, palette, typography } from "@/theme/themeTokens";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  title?: string;
  imageUri: string;
  subtitle?: string;
};

const FeaturedRecipeCard = ({
  title = "Receta destacada del día",
  imageUri,
  subtitle,
}: Props) => {
  return (
    <View className="flex mx-6 py-5">
      {/* Titulo */}
      <Text
        className={`${typography.titleBold} text-center mb-5 leading-tight tracking-tight`}
      >
        {title}
      </Text>
      {/* Imagen */}
      <View className="rounded-xl overflow-hidden shadow-softShadow">
        <Image className="w-full h-64 " source={{ uri: imageUri }} />

        {/* Gradient para legibilidad */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          className="absolute bottom-0 left-0 right-0 h-24"
        />

        {/* Badge superior */}
        <View
          className={`${colors.accent} flex-row items-center absolute bottom-3 left-3 px-3 py-1 rounded-full`}
        >
          <FontAwesome6 size={18} name="star" color={palette.primary} solid />
          <Text
            className={`${typography.titleLightItalic} text-primary ml-1 mb-1`}
            style={{ textAlignVertical: "center" }}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FeaturedRecipeCard;
