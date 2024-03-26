import React from "react";
import { StyleSheet, Text, useWindowDimensions, View, Alert, TouchableOpacity } from "react-native";
import { Buffer } from "buffer";
global.Buffer = Buffer;
import "react-native-get-random-values";

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Pagination } from "./Pagination";
import { themeColor } from "../../constants/themeColor";
import { data as dataOnboarding } from "../../constants/dataOnboarding";
import { Stack, router } from "expo-router";
import { generateWallet } from "../../utils/wallethelper/generate";
import { useSession } from "../../hooks/ctx";

const RenderItem = ({ item, index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0, 1, 0],
      "clamp",
    );

    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [100, 0, 100],
      "clamp",
    );

    return {
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_WIDTH * 0.8,
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0, 1, 0],
      "clamp",
    );

    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [100, 0, 100],
      "clamp",
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.Image source={item.image} style={imageAnimatedStyle} />

      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
      </Animated.View>
    </View>
  );
};

export function Onboarding() {
  const { setUserWallet } = useSession();

  const handleCreateWallet = async () => {
    try {
      const newWalletDetails = await generateWallet();
      setUserWallet(newWalletDetails.mnemonic);
      console.log("Wallet created:", newWalletDetails);
      Alert.alert("Wallet Created", "Your new wallet has been successfully created.");
      router.push("/new-wallet");
    } catch (error) {
      console.error("Error creating new wallet:", error);
      Alert.alert("Error", "There was an error creating the new wallet.");
    }
  };

  const handleExistingWallet = () => {
    router.push("/have-wallet");
  };

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <Animated.FlatList
        ref={flatListRef}
        data={dataOnboarding}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <RenderItem index={index} item={item} x={x} />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <Pagination data={dataOnboarding} screenWidth={SCREEN_WIDTH} x={x} />
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleCreateWallet}>
          <Text style={{ ...styles.buttonPrimaryBoarding, width: SCREEN_WIDTH - 60 }}>
            Create a new wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExistingWallet}>
          <Text style={{ ...styles.buttonOutlineBoarding, width: SCREEN_WIDTH - 60 }}>
            I already have a wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    color: themeColor.textColor,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  itemText: {
    color: themeColor.textColor,
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 30,
  },
  footerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  buttonPrimaryBoarding: {
    backgroundColor: themeColor.buttonPrimaryBackgroundColor,
    color: themeColor.textColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonOutlineBoarding: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: themeColor.buttonOutlineBackgroundColor,
    color: themeColor.textColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
});
