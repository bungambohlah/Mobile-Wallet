import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { ethers } from 'ethers';
import { EvmosWallet, EvmosProvider } from '@evmos/client';

const TransactionHelper = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const sendTransaction = async () => {
    try {
      const provider = new EvmosProvider('<RPC_URL>'); // Replace <RPC_URL> with your Evmos RPC URL
      const wallet = new EvmosWallet(privateKey, provider);
      
      const transaction = {
        to: recipientAddress,
        value: ethers.utils.parseEther(amount), // Convert amount to wei
        gasLimit: ethers.utils.hexlify(100000), // Set gas limit
        gasPrice: ethers.utils.hexlify(2500), // Set gas price
      };

      const txResponse = await wallet.sendTransaction(transaction);
      await txResponse.wait(); // Wait for the transaction to be mined
      setTransactionHash(txResponse.hash);
      alert('Transaction successful!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Recipient Address"
        value={recipientAddress}
        onChangeText={setRecipientAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Send Transaction" onPress={sendTransaction} />
      {transactionHash ? <Text>Transaction Hash: {transactionHash}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TransactionHelper;

