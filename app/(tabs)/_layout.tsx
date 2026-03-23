import { palette } from "@/theme/themeTokens";
import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: palette.primary,
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="house" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipes-stack"
          options={{
            title: "Recetas",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="book-open" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="meal-planner-stack"
          options={{
            title: "Planner",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="calendar-week" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
