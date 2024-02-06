import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/about" asChild>
        <Pressable>
          <Text>Go to About Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}
