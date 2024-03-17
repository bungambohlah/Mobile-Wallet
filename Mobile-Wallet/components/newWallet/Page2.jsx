import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import Modal from "react-native-modal";
import { Button, Checkbox } from "react-native-paper";

import { themeColor } from "../../constants/themeColor";
import Page2_A from "./Page2_A";
import Page2_B from "./Page2_B";
const image = require("../../assets/secure.png");

export default function Page2({ processNext, setProcessNext, setStep }) {
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [section, setSection] = useState("main");

  useEffect(() => {
    if (processNext === 2 && section === "main") {
      setSection("A");
      setProcessNext(1);
      setStep(1);
    }
  }, [processNext]);

  if (section === "main") {
    return (
      <>
        <View className="gap-16 p-6" style={styles.page}>
          <Animated.Image
            source={image}
            style={{ objectFit: "contain", width: 200, height: 200 }}
          />
          <View className="mt-16 gap-4 items-center">
            <Text className="font-bold text-xl" style={styles.text}>
              Secure your wallet
            </Text>
            <Text className="text-center" style={styles.text}>
              Don't risk losing your funds. protect your wallet by saving your{" "}
              <Text style={{ ...styles.text, color: themeColor.buttonPrimaryBackgroundColor }}>
                Seed phrase
              </Text>{" "}
              in a place you trust.
            </Text>
          </View>
        </View>
        <View className="flex w-full items-center mb-4">
          <TouchableOpacity className="w-full items-center" onPress={() => setShowModal(true)}>
            <Text style={styles.buttonOutline}>Remind Me Later</Text>
          </TouchableOpacity>
        </View>
        <Modal
          className="justify-end m-0"
          testID={"modal"}
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
        >
          <View className="flex flex-col items-center w-full py-6 px-4" style={styles.modalBottom}>
            <Text className="font-bold text-xl" style={styles.text}>
              Skip Account Security ?
            </Text>
            <View className="flex flex-row gap-2 mt-8">
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color={themeColor.textColor}
                uncheckedColor={themeColor.textColor}
                onPress={() => setChecked(!checked)}
              />
              <View className="flex flex-wrap">
                <Text className="-mt-1" style={styles.text}>
                  I understand that if i lose mt seed phrase{"\n"}i will not be able to access my
                  wallet
                </Text>
              </View>
            </View>
            <View className="flex flex-row gap-4 mt-8 justify-start items-center px-4">
              <TouchableOpacity
                className="w-1/2"
                style={{ height: 50 }}
                onPress={() => {
                  setSection("A");
                }}
              >
                <Text
                  style={{
                    ...styles.buttonOutline,
                    width: "100%",
                    height: 50,
                    fontSize: 16,
                    marginTop: 0,
                  }}
                >
                  Enable
                </Text>
              </TouchableOpacity>
              {checked ? (
                <Button
                  mode="contained"
                  buttonColor={themeColor.buttonPrimaryBackgroundColor}
                  className="w-1/2"
                  style={{ borderRadius: 12, height: 50 }}
                  contentStyle={{ borderRadius: 12, height: 50 }}
                  onPress={() => {
                    setProcessNext(2);
                    setStep(2);
                    setSection("main");
                  }}
                >
                  Skip
                </Button>
              ) : (
                <Button
                  mode="contained"
                  buttonColor={themeColor.disabledButtonBackgroundColor}
                  textColor={themeColor.disabledButtonTextColor}
                  className="w-1/2"
                  style={{ borderRadius: 12, height: 50 }}
                  contentStyle={{ borderRadius: 12, height: 50 }}
                >
                  Skip
                </Button>
              )}
            </View>
          </View>
        </Modal>
      </>
    );
  }

  if (section === "A") {
    return (
      <Page2_A
        processNext={processNext}
        setProcessNext={setProcessNext}
        section={section}
        setSection={setSection}
        setStep={setStep}
      />
    );
  }

  if (section === "B") {
    return (
      <Page2_B
        processNext={processNext}
        setProcessNext={setProcessNext}
        section={section}
        setSection={setSection}
        setStep={setStep}
      />
    );
  }

  return null;
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
  buttonOutline: {
    width: "80%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: themeColor.buttonOutlineTextColor,
    color: themeColor.buttonOutlineTextColor,
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  modalBottom: {
    backgroundColor: themeColor.modalBottomBackgroundColor,
    height: 260,
  },
});
