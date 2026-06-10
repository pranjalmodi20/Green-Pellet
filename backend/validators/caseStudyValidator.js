exports.validateCaseStudy = (req, res, next) => {
  const errors = [];
  const { title, slug, industry } = req.body;

  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Case study title is required');
    if (!slug) errors.push('Case study slug is required');
    if (!industry) errors.push('Industry assignment is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
