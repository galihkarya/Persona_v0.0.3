// import instance from "../../axiosConfig";

// const user_login = async data => {
//     try {
//         const result = await instance.post('/auth/token', {data:data})
//         return result
//     }
//     catch (error){
//       return error.response.data
//     }
// }

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://persona-api-2nryopyb2q-et.a.run.app/', // Ganti dengan URL base API Anda
});

// Interceptor request
instance.interceptors.request.use(
  async config => {
    // Mengambil token dari AsyncStorage (jika menggunakan token)
    const token = await AsyncStorage.getItem('appToken');
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

// Interceptor response
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // Menangani error response seperti autentikasi, refresh token, dll.
    if (error.response.status === 401) {
      // Lakukan sesuatu, seperti mengarahkan pengguna ke halaman login
      console.log(error);
      AsyncStorage.setItem('app_token', null);
    }
    return Promise.reject(error);
  },
);

export default instance;