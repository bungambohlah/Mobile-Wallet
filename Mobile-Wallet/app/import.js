import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { importWallet } from '../utils/wallethelper/import'; 
const ImportWalletPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);

  const handleImportWallet = () => {
    const details = importWallet(privateKey, mnemonic);
    setWalletDetails(details);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setPrivateKey}
        value={privateKey}
        placeholder="Enter your private key"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMnemonic}
        value={mnemonic}
        placeholder="Or enter your mnemonic"
        autoCapitalize="none"
      />
      <Button title="Import Wallet" onPress={handleImportWallet} />
      {walletDetails && (
        <View style={styles.walletDetails}>
          <Text>Wallet Address: {walletDetails.address}</Text>
          <Text>Private Key: {walletDetails.privateKey}</Text>
          <Text>Corresponding Planq Address: {walletDetails.planqAddress}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  walletDetails: {
    marginTop: 20,
  },
});

export default ImportWalletPage;
