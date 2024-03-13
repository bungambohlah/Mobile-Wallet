import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { themeColor } from "../constants/themeColor";

export default function FormInput({
  type,
  password,
  setPassword,
  error,
  errorMessage,
  placeholder,
  style,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  if (type === "password") {
    return (
      <View className={`flex flex-col w-full`} style={style}>
        <TextInput
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
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
          style={styles.input}
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
});
