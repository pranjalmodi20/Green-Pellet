exports.validateBlogPost = (req, res, next) => {
  const errors = [];
  const { title, slug, excerpt, content, category } = req.body;
  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Blog title is required');
    if (!slug) errors.push('Blog slug is required');
    if (!excerpt) errors.push('Blog excerpt is required');
    if (!content) errors.push('Blog content is required');
    if (!category) errors.push('Blog category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.validateBlogCategory = (req, res, next) => {
  const errors = [];
  const { name, slug } = req.body;
  const isPost = req.method === 'POST';

  if (isPost) {
    if (!name) errors.push('Category name is required');
    if (!slug) errors.push('Category slug is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};