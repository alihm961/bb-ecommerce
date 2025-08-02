import apiClient from './apiClient';

export const login = (credentials) => apiClient.post('/login', credentials);
export const register = (data) => apiClient.post('/register', data);
export const fetchMe = () => apiClient.get('/me');
export const logout = () => apiClient.post('/logout');
export const refreshToken = () => apiClient.post('/refresh');
