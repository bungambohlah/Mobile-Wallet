import { View, Text, StyleSheet } from "react-native";

import { themeColor } from "../../../constants/themeColor";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
    color: "white",
    fontFamily: "Inter_400Regular",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter_400Regular",
    color: "white",
  },
});
