import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { object, string, ref, boolean } from "yup";
import { AsyncStorage } from 'react-native';
import { themeColor } from "../../constants/themeColor";
import FormInput from "../FormInput";

export default function Page1({ processNext, setProcessNext, setStep }) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({
    passwordError: false,
    passwordErrorMessage: "",
    passwordConfirmError: false,
    passwordConfirmErrorMessage: "",
    checkedError: false,
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
  let fullPasswordSchema = passwordSchema.concat(passwordConfirmSchema).concat(checkedSchema);

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

  useEffect(() => {
    if (processNext === 1) {
      fullPasswordSchema
        .validate({ password, passwordConfirm, checked }, { abortEarly: false })
        .then(() => {
          setErrors((s) => ({
            ...s,
            ...{
              passwordError: false,
              passwordErrorMessage: "",
              passwordConfirmError: false,
              passwordConfirmErrorMessage: "",
              checkedError: false,
            },
          }));

          // logic to go to next page
          setStep((s) => s + 1);
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

          // logic to prevent go to next page
          setProcessNext((s) => s - 1);
        });
    }
  }, [processNext]);

  async function savePassphrase(passphrase) {
    try {
      await AsyncStorage.setItem('walletPassphrase', passphrase);
      console.log('Passphrase saved successfully.');
    } catch (error) {
      console.error('Error saving passphrase:', error);
    }
  }
  

  return (
    <View className="gap-16 p-6" style={styles.page}>
      <View className="mt-16 gap-4 items-center">
        <Text className="font-bold text-xl" style={styles.text}>
          Create password
        </Text>
        <Text className="text-center" style={styles.text}>
          This password will unlock your Rabbit wallet only on this service
        </Text>
      </View>

      {/* Input secton */}
      <View className="flex flex-col w-full gap-4 pr-4">
        <FormInput
          type="password"
          className="pr-6"
          error={errors.passwordError}
          errorMessage={errors.passwordErrorMessage}
          password={password}
          onChangeText={onChangePassword}
          placeholder="New password"
        />
        <FormInput
          type="password"
          className="pr-6"
          error={errors.passwordConfirm}
          errorMessage={errors.passwordConfirmErrorMessage}
          password={passwordConfirm}
          onChangeText={onChangePasswordConfirm}
          placeholder="Confirm password"
        />
        <View className="flex flex-row w-full pr-6 gap-2">
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={themeColor.checkedColor}
            uncheckedColor={errors.checkedError ? themeColor.errorColor : themeColor.neutralColor}
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
