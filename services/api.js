import axios from 'axios';

const API_URL = 'http://localhost/EducationApp/EducationApp/src/php'; // Replace with your actual API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login.php`, { email, password });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signup = async (name, email, password, securityAnswer) => {
  try {
    const response = await axios.post(`${API_URL}/signup.php`, { name, email, password, securityAnswer });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const forgetPassword = async (email, securityAnswer) => {
  try {
    const response = await axios.post(`${API_URL}/forget-password.php`, { email, securityAnswer });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password.php`, { email, newPassword });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses.php`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addCourse = async (name, schedule) => {
  try {
    const response = await axios.post(`${API_URL}/courses.php`, { name, schedule });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const dropCourse = async (name) => {
  try {
    const response = await axios.delete(`${API_URL}/courses.php`, { data: { name } });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const submitFeedback = async (feedback, photo) => {
  const formData = new FormData();
  formData.append('feedback', feedback);
  if (photo) {
    formData.append('photo', {
      uri: photo.uri,
      name: 'feedback.jpg',
      type: 'image/jpeg',
    });
  }
  
  try {
    const response = await axios.post(`${API_URL}/feedback.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users.php/${userId}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUser = async (userId, name, email) => {
  try {
    const response = await axios.put(`${API_URL}/users.php/${userId}`, { name, email });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
