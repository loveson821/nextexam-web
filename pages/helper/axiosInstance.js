import axios from 'axios';
import { reject } from 'lodash';
let headers = {"Content-Type": "application/json"};

// AsyncStorage.setItem('token', '2UWirLmhUxspMPjcE5gH')
const axiosInstance = axios.create({
  baseURL: "https://www.examhero.com/api/",
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = "X7msRyi7MLDJPjg59gS3"
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Device-Model'] = 'web'
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 401) {
      window.location = "/users/sign_in"
      // navigate(LOGOUT, {tokenExpired: true});
    }else if (error.response.status === 404) {
      // navigate(LOGOUT, {tokenExpired: true});
    }else if (error.response.status === 403) {
      // navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;