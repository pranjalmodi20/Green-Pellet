const mongoose = require('mongoose');

const SectorItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] }
}, { _id: false });

const IndustriesPageConfigSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'GLOBAL INDUSTRIAL IMPACT' },
    title: { type: String, default: "Powering the World's Leading Industries." },
    subtitle: { type: String, default: "From pharmaceutical precision to the scale of global FMCG manufacturing, we provide high-performance biomass solutions that define the next generation of industrial energy." },
    bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFO4mq4TAsLR9GoP_VBUSEEUHGJErzfTwoW5YRzn41twFHuKdJJMN9flwK4v_lSh6hn4t8Ar0OqpuF9C0GQLjoncW_UVUd1KNaJfCz3fqCi810UYw9osnI_jeUHxQ2rmHqEMPM809EPAYtwz19WHk4J_98mv_bezIrfiaF4rzW3S1kHOClBegiAJeXZyqami5nY5jf2zLlCK2cTbqF4Lta7wZoDAFNqIC-Xld2SQTbVJFCYHOldWH0fHCw351zaumwDwmkq0YwHMA' }
  },
  detailedSectors: {
    title: { type: String, default: 'Tailored for your scale.' },
    description: { type: String, default: 'Our engineering team works with your plant managers to retrofit or design boilers that maximize the output of our premium biomass pellets.' },
    sectors: {
      type: [SectorItemSchema],
      default: () => [
        {
          title: 'CHEMICAL PLANTS',
          description: 'High-temp stability for synthetic processes and thermal cracking units.',
          features: ['Temperature Control', 'Low Ash Residue', '24/7 Bulk Supply']
        },
        {
          title: 'TEXTILE UNITS',
          description: 'Consistent steam for dyeing, printing, and fabric finishing lines.',
          features: ['Moisture Stability', 'High Calorific Value', 'Eco-Label Compliance']
        },
        {
          title: 'DAIRY INDUSTRY',
          description: 'Hygienic energy production for pasteurization and spray drying.',
          features: ['Pure Combustion', 'No Contaminants', 'Rapid Response Time']
        },
        {
          title: 'INDUSTRIAL PLANTS',
          description: 'General heavy utility requirements for decentralized power.',
          features: ['Scaleable Logistics', 'Custom Pellet Sizes', 'On-site Support']
        }
      ]
    }
  },
  cta: {
    title: { type: String, default: 'Transition Your Enterprise Today' },
    subtitle: { type: String, default: 'Join a global network of industrial leaders who have optimized their energy strategy with Green Pellets India.' },
    button1Text: { type: String, default: 'Request a Consultation' },
    button1Link: { type: String, default: '#' },
    button2Text: { type: String, default: 'Download Brochure' },
    button2Link: { type: String, default: '#' }
  }
}, { timestamps: true });

module.exports = mongoose.model('IndustriesPageConfig', IndustriesPageConfigSchema);
