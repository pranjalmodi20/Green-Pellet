exports.validateIndustry = (req, res, next) => {
  const errors = [];
  const { title, slug } = req.body;

  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Industry title is required');
    if (!slug) errors.push('Industry slug is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
