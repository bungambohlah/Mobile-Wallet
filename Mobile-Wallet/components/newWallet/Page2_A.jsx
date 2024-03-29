import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Button, Icon } from "react-native-paper";

import { themeColor } from "../../constants/themeColor";

export default function Page2_A({ processNext, setProcessNext, section, setSection, setStep }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (processNext === 2 && section === "A") {
      setSection("B");
      setProcessNext(1);
      setStep(1);
    }
  }, [processNext, section]);

  return (
    <>
      <View className="gap-8 p-6" style={styles.page}>
        <Text className="font-bold text-xl" style={styles.text}>
          Secure your wallet
        </Text>
        <View className="w-full flex flex-row gap-2 items-center justify-center">
          <Text style={styles.text}>
            Secure your wallet's{" "}
            <Text style={{ ...styles.text, color: themeColor.buttonPrimaryBackgroundColor }}>
              "Seed Phrase"
            </Text>
            .
          </Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Icon
              source="information-outline"
              size={16}
              color={themeColor.buttonPrimaryBackgroundColor}
            />
          </TouchableOpacity>
        </View>
        <View className="w-full p-4 rounded-2xl" style={styles.card}>
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg" style={styles.text}>
              Manuel
            </Text>
            <Text className="text-xs" style={styles.text}>
              Security level:{" "}
              <Text className="text-xs" style={{ ...styles.text, color: themeColor.checkedColor }}>
                Very Stong
              </Text>
            </Text>
          </View>
          <Text style={styles.text} className="mb-2">
            Write down your seed phrase on a piece of paper and store in a safe place.
          </Text>
          <Text style={styles.text} className="mb-1">
            Risks are:
          </Text>
          <Text style={styles.text}>• You lose it</Text>
          <Text style={styles.text}>• You forget where you put it</Text>
          <Text style={styles.text}>• Someone else finds it</Text>
        </View>
        <View className="w-full p-4 rounded-2xl" style={styles.card}>
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg" style={styles.text}>
              Other options: Doesn't have to be paper!
            </Text>
          </View>
          <Text style={styles.text} className="mb-1">
            Tips:
          </Text>
          <Text style={styles.text}>• Store in bank vault</Text>
          <Text style={styles.text}>• Store in a safe</Text>
          <Text style={styles.text}>• Store in multiple secret places</Text>
        </View>
      </View>
      <Modal
        className="justify-end m-0"
        testID={"modal"}
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
      >
        <View className="flex flex-col items-center w-full p-8" style={styles.modalBottom}>
          <Text className="font-bold text-xl mb-12" style={styles.text}>
            What is a{" "}
            <Text style={{ ...styles.text, color: themeColor.buttonPrimaryBackgroundColor }}>
              'Seed Phrase'
            </Text>
          </Text>
          <Text style={styles.text} className="w-full mb-4">
            A seed phrase is a set of twelve words that contains all the information about your
            wallet, including your funds. It's like a secret code used to access your entire wallet.
          </Text>
          <Text style={styles.text} className="w-full mb-4">
            You must keep your seed phrase secret and safe. If someone gets your seed phrase,
            they'll gain control over your accounts.
          </Text>
          <Text style={styles.text} className="w-full mb-12">
            Save it in a place where only you can access it. If you lose it, not even MetaMask can
            help you recover it.
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowModal(false)}
            buttonColor={themeColor.buttonPrimaryBackgroundColor}
            style={{ borderRadius: 12, width: "80%" }}
            contentStyle={{ borderRadius: 12, height: 50 }}
          >
            I Got It
          </Button>
        </View>
      </Modal>
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
  modalBottom: {
    backgroundColor: themeColor.modalBottomBackgroundColor,
    height: 450,
  },
  card: {
    backgroundColor: themeColor.phraseCardBackgroundColor,
  },
});
