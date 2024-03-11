import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { generateWallet } from '../utils/wallethelper/generate'; // Adjust the import path as needed

export default function GenerateWalletPage() {
    const [wallet, setWallet] = useState(null);

    const handleGenerateWallet = () => {
        const newWallet = generateWallet();
        setWallet(newWallet);
    };

    return (
        <View style={styles.container}>
            <Button title="Generate New Wallet" onPress={handleGenerateWallet} />
            {wallet && (
                <>
                    <Text style={styles.text}>Wallet Address: {wallet.ethAddress}</Text>
                    <Text style={styles.text}>Private Key: {wallet.privateKey}</Text>
                    <Text style={styles.text}>Mnemonic: {wallet.mnemonic}</Text>
                    <Text style={styles.text}>Planq Address: {wallet.planqAddress}</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 20,
    },
});
