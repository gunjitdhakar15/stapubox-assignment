import axios from 'axios';
import store from '../store';

const BASE_URL = 'https://stapubox.com';

const API_TOKEN = 'trial_51869851_c04cf7af301eae1c3b702156189558fe';
const ASSESSMENT_ENTITY = 'gunjit15@gmail.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Token': API_TOKEN,
    entity: ASSESSMENT_ENTITY,
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.token;
    config.headers.entity = ASSESSMENT_ENTITY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with an error status
      const {status, data} = error.response;
      if (status === 401) {
        // Token expired or invalid
        console.warn('Authentication failed. Token may be expired.');
      }
      return Promise.reject({
        status,
        message:
          data?.msg ||
          data?.error ||
          `Request failed with status ${status}`,
        data: data,
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
      });
    }
    return Promise.reject({
      status: -1,
      message: error.message || 'Unknown error',
    });
  },
);

export default apiClient;
