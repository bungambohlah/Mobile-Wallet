import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { themeColor } from '../../../constants/themeColor';
import { StyledView } from "../../../constants/styledComponents"
import { CardPortfolio } from '../../../components/card/CardPortfolio';
import { CoinList } from "../../../components/card/CoinList";
import { Heading } from '../../../components/typography/Heading';
import { FECTH_TOKEN } from '../../../constants/apiURL';
import { PullToRefreshScrollView } from "../../../components/scroll/index";

export default function PortfolioPage() {
  const [tokenData, setTokenData] = useState([]);
  const countCoins = 2; // Assuming this will be dynamically calculated based on the fetched data

  useEffect(() => {
    // Placeholder for fetch operation
    // Here you would fetch your token data and set it using setTokenData
    // Example: fetch(FECTH_TOKEN).then(response => response.json()).then(data => setTokenData(data));

    // Simulating fetching data
    const fetchedData = []; // Simulate data fetching
    setTokenData(fetchedData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StyledView className="container items-start justify-center min-h-screen px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
        <Heading title={`Portfolio`} fontSize="4xl" setButton={false} />

        <PullToRefreshScrollView>
          <CardPortfolio
            title={`Total Available`}
            amount={`$2,509.75`}
            btnSendText={`Send`}
            onPressSend={() => console.log("Button Send pressed")}
            btnReceiveText={`Receive`}
            onPressReceive={() => console.log("Button Receive pressed")}
          />

          <Heading title={`Your Coins (${countCoins})`} fontSize="xl" setButton={false} />
          <CoinList list={tokenData} isArrow={true} />
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