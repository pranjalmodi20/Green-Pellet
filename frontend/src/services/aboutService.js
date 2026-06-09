import api from './api';

/**
 * Fetch the full About page document from CMS.
 * @returns {Promise<object>}
 */
export const fetchAboutPage = async () => {
  const response = await api.get('/about');
  return response.data;
};

/**
 * Update the About page document (admin only).
 * @param {object} data - Full or partial About page payload
 * @param {string} token - Admin JWT
 * @returns {Promise<object>}
 */
export const updateAboutPage = async (data, token) => {
  const response = await api.put('/about', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Admin authentication for CMS access.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, admin: object }>}
 */
export const adminLogin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
