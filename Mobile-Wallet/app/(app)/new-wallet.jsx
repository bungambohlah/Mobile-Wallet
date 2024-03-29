import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import { router } from "expo-router";

import { themeColor } from "../../constants/themeColor";
import Page1 from "../../components/newWallet/Page1";
import Page2 from "../../components/newWallet/Page2";
import Page3 from "../../components/newWallet/Page3";
import { useSession } from "../../hooks/ctx";

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

export default function Page() {
  let { setIsOnboard } = useSession();
  const [processNext, setProcessNext] = useState(0);
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
        <View className="w-full flex-1">
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
        <Page1 processNext={processNext} setProcessNext={setProcessNext} setStep={setStep} />
      ) : null}
      {step === 1 ? (
        <Page2 processNext={processNext} setProcessNext={setProcessNext} setStep={setStep} />
      ) : null}
      {step === 2 ? (
        <Page3 processNext={processNext} setProcessNext={setProcessNext} setStep={setStep} />
      ) : null}
      <View className="w-full pb-2 items-center">
        {processNext <= 2 ? (
          <Button
            mode="contained"
            onPress={() => setProcessNext(step + 1)}
            buttonColor={themeColor.buttonPrimaryBackgroundColor}
            style={{ borderRadius: 12, width: "80%" }}
            contentStyle={{ borderRadius: 12, height: 50 }}
          >
            Next
          </Button>
        ) : null}
        {processNext > 2 ? (
          <Button
            mode="contained"
            onPress={() => {
              setIsOnboard("true");
              router.dismissAll();
              router.replace("/(tabs)");
            }}
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
});
