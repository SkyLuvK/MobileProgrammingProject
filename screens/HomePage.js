import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const HomePage = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();

  const handleLogout = () => {
    // Implement logout functionality
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Text style={styles.title}>Welcome Home!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CourseScheduleDisplay', { userId })}
      >
        <Text style={styles.buttonText}>View Course Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddDropCourse', { userId })}
      >
        <Text style={styles.buttonText}>Add/Drop Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Feedback', { userId })}
      >
        <Text style={styles.buttonText}>Give Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('User', { userId })}
      >
        <Text style={styles.buttonText}>User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Weather')}
      >
        <Text style={styles.buttonText}>Check Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default HomePage;
