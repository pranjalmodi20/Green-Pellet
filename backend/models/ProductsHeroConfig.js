const mongoose = require('mongoose');

const ProductsHeroConfigSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'PREMIUM ENERGY SOLUTIONS' },
    title: { type: String, default: 'Engineered for High-Performance' },
    subtitle: { type: String, default: 'Our diverse portfolio of biomass fuel pellets represents the pinnacle of sustainable energy technology, delivering unrivaled calorific efficiency and industrial precision.' },
    bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida/AP1WRLudrAfW8c3o8y_of9ckFB-8-feUvfZxDmw3AdOnspBFsoyE2MctWdV54ENawwi_vjbEQ76KkPbYVxJV26YnoNT-76d-iuYTr5vstsoYYagsoZuJd7DBlXNNWWozddO2l0jW4dBfRlvGzpzu17sAFFZRXVVTvKAE6v4lh48NPrt2932TC4bYogqmzrXjutxfNEG_pOgPp_hn0s2-Sbp_fqlZ6d-4-8a7FTEvmmSniRK7KqPX4QaUCAuRJNo' },
    button1Text: { type: String, default: 'Request Catalog' },
    button1Link: { type: String, default: '#' },
    button2Text: { type: String, default: 'Technical Support' },
    button2Link: { type: String, default: '#' },
    glassTitle: { type: String, default: 'SUSTAINABILITY CERTIFIED' },
    glassText: { type: String, default: 'Carbon-neutral energy production through circular economy principles and advanced biomass engineering.' }
  },
  cta: {
    title: { type: String, default: 'Ready to Transition?' },
    subtitle: { type: String, default: 'Consult with our thermal engineering experts to find the optimal biomass solution for your specific industrial requirements.' },
    button1Text: { type: String, default: 'Get a Quote' },
    button1Link: { type: String, default: '#' },
    button2Text: { type: String, default: 'Schedule a Call' },
    button2Link: { type: String, default: '#' }
  }
}, { timestamps: true });

module.exports = mongoose.model('ProductsHeroConfig', ProductsHeroConfigSchema);
