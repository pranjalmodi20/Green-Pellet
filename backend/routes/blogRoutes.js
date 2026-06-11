const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const { validateBlogPost, validateBlogCategory } = require('../validators/blogValidator');

// ── PUBLIC ROUTES ──────────────────────────────────────────────────────────────
router.get('/', blogController.getBlogs);
router.get('/categories', blogController.getCategories);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/:slug/related', blogController.getRelatedBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// ── ADMIN BLOG ROUTES ─────────────────────────────────────────────────────────
router.get('/admin/all', authMiddleware, blogController.getAllBlogsAdmin);
router.post('/', authMiddleware, validateBlogPost, blogController.createBlog);
router.put('/:id', authMiddleware, validateBlogPost, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// ── ADMIN CATEGORY ROUTES ─────────────────────────────────────────────────────
router.post('/categories', authMiddleware, validateBlogCategory, blogController.createCategory);
router.put('/categories/:id', authMiddleware, validateBlogCategory, blogController.updateCategory);
router.delete('/categories/:id', authMiddleware, blogController.deleteCategory);

module.exports = router;
