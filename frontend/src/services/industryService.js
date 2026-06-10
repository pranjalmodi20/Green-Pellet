import api from './api';

/**
 * Fetch Industries page configurations.
 */
export const fetchIndustriesConfig = async () => {
  const response = await api.get('/industries/config');
  return response.data;
};

/**
 * Update Industries page configurations.
 */
export const updateIndustriesConfig = async (data, token) => {
  const response = await api.put('/industries/config', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetch all active industries.
 */
export const fetchIndustries = async () => {
  const response = await api.get('/industries');
  return response.data;
};

/**
 * Fetch single industry detail by slug.
 */
export const fetchIndustryBySlug = async (slug) => {
  const response = await api.get(`/industries/${slug}`);
  return response.data;
};

/**
 * Fetch all industries including inactive (admin).
 */
export const fetchAllIndustries = async (token) => {
  const response = await api.get('/industries/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Create a new industry.
 */
export const createIndustry = async (data, token) => {
  const response = await api.post('/industries', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Update an existing industry.
 */
export const updateIndustry = async (id, data, token) => {
  const response = await api.put(`/industries/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete an industry.
 */
export const deleteIndustry = async (id, token) => {
  const response = await api.delete(`/industries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetch all active case studies.
 */
export const fetchCaseStudies = async () => {
  const response = await api.get('/case-studies');
  return response.data;
};

/**
 * Fetch all case studies including inactive (admin).
 */
export const fetchAllCaseStudies = async (token) => {
  const response = await api.get('/case-studies/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Create a case study.
 */
export const createCaseStudy = async (data, token) => {
  const response = await api.post('/case-studies', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Update a case study.
 */
export const updateCaseStudy = async (id, data, token) => {
  const response = await api.put(`/case-studies/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete a case study.
 */
export const deleteCaseStudy = async (id, token) => {
  const response = await api.delete(`/case-studies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Upload image or document.
 */
export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
