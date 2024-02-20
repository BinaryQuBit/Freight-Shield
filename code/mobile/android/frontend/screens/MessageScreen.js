import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function MessageScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello!', id: 1, sender: 'company' },
    { text: 'Hi there.', id: 2, sender: 'driver' },
    // Add more mock messages here...
  ]);

  const handleSend = () => {
    if (message.trim().length > 0) {
      
      setMessages(previousMessages => [...previousMessages, { text: message, id: Date.now(), sender: 'driver' }]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isDriverMessage = item.sender === 'driver';

    return (
      <View style={[styles.message, isDriverMessage ? styles.driverMessage : styles.companyMessage]}>
        <Text style={[styles.messageText, isDriverMessage && styles.driverMessageText]}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMessage}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  driverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff', // Blue for driver
  },
  companyMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6e6', // Light gray for company
  },
  messageText: {
    fontSize: 16,
    color: '#333', // Dark text color for company messages
  },
  driverMessageText: {
    color: '#fff', // White text color for driver messages
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
