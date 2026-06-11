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
    default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhBQseeuYJ06Js6Mp6Fz0q32g7d126uEWb0NK9qkwGAoFhZDiocEPpoUO2zHoYKqid2vGNFzifc23fj8JoAtOHCjSPrOvT8mf4ig2ZlL2VsymBimgTfgBAAkKb8t7t23RznzBHNvwrab1YPX1LGBQRqcLYAcrq7biuAD_v0wmtgJtcq4gVWx9yKqt8UG0m0wdI6jpMs6dOTgoqVVtnyWNwAzEDn3lupd7wu0q0C5Ou8fgu1MrcAVtOy6CZ1zyyIFjSzTd8OAwAWQE'
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
    default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAccvJxJMTAesBpIfTxhI_W3cXgwbK8PlyUOmlHsMNmml40jXYxsh6ZqN2NOyQvssks1Xl2JcI5Zfr6Tf9PlsRrEfEXyGHfOoqm2I0hqbCkA5NsJY4VbCXliuoO3TWxx6EgTjmygzvnaUvTtfI4NnrQ1enCpxeT-iWyhg2wEyboHsHthc9GGUbgfWd6ajxs7ixN7klWQ3vzLcTkrpjThsJK3SDcZH_CQa4PXILZ6r3NTqz1dT3PtVfy8sTIGzGGcu5emlbonzGQAc'
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
