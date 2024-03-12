import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Link } from "expo-router";
import { ethers } from "ethers";

import { useSession } from "../hooks/ctx";
import { Onboarding } from "../components/onboarding/Onboarding";

export default function Page() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const { isOnboard } = useSession();

  const getBalance = async () => {
    try {
      const provider = new ethers.EtherscanProvider(); // Using Etherscan's default provider
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setBalance("Error");
    }
  };

  // show onboarding view first if not yet
  if (!isOnboard) {
    return <Onboarding />;
  }

  return (
    <View className="flex p-8 pt-16 flex-col gap-2" style={styles.container}>
      <Text className="text-white">Home</Text>
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
