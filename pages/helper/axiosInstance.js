import axios from 'axios';
let headers = {"Content-Type": "application/json"};

const axiosInstance = axios.create({
  baseURL: "https://www.examhero.com/api/",
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const token = "X7msRyi7MLDJPjg59gS3"
    const token = localStorage.getItem('token');
    // console.log("token", token);
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

// 添加请求拦截器
axiosInstance.interceptors.request.use(config=>{
  const { url } = config;
  // startsWith() ---以什么开头;  这两个请求路径不需要token 
  if(!url.startsWith('users')){ 
    const token = localStorage.getItem('token');
    if( !token ) window.location = "/auth/sign_in"
  }
  return config
})

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
      window.location = "/auth/sign_in"
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