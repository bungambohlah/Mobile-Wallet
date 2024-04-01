import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import WebView from 'react-native-webview';
import { themeColor } from '../../../constants/themeColor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DiscoverPage = () => {
  const [webViewUrl, setWebViewUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  const visitUrl = (url) => {
    setWebViewUrl(url);
    setShowWebView(true);
  };

  const goBackHome = () => {
    setShowWebView(false);
    setWebViewUrl('');
  };

  const handleGoBackInWebView = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={goBackHome} style={styles.iconButton}>
          <Icon name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.urlInput}
          value={webViewUrl}
          onChangeText={setWebViewUrl}
          placeholder="Type URL"
          placeholderTextColor="#ccc"
        />
        {showWebView && (
          <TouchableOpacity onPress={handleGoBackInWebView} style={styles.iconButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => visitUrl(webViewUrl)} style={styles.iconButton}>
          <Icon name="arrow-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showWebView ? (
        <WebView
          ref={webViewRef}
          source={{ uri: webViewUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      ) : (
        <View style={styles.content}>
          <TouchableOpacity onPress={() => visitUrl('https://physica.finance/')} style={styles.card}>
            <View style={styles.cardBox}>
              <Image source={require('../../../assets/physica.png')} style={styles.cardImage} />
              <Text style={styles.cardText}>Physica Finance</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => visitUrl('https://deltaswap.io/')} style={styles.card}>
            <View style={styles.cardBox}>
              <Image source={require('../../../assets/delta.png')} style={styles.cardImage} />
              <Text style={styles.cardText}>DeltaSwap.io</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.appBackgroundColor,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    width: '100%',
    backgroundColor: themeColor.appBackgroundColor,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  urlInput: {
    flex: 1,
    minHeight: 30,
    maxHeight: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#000',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0056b3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  cardText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default DiscoverPage;
