import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Picker } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('Johor'); // Default state
  const apiKey = '168013637d1447c882c3ba794a5e1a76';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            q: selectedState + ',my',
            appid: apiKey,
            units: 'metric',
          },
        });
        setWeather(response.data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, [selectedState]);

  const renderWeatherInfo = () => {
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    } else if (weather) {
      return (
        <View style={styles.weatherContainer}>
          <View style={styles.weatherRow}>
            <Icon name="thermometer" type="font-awesome" color="#f50" size={50} />
            <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="cloud" type="font-awesome" color="#00aced" size={50} />
            <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="tint" type="font-awesome" color="#3498db" size={50} />
            <Text style={styles.weatherText}>Humidity: {weather.main.humidity}%</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="wind" type="font-awesome-5" color="#2ecc71" size={50} />
            <Text style={styles.weatherText}>Wind: {weather.wind.speed} m/s</Text>
          </View>
        </View>
      );
    } else {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Weather" />
      <View style={styles.content}>
        <Text style={styles.title}>Current Weather</Text>
        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Johor" value="Johor" />
          <Picker.Item label="Kedah" value="Kedah" />
          <Picker.Item label="Kelantan" value="Kelantan" />
          <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
          <Picker.Item label="Labuan" value="Labuan" />
          <Picker.Item label="Melaka" value="Melaka" />
          <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
          <Picker.Item label="Pahang" value="Pahang" />
          <Picker.Item label="Perak" value="Perak" />
          <Picker.Item label="Perlis" value="Perlis" />
          <Picker.Item label="Penang" value="Penang" />
          <Picker.Item label="Sabah" value="Sabah" />
          <Picker.Item label="Sarawak" value="Sarawak" />
          <Picker.Item label="Selangor" value="Selangor" />
          <Picker.Item label="Terengganu" value="Terengganu" />
        </Picker>
        {renderWeatherInfo()}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginVertical: 20,
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  weatherText: {
    fontSize: 18,
    marginLeft: 10,
  },
  picker: {
    width: '80%',
    marginVertical: 20,
  },
});

export default WeatherPage;
