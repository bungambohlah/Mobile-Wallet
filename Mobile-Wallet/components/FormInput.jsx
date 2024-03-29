import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { themeColor } from "../constants/themeColor";

export default function FormInput({
  type,
  password,
  onChangeText,
  error,
  errorMessage,
  placeholder,
  style,
  multiline,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  if (type === "password") {
    return (
      <View className={`flex flex-col w-full`} style={style}>
        {multiline ? (
          <TouchableOpacity
            className="absolute right-12 top-5 z-10 mt-0.5 p-2"
            rippleColor="rgba(255, 255, 255, .32)"
            onPress={() => {}}
          >
            <Feather name="maximize" size={20} color="white" />
          </TouchableOpacity>
        ) : null}
        <TextInput
          mode="outlined"
          value={multiline && passwordVisible ? password.replace(/\S/g, "•") : password}
          onChangeText={onChangeText}
          returnKeyType="go"
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          outlineColor="white"
          textColor="white"
          activeOutlineColor="white"
          cursorColor="white"
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye" : "eye-off"}
              color="white"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          style={multiline ? styles.inputMultiline : styles.input}
          multiline={multiline ? true : false}
        />
        <HelperText
          type="error"
          visible={error}
          padding="none"
          style={{ color: themeColor.errorColor }}
        >
          {errorMessage}
        </HelperText>
      </View>
    );
  }

  return;
}

const styles = StyleSheet.create({
  input: {
    height: 42,
    backgroundColor: themeColor.appBackgroundColor,
  },
  inputMultiline: {
    height: 80,
    backgroundColor: themeColor.appBackgroundColor,
  },
});
