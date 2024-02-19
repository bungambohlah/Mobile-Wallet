import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View>
      <Text>About</Text>
      <Link href="/" asChild>
        <Pressable>
          <Text>Go to Home Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}
