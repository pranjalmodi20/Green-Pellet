exports.validateWhyBiomassPage = (req, res, next) => {
  const errors = [];
  const body = req.body;

  if (body.definition?.items && !Array.isArray(body.definition.items)) {
    errors.push('Definition items must be an array');
  } else if (body.definition?.items) {
    body.definition.items.forEach((item, idx) => {
      if (!item.title || !item.text) {
        errors.push(`Definition item at index ${idx} is missing title or text`);
      }
    });
  }

  if (body.costComparison?.items && !Array.isArray(body.costComparison.items)) {
    errors.push('Cost comparison items must be an array');
  } else if (body.costComparison?.items) {
    body.costComparison.items.forEach((item, idx) => {
      if (!item.name || !item.cost || item.percentage === undefined || !item.colorClass) {
        errors.push(`Cost comparison item at index ${idx} is missing name, cost, percentage, or colorClass`);
      }
    });
  }

  if (body.fuelQuality?.items && !Array.isArray(body.fuelQuality.items)) {
    errors.push('Fuel quality items must be an array');
  } else if (body.fuelQuality?.items) {
    body.fuelQuality.items.forEach((item, idx) => {
      if (!item.icon || !item.title || !item.text) {
        errors.push(`Fuel quality item at index ${idx} is missing icon, title, or text`);
      }
    });
  }

  if (body.industries?.items && !Array.isArray(body.industries.items)) {
    errors.push('Industries items must be an array');
  } else if (body.industries?.items) {
    body.industries.items.forEach((item, idx) => {
      if (!item.title || !item.badgeText || !item.subtitle || !item.description || !item.image || !item.imageLabel) {
        errors.push(`Industries item at index ${idx} is missing title, badgeText, subtitle, description, image, or imageLabel`);
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
};
