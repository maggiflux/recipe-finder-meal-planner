import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

// TODO: QUERY TANSTACK

export default function RootLayout() {
  const [loaded, error] = useFonts({
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
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={["top"]}>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
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
