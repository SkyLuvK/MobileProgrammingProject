import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const Footer = () => {
  return (
    <View style={{ padding: 16, backgroundColor: '#f8f8f8', borderTopWidth: 1, borderTopColor: '#ccc' }}>
      <Text style={{ textAlign: 'center', color: '#999' }}>© 2024 Your App</Text>
    </View>
  );
};

export default Footer;
