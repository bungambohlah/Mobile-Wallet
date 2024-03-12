import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button, Icon } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";

import { themeColor } from "../../constants/themeColor";
import { router } from "expo-router";
import { useState } from "react";
import Animated from "react-native-reanimated";

const labels = ["", "", ""];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: themeColor.buttonPrimaryBackgroundColor,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: themeColor.buttonPrimaryBackgroundColor,
  stepStrokeUnFinishedColor: "white",
  separatorFinishedColor: themeColor.buttonPrimaryBackgroundColor,
  separatorUnFinishedColor: "white",
  stepIndicatorFinishedColor: themeColor.buttonPrimaryBackgroundColor,
  stepIndicatorUnFinishedColor: themeColor.appBackgroundColor,
  stepIndicatorCurrentColor: themeColor.buttonPrimaryBackgroundColor,
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: "transparent",
  stepIndicatorLabelFinishedColor: "transparent",
  stepIndicatorLabelUnFinishedColor: "transparent",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#7eaec4",
};
const image = require("../../assets/success.png");

export default function Page() {
  const [step, setStep] = useState(0);

  const onStepPress = (position) => {
    setStep(position);
  };

  const buttonBack = () => {
    if (step === 0) {
      router.back();
      return;
    }

    setStep((s) => s - 1);
  };

  return (
    <View style={styles.container}>
      <View className="flex flex-row w-full items-center">
        <TouchableOpacity onPress={buttonBack} style={{ marginTop: -24 }}>
          <Icon source="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-fulll flex-1">
          <StepIndicator
            customStyles={customStyles}
            currentPosition={step}
            stepCount={3}
            labels={labels}
            onPress={onStepPress}
          />
        </View>
      </View>
      {step === 0 ? (
        <View style={styles.page}>
          <Text style={styles.text}>Page 1</Text>
        </View>
      ) : null}
      {step === 1 ? (
        <View style={styles.page}>
          <Text style={styles.text}>Page 2</Text>
        </View>
      ) : null}
      {step === 2 ? (
        <View className="gap-16 p-6" style={styles.page}>
          {/* step 3 */}
          <Animated.Image
            source={image}
            style={{ objectFit: "contain", width: 142, height: 142 }}
          />
          <Text className="font-bold text-xl" style={styles.text}>
            Congratulations
          </Text>
          <View className="mt-16 gap-4">
            <Text className="text-center" style={styles.text}>
              You've successfully protected your wallet. Remember to keep your seed phrase safe,
              it's your responsibility!
            </Text>
            <Text className="text-center" style={styles.text}>
              DefiSquid cannot recover your wallet should you lose it. You can find your seedphrase
              in{" "}
              <Text style={{ ...styles.text, color: themeColor.buttonPrimaryBackgroundColor }}>
                Setings &gt; Security & Privacy
              </Text>
            </Text>
          </View>
        </View>
      ) : null}
      <View className="w-full pb-2 items-center">
        {step < 2 ? (
          <Button
            mode="contained"
            onPress={() => setStep((s) => s + 1)}
            buttonColor={themeColor.buttonPrimaryBackgroundColor}
            style={{ borderRadius: 12, width: "80%" }}
            contentStyle={{ borderRadius: 12, height: 50 }}
          >
            Next
          </Button>
        ) : null}
        {step >= 2 ? (
          <Button
            mode="contained"
            onPress={() => router.replace("/")}
            buttonColor={themeColor.buttonPrimaryBackgroundColor}
            style={{ borderRadius: 12, width: "80%" }}
            contentStyle={{ borderRadius: 12, height: 50 }}
          >
            Done
          </Button>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
