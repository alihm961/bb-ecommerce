import apiClient from './apiClient';

// Guest routes
export const login = (credentials) => apiClient.post('/api/v1/guest/login', credentials);
export const register = (data) => apiClient.post('/api/v1/guest/register', data);

// Authenticated user routes
export const logout = () => apiClient.post('/api/v1/user/logout');

