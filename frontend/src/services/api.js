import axios from 'axios';

// Development: relative baseURL to use Vite proxy, fallback to direct backend URL
const API_BASE_URL = import.meta.env.DEV ? '' : 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 120 seconds (2 mins) to handle deep translator + vector search + LLM generation
});

export default api;
