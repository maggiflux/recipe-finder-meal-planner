import { palette, typography } from "@/theme/themeTokens";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const CardTotalTag = () => {
  const totalRecipesPerTag = "12";
  type IconName =
    | "cookie-bite"
    | "utensils"
    | "hotdog"
    | "martini-glass-citrus";

  const data: {
    label: string;
    bg: string;
    text?: string;
    icon: IconName;
    urlBackground: string;
  }[] = [
    {
      label: "Postres dulces",
      bg: "bg-greenLight",
      icon: "cookie-bite",
      urlBackground:
        "https://images.unsplash.com/photo-1593424731252-a846f98af7e6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Platos salados",
      bg: "bg-tertiary",
      icon: "utensils",
      urlBackground:
        "https://plus.unsplash.com/premium_photo-1664472634106-1430c3973e68?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Picoteos varios",
      bg: "bg-tertiary",
      icon: "hotdog",
      urlBackground:
        "https://images.unsplash.com/photo-1701341404788-b85484ca379e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Bebidas",
      bg: "bg-greenLight",
      icon: "martini-glass-citrus",
      urlBackground:
        "https://plus.unsplash.com/premium_photo-1721227932191-8816c036c7ce?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <>
      {data.map((item, index) => (
        <ImageBackground
          key={index}
          source={{ uri: item.urlBackground }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 16 }}
          className="w-[48%] p-4 rounded-2xl min-h-60 justify-between"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.2)"]}
            className="absolute rounded-lg bottom-0 left-0 right-0 h-24 overflow-hidden"
          />

          <View style={{ width: "100%", flexDirection: "row" }}>
            <View
              style={{ marginLeft: "auto" }}
              className="w-9 h-9 rounded-full bg-accent items-center justify-center"
            >
              <FontAwesome6
                size={16}
                name={item.icon as any}
                color={palette.primary}
              />
            </View>
          </View>
          <View className="bg-greenLight/80 rounded-lg mt-2">
            <Text
              className={`
              ${typography.titleSemiBoldItalic} text-center`}
            >
              {totalRecipesPerTag} Recetas
            </Text>
            <Text
              className={`${typography.titleLightItalic} text-primary text-center mt-`}
            >
              {item.label}
            </Text>
          </View>
        </ImageBackground>
      ))}
    </>
  );
};

export default CardTotalTag;
