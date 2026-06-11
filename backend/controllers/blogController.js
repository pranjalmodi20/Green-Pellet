const BlogPost = require('../models/BlogPost');
const BlogCategory = require('../models/BlogCategory');

// ── HELPERS ──────────────────────────────────────────────────────────────────

const buildPublicFilter = () => ({
  status: 'active',
  published: true,
  $or: [
    { scheduledAt: null },
    { scheduledAt: { $lte: new Date() } }
  ]
});

// ── CATEGORIES ───────────────────────────────────────────────────────────────

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
    const category = await BlogCategory.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
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

// ── PUBLIC BLOG ROUTES ────────────────────────────────────────────────────────

exports.getBlogs = async (req, res) => {
  try {
    const { category, search, featured, tag, author, limit, page = 1, pageSize = 9 } = req.query;
    const filter = buildPublicFilter();

    if (featured === 'true') filter.featured = true;

    if (category) {
      const cat = await BlogCategory.findOne({ slug: category });
      if (cat) {
        filter.category = cat._id;
      } else {
        return res.json({ blogs: [], total: 0, page: 1, pages: 0 });
      }
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    if (author) {
      filter['author.name'] = { $regex: author, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // If explicit limit is requested (e.g. related posts), skip pagination
    if (limit) {
      const blogs = await BlogPost.find(filter)
        .populate('category')
        .sort({ featured: -1, displayOrder: 1, publishedAt: -1 })
        .limit(parseInt(limit, 10));
      return res.json(blogs);
    }

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedPageSize = Math.min(50, Math.max(1, parseInt(pageSize, 10)));
    const total = await BlogPost.countDocuments(filter);
    const pages = Math.ceil(total / parsedPageSize);

    const blogs = await BlogPost.find(filter)
      .populate('category')
      .sort({ featured: -1, displayOrder: 1, publishedAt: -1 })
      .skip((parsedPage - 1) * parsedPageSize)
      .limit(parsedPageSize);

    res.json({ blogs, total, page: parsedPage, pages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeaturedBlogs = async (req, res) => {
  try {
    const filter = { ...buildPublicFilter(), featured: true };
    const limit = parseInt(req.query.limit, 10) || 1;
    const blogs = await BlogPost.find(filter)
      .populate('category')
      .sort({ displayOrder: 1, publishedAt: -1 })
      .limit(limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRelatedBlogs = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const limit = parseInt(req.query.limit, 10) || 3;
    const filter = {
      ...buildPublicFilter(),
      _id: { $ne: blog._id },
      category: blog.category
    };

    const related = await BlogPost.find(filter)
      .populate('category')
      .sort({ publishedAt: -1 })
      .limit(limit);

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const filter = { slug: req.params.slug, ...buildPublicFilter() };
    const blog = await BlogPost.findOneAndUpdate(
      filter,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('category');
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
    const blog = await BlogPost.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    ).populate('category');
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
