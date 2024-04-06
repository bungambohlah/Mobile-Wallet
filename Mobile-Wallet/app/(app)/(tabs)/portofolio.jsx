import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents";
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { CoinList } from "../../../components/card/CoinList";
import { Heading } from '../../../components/typography/Heading';
import { PullToRefreshScrollView } from "../../../components/scroll/index";
import { fetchEthBalance, fetchPlanqBalance } from '../../../utils/wallethelper/fetchBalance'; // Adjust the path as needed



const ETH_RPC_PROVIDER = 'https://evm-rpc.planq.network/';
const PLANQ_RPC_PROVIDER = 'Your_Planq_RPC_Endpoint'; // Replace with your Planq RPC endpoint

export default function PortfolioPage() {
  const [tokenData, setTokenData] = useState([]);
  const [ethAddress, setEthAddress] = useState('Loading...');
  const [planqAddress, setPlanqAddress] = useState('Loading...');
  const [ethBalance, setEthBalance] = useState('Loading...');
  const [planqBalance, setPlanqBalance] = useState('Loading...');
  const countCoins = 2;

  useEffect(() => {
    const fetchWalletDataAndBalances = async () => {
      try {
        const walletDataString = await SecureStore.getItemAsync('Wallet');
        if (walletDataString) {
          const walletData = JSON.parse(walletDataString);
          setEthAddress(walletData.ethAddress);
          console.log(walletData.ethAddress)
          setPlanqAddress(walletData.planqAddress);
          console.log(walletData.planqAddress)
          const ethBal = await fetchEthBalance(walletData.ethAddress, ETH_RPC_PROVIDER);
          setEthBalance(ethBal + ' Planq');
        } else {
          setEthAddress('No wallet data found');
        }
      } catch (error) {
        console.error('Error retrieving wallet data and balances:', error);
        setEthAddress('Error fetching data');
        setPlanqAddress('Error fetching data');
      }
    };

    fetchWalletDataAndBalances();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StyledView className="container items-start justify-center min-h-screen px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
        <Heading title={`Portfolio`} fontSize="4xl" />
        <PullToRefreshScrollView>
          <CardPortfolio
            title={`Available`}
            subtitle={`Address: ${ethAddress}`} // Display Ethereum address as subtitle
            amount={`${ethBalance}`} // Display Ethereum balance
            btnSendText={`Send`}
            onPressSend={() => console.log("Button Send pressed")}
            btnReceiveText={`Receive`}
            onPressReceive={() => console.log("Button Receive pressed")}
          />
        </PullToRefreshScrollView>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
