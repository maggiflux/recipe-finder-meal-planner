import React from "react";
import { Text, View } from "react-native";

const homeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        AQUI DEBERIA SER EL HOME
      </Text>
      <Text style={{ fontFamily: "Rubik-BlackItalic" }}>Inter Black</Text>
    </View>
  );
};

export default homeScreen;
