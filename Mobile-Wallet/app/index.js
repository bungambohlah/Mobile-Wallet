import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
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
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { blurHash } from "../constants/index";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
  const [assets, assetsError] = useAssets([require("../assets/icon.png")]);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.EtherscanProvider(); // Using Etherscan's default provider
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setBalance("Error");
    }
  };

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
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady && (fontsLoaded || fontError) && (assets || assetsError)) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded, fontError, assets, assetsError]);

  if (isReady && (fontsLoaded || fontError) && assets?.length) {
    return (
      <View onLayout={onLayoutRootView}>
        <Text>Home</Text>
        <Link href="/about" asChild>
          <Pressable>
            <Text>Go to About Page</Text>
          </Pressable>
        </Link>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter Ethereum Address"
            value={address}
            onChangeText={setAddress}
          />
          <Button title="Get Balance" onPress={getBalance} />
          {balance !== "" && <Text>Balance: {balance} ETH</Text>}
        </View>
      </View>
    );
  } else if (!isReady && assets?.length && (fontsLoaded || fontError)) {
    // render SplashScreen
    return (
      <View className="flex flex-col items-center justify-between m-8 h-screen w-full bg-[##01081F]">
        <View className="flex flex-col items-center gap-4">
          <Image
            source={assets[0]}
            contentFit="contain"
            placeholder={blurHash}
            style={styles.image}
            className="w-full h-5"
          />
          <Text className="text-3xl font-bold text-white" style={{ fontFamily: "Inter_700Bold" }}>
            Physica Finance
          </Text>
        </View>
        <View className="flex flex-col items-center gap-4">
          <Text className="text-lg text-black font-bold" style={{ fontFamily: "Inter_700Bold" }}>
            POWERED BY PLANQ® NETWORK
          </Text>
          <Text className="text-sm text-black">Copyright ® 2023, Planq Dev B. V.</Text>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter_400Regular",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
