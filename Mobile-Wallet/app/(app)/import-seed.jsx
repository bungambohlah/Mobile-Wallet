import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Icon } from "react-native-paper";

import { themeColor } from "../../constants/themeColor";

export default function Page() {
  const buttonBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View className="flex flex-row w-full items-center">
        <TouchableOpacity onPress={buttonBack}>
          <Icon source="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-full items-center flex-auto mr-8">
          <Text style={styles.text} className="text-lg font-bold text-center">
            Import From Seed
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
});
