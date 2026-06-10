import api from './api';

/**
 * Fetch the full Why Biomass page document from CMS.
 * @returns {Promise<object>}
 */
export const fetchWhyBiomassPage = async () => {
  const response = await api.get('/why-biomass');
  return response.data;
};

/**
 * Update the Why Biomass page document (admin only).
 * @param {object} data - Full or partial Why Biomass page payload
 * @param {string} token - Admin JWT
 * @returns {Promise<object>}
 */
export const updateWhyBiomassPage = async (data, token) => {
  const response = await api.put('/why-biomass', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
