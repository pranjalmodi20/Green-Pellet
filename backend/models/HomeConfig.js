const mongoose = require('mongoose');

const HomeConfigSchema = new mongoose.Schema({
  // ── Hero Section Config ──────────────────────────────────────────────
  heroBadge: {
    type: String,
    default: 'Carbon Neutral Future'
  },
  heroTitle: {
    type: String,
    default: 'Powering the Planet,\nSustainably.'
  },
  heroSubtitle: {
    type: String,
    default: "Converting India's agricultural footprint into high-density biomass fuel. Precision engineered energy solutions for global industry leaders."
  },
  heroBgImage: {
    type: String,
    default: '/images/hero-background.jpg'
  },
  heroPrimaryCtaText: {
    type: String,
    default: 'Explore Solutions'
  },
  heroPrimaryCtaLink: {
    type: String,
    default: '/products'
  },
  heroSecondaryCtaText: {
    type: String,
    default: 'Download Roadmap'
  },
  heroSecondaryCtaLink: {
    type: String,
    default: '#'
  },

  // ── Crisis Section Config ────────────────────────────────────────────
  crisisBadge: {
    type: String,
    default: 'The Problem'
  },
  crisisTitle: {
    type: String,
    default: 'From Crisis to Catalyst'
  },
  crisisDescription: {
    type: String,
    default: "Every year, millions of tons of agricultural residue are burned in open fields, creating a massive environmental hazard. We don't just see waste; we see the most potent source of renewable energy for a growing nation."
  },
  crisisImage: {
    type: String,
    default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIwxJeGYXYWf72P4unr1zQBvnIwnSZsXt1z7CPYouifd-dBnneMiiOpKBitgtcZHVgdnQD7ULwSak3yE3Cs0CT5lMGC3CMMED3Q_rwgRBqfPPxSHjtftbFfPJp2vYMA_X2OYZITW1EjILGk5YNZPv-HussHCbPK6_HVb57vqPIpR9SEA8zDJLuycZV803doPsy78EMt-WgTD_UIjXwVIdkOkasyuZKK7KRZp13WtxB9fbT4lvEveC3Si4XamldwNBm_Hcd2POnew'
  },
  crisisQuote: {
    type: String,
    default: 'The annual crop residue burning in India contributes to 25% of the smog in major cities.'
  },
  crisisStat1Value: {
    type: String,
    default: '90%'
  },
  crisisStat1Label: {
    type: String,
    default: 'Reduction in localized air pollutants through collection.'
  },
  crisisStat2Value: {
    type: String,
    default: '15k+'
  },
  crisisStat2Label: {
    type: String,
    default: 'Farmers empowered through waste-to-wealth programs.'
  },

  // ── CTA Section Config ───────────────────────────────────────────────
  ctaTitle: {
    type: String,
    default: 'Join the Clean Energy Revolution'
  },
  ctaSubtitle: {
    type: String,
    default: "Ready to transition your industry to high-performance biomass fuel? Let's engineer your carbon-neutral path today."
  },
  ctaBgImage: {
    type: String,
    default: 'https://lh3.googleusercontent.com/aida/AP1WRLvGSb1VdTpxt1ylPy_XRpihKO4urH-tLZXH6EwvYPVXNyy4v7xB1mEo-Jr8EITzB8YVxLyBRag6U5HsdIztdvBtvjW6SYftpM8W4MCG3ahnFw2SJhC4xf3lZZg7TZ_MORiy5CTvH6GCiSk0M-7JVD-iswoabFaC6yzoGQv5NlPAqhlwMp_fZPph_wWN8jYNbyDq_YZGLW0UOY-BfE_XRYNtUpZXnwvhXsGSPwHAHt3Z1pz9DgKB8TrDbyI'
  },
  ctaPrimaryCtaText: {
    type: String,
    default: 'Partner with Us'
  },
  ctaPrimaryCtaLink: {
    type: String,
    default: '/contact'
  },
  ctaSecondaryCtaText: {
    type: String,
    default: 'Request a Site Visit'
  },
  ctaSecondaryCtaLink: {
    type: String,
    default: '/contact'
  },

  // ── Footer Config ────────────────────────────────────────────────────
  footerAboutText: {
    type: String,
    default: "India's leading biomass fuel engineers. Bridging the gap between agricultural waste and industrial energy needs."
  },
  footerCopyrightText: {
    type: String,
    default: '© 2024 Green Pellets India. All rights reserved.'
  },
  footerSocialLinks: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
      icon: { type: String, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('HomeConfig', HomeConfigSchema);
