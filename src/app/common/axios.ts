import axios, { AxiosResponse } from 'axios';
import { history } from '../utils/history';

const axiosApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: '4fcaaa1bcae848ad40f21815bf7dffb2' };
  return config;
});

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        history.navigate('/login');
        break;
      case 404:
        history.navigate('/404');
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
