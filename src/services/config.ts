import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND || 'http://localhost:3030',
});

export default api;
