const mongoose = require('mongoose');

const DefinitionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const CostComparisonItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: String, required: true },
  percentage: { type: Number, required: true },
  colorClass: { type: String, required: true }
}, { _id: false });

const FuelQualityItemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const IndustryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  badgeText: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  caseStudyLink: { type: String, default: '#' },
  imageLabel: { type: String, required: true }
}, { _id: false });

const WhyBiomassPageSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'THE FUTURE OF INDUSTRIAL ENERGY' },
    title: { type: String, default: 'Powering Tomorrow with Biomass.' },
    subtitle: { type: String, default: "Transitioning to biomass isn't just an environmental choice—it's a high-performance industrial strategy. Discover how we turn organic residues into consistent, high-calorific energy." },
    bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcY6XVUpIxZzA_jA6faDg5alJ5k70h613FRy7KuVQYRpGM0eKgrZZpfQ9ynUekWqdXi4RCZyI1FgXIeQ2COlx1i0hXCqhnYNLthkCq1VYCqq3bBhn1ZCYQhAAVFDOIWyUHr7joMxoP_dbLZalUOneSJ1M3HvN2na448u0HZ4OE9Q391ExayjUyZ0WvchSMLAtjqWtiJRn-u2irABZbJL2zOZ4KeDTRnymIwsgHAnscrPMAI1JbPW5bhKx_YDo1NmXM2dNGKzBaEJs' },
    primaryCtaText: { type: String, default: 'Explore the Impact' },
    primaryCtaLink: { type: String, default: '#' },
    secondaryCtaText: { type: String, default: 'Download Report' },
    secondaryCtaLink: { type: String, default: '#' }
  },
  definition: {
    badge: { type: String, default: 'CORE DEFINITION' },
    title: { type: String, default: 'What is Biomass?' },
    description: { type: String, default: 'Biomass is organic material that comes from plants and animals, serving as a renewable energy source. It contains stored energy from the sun through the process of photosynthesis.' },
    quote: { type: String, default: 'Unlike fossil fuels which take millions of years to form, biomass represents a cycle of energy that can be replenished annually, creating a closed-loop carbon system.' },
    image: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDy2dc0EGOS5L3Ckgw96eeeOKMDGV_o0wzfI76wUL7MnpKLvuKI_q4toUGHcn1ib-NdpggQyFDVoSolhal_cX55vM1nkmfhnQFECnAz62m9HETtZ2ME-Zmvg-ijgP_Ns7qw5NQs86Ga1558eGhOBdBwhxZM0MMeJ5lmCJVkHCfZOLdYQngRLYlVc56zS1RcRfro32snYEO9b_7BoejxcAhYMGgxU8dRORaZ0gdb-B_VTovWQ6Xgdv7A7jvegHf0NNJGPc8eb9Ikco' },
    densityValue: { type: String, default: '4500+ kcal/kg' },
    densityLabel: { type: String, default: 'ENERGY DENSITY' },
    items: {
      type: [DefinitionItemSchema],
      default: () => [
        { title: 'Agricultural Residue', text: 'Rice husk, mustard stalks, and corn cobs.' },
        { title: 'Wood Waste', text: 'Sawdust, wood chips, and timber processing waste.' },
        { title: 'Energy Crops', text: 'Purpose-grown fast-rotation species for energy production.' }
      ]
    }
  },
  comparison: {
    badge: { type: String, default: 'THE ECONOMIC EDGE' },
    title: { type: String, default: 'Biomass vs. Traditional Fuels' }
  },
  costComparison: {
    title: { type: String, default: 'Annual Fuel Cost Comparison' },
    subtitle: { type: String, default: 'Projected for a medium-scale industrial boiler (10 TPH)' },
    badgeText: { type: String, default: '30% AVG. SAVINGS' },
    items: {
      type: [CostComparisonItemSchema],
      default: () => [
        { name: 'COAL', cost: '$2.4M / Year', percentage: 85, colorClass: 'bg-on-surface-variant' },
        { name: 'LPG / OIL', cost: '$3.1M / Year', percentage: 100, colorClass: 'bg-error' },
        { name: 'GREEN PELLETS (BIOMASS)', cost: '$1.8M / Year', percentage: 60, colorClass: 'bg-primary' }
      ]
    }
  },
  carbonNeutral: {
    title: { type: String, default: 'Carbon Neutral Cycle' },
    description: { type: String, default: 'Biomass releases only as much CO2 as the plant absorbed during its growth, making it a "Carbon Neutral" energy source.' },
    value: { type: String, default: '90%' },
    label: { type: String, default: 'REDUCTION VS COAL' }
  },
  fuelQuality: {
    badgeText: { type: String, default: 'FUEL QUALITY' },
    items: {
      type: [FuelQualityItemSchema],
      default: () => [
        { icon: 'water_drop', title: 'Low Moisture', text: 'Under 10% consistently' },
        { icon: 'local_fire_department', title: 'High Ash Fusion', text: 'Optimized for boiler life' }
      ]
    }
  },
  reliability: {
    title: { type: String, default: 'Uninterrupted Supply' },
    description: { type: String, default: 'Our proprietary logistics network ensures that your industrial operations never face a fuel shortage. We manage the entire supply chain from raw material to your boiler.' },
    circleValue: { type: String, default: '24/7' },
    circleLabel: { type: String, default: 'MONITORING' },
    bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi4pETNNrbmTg0WnM9-48W6eGRSx4CPoIm3GNsTjUqK5_QigYgJ09HMnb7LuIpblGtiUluGEX2EP0Se-s80zMDhpEAX0zGAAwIp8ogIYmDNLZfOMLrNmpRnnme5SgCDGmEoMpQy8_UqOg3RTLl43O5bL__a0oBURZvI0lXV_iJA-IspDSeXVI2mBdkWyqXnzX1JzbqSDsqeLEsGBQuTSi-ud6BUXDTdGXLNdkTn5rRkUtG8aFJbC6iv6CYBaqbOe9mmvBIMdQuG2Q' }
  },
  industries: {
    badge: { type: String, default: 'VERSATILITY' },
    title: { type: String, default: 'Tailored for Major Industries.' },
    description: { type: String, default: 'Our green pellets are engineered to meet the stringent demands of various high-energy industrial sectors, providing a seamless drop-in replacement for fossil fuels.' },
    items: {
      type: [IndustryItemSchema],
      default: () => [
        {
          title: 'Pharmaceuticals & Chemicals',
          badgeText: 'Precision Steam',
          subtitle: 'Maintaining Ultra-Stable Temperatures',
          description: 'Chemical processes require highly precise thermal control. Our pellets provide a consistent burn rate that matches the stability of natural gas.',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkzg-Qn3_imxmemJA1oDumgP0k1NoxI2NYQ4BzjjnrIh1R5YV_SQfPz-zeSQIdgA1WMVfizwPDfMu2SHvsltJqi6Q3_A8HNKbz1rd2Uv4zfxOMiBS7-daByApzxPeTHOkamLMWZYMz1N4p07voRWuGIPJbaxxUYv4aqrqsKbzgmxvhcaqE2GiNGi29XjMTBhm0SBDi6LnRJ2h55J_tewYCvNEynJuEJj53wfeuChOnieQY2BQ7TWYUDjqGzHziGCfIzJditM368',
          caseStudyLink: '#',
          imageLabel: 'Pharmaceuticals & Chemicals'
        },
        {
          title: 'Large Scale Processing',
          badgeText: 'Bulk Heating',
          subtitle: 'Textiles & Food Processing',
          description: 'For industries with high-volume steam requirements, biomass offers a significant reduction in OpEx while meeting global ESG compliance standards.',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPes7bRyHuj_6QZKASpEqw3eNnd7MhAdAyCOMMjJSyvzMdFaipXGmoA6SnUmHb-AvdwnXM_rmz0NTgd1BG_CZw_PnZKwiLHnWT_PPgAjHWnb7r5a-Bbz1TrZtnfdPokG7qzwqijrfuS2eJcON1w_f874z_aAtex29TUS5PIgDLFkDEalJqPNPoHftuvaWm43ySnUuLZJw9DteSiYcruj6f_N-U5IA9yPhyEHkLx4KAtjQmoIFWT2dxCzCeCnmmGp26PbS0Sl6nvmQ',
          caseStudyLink: '#',
          imageLabel: 'Large Scale Processing'
        }
      ]
    }
  },
  cta: {
    title: { type: String, default: 'Ready to Transition?' },
    subtitle: { type: String, default: 'Let our engineers perform a free feasibility study for your facility. Calculate your ROI and carbon footprint reduction in just 48 hours.' },
    primaryCtaText: { type: String, default: 'Request Feasibility Study' },
    primaryCtaLink: { type: String, default: '#' },
    secondaryCtaText: { type: String, default: 'Speak to an Expert' },
    secondaryCtaLink: { type: String, default: '#' },
    isEnabled: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('WhyBiomassPage', WhyBiomassPageSchema);
