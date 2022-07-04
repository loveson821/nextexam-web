import axios from 'axios';
let headers = {"Content-Type": "application/json"};

// AsyncStorage.setItem('token', '2UWirLmhUxspMPjcE5gH')
const axiosInstance = axios.create({
  baseURL: "https://www.examhero.com/api/",
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = null;
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

    if (error.response.status === 403) {
      // navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;