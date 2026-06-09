exports.validateIndustry = (req, res, next) => {
  const errors = [];
  const { title, description, image, icon, type } = req.body;

  const isPost = req.method === 'POST';

  if (isPost) {
    if (!title) errors.push('Industry title is required');
    if (!type) errors.push('Industry grid type is required');
    
    if (type && ['hero', 'medium'].includes(type)) {
      if (!description) errors.push('Description is required for hero/medium industry cards');
      if (!image) errors.push('Image is required for hero/medium industry cards');
    }
    if (type && ['small', 'accent'].includes(type)) {
      if (!icon) errors.push('Icon identifier is required for small/accent industry cards');
    }
  }

  if (type && !['hero', 'medium', 'small', 'accent'].includes(type)) {
    errors.push('Invalid grid type. Must be: hero, medium, small, or accent');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
