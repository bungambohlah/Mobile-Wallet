import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { themeColor } from '../../../constants/themeColor';
import { StyledTextInput, StyledView } from "../../../constants/styledComponents"
import { CardVisit } from '../../../components/card/CardVisit';
import { Heading } from '../../../components/typography/Heading';
import { HistoryList } from '../../../components/card/HistoryList';
import { PullToRefreshScrollView } from '../../../components/scroll';

export default function DiscoverPage() {
  const [history, setHistory] = useState([
    { id: "1", url: "www.eth.com" },
    { id: "2", url: "www.deltaswap.co.id" },
  ]);
  const countBrowserTab = 2;
  const anyHistories = history.length > 0;

  const handlePressHistory = (item) => {
    console.log("Pressed History:", item);
  };

  const handleRemoveHistory = (item) => {
    console.log("Removed History:", item);

  };

  const handleClearHistory = () => {
    setHistory([]); // Clearing history by setting it to an empty array
  };

  const handleVisit = () => {
    const url = 'https://www.physica.finance/'
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StyledView className="container items-start justify-start min-h-screen px-5 pt-16 pb-20 space-y-2" style={{ backgroundColor: themeColor.appBackgroundColor }}>
        <Heading
          title={`Discover Apps`}
          fontSize="4xl"
          setBorder={true}
          setButton={true}
          onPress={() => console.log("Button Discover pressed")}
          buttonText={`${countBrowserTab}`} />
        <PullToRefreshScrollView>

          <StyledTextInput className="w-full px-3 py-5 font-semibold text-gray-500 bg-white rounded-lg" placeholderTextColor="gray" placeholder={`Type URL`} />

          <CardVisit title={`Visit Our dApps`} onPress={handleVisit} />

          <Heading title={`Histories`}
            fontSize="xl"
            setBorder={false}
            setButton={anyHistories}
            onPress={anyHistories ? () => handleClearHistory() : ""}
            buttonText={anyHistories ? 'Clear' : ""} />
          {anyHistories &&
            <HistoryList list={history} onPress={handlePressHistory} onRemove={handleRemoveHistory} />
          }
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
