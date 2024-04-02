import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function ChatsPage() {
  // Mock chat messages
  const messages = [
    { id: 1, text: "Hello! How are you?", sender: "Alf.planq", timestamp: "10:00 AM" },
    { id: 2, text: "I'm good, thanks! Working on a React Native app. You?", sender: "Jack.planq", timestamp: "10:02 AM" },
    { id: 3, text: "Same here. Just getting started with something new.", sender: "Alf.planq", timestamp: "10:05 AM" }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.text}>Chat</Text>
        </View>
        {messages.map(message => (
          <View key={message.id} style={styles.message}>
            <Text style={styles.messageSender}>{message.sender}</Text>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Updated styles according to the provided theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    width: '100%',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  messageSender: {
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 5,
  },
  messageTimestamp: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
});
