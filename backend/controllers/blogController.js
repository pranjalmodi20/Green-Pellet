const BlogPost = require('../models/BlogPost');
const BlogCategory = require('../models/BlogCategory');

// ── CATEGORIES ──

exports.getCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new BlogCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── BLOG POSTS ──

exports.getBlogs = async (req, res) => {
  try {
    const { category, search, featured, limit } = req.query;
    const filter = { status: 'active', published: true };

    if (featured === 'true') {
      filter.featured = true;
    }

    if (category) {
      // Find category by slug first
      const cat = await BlogCategory.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      } else {
        // If category slug doesn't exist, return empty array
        return res.json([]);
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    let query = BlogPost.find(filter)
      .populate('category')
      .sort({ featured: -1, displayOrder: 1, publishedAt: -1 });

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const blogs = await query;
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin route to fetch all posts regardless of status/publish
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await BlogPost.find()
      .populate('category')
      .sort({ displayOrder: 1, createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug, status: 'active', published: true })
      .populate('category');
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = new BlogPost(req.body);
    await blog.save();
    const populated = await BlogPost.findById(blog._id).populate('category');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('category');
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};