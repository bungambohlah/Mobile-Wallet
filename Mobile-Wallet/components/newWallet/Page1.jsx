import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { object, string, ref, boolean } from "yup";

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

  let passwordSchema = object({
    password: string().required("Password is required.").min(8, "Must be at least 8 characters."),
    passwordConfirm: string()
      .required("Password is required.")
      .min(8, "Must be at least 8 characters.")
      .oneOf([ref("password"), null], "Password doesn't match."),
    checked: boolean().oneOf([true]),
  });

  useEffect(() => {
    if (processNext === 1) {
      Promise.all([
        passwordSchema.validate({ password, passwordConfirm, checked }, { abortEarly: false }),
      ])
        .then(([passwordValidation, passwordConfirmValidation, checkedValidation]) => {
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
          console.log(validationErrors);
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
          setPassword={setPassword}
          placeholder="New password"
        />
        <FormInput
          type="password"
          className="pr-6"
          error={errors.passwordConfirm}
          errorMessage={errors.passwordConfirmErrorMessage}
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
          placeholder="Confirm password"
        />
        <View className="flex flex-row w-full pr-6 gap-2">
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={themeColor.checkedColor}
            uncheckedColor={errors.checkedError ? themeColor.errorColor : themeColor.neutralColor}
            onPress={() => {
              setChecked(!checked);
            }}
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
