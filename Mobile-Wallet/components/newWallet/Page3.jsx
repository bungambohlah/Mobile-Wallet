import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Page3_Success from "./Page3_Success";
import { themeColor } from "../../constants/themeColor";
import { useSession } from "../../hooks/ctx";

export default function Page3() {
  const { userWallet } = useSession();
  const wallet = JSON.parse(userWallet || "{}");
  
  const [section, setSection] = useState("confirm");
  
  // useMemo to shuffle mnemonicWords
  const mnemonicWords = useMemo(() => {
    const words = wallet.mnemonic?.split(" ") || [];
    return words.sort(() => 0.5 - Math.random());
  }, [wallet.mnemonic]);

  const [selectUserPhrase, setSelectUserPhrase] = useState([]);

  useEffect(() => {
    if (selectUserPhrase.length === mnemonicWords.length && 
        selectUserPhrase.every((phrase) => mnemonicWords.includes(phrase))) {
      setSection("success");
    }
  }, [selectUserPhrase, mnemonicWords]);

  const handlePhraseSelect = (phrase) => {
    setSelectUserPhrase((currentPhrases) => 
      currentPhrases.includes(phrase) ?
        currentPhrases.filter(selectedPhrase => selectedPhrase !== phrase) :
        [...currentPhrases, phrase]
    );
  };

  if (section === "success") {
    return <Page3_Success />;
  }


  return (
    <View style={styles.page}>
      <Text style={styles.text}>Confirm Seed Phrase</Text>
      <Text style={styles.text}>Select each word in the order it was presented to you</Text>
      <View style={styles.phrasesContainer}>
        {mnemonicWords.map((phrase, index) => ( // Adding index to avoid potential key issue
          <TouchableOpacity
            key={`${phrase}-${index}`} // Use a combination of phrase and index to ensure keys are unique
            style={[
              styles.mnemonic,
              selectUserPhrase.includes(phrase) && styles.selectedMnemonic,
            ]}
            onPress={() => handlePhraseSelect(phrase)}
          >
            <Text style={styles.mnemonicText}>{phrase}</Text>
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
    marginTop: 20, // Added based on your previous setup for consistent spacing
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
    justifyContent: 'center', // Added for vertical centering of text in the mnemonic button
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
  selectedMnemonic: { // Style for selected mnemonic phrases
    backgroundColor: themeColor.selectedBackgroundColor,
  },
});

// Note: En
