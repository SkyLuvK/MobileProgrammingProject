import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const Header = ({ title }) => {
  return (
    <View style={{ padding: 16, backgroundColor: '#007BFF' }}>
      <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default Header;
