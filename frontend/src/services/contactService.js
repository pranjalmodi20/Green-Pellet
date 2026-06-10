import api from './api';

/**
 * Fetch the Contact Page config from the CMS.
 * @returns {Promise<object>}
 */
export const fetchContactPage = async () => {
  const response = await api.get('/contact/page');
  return response.data;
};

/**
 * Update the Contact Page config (admin only).
 * @param {object} data - Updated page config
 * @param {string} token - Admin JWT token
 * @returns {Promise<object>}
 */
export const updateContactPage = async (data, token) => {
  const response = await api.put('/contact/page', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Submit an inquiry from the contact form.
 * @param {object} submissionData - { fullName, email, phone, company, industry, tonnage, subject, message }
 * @returns {Promise<object>}
 */
export const submitContactInquiry = async (submissionData) => {
  const response = await api.post('/contact/submit', submissionData);
  return response.data;
};

/**
 * Fetch all contact submissions (admin only).
 * @param {object} params - { status, search } query parameters
 * @param {string} token - Admin JWT token
 * @returns {Promise<array>}
 */
export const fetchContactSubmissions = async (params, token) => {
  const response = await api.get('/contact/submissions', {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetch a single contact submission by ID (admin only).
 * @param {string} id - Submission ID
 * @param {string} token - Admin JWT token
 * @returns {Promise<object>}
 */
export const fetchContactSubmissionById = async (id, token) => {
  const response = await api.get(`/contact/submissions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Update a contact submission, e.g. status or notes (admin only).
 * @param {string} id - Submission ID
 * @param {object} data - { status, notes }
 * @param {string} token - Admin JWT token
 * @returns {Promise<object>}
 */
export const updateContactSubmission = async (id, data, token) => {
  const response = await api.put(`/contact/submissions/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete a contact submission (admin only).
 * @param {string} id - Submission ID
 * @param {string} token - Admin JWT token
 * @returns {Promise<object>}
 */
export const deleteContactSubmission = async (id, token) => {
  const response = await api.delete(`/contact/submissions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
