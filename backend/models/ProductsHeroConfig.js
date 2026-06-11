const mongoose = require('mongoose');

const ProductsHeroConfigSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'PREMIUM ENERGY SOLUTIONS' },
    title: { type: String, default: 'Engineered for High-Performance' },
    subtitle: { type: String, default: 'Our diverse portfolio of biomass fuel pellets represents the pinnacle of sustainable energy technology, delivering unrivaled calorific efficiency and industrial precision.' },
    bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcY6XVUpIxZzA_jA6faDg5alJ5k70h613FRy7KuVQYRpGM0eKgrZZpfQ9ynUekWqdXi4RCZyI1FgXIeQ2COlx1i0hXCqhnYNLthkCq1VYCqq3bBhn1ZCYQhAAVFDOIWyUHr7joMxoP_dbLZalUOneSJ1M3HvN2na448u0HZ4OE9Q391ExayjUyZ0WvchSMLAtjqWtiJRn-u2irABZbJL2zOZ4KeDTRnymIwsgHAnscrPMAI1JbPW5bhKx_YDo1NmXM2dNGKzBaEJs' },
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
