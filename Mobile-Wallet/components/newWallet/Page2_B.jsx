import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

import { themeColor } from "../../constants/themeColor";
import { useSession } from "../../hooks/ctx";
import { Button } from "react-native-paper";

export default function Page2_B({ processNext, setProcessNext, section, setStep }) {
  let { userWallet = "" } = useSession();
  const [isBlur, setIsBlur] = useState(true);

  useEffect(() => {
    if (processNext === 2 && section === "B") {
      setProcessNext(2);
      setStep(2);
    }
  }, [processNext]);

  return (
    <>
      <View className="gap-8 p-6" style={styles.page}>
        <Text className="font-bold text-xl" style={styles.text}>
          Write Down Your Seed Phrase
        </Text>
        <Text style={styles.text} className="mb-16">
          This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be
          asked to re-enter this phrase (in order) on the next step.
        </Text>
        <BlurView intensity={isBlur ? 65 : 0} experimentalBlurMethod="dimezisBlurView" tint="dark">
          <View
            className="flex flex-row flex-wrap justify-center px-3 py-6 rounded-2xl -z-50"
            style={styles.card}
          >
            {userWallet.split(" ")?.map((val, idx) => (
              <View key={idx} style={styles.mnemonic}>
                <Text className="text-xs" style={styles.mnemonicText}>
                  {idx + 1}. {val}
                </Text>
              </View>
            ))}
          </View>
        </BlurView>
        {isBlur ? (
          <View style={styles.absolute} className="items-center justify-center">
            <Text className="font-bold mb-2" style={styles.text}>
              Tap to reveal your seed phrase
            </Text>
            <Text
              className="text-xs mb-4"
              style={{ ...styles.text, color: themeColor.neutralColor }}
            >
              Make sure no one is watching your screen.
            </Text>
            <Button
              mode="contained"
              buttonColor={themeColor.buttonPrimaryBackgroundColor}
              style={{ borderRadius: 12, width: "25%" }}
              contentStyle={{ borderRadius: 12, height: 40 }}
              onPress={() => setIsBlur(false)}
            >
              View
            </Button>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Inter_400Regular",
    color: "white",
  },
  page: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    rowGap: 16,
    columnGap: 16,
    backgroundColor: themeColor.phraseCardBackgroundColor,
  },
  mnemonic: {
    fontFamily: "Inter_400Regular",
    display: "flex",
    alignItems: "center",
    width: "29%",
    backgroundColor: "white",
    borderRadius: 6,
    height: 30,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  mnemonicText: {
    fontSize: 11,
  },
  absolute: {
    position: "absolute",
    top: 70,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 50,
  },
});
