import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropdownAlert, { DropdownAlertType } from "react-native-dropdownalert";

import Page3_Success from "./Page3_Success";
import { themeColor } from "../../constants/themeColor";
import { useSession } from "../../hooks/ctx";
import { getRandomStrings } from "../../utils/helper";

let alert = (_data) => new Promise() < DropdownAlertData > ((res) => res);

export default function Page3({ processNext, setProcessNext }) {
  let { userWallet = "" } = useSession();
  const [section, setSection] = useState("confirm");
  const [correctPhrases, setCorrectPhrases] = useState([]);
  const [selectPhrases, setSelectPhrases] = useState([]);
  const [selectUserPhrase, setSelectUserPhrase] = useState([]);

  // useMemo to shuffle mnemonicWords
  const mnemonicWords = useMemo(() => {
    const words = userWallet.split(" ") || [];
    return words.sort(() => 0.5 - Math.random());
  }, [userWallet]);

  useEffect(() => {
    const mnemonicCopy = JSON.parse(JSON.stringify(mnemonicWords));
    const removePhrase = getRandomStrings(mnemonicCopy || [], 4);
    for (const phrase of removePhrase) {
      mnemonicCopy?.splice(mnemonicCopy?.indexOf(phrase), 1);
    }

    setCorrectPhrases(mnemonicCopy);
    setSelectPhrases(getRandomStrings(mnemonicCopy || [], 3));
  }, []);

  useEffect(() => {
    if (processNext === 3 && section !== "success") {
      // compare selected user phrases with correct phrases
      if (selectUserPhrase.join(" ") === selectPhrases.join(" ")) {
        setSection("success");
        setProcessNext(3);
      } else {
        setSelectUserPhrase([]);
        setProcessNext(2);
        alert({
          type: DropdownAlertType.Error,
          title: "Error",
          message: "Your seed phrase is not correct. Please try again.",
        });
      }
    }
  }, [processNext]);

  if (section === "success") {
    return <Page3_Success />;
  }

  return (
    <>
      <View className="gap-8 p-6" style={styles.page}>
        <Text className="w-full text-center font-bold text-xl" style={styles.text}>
          Confirm Seed Phrase
        </Text>
        <View className="w-full justify-center mt-16">
          <Text className="text-center" style={styles.text}>
            Select each word in the order it was presented to you
          </Text>
        </View>
        <View className="w-full items-center justify-center flex flex-row flex-wrap space-x-4">
          {selectPhrases.map((val, idx) => (
            <View
              key={idx}
              className="w-24 border py-1 px-2 bg-transparent rounded-md flex flex-row"
              style={{
                borderColor: themeColor.phraseBorderColor,
                backgroundColor: selectUserPhrase[idx]
                  ? themeColor.phraseBorderColor
                  : "transparent",
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
                {userWallet.split(" ")?.findIndex((el) => el === val) + 1}.
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
              key={idx}
              style={{
                ...styles.mnemonic,
                backgroundColor: selectUserPhrase.find((el) => el === val)
                  ? themeColor.disabledPhrasesBackgroundColor
                  : "white",
              }}
              onPress={
                selectUserPhrase.find((el) => el === val)
                  ? null
                  : () => setSelectUserPhrase((s) => (s.length < 3 ? [...s, val] : s))
              }
            >
              <View>
                <Text className="text-xs" style={styles.mnemonicText}>
                  {val}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <DropdownAlert alert={(func) => (alert = func)} />
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
    alignItems: "center",
    padding: 20, // Preserved padding from your previous setup for layout consistency
  },
  // card style was not used in your component, so it's not included in the update
  mnemonic: {
    fontFamily: "Inter_400Regular",
    display: "flex", // display: "flex" is the default in React Native and can be omitted
    alignItems: "center",
    justifyContent: "center", // Added for vertical centering of text in the mnemonic button
    width: "29%",
    backgroundColor: "white",
    borderRadius: 6,
    height: 30,
    paddingVertical: 6,
    paddingHorizontal: 8,
    margin: 5, // Adjust spacing between mnemonic buttons as needed
  },
  mnemonicText: {
    fontSize: 11,
  },
});

// Note: En
