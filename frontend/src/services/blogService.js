import api from './api';

/**
 * Fetch blogs based on filters.
 * @param {Object} params - Query params (category, search, featured, limit)
 */
export const fetchBlogs = async (params = {}) => {
  const response = await api.get('/blogs', { params });
  return response.data;
};

/**
 * Fetch a single blog by slug.
 */
export const fetchBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

/**
 * Fetch all categories.
 */
export const fetchCategories = async () => {
  const response = await api.get('/blogs/categories');
  return response.data;
};

/**
 * Fetch all blogs for admin console (includes inactive/unpublished).
 */
export const fetchAllBlogsAdmin = async (token) => {
  const response = await api.get('/blogs/admin/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Create a new blog post.
 */
export const createBlog = async (data, token) => {
  const response = await api.post('/blogs', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Update an existing blog post.
 */
export const updateBlog = async (id, data, token) => {
  const response = await api.put(`/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Delete a blog post.
 */
export const deleteBlog = async (id, token) => {
  const response = await api.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Create a blog category.
 */
export const createCategory = async (data, token) => {
  const response = await api.post('/blogs/categories', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Update a blog category.
 */
export const updateCategory = async (id, data, token) => {
  const response = await api.put(`/blogs/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Delete a blog category.
 */
export const deleteCategory = async (id, token) => {
  const response = await api.delete(`/blogs/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Upload a media asset (images, pdfs).
 */
export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
