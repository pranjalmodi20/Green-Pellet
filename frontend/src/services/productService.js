import api from './api';

/**
 * Fetch Products page hero & CTA configurations.
 */
export const fetchProductsConfig = async () => {
  const response = await api.get('/products/config');
  return response.data;
};

/**
 * Update Products page hero & CTA configurations.
 */
export const updateProductsConfig = async (data, token) => {
  const response = await api.put('/products/config', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetch all active products, optionally filtered by category.
 */
export const fetchProducts = async (categoryId = '') => {
  const url = categoryId ? `/products?category=${categoryId}` : '/products';
  const response = await api.get(url);
  return response.data;
};

/**
 * Fetch single product detail by slug.
 */
export const fetchProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

/**
 * Fetch all products including inactive (admin).
 */
export const fetchAllProducts = async (token) => {
  const response = await api.get('/products/all', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Create a new product.
 */
export const createProduct = async (data, token) => {
  const response = await api.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Update an existing product.
 */
export const updateProduct = async (id, data, token) => {
  const response = await api.put(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete a product.
 */
export const deleteProduct = async (id, token) => {
  const response = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetch all product categories.
 */
export const fetchCategories = async () => {
  const response = await api.get('/product-categories');
  return response.data;
};

/**
 * Create a category.
 */
export const createCategory = async (data, token) => {
  const response = await api.post('/product-categories', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Update a category.
 */
export const updateCategory = async (id, data, token) => {
  const response = await api.put(`/product-categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete a category.
 */
export const deleteCategory = async (id, token) => {
  const response = await api.delete(`/product-categories/${id}`, {
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
