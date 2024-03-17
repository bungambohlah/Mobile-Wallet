import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, View } from "react-native";

import { themeColor } from "../../../constants/themeColor";

NavigationBar.setBackgroundColorAsync(themeColor.appBackgroundColor);

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="portofolio"
          options={{
            title: "Portofolio",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="pie-chart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
    color: "white",
    fontFamily: "Inter_400Regular",
  },
});
