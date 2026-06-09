exports.validateProduct = (req, res, next) => {
  const errors = [];
  const { title, description, image, spec } = req.body;

  // Only validate presence if POST (creating)
  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Product title is required');
    if (!description) errors.push('Product description is required');
    if (!image) errors.push('Product image is required');
    if (!spec) errors.push('Product spec/caloric value is required');
  }

  // Common format checks
  if (title !== undefined && title.trim().length === 0) {
    errors.push('Product title cannot be empty');
  }
  if (description !== undefined && description.trim().length === 0) {
    errors.push('Product description cannot be empty');
  }
  if (image !== undefined && image.trim().length === 0) {
    errors.push('Product image URL cannot be empty');
  }
  if (spec !== undefined && spec.trim().length === 0) {
    errors.push('Product spec cannot be empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};