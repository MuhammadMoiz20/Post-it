import axios from 'axios';
import { API_URL } from '../utils/constants.js';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Posts API
export const postsAPI = {
  create: (postData, imageFile) => {
    const formData = new FormData();
    formData.append('content', postData.content);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getTimeline: (page = 1) => api.get(`/posts?page=${page}`),
  getPost: (postId) => api.get(`/posts/${postId}`),
  delete: (postId) => api.delete(`/posts/${postId}`),
  like: (postId) => api.post(`/posts/${postId}/like`),
};

// Users API
export const usersAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  getUserPosts: (userId, page = 1) => api.get(`/users/${userId}/posts?page=${page}`),
  updateProfile: (userId, userData, imageFile) => {
    const formData = new FormData();
    if (userData.displayName) formData.append('displayName', userData.displayName);
    if (userData.bio !== undefined) formData.append('bio', userData.bio);
    if (imageFile) {
      formData.append('profilePicture', imageFile);
    }
    return api.put(`/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Follows API
export const followsAPI = {
  follow: (userId) => api.post(`/follows/${userId}`),
  getFollowers: (userId) => api.get(`/follows/${userId}/followers`),
  getFollowing: (userId) => api.get(`/follows/${userId}/following`),
};

export default api;

