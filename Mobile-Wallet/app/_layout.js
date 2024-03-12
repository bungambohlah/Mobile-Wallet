import { useEffect, useState } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_900Black,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { PaperProvider } from "react-native-paper";

import { SessionProvider } from "../hooks/ctx";
import { themeColor } from "../constants/themeColor";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
NavigationBar.setBackgroundColorAsync(themeColor.appBackgroundColor);

export default function Page() {
  const [isReady, setReady] = useState(false);
  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <PaperProvider>
          <StatusBar backgroundColor={themeColor.appBackgroundColor} />
          <Slot />
        </PaperProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
