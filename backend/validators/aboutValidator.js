exports.validateAboutPage = (req, res, next) => {
  const errors = [];
  const body = req.body;

  if (body.timeline?.entries && !Array.isArray(body.timeline.entries)) {
    errors.push('Timeline entries must be an array');
  } else if (body.timeline?.entries) {
    body.timeline.entries.forEach((entry, idx) => {
      if (!entry.year || !entry.title || !entry.description) {
        errors.push(`Timeline entry at index ${idx} is missing year, title, or description`);
      }
      if (entry.align && !['left', 'right'].includes(entry.align)) {
        errors.push(`Timeline entry at index ${idx} align must be "left" or "right"`);
      }
    });
  }

  if (body.leadership?.members && !Array.isArray(body.leadership.members)) {
    errors.push('Leadership members must be an array');
  } else if (body.leadership?.members) {
    body.leadership.members.forEach((member, idx) => {
      if (!member.name || !member.role || !member.image) {
        errors.push(`Leadership member at index ${idx} is missing name, role, or image`);
      }
    });
  }

  if (body.sustainability?.stats && !Array.isArray(body.sustainability.stats)) {
    errors.push('Sustainability stats must be an array');
  }

  if (body.achievements?.items && !Array.isArray(body.achievements.items)) {
    errors.push('Achievement items must be an array');
  } else if (body.achievements?.items) {
    body.achievements.items.forEach((item, idx) => {
      if (!item.icon || !item.label) {
        errors.push(`Achievement item at index ${idx} is missing icon or label`);
      }
    });
  }

  if (body.companyStory?.text !== undefined && typeof body.companyStory.text !== 'string') {
    errors.push('Company story text must be a string');
  }

  if (body.cta?.primaryCtaLink && !body.cta.primaryCtaLink.startsWith('/') && !body.cta.primaryCtaLink.startsWith('http')) {
    errors.push('CTA primary link must be a relative path or absolute URL');
  }

  if (body.cta?.secondaryCtaLink && !body.cta.secondaryCtaLink.startsWith('/') && !body.cta.secondaryCtaLink.startsWith('http')) {
    errors.push('CTA secondary link must be a relative path or absolute URL');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
};
