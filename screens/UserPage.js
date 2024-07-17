import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getUser, updateUser } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const UserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(userId);
      if (response.success) {
        setName(response.data.name);
        setEmail(response.data.email);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    const response = await updateUser(userId, name, email);
    if (response.success) {
      setMessage('Profile updated successfully');
    } else {
      setMessage('Failed to update profile');
    }
  };

  const handleLogout = () => {
    // Implement logout functionality
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="User Profile" />
      <Text style={styles.title}>User Profile</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {message ? <Text style={{ color: 'green', marginTop: 10 }}>{message}</Text> : null}
      <Footer />
    </View>
  );
};

export default UserPage;
