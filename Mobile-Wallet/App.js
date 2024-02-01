import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ethers } from 'ethers';

export default function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.EtherscanProvider(); // Using Etherscan's default provider
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setBalance('Error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Ethereum Address" 
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Get Balance" onPress={getBalance} />
      {balance !== '' && <Text>Balance: {balance} ETH</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
});
