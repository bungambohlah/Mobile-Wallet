import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DiscoverPage() {
  const [history, setHistory] = useState([
    { id: "1", url: "https://www.eth.com" },
    { id: "2", url: "https://www.deltaswap.co.id" },
  ]);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  const handlePressHistory = (item) => {
    setWebViewUrl(item.url);
    setShowWebView(true);
  };

  const handleRemoveHistory = (item) => {
    setHistory(history.filter(historyItem => historyItem.id !== item.id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleVisit = (inputUrl = webViewUrl) => {
    let url = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    setWebViewUrl(url);
    setShowWebView(true);
  };
  
  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showWebView ? (
        <>
          <View style={styles.navbar}>
            <TouchableOpacity onPress={handleGoBack} disabled={!canGoBack} style={[styles.navButton, !canGoBack && styles.disabledButton]}>
              <Text style={{ color: canGoBack ? '#000' : '#ccc' }}>Back</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.urlInput}
              value={webViewUrl}
              onChangeText={setWebViewUrl}
              onSubmitEditing={() => handleVisit()}
              placeholder="Type URL and press Enter"
            />
            <TouchableOpacity onPress={() => handleVisit()} style={styles.navButton}>
              <Text>Go</Text>
            </TouchableOpacity>
          </View>
          <WebView
            ref={webViewRef}
            source={{ uri: webViewUrl }}
            style={{ flex: 1 }}
            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </>
      ) : (
        <>
          <Text style={styles.heading}>Discover Apps</Text>
          <TextInput
            style={styles.urlInput}
            placeholder="Type URL"
            onChangeText={(text) => setWebViewUrl(`https://${text}`)}
          />
          <TouchableOpacity onPress={() => handleVisit('https://www.physica.finance/')} style={styles.navButton}>
            <Text>Visit Our dApps</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Histories</Text>
          {history.length > 0 && (
            <>
              {history.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => handlePressHistory(item)} style={styles.historyItem}>
                  <Text>{item.url}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={handleClearHistory} style={styles.clearHistoryButton}>
                <Text>Clear History</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Use a white background for a clean look
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure elements are evenly spaced
    padding: 8, // Adjust padding for a tighter navbar
    backgroundColor: '#007AFF', // A blue color typical for actionable items
    borderBottomWidth: 1,
    borderColor: '#ccc', // Light border to separate the navbar
  },
  urlInput: {
    flex: 1,
    height: 35, // Specify a fixed height for the input to align with the navbar's height
    borderWidth: 1,
    borderColor: '#ccc', // Subtle border for the input
    paddingHorizontal: 10, // Horizontal padding within the input
    marginLeft: 10, // Space between the back button and the input field
    marginRight: 5, // Slightly less space on the right to compensate for the "Go" button
    borderRadius: 15, // Match the navbar's curvature
    backgroundColor: '#f5f5f5', // Light background for the input
    color: '#000', // Text color
    fontSize: 16, // Adjust font size for readability
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0056b3', // Darker blue for buttons to stand out
    borderRadius: 15, // Rounded corners to match the navbar's and input field's style
    justifyContent: 'center',
    alignItems: 'center',
    height: 35, // Match the height of the urlInput for uniformity
  },
  disabledButton: {
    backgroundColor: '#aaa', // Grayed out for disabled state
  },
  // Other styles remain unchanged
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#007AFF',
    textAlign: 'center',
  },
  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  clearHistoryButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    marginTop: 10,
    borderRadius: 20,
  },
});