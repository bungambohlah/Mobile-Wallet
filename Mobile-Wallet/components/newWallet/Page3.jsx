import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Page3_Success from "./Page3_Success";
import { getRandomStrings } from "../../utils/helper";
import { themeColor } from "../../constants/themeColor";
import { useSession } from "../../hooks/ctx";

export default function Page3() {
  let { userWallet } = useSession();
  userWallet = JSON.parse(userWallet || "{}");
  const [section, setSection] = useState("confirm");
  const mnemonic = userWallet.mnemonic?.split(" ");
  const removePhrase = getRandomStrings(mnemonic || [], 4);
  for (const phrase of removePhrase) {
    mnemonic?.splice(mnemonic?.indexOf(phrase), 1);
  }
  const correctPhrases = mnemonic || [];
  const selectPhrases = getRandomStrings(correctPhrases || [], 3);
  const [selectUserPhrase, setSelectUserPhrase] = useState([]);

  if (section === "success") {
    return <Page3_Success />;
  }

  return (
    <View className="gap-8 p-6" style={styles.page}>
      <Text className="w-full text-center font-bold text-xl" style={styles.text}>
        Confirm Seed Phrase
      </Text>
      <View className="w-full justify-center mt-16">
        <Text className="text-center" style={styles.text}>
          Select each word in the order it was presented to you
        </Text>
      </View>
      <View className="w-full items-center flex flex-row flex-wrap gap-4 pl-5">
        {selectPhrases.map((val, idx) => (
          <View
            key={idx}
            className="w-20 border py-1 px-2 bg-transparent rounded-md flex flex-row"
            style={{
              borderColor: themeColor.phraseBorderColor,
              backgroundColor: selectUserPhrase[idx] ? themeColor.phraseBorderColor : "transparent",
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontSize: 11,
                color: selectUserPhrase[idx]
                  ? themeColor.appBackgroundColor
                  : themeColor.phraseBorderColor,
              }}
            >
              {mnemonic?.findIndex((el) => el === val) + 1}.
            </Text>
            {selectUserPhrase[idx] ? (
              <Text
                style={{
                  ...styles.text,
                  marginLeft: 10,
                  fontSize: 11,
                  color: themeColor.appBackgroundColor,
                }}
              >
                {selectUserPhrase[idx] || null}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
      <View
        className="w-full flex flex-row flex-wrap justify-center px-3 py-6 rounded-2xl -z-50"
        style={styles.card}
      >
        {correctPhrases.map((val, idx) => (
          <TouchableOpacity
            style={styles.mnemonic}
            onPress={() => setSelectUserPhrase((s) => [...s, val])}
          >
            <View key={idx}>
              <Text className="text-xs" style={styles.mnemonicText}>
                {val}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: "center",
  },
  card: {
    rowGap: 16,
    columnGap: 16,
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
});
