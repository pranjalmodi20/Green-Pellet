import api from './api';

// ── PUBLIC ────────────────────────────────────────────────────────────────────

/**
 * Fetch paginated blog list.
 * Supports: category (slug), search, tag, author, page, pageSize, featured, limit
 * Returns: { blogs, total, page, pages } OR array (when limit is passed)
 */
export const fetchBlogs = async (params = {}) => {
  const response = await api.get('/blogs', { params });
  return response.data;
};

/** Fetch only featured blogs. limit defaults to 1 on backend. */
export const fetchFeaturedBlogs = async (limit = 1) => {
  const response = await api.get('/blogs/featured', { params: { limit } });
  return response.data;
};

/** Fetch a single blog by slug. */
export const fetchBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

/** Fetch related blogs for a given slug. */
export const fetchRelatedBlogs = async (slug, limit = 3) => {
  const response = await api.get(`/blogs/${slug}/related`, { params: { limit } });
  return response.data;
};

/** Fetch all categories. */
export const fetchCategories = async () => {
  const response = await api.get('/blogs/categories');
  return response.data;
};

// ── ADMIN ─────────────────────────────────────────────────────────────────────

export const fetchAllBlogsAdmin = async (token) => {
  const response = await api.get('/blogs/admin/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createBlog = async (data, token) => {
  const response = await api.post('/blogs', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateBlog = async (id, data, token) => {
  const response = await api.put(`/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteBlog = async (id, token) => {
  const response = await api.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createCategory = async (data, token) => {
  const response = await api.post('/blogs/categories', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateCategory = async (id, data, token) => {
  const response = await api.put(`/blogs/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteCategory = async (id, token) => {
  const response = await api.delete(`/blogs/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

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
