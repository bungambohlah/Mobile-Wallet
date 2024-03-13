import { StyleSheet, Text, View } from "react-native";

export default function Page2() {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Page 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_400Regular",
    color: "white",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
