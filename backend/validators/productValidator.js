exports.validateProduct = (req, res, next) => {
  const errors = [];
  const { title, slug, shortDescription, image } = req.body;

  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Product title is required');
    if (!slug) errors.push('Product slug is required');
    if (!shortDescription && !req.body.description) errors.push('Product description is required');
    if (!image) errors.push('Product image is required');
  }

  if (title !== undefined && title.trim().length === 0) {
    errors.push('Product title cannot be empty');
  }
  if (slug !== undefined && slug.trim().length === 0) {
    errors.push('Product slug cannot be empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};