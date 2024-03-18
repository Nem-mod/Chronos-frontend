import axios from 'axios';

export const webURL = "http://localhost:4000"

const instance = axios.create({
    baseURL: 'http://localhost:5000/v1',
    withCredentials: true
});

// instance.interceptors.request.use((config) => {
//     config.headers.Authorization = window.localStorage.getItem('token');
//     return config;
// })
export default instance;