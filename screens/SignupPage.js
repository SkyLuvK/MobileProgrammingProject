// SignupPage.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { signup } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState(''); // State for security answer
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    const response = await signup(name, email, password, securityAnswer); // Pass security answer to signup function
    if (response.success) {
      // Navigate to Login
      navigation.navigate('Login');
    } else {
      setError('Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Sign Up" />
      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Add a label for security question */}
      <Text style={styles.label}>Security Question: What is your favourite book?</Text>
      {/* Input for security answer */}
      <TextInput
        style={styles.input}
        placeholder="Security Answer"
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default SignupPage;
