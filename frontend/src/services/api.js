import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHomeConfig = async () => {
  const response = await api.get('/home/config');
  return response.data;
};

export const getMetrics = async () => {
  const response = await api.get('/home/metrics');
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getIndustries = async () => {
  const response = await api.get('/industries');
  return response.data;
};

export const getTestimonials = async () => {
  const response = await api.get('/testimonials');
  return response.data;
};

export const subscribeToNewsletter = async (email) => {
  const response = await api.post('/newsletter/subscribe', { email });
  return response.data;
};

export default api;
