import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://persona-api-2nryopyb2q-et.a.run.app/', 
});

// Interceptor request
instance.interceptors.request.use(
  async config => {
    // Mengambil token dari AsyncStorage (jika menggunakan token)
    const token = await AsyncStorage.getItem('app_token');
    if (token) {
      // Menambahkan token ke header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;