import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function DiscoverPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Home Page Content</Text>
        {/* You can add more content here as needed */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use the entire screen
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    backgroundColor: '#f5f5f5', // Light gray background
  },
  content: {
    padding: 20, // Add some padding around the content
  },
  text: {
    fontSize: 20, // Increase the font size for better readability
    fontWeight: 'bold', // Make the text bold
    color: '#333', // Dark gray color for the text
  },
});
