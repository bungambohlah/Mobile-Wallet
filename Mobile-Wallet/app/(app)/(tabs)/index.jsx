import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CoinList } from "../../../components/card/CoinList";
import { StyledView } from "../../../constants/styledComponents";
import { CardView } from '../../../components/card/CardView';
import { themeColor } from '../../../constants/themeColor';
import { Heading } from '../../../components/typography/Heading';
import { PullToRefreshScrollView } from "../../../components/scroll/index";
import { fetch } from "../../../api/useAPI"; // Ensure this is adjusted to actually fetch data
import { FETCH_TOKEN } from '../../../constants/apiURL'; // Correct the FETCH_TOKEN constant if needed

export default function HomePage() {
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    // Placeholder for fetching tokens, adjust based on your API
    const fetchData = async () => {
      try {
        const data = await fetch({ API_URL: FETCH_TOKEN, rawLines: 'tokens' });
        setTokenData(data); // Make sure to adjust this based on how your fetch function and API work
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StyledView style={styles.content}>
        <PullToRefreshScrollView>
          <CardView title={`Welcome, Alfin Sugestian`} subtitle={`Make your investment today`} buttonText={`Invest Today`} onPress={() => console.log("Button pressed")} />
          <Heading title={`Trending Coins`} fontSize="xl" setButton={false} />
          <CoinList list={tokenData} isArrow={false} />
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
    backgroundColor: themeColor.appBackgroundColor, // Ensure this color is defined or adjust accordingly
  },
  content: {
    width: '100%', // Adjusted to take full width
    height: '100%', // Adjusted to take full height
    padding: 20, 
  },
  text: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
  },
});
