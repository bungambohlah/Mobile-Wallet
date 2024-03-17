import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { themeColor } from "../../constants/themeColor";
const image = require("../../assets/success.png");

export default function Page3_Success() {
  return (
    <View className="gap-16 p-6" style={styles.page}>
      <Animated.Image source={image} style={{ objectFit: "contain", width: 142, height: 142 }} />
      <Text className="font-bold text-xl" style={styles.text}>
        Congratulations
      </Text>
      <View className="mt-16 gap-4">
        <Text className="text-center" style={styles.text}>
          You've successfully protected your wallet. Remember to keep your seed phrase safe, it's
          your responsibility!
        </Text>
        <Text className="text-center" style={styles.text}>
          DefiSquid cannot recover your wallet should you lose it. You can find your seedphrase in{" "}
          <Text style={{ ...styles.text, color: themeColor.buttonPrimaryBackgroundColor }}>
            Setings &gt; Security & Privacy
          </Text>
        </Text>
      </View>
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
