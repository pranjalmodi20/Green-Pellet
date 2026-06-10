exports.validateContactSubmission = (req, res, next) => {
  const errors = [];
  const { fullName, email, message } = req.body;

  if (!fullName) errors.push('Full name is required');
  if (!email) errors.push('Email is required');
  if (!message) errors.push('Message is required');

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};