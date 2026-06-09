exports.validateTestimonial = (req, res, next) => {
  const errors = [];
  const { name, role, quote, rating } = req.body;

  const isPost = req.method === 'POST';

  if (isPost) {
    if (!name) errors.push('Author name is required');
    if (!role) errors.push('Author role is required');
    if (!quote) errors.push('Quote text content is required');
  }

  if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
    errors.push('Rating must be an integer between 1 and 5');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
