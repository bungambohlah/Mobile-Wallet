import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link, Stack } from "expo-router";

export default function Page() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.EtherscanProvider(); // Using Etherscan's default provider
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setBalance("Error");
    }
  };

  return (
    <View className="flex p-8 pt-16 flex-col gap-2" style={styles.container}>
      <Stack.Screen />
      <Text className="text-white">Home</Text>
      <Link href="/about" asChild>
        <Button title="Go to About Page" />
      </Link>
      <View>
        <TextInput
          className="h-10 w-10/12 border-gray-500 border mb-3 p-3 text-white"
          placeholderTextColor={"white"}
          placeholder="Enter Ethereum Address"
          value={address}
          onChangeText={setAddress}
        />
        <Button title="Get Balance" onPress={getBalance} />
        {balance !== "" && <Text>Balance: {balance} ETH</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01081F",
    color: "white",
    fontFamily: "Inter_400Regular",
  },
});
