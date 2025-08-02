export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base URL for serving static files
export const BASE_URL = API_URL.replace('/api', '');

// Helper to get image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  // Extract filename from full path
  const filename = imagePath.split('/').pop();
  return `${BASE_URL}/uploads/${filename}`;
};

export const MAX_POST_LENGTH = 280;
export const MAX_BIO_LENGTH = 160;

