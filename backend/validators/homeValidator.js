// Simple custom request body validators for Home config and metrics endpoints

exports.validateHomeConfig = (req, res, next) => {
  const errors = [];
  const body = req.body;

  // Validate hero fields if present
  if (body.heroPrimaryCtaLink && !body.heroPrimaryCtaLink.startsWith('/') && !body.heroPrimaryCtaLink.startsWith('http')) {
    errors.push('Hero primary CTA link must be a relative URL path or absolute URL');
  }

  // Validate cta fields if present
  if (body.ctaPrimaryCtaLink && !body.ctaPrimaryCtaLink.startsWith('/') && !body.ctaPrimaryCtaLink.startsWith('http')) {
    errors.push('CTA primary CTA link must be a relative URL path or absolute URL');
  }

  if (body.footerSocialLinks && !Array.isArray(body.footerSocialLinks)) {
    errors.push('Social links must be an array');
  } else if (body.footerSocialLinks) {
    body.footerSocialLinks.forEach((link, idx) => {
      if (!link.platform || !link.url || !link.icon) {
        errors.push(`Social link at index ${idx} is missing platform, url, or icon`);
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.validateMetrics = (req, res, next) => {
  const errors = [];
  const { tonsProcessed, co2Offset } = req.body;

  if (tonsProcessed !== undefined && (typeof tonsProcessed !== 'number' || tonsProcessed < 0)) {
    errors.push('Tons processed must be a non-negative number');
  }

  if (co2Offset !== undefined && (typeof co2Offset !== 'number' || co2Offset < 0)) {
    errors.push('CO2 offset must be a non-negative number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
