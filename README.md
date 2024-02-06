# Mobile-Wallet

Mobile-wallet development for planq network using react native and cosmos keys

## Table of Contents

- [Mobile-Wallet](#mobile-wallet)
  - [Table of Contents](#table-of-contents)
  - [Development Dependencies](#development-dependencies)
  - [Development Setup](#development-setup)
  - [UI Libraries](#ui-libraries)

## Development Dependencies

1. install expo-cli (`npm install -g expo-cli`)
2. install eas-cli (`npm install -g eas-cli`)
3. Must have Expo Account, if you don't registered yet then register in [here](https://expo.dev/signup)

## Development Setup

1. if you don't login into eas-cli, then run eas login (if already login, then skip this step)
2. run `eas build:configure`
3. run `eas build --profile development --platform android`, you change into ios if you want to install in the ios platform, more information on [here](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
4. after build, you have QR Code to install the app
5. run `npx expo start --dev-client` to link the app with your devices

**NOTE: when run step 5, making sure all your devices (android and laptop) are connected to the same wifi/networks.**

## UI Libraries

- [Nativewind](https://www.nativewind.dev/) (Tailwind in the react native)
- [React Native Paper](https://reactnativepaper.com/) (React Native Material UI)
- [React Native Paper Dropdown](https://fateh999.github.io/react-native-paper-dropdown/#/) (React Native for Dropdown component)
