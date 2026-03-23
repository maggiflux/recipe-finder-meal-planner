import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Fraunces-Bold": require("../assets/fonts/Fraunces_72pt_Soft-Bold.ttf"),
    "Fraunces-BoldItalic": require("../assets/fonts/Fraunces_72pt_Soft-BoldItalic.ttf"),
    "Fraunces-SemiBold": require("../assets/fonts/Fraunces_72pt_Soft-SemiBold.ttf"),
    "Fraunces-SemiBoldItalic": require("../assets/fonts/Fraunces_72pt_Soft-SemiBoldItalic.ttf"),
    "Fraunces-Regular": require("../assets/fonts/Fraunces_72pt_Soft-Regular.ttf"),
    "Fraunces-RegularItalic": require("../assets/fonts/Fraunces_72pt_Soft-Italic.ttf"),
    "Fraunces-Light": require("../assets/fonts/Fraunces_72pt_SuperSoft-Light.ttf"),
    "Fraunces-LightItalic": require("../assets/fonts/Fraunces_72pt_SuperSoft-Italic.ttf"),
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("../assets/fonts/Rubik-BlackItalic.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={["top"]}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});
