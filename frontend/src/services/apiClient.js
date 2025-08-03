
import axios from 'axios';

const apiClient = axios.create({
baseURL: 'http://localhost:8000',
headers: { 'Content-Type': 'application/json' },
});

// Auto-attach token
apiClient.interceptors.request.use((config) => {
const token = localStorage.getItem('token');

//remove auth header for guest
if (token && !config.url.includes('/guest/')) {
    config.headers.Authorization = `Bearer ${token}`;
}


return config;
});

export default apiClient;
