import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Button, Checkbox, Icon } from "react-native-paper";
import { boolean, object, ref, string } from "yup";
import DropdownAlert, { DropdownAlertType } from "react-native-dropdownalert";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";

import { themeColor } from "../../constants/themeColor";
import FormInput from "../../components/FormInput";
import CameraPhrase from "../../components/camera/CameraPhrase";
import { useSession } from "../../hooks/ctx";

let alert = (_data) => new Promise()((res) => res);

export default function Page() {
  let { setIsOnboard } = useSession();
  const [phrases, setPhrases] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({
    phrasesError: false,
    phrasesErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    passwordConfirmError: false,
    passwordConfirmErrorMessage: "",
    checkedError: false,
  });
  const [startCamera, setStartCamera] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);

  const onStartCamera = async () => {
    if (permission.granted) {
      setStartCamera(true);
    } else if (!permission.granted) {
      alert({
        type: DropdownAlertType.Error,
        title: "Error",
        message: "Access denied.",
      });
      requestPermission();
    }
  };

  let phraseSchema = object().shape({
    phrases: string().required("Seed Phrases is required."),
  });
  let passwordSchema = object().shape({
    password: string().required("Password is required.").min(8, "Must be at least 8 characters."),
  });
  let passwordConfirmSchema = object().shape({
    passwordConfirm: string()
      .required("Password Confirm is required.")
      .min(8, "Must be at least 8 characters.")
      .oneOf([ref("password"), null], "Password doesn't match."),
  });
  let checkedSchema = object().shape({
    checked: boolean().oneOf([true]),
  });
  let fullPasswordSchema = phraseSchema
    .concat(passwordSchema)
    .concat(passwordConfirmSchema)
    .concat(checkedSchema);

  const buttonBack = () => {
    router.back();
  };

  function onChangePhrases(text) {
    setPhrases(text);
    phraseSchema
      .validate({ phrases: text })
      .then(() => {
        setErrors((s) => ({
          ...s,
          ...{
            phrasesError: false,
            phrasesErrorMessage: "",
          },
        }));
      })
      .catch((err) => {
        setErrors((s) => ({
          ...s,
          ...{
            phrasesError: err.errors?.length ? true : false,
            phrasesErrorMessage: err.errors?.length ? err.errors[0] : "",
          },
        }));
      });
  }

  function onChangePassword(text) {
    setPassword(text);
    passwordSchema
      .validate({ password: text })
      .then(() => {
        setErrors((s) => ({
          ...s,
          ...{
            passwordError: false,
            passwordErrorMessage: "",
          },
        }));
      })
      .catch((err) => {
        setErrors((s) => ({
          ...s,
          ...{
            passwordError: err.errors?.length ? true : false,
            passwordErrorMessage: err.errors?.length ? err.errors[0] : "",
          },
        }));
      });
  }

  function onChangePasswordConfirm(text) {
    setPasswordConfirm(text);
    const usedSchema = passwordSchema.concat(passwordConfirmSchema);

    usedSchema
      .validate({ password, passwordConfirm: text }, { abortEarly: false })
      .then(() => {
        setErrors((s) => ({
          ...s,
          ...{
            passwordConfirmError: false,
            passwordConfirmErrorMessage: "",
          },
        }));
      })
      .catch((err) => {
        let validationErrors = "";
        err.inner.forEach((error) => {
          if (error.path === "passwordConfirm") {
            validationErrors = error.message;
          }
        });

        setErrors((s) => ({
          ...s,
          ...{
            passwordConfirmError: validationErrors?.length ? true : false,
            passwordConfirmErrorMessage: validationErrors?.length ? validationErrors : "",
          },
        }));
      });
  }

  function onPressChecked() {
    setChecked((s) => {
      checkedSchema
        .validate({ checked: !s })
        .then(() => {
          setErrors((s) => ({
            ...s,
            ...{
              checkedError: false,
            },
          }));
        })
        .catch((err) => {
          setErrors((s) => ({
            ...s,
            ...{
              checkedError: err.errors?.length ? true : false,
            },
          }));
        });

      return !s;
    });
  }

  function importSeedPhrase() {
    fullPasswordSchema
      .validate({ phrases, password, passwordConfirm, checked }, { abortEarly: false })
      .then(() => {
        setErrors((s) => ({
          ...s,
          ...{
            phrasesError: false,
            phrasesErrorMessage: "",
            passwordError: false,
            passwordErrorMessage: "",
            passwordConfirmError: false,
            passwordConfirmErrorMessage: "",
            checkedError: false,
          },
        }));

        // if validate successfully then redirect into tab pages
        setIsOnboard("true");
        router.dismissAll();
        router.replace("/(tabs)");
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors((s) => ({
          ...s,
          ...{
            phrasesError: validationErrors.phrases?.length ? true : false,
            phrasesErrorMessage: validationErrors.phrases?.length ? validationErrors.phrases : "",
            passwordError: validationErrors.password?.length ? true : false,
            passwordErrorMessage: validationErrors.password?.length
              ? validationErrors.password
              : "",
            passwordConfirmError: validationErrors.passwordConfirm?.length ? true : false,
            passwordConfirmErrorMessage: validationErrors.passwordConfirm?.length
              ? validationErrors.passwordConfirm
              : "",
            checkedError: validationErrors.checked?.length ? true : false,
          },
        }));
      });
  }

  // useEffect(() => {
  //   (async () => {
  //     if (capturedImage?.uri) {
  //       const result = await TextRecognition.recognize(capturedImage.uri);
  //       console.log(result);
  //     }
  //   })();
  // }, [capturedImage]);

  return (
    <>
      {startCamera ? (
        <CameraPhrase setCapturedImage={setCapturedImage} setStartCamera={setStartCamera} />
      ) : (
        <View style={styles.container}>
          <View className="flex flex-row w-full items-center">
            <TouchableOpacity onPress={buttonBack}>
              <Icon source="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <View className="w-full items-center flex-auto mr-8 mb-2">
              <Text style={styles.text} className="text-lg font-bold text-center">
                Import From Seed
              </Text>
            </View>
          </View>
          {/* Input secton */}
          <View className="flex flex-col w-full space-y-2 mt-16 flex-1">
            <FormInput
              type="password"
              error={errors.phrasesError}
              errorMessage={errors.phrasesErrorMessage}
              password={phrases}
              onChangeText={onChangePhrases}
              placeholder="Seed phrase"
              multiline
              rightSecondComponent={
                <TouchableOpacity
                  className="absolute right-12 top-5 z-10 mt-0.5 p-2"
                  rippleColor="rgba(255, 255, 255, .32)"
                  onPress={onStartCamera}
                >
                  <Feather name="maximize" size={20} color="white" />
                </TouchableOpacity>
              }
            />
            <FormInput
              type="password"
              error={errors.passwordError}
              errorMessage={errors.passwordErrorMessage}
              password={password}
              onChangeText={onChangePassword}
              placeholder="New password"
            />
            <FormInput
              type="password"
              error={errors.passwordConfirm}
              errorMessage={errors.passwordConfirmErrorMessage}
              password={passwordConfirm}
              onChangeText={onChangePasswordConfirm}
              placeholder="Confirm password"
            />
            <View className="flex flex-row w-full gap-2">
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color={themeColor.checkedColor}
                uncheckedColor={
                  errors.checkedError ? themeColor.errorColor : themeColor.neutralColor
                }
                onPress={onPressChecked}
              />
              <View className="flex flex-wrap">
                <Text
                  className="text-xs"
                  style={{
                    ...styles.text,
                    color: errors.checkedError ? themeColor.errorColor : "white",
                  }}
                >
                  By proceeding, you agree to these Term and{"\n"}Conditions.
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full pb-2 items-center">
            <Button
              mode="contained"
              onPress={importSeedPhrase}
              buttonColor={themeColor.buttonPrimaryBackgroundColor}
              style={{ borderRadius: 12, width: "80%" }}
              contentStyle={{ borderRadius: 12, height: 50 }}
            >
              Next
            </Button>
          </View>
        </View>
      )}
      <DropdownAlert alert={(func) => (alert = func)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
});
