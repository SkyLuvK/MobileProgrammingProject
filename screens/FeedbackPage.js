import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { submitFeedback } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  const handleFeedbackSubmit = async () => {
    const response = await submitFeedback(feedback, photo);
    if (response.success) {
      setMessage('Feedback submitted successfully');
    } else {
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Feedback" />
      <Text style={styles.title}>Submit Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Feedback"
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo.uri }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity style={styles.button} onPress={handleFeedbackSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {message ? <Text style={{ color: 'green', marginTop: 10 }}>{message}</Text> : null}
      <Footer />
    </View>
  );
};

export default FeedbackPage;