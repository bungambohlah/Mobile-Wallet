import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="new-wallet" options={{ headerShown: false }} />
      <Stack.Screen name="have-wallet" options={{ headerShown: false }} />
      <Stack.Screen name="import-seed" options={{ headerShown: false }} />
    </Stack>
  );
}
