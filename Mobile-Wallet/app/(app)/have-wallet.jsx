import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";

const image = require("../../assets/icon.png");
import { themeColor } from "../../constants/themeColor";

export default function Page() {
  const handleImportFromSeed = () => {
    router.push("/import-seed");
  };

  return (
    <View style={styles.container}>
      <View className="items-center justify-center">
        <Animated.Image source={image} style={{ objectFit: "contain", width: 200, height: 200 }} />
        <Text style={styles.text} className="text-4xl font-bold">
          Physica Finance
        </Text>
      </View>
      <View className="items-center justify-center gap-4 mt-36">
        <Text style={styles.text} className="text-2xl font-bold">
          Jump start your crypto portfolio
        </Text>
        <Text style={styles.text} className="text-base px-16 text-center">
          Import an existing wallet or create a new one
        </Text>
      </View>
      <View className="items-center justify-center gap-4 mt-20 w-full">
        <TouchableOpacity className="w-full" onPress={handleImportFromSeed}>
          <Text style={{ ...styles.buttonPrimaryBoarding }}>Import Using Seed Phrase</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-full">
          <Text style={{ ...styles.buttonOutlineBoarding }}>Import From Private Keys</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColor.appBackgroundColor,
    color: "white",
    fontFamily: "Inter_400Regular",
    paddingTop: 64,
    padding: 16,
  },
  text: {
    fontFamily: "Inter_400Regular",
    color: "white",
  },
  buttonPrimaryBoarding: {
    backgroundColor: themeColor.buttonPrimaryBackgroundColor,
    color: themeColor.textColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
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
  },
});
