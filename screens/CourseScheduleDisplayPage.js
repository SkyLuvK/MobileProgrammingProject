import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getCourses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const CourseScheduleDisplayPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (response.success) {
          setCourses(response.data);
        } else {
          setError('Failed to load courses.');
        }
      } catch (err) {
        setError('An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingText} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (courses.length === 0) {
    return <Text style={styles.emptyText}>No courses available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title="Course Schedule" />
      <Text style={styles.title}>Course Schedule</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.flex1]}>Course Name</Text>
        <Text style={[styles.tableHeaderText, styles.flex1]}>Time</Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={[styles.courseText, styles.flex1]}>{item.name}</Text>
            <Text style={[styles.courseText, styles.flex1]}>{item.schedule}</Text>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

export default CourseScheduleDisplayPage;
