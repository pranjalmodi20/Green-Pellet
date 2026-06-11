require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin');
const Metric = require('../models/Metric');
const Testimonial = require('../models/Testimonial');
const Product = require('../models/Product');
const Industry = require('../models/Industry');
const HomeConfig = require('../models/HomeConfig');
const AboutPage = require('../models/AboutPage');
const WhyBiomassPage = require('../models/WhyBiomassPage');
const ProductCategory = require('../models/ProductCategory');
const ProductsHeroConfig = require('../models/ProductsHeroConfig');
const IndustryCategory = require('../models/IndustryCategory');
const CaseStudy = require('../models/CaseStudy');
const IndustriesPageConfig = require('../models/IndustriesPageConfig');
const BlogCategory = require('../models/BlogCategory');
const BlogPost = require('../models/BlogPost');
const ContactPage = require('../models/ContactPage');


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green_pellet';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // 1. Seed Admin User
    await Admin.deleteMany({});
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    await Admin.create({
      email: 'admin@greenpellets.in',
      password: passwordHash,
      name: 'Green Pellets Admin'
    });
    console.log('🌱 Admin account seeded: admin@greenpellets.in / Admin@123');

    // 2. Seed Hero & Section Configurations (Singletons)
    await HomeConfig.deleteMany({});
    await HomeConfig.create({
      heroBadge: 'Carbon Neutral Future',
      heroTitle: 'Powering the Planet,\nSustainably.',
      heroSubtitle: "Converting India's agricultural footprint into high-density biomass fuel. Precision engineered energy solutions for global industry leaders.",
      heroBgImage: '/assets/images/home/hero-background.png',
      heroPrimaryCtaText: 'Explore Solutions',
      heroPrimaryCtaLink: '/products',
      heroSecondaryCtaText: 'Download Roadmap',
      heroSecondaryCtaLink: '#',

      crisisBadge: 'The Problem',
      crisisTitle: 'From Crisis to Catalyst',
      crisisDescription: "Every year, millions of tons of agricultural residue are burned in open fields, creating a massive environmental hazard. We don't just see waste; we see the most potent source of renewable energy for a growing nation.",
      crisisImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIwxJeGYXYWf72P4unr1zQBvnIwnSZsXt1z7CPYouifd-dBnneMiiOpKBitgtcZHVgdnQD7ULwSak3yE3Cs0CT5lMGC3CMMED3Q_rwgRBqfPPxSHjtftbFfPJp2vYMA_X2OYZITW1EjILGk5YNZPv-HussHCbPK6_HVb57vqPIpR9SEA8zDJLuycZV803doPsy78EMt-WgTD_UIjXwVIdkOkasyuZKK7KRZp13WtxB9fbT4lvEveC3Si4XamldwNBm_Hcd2POnew',
      crisisQuote: 'The annual crop residue burning in India contributes to 25% of the smog in major cities.',
      crisisStat1Value: '90%',
      crisisStat1Label: 'Reduction in localized air pollutants through collection.',
      crisisStat2Value: '15k+',
      crisisStat2Label: 'Farmers empowered through waste-to-wealth programs.',

      ctaTitle: 'Join the Clean Energy Revolution',
      ctaSubtitle: "Ready to transition your industry to high-performance biomass fuel? Let's engineer your carbon-neutral path today.",
      ctaBgImage: 'https://lh3.googleusercontent.com/aida/AP1WRLvGSb1VdTpxt1ylPy_XRpihKO4urH-tLZXH6EwvYPVXNyy4v7xB1mEo-Jr8EITzB8YVxLyBRag6U5HsdIztdvBtvjW6SYftpM8W4MCG3ahnFw2SJhC4xf3lZZg7TZ_MORiy5CTvH6GCiSk0M-7JVD-iswoabFaC6yzoGQv5NlPAqhlwMp_fZPph_wWN8jYNbyDq_YZGLW0UOY-BfE_XRYNtUpZXnwvhXsGSPwHAHt3Z1pz9DgKB8TrDbyI',
      ctaPrimaryCtaText: 'Partner with Us',
      ctaPrimaryCtaLink: '/contact',
      ctaSecondaryCtaText: 'Request a Site Visit',
      ctaSecondaryCtaLink: '/contact',

      footerAboutText: "India's leading biomass fuel engineers. Bridging the gap between agricultural waste and industrial energy needs.",
      footerCopyrightText: '© 2024 Green Pellets India. All rights reserved.',
      footerSocialLinks: [
        { platform: 'LinkedIn', url: '#', icon: 'share' },
        { platform: 'Website', url: '#', icon: 'public' }
      ]
    });
    console.log('🌱 Home Config settings seeded');

    // 3. Seed real-time impact numbers
    await Metric.deleteMany({});
    await Metric.create({ tonsProcessed: 1200000, co2Offset: 450000 });
    console.log('🌱 Impact metrics stats seeded');

    // 3.5 Seed Categories
    await ProductCategory.deleteMany({});
    const categories = await ProductCategory.insertMany([
      { name: 'Wood Residues', slug: 'wood-residues', description: 'Premium wood sawdust and forestry processing waste pellets.' },
      { name: 'Agri-Waste', slug: 'agri-waste', description: 'Agricultural crop residues including mustard stalks and paddy husks.' },
      { name: 'High Density Compression', slug: 'high-density-compression', description: 'Dense compressed logs and briquettes for long duration combustion.' }
    ]);
    const [woodRes, agriWaste, highComp] = categories;
    console.log('🌱 Product categories seeded');

    // 4. Seed Products
    await Product.deleteMany({});
    await Product.insertMany([
      {
        title: 'Sawdust & Groundnut Shell Pellets',
        slug: 'sawdust-groundnut-pellets',
        category: woodRes._id,
        shortDescription: 'Low ash content minimizes boiler maintenance while high density ensures logistical efficiency and stable combustion.',
        fullDescription: 'Our flagship pellet range engineered from a refined mix of sawdust and groundnut shell residues. Provides a reliable, consistent burn rate matching the performance of conventional fuels.',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLudrAfW8c3o8y_of9ckFB-8-feUvfZxDmw3AdOnspBFsoyE2MctWdV54ENawwi_vjbEQ76KkPbYVxJV26YnoNT-76d-iuYTr5vstsoYYagsoZuJd7DBlXNNWWozddO2l0jW4dBfRlvGzpzu17sAFFZRXVVTvKAE6v4lh48NPrt2932TC4bYogqmzrXjutxfNEG_pOgPp_hn0s2-Sbp_fqlZ6d-4-8a7FTEvmmSniRK7KqPX4QaUCAuRJNo',
        specifications: [
          { parameter: 'Calorific Value', value: '4200 - 4500', unit: 'Kcal/kg' },
          { parameter: 'Moisture Content', value: '< 8.0', unit: '%' }
        ],
        spec: '4200 - 4500 Kcal/kg Avg.',
        benefits: [
          'Low ash content (< 2%) minimizes slagging',
          'Highly dense uniform size for automated feed systems',
          'Virtually zero sulfur or toxic emissions'
        ],
        applications: [
          'Industrial Boilers & Furnaces',
          'Power Generation Plants',
          'Textile & Chemical Processing'
        ],
        technicalData: {
          ash: '< 2.0%',
          moisture: '< 8.0%',
          density: '650 kg/m³',
          diameter: '8 - 10 mm'
        },
        featured: true,
        displayOrder: 1,
        order: 1,
        status: 'active',
        isActive: true
      },
      {
        title: 'Mustard Fuel Pellets',
        slug: 'mustard-fuel-pellets',
        category: agriWaste._id,
        shortDescription: 'Specifically engineered for high-temperature stability, our mustard residue pellets offer a sustainable alternative.',
        fullDescription: 'Harnesses agricultural mustard crop residues. Offers excellent flame retention and high heat output, optimized for heavy load industrial boilers.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClGfvo_z0zIKssVlrCgBE5oZFgeZlVmaaVaz0_DcgsI__G3hHAHe81gBrbfigcJ5WqM3CP-Jo4uXNNvj0yOXslo_LFJhRXKBlvGnP7ZCosZSpnA_WvX6ph1zMM7SuDcPH0Pxwt-Wl4ckcOWRM-IKKXfst7UnvBCtUOMobjdYEGhHEMmm29eh3bQzo5Lwhi5pHZCbTFkPfXR8BkyLAY9aSx3c-Yt2kM5zVD9kVn2rEmVr-UKbc2JViuLH9Yit_xJFmDQNwFeqyTe84',
        specifications: [
          { parameter: 'Calorific Value', value: '3900 - 4200', unit: 'Kcal/kg' },
          { parameter: 'Moisture Content', value: '< 10.0', unit: '%' }
        ],
        spec: '3900 - 4200 Kcal/kg Avg.',
        benefits: [
          'High flame retention time',
          'Cost-effective boiler energy alternative',
          'Helps prevent open field stubble burning'
        ],
        applications: [
          'Medium scale thermal boilers',
          'Co-firing brick kilns',
          'Industrial steam applications'
        ],
        technicalData: {
          ash: '7.0 - 9.0%',
          moisture: '< 10.0%',
          density: '650 kg/m³',
          diameter: '10 - 12 mm'
        },
        featured: false,
        displayOrder: 2,
        order: 2,
        status: 'active',
        isActive: true
      },
      {
        title: 'Biomass Fuel Briquettes',
        slug: 'biomass-fuel-briquettes',
        category: highComp._id,
        shortDescription: 'High-density compression for long-duration combustion in heavy industrial applications.',
        fullDescription: 'Large diameter compressed logs ideal for manual-feed boilers, gasifiers, and brick kilns where slow, uniform energy output is critical.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClGfvo_z0zIKssVlrCgBE5oZFgeZlVmaaVaz0_DcgsI__G3hHAHe81gBrbfigcJ5WqM3CP-Jo4uXNNvj0yOXslo_LFJhRXKBlvGnP7ZCosZSpnA_WvX6ph1zMM7SuDcPH0Pxwt-Wl4ckcOWRM-IKKXfst7UnvBCtUOMobjdYEGhHEMmm29eh3bQzo5Lwhi5pHZCbTFkPfXR8BkyLAY9aSx3c-Yt2kM5zVD9kVn2rEmVr-UKbc2JViuLH9Yit_xJFmDQNwFeqyTe84',
        specifications: [
          { parameter: 'Calorific Value', value: '3800 - 4100', unit: 'Kcal/kg' },
          { parameter: 'Moisture Content', value: '< 10.0', unit: '%' }
        ],
        spec: '3800 - 4100 Kcal/kg Avg.',
        benefits: [
          'Slow continuous burn profile',
          'High bulk density for space-saving storage',
          'No chemical binders used in production'
        ],
        applications: [
          'Brick Kilns',
          'Industrial Gasifiers',
          'Manual Feed Boilers'
        ],
        technicalData: {
          ash: '8.0 - 10.0%',
          moisture: '< 10.0%',
          density: '750 kg/m³',
          diameter: '60 - 90 mm'
        },
        featured: false,
        displayOrder: 3,
        order: 3,
        status: 'active',
        isActive: true
      },
      {
        title: 'Paddy Husk Fuel Pellets',
        slug: 'paddy-husk-pellets',
        category: agriWaste._id,
        shortDescription: 'Innovative utilization of rice processing residue into a uniform, high-density fuel source.',
        fullDescription: 'Paddy husk based fuel pellets designed as a low-cost, steady-burning drop-in fuel for automated boiler systems.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnuh5Uz8Fz5OPbI5DFz7c7oqu0bKEXaNTZ3MYuwputhkxqgTiQTFtK6ucVjLOCYi-dEiaT-S2LyXZGfKaa3oZmo1JY2Y8z_tHvq41_ggBSiJyWEJNHIx5dgVDQiqyVMEZL-qlQP5wEJ5JC6Bb3dT0PJAccaiZqQYVwEGyKFFWJnslayVa00BzFhZq-xS0sgJz3uxrjIsa8pNZWK-YzSTiS8EBui6_y68NvsgUchNiVgksnxAXJ9JgHZ35z9MXBFEKMloLR9m_rOa8',
        specifications: [
          { parameter: 'Calorific Value', value: '3400 - 3600', unit: 'Kcal/kg' },
          { parameter: 'Moisture Content', value: '< 12.0', unit: '%' }
        ],
        spec: '3400 - 3600 Kcal/kg Avg.',
        benefits: [
          'Abundant feedstock supply',
          'Very economical fuel pricing',
          'Excellent carbon reduction metrics'
        ],
        applications: [
          'Industrial heaters',
          'Paddy drying units',
          'Fluidized bed combustion boilers'
        ],
        technicalData: {
          ash: '15.0 - 18.0%',
          moisture: '< 12.0%',
          density: '600 kg/m³',
          diameter: '10 - 12 mm'
        },
        featured: false,
        displayOrder: 4,
        order: 4,
        status: 'active',
        isActive: true
      },
      {
        title: 'Biomass Fuel Pellets (Mixed)',
        slug: 'mixed-biomass-pellets',
        category: agriWaste._id,
        shortDescription: 'A cost-effective, versatile blend of agricultural residues optimized for consistent boiler feed.',
        fullDescription: 'A balanced mixture of straw, husks, and agricultural residues offering general purpose industrial heating capabilities.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnuh5Uz8Fz5OPbI5DFz7c7oqu0bKEXaNTZ3MYuwputhkxqgTiQTFtK6ucVjLOCYi-dEiaT-S2LyXZGfKaa3oZmo1JY2Y8z_tHvq41_ggBSiJyWEJNHIx5dgVDQiqyVMEZL-qlQP5wEGyKFFWJnslayVa00BzFhZq-xS0sgJz3uxrjIsa8pNZWK-YzSTiS8EBui6_y68NvsgUchNiVgksnxAXJ9JgHZ35z9MXBFEKMloLR9m_rOa8',
        specifications: [
          { parameter: 'Calorific Value', value: '3600 - 3900', unit: 'Kcal/kg' },
          { parameter: 'Moisture Content', value: '< 10.0', unit: '%' }
        ],
        spec: '3600 - 3900 Kcal/kg Avg.',
        benefits: [
          'Extremely cost-effective alternative',
          'Standardized density for consistent feeding',
          'Fully renewable sourcing'
        ],
        applications: [
          'General industrial heating',
          'Co-firing installations',
          'Food processing steam'
        ],
        technicalData: {
          ash: '10.0 - 12.0%',
          moisture: '< 10.0%',
          density: '620 kg/m³',
          diameter: '8 - 10 mm'
        },
        featured: false,
        displayOrder: 5,
        order: 5,
        status: 'active',
        isActive: true
      }
    ]);
    console.log('🌱 Products showcase database seeded');

    // 5. Seed Bento Grid Industries & Categories & Case Studies
    await IndustryCategory.deleteMany({});
    const catFandB = await IndustryCategory.create({ name: 'FOOD & BEVERAGE', slug: 'food-beverage' });
    const catSteam = await IndustryCategory.create({ name: 'PRECISION STEAM GENERATION', slug: 'precision-steam-generation' });

    await CaseStudy.deleteMany({});
    const caseFood = await CaseStudy.create({
      title: 'Food Processing Thermal Efficiency Case Study',
      slug: 'food-processing-namkeen-case-study',
      industry: new mongoose.Types.ObjectId(), // placeholder, we will link properly
      challenge: 'Optimizing fuel efficiency and reducing soot on large frying and extrusion lines.',
      solution: 'Replaced traditional heavy fuel oil with Green Pellets high-calorific biomass solutions and custom burner heads.',
      results: [
        { metric: 'Fuel Cost Savings', value: '22', unit: '%' },
        { metric: 'Carbon Emissions Reduction', value: '40', unit: '%' }
      ],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFO4mq4TAsLR9GoP_VBUSEEUHGJErzfTwoW5YRzn41twFHuKdJJMN9flwK4v_lSh6hn4t8Ar0OqpuF9C0GQLjoncW_UVUd1KNaJfCz3fqCi810UYw9osnI_jeUHxQ2rmHqEMPM809EPAYtwz19WHk4J_98mv_bezIrfiaF4rzW3S1kHOClBegiAJeXZyqami5nY5jf2zLlCK2cTbqF4Lta7wZoDAFNqIC-Xld2SQTbVJFCYHOldWH0fHCw351zaumwDwmkq0YwHMA',
      status: 'active'
    });

    await Industry.deleteMany({});

    // Create new industries page items
    const indFood = await Industry.create({
      title: 'Food Processing & Namkeen',
      slug: 'food-processing-namkeen',
      shortDescription: 'Optimizing thermal efficiency for large-scale frying and extrusion processes with carbon-neutral pellets.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFO4mq4TAsLR9GoP_VBUSEEUHGJErzfTwoW5YRzn41twFHuKdJJMN9flwK4v_lSh6hn4t8Ar0OqpuF9C0GQLjoncW_UVUd1KNaJfCz3fqCi810UYw9osnI_jeUHxQ2rmHqEMPM809EPAYtwz19WHk4J_98mv_bezIrfiaF4rzW3S1kHOClBegiAJeXZyqami5nY5jf2zLlCK2cTbqF4Lta7wZoDAFNqIC-Xld2SQTbVJFCYHOldWH0fHCw351zaumwDwmkq0YwHMA',
      category: catFandB._id,
      caseStudies: [caseFood._id],
      displayOrder: 1,
      status: 'active'
    });

    // Link case study to industry
    caseFood.industry = indFood._id;
    await caseFood.save();

    await Industry.create({
      title: 'Packaging',
      slug: 'packaging',
      shortDescription: 'Revolutionizing energy-intensive paper and plastic conversion processes with high-calorific biomass fuels.',
      icon: 'inventory_2',
      displayOrder: 2,
      status: 'active'
    });

    await Industry.create({
      title: 'Pharmaceutical',
      slug: 'pharmaceutical',
      shortDescription: 'Consistency for Critical Environments',
      fullDescription: 'Pharmaceutical manufacturing requires absolute stability. Our pellets ensure constant steam pressure and temperature precision, meeting stringent global compliance standards while reducing operational carbon footprints.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUIdwfExN-1DUPaFsqLNawZKCSdBWGfycDQUxUtnYw8vHdOnAC2QLHZY06iraTJVeiUrQmOlNyS0LmwNFKo0FvMjVl_QVFdqJz98qf3RMJ8G03d_lPe7tu7sJwQPRh8j_wQQyo9dP_OWW7nlCH3eVGVrVVOd0DgZn4U6r-M5-NiVj_QQKsR9m6w-vgY2vNORTAlN8wNoRGqhxitUrN1LlX4y5nOXPGYW-A3opphOmHsV17L3N6T23OtUI_ay0KOyrDE15n1HpURnY',
      category: catSteam._id,
      statistics: [
        { title: 'Efficiency Rate', value: '99.9', unit: '%' },
        { title: 'CO2 Emissions', value: '-40', unit: '%' }
      ],
      displayOrder: 3,
      status: 'active'
    });

    await Industry.create({
      title: 'Coating & Paints',
      slug: 'coating-paints',
      shortDescription: 'Sustainable heat solutions for drying ovens and chemical treatment lines.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-hUWlm92Hj4jCDK47ECIQ32Oy2wCMr2Btq31cddvB1Qvn3JDNcE76R_1efzYT8SwYv9Y_fxZ4D8NA0-RXmD7VYYDfkco7F5wNBfz2HaOz10sO7-MxO60ZGx3H26kXyxngGNvlQZPAcnD-voA3AhuAHCwfay9fRNdGXlQpjgI6rypalKFPdDrhGZDx6JS20fmCq1cTmInEDe5eDJ-0OQBgoTAwOSUJthcz2u0N6G6gfG-iTDUyfIOBmAPPnuhmMqLtLmi9r9NXVBc',
      icon: 'arrow_outward',
      displayOrder: 4,
      status: 'active'
    });

    await Industry.create({
      title: 'FMCG Leaders',
      slug: 'fmcg-leaders',
      shortDescription: 'Powering the brands you use every day with cleaner, more cost-effective energy cycles.',
      featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkw4XcXaotiK7U1E5Bpjn8wrN4MRK1natGtb9rizR8GpC2uaSatn732xPd46h6aPh4xLFGeGoXKg3GZOt_XLfbeNfgtrhSe6W9lKHwE7aEkJ3UlA8vLUA3_Hdv4pG3bsrcYzGxKh7iPsSomZLa3WmdHVu0A-CZkb4JeaQq0Rp624w9L1SuQxopaa0LW7cfZQGFNx0YSs3ElYv0ADrQoC1HvWCKwnHmwgaOITsMz595zIT4gMjAns2eoTnV8rGDsdOYj4qDyzPEQz8',
      benefits: [
        { title: 'Manufacturing', description: 'General industrial applications requiring high-density fuel.', icon: '' }
      ],
      quoteText: 'The switch to Green Pellets India reduced our industrial plant\'s energy costs by 22% within the first fiscal year.',
      quoteAuthor: 'CHIEF OPERATIONS OFFICER, GLOBAL PLANTS',
      quoteAvatar: '',
      displayOrder: 5,
      status: 'active'
    });

    // Create homepage bento grid items
    await Industry.insertMany([
      {
        title: 'Energy & Utilities',
        slug: 'energy-utilities',
        description: 'Replacement of coal for grid-scale energy production, achieving up to 60% carbon reduction per MWh.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxZpLBYsNqpLFC5eOEObwFa98kOvOHh_-dZxlmtVQuKNrz8Oi4s-jcTs5ZZC5bJztylVaWnI7B7RT2bbE5yEqA0BfvH5sOY0SaE8U4V_exab0RL8eN7CtF__nPymBQ89eUEVyZTO_1DEsI5lVwDmv18YaZhC6lxd6S60rmLa-pg73zwG93qmWpZFiHxu3f0TmhYZ0HIwDlNklw0qJskcls9nC7_NjlqcaQ2BQ9Bd0aENSoO5HR8DaUG65OcYwhDOiXD1I-whBdvnE',
        type: 'hero',
        order: 1,
        displayOrder: 10,
        status: 'active'
      },
      {
        title: 'Hospitality',
        slug: 'hospitality',
        description: 'Premium heating for luxury resorts and eco-conscious hotel chains.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsuMYnQIHF6nhhUFOits7KrPCBgjtZlHCQOgUj6eEl8x7ptzKSmgHlHgGI5gzrzj2DUs1eNNt3RFSKNtdwqS1F54E_5OtV7_f9tSIIDR-6owB9cBio-6oNapv_AdWLlGCjQ5wmXsY3pxbkn70BIxMuaJUK8pT6um2x1L1nJnmw2xj3NN-ds9WwpgWWm9k3NDL4l3rdaaKIT-YilxmKNZgVVp86-vaUkQenOru5YhLFpiMUtVIwuixTParszb3VSSi894qlblnkH4',
        type: 'medium',
        order: 2,
        displayOrder: 11,
        status: 'active'
      },
      {
        title: 'Manufacturing',
        slug: 'home-manufacturing',
        icon: 'factory',
        type: 'small',
        order: 3,
        displayOrder: 12,
        status: 'active'
      },
      {
        title: 'Chemical Processing',
        slug: 'home-chemical-processing',
        icon: 'science',
        type: 'accent',
        order: 4,
        displayOrder: 13,
        status: 'active'
      }
    ]);
    console.log('🌱 Industry database seeded successfully');

    // 6. Seed Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.insertMany([
      {
        name: 'Anil Sharma',
        role: 'COO',
        company: 'Heavy Industries Ltd.',
        quote: 'Green Pellets India has transformed our fuel logistics. Their precision in caloric output is unmatched in the Indian biomass market.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZbqeaTqHVyAIltYNEx9CXLmV0_Q9R-XMNTovo0_FtTEgynM_cw59STfKqTEgkf17uGyEfGDrhKUv_K9ENQKIMSncGcniFOZvuQ68W5vxsJ1benA2cwgESPxcSVFwV3vG8rftHeUM-JivpbpsbVfKCvB8zx24G8NZHnzAFzrEdMLhRIpHLlTvje2RiGJh6YyuTBBwymgqeZsSnTxz8jC338hku_qei3x4XB0QgwEwiCs ARTVAa_qG9csf_C04lEwAlmdUCfFhugBI',
        order: 1
      },
      {
        name: 'Meera Kapoor',
        role: 'Sustainability Lead',
        company: 'Global Textiles',
        quote: 'Switching to their Pine Pellets reduced our carbon footprint by 42% in just one quarter. It’s both a financial and ecological win.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtjOlLxrB4Y7f5h4ijLVOmHaIBmmkWOweLkwAozq3ZgvYmnHQoCM5nxu8D466Pc65vrXwrsihHRiYGzeSkvoi2HrmqYiI0q9FY3JBTCPEiAqH9G0Ymb_cPcDflLLeRufkZYI8sCUFDRZOGTrueT-n7-_uv_WP-9yZzrCadJ9fqX94OQD2S1Aphy3ZzeKwCpcsaEC3ML8QAu6HcBMfuCiLf_pski5Gd8v78fC5c4BW3dP0FWsXqpPOlSIj5KgEOn47rMIVJGyyLTFA',
        order: 2
      },
      {
        name: 'Vikram Singh',
        role: 'Director',
        company: 'Radiant Energy Corp.',
        quote: 'Their supply chain reliability is what sets them apart. We never have to worry about energy stockouts even during peak seasons.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRiMSRXWqwIBUrm-PpomJFpZvOKNzz-eYD71elZx3EhL4jSw-76Dp1ZnR-YGMbNIN23P-peekWCs5xylOA2WH_sXdwyqjx5JFiQ0z52iTmzR2AWw16sd7oDrJXfkZcpAwWnZn173lM8TdnRtI2hgSVKAVof4JoHKv9APhm-bp70AmmcKfTATs7Ed45zsOd7jP-NZT4WnByQrcQd1s0884jeVX-k1_FbuovcCk2O8CDH9DjM6ygl3vb3R5tnmjji9HtFmiHywwM7o',
        order: 3
      }
    ]);
    console.log('🌱 Testimonials seeded');

    // 7. Seed About Page
    await AboutPage.deleteMany({});
    await AboutPage.create({});
    console.log('🌱 About page content seeded');

    // 8. Seed Why Biomass Page
    await WhyBiomassPage.deleteMany({});
    await WhyBiomassPage.create({});
    console.log('🌱 Why Biomass page content seeded');

    // 9. Seed Our Products Page configs
    await ProductsHeroConfig.deleteMany({});
    await ProductsHeroConfig.create({});
    console.log('🌱 Products page config seeded');

    // 10. Seed Industries Page configs
    await IndustriesPageConfig.deleteMany({});
    await IndustriesPageConfig.create({});
    console.log('🌱 Industries page config seeded');

    // 10.5. Seed Contact Page configs
    await ContactPage.deleteMany({});
    await ContactPage.create({
      expertServices: {
        badge: 'Consultation',
        title: 'Expert Advisory Services',
        cards: [
          { icon: 'engineering', title: 'Technical Integration', description: 'On-site assessments for switching traditional boilers to biomass pellet systems.' },
          { icon: 'inventory_2', title: 'Logistics Planning', description: 'Customized delivery schedules and inventory management for high-volume users.' }
        ]
      }
    });
    console.log('🌱 Contact page config seeded');


    // 11. Seed Blog Categories & Posts
    await BlogCategory.deleteMany({});
    await BlogPost.deleteMany({});

    const seededBlogCategories = await BlogCategory.insertMany([
      { name: 'Sustainability', slug: 'sustainability', description: 'Sustainable bio-energy practices and carbon offset updates.' },
      { name: 'Innovation', slug: 'innovation', description: 'Technological developments and R&D updates in biomass efficiency.' },
      { name: 'Industry News', slug: 'industry-news', description: 'Global developments and trends in biomass energy markets.' },
      { name: 'Corporate', slug: 'corporate', description: 'Official announcements and corporate updates from Green Pellets India.' }
    ]);

    const catMap = {};
    seededBlogCategories.forEach(cat => {
      catMap[cat.slug] = cat._id;
    });

    await BlogPost.insertMany([
      {
        title: 'The Future of Bio-Energy in Rural India',
        slug: 'future-of-bio-energy-rural-india',
        excerpt: 'Exploring how next-generation biomass technologies are revolutionizing local industrial ecosystems while driving global sustainability goals.',
        content: `
          <p class="mb-6">Exploring how next-generation biomass technologies are revolutionizing local industrial ecosystems while driving global sustainability goals. In the heart of rural India, a quiet energy revolution is taking place. By turning agricultural waste into high-density biomass fuel, local farmers and industries are working together to combat pollution and boost economic growth.</p>
          <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Empowering Local Communities</h3>
          <p class="mb-6">The transition to biomass has created local jobs, increased farmer incomes by compensating them for waste residue, and drastically reduced stubble burning, which has long been a primary source of air pollution in northern India.</p>
          <blockquote class="border-l-4 border-tertiary pl-6 italic my-8 text-on-surface-variant font-medium">
            "Biomass is not just an alternative energy source; it is a catalyst for rural economic transformation."
          </blockquote>
          <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Industrial-Scale Efficiency</h3>
          <p class="mb-6">Modern compression technologies allow agricultural waste to be converted into high-density fuel pellets that rival the calorific values of fossil fuels. This ensures that major industries can switch to clean energy without compromising on their thermal efficiency or process heat requirements.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhBQseeuYJ06Js6Mp6Fz0q32g7d126uEWb0NK9qkwGAoFhZDiocEPpoUO2zHoYKqid2vGNFzifc23fj8JoAtOHCjSPrOvT8mf4ig2ZlL2VsymBimgTfgBAAkKb8t7t23RznzBHNvwrab1YPX1LGBQRqcLYAcrq7biuAD_v0wmtgJtcq4gVWx9yKqt8UG0m0wdI6jpMs6dOTgoqVVtnyWNwAzEDn3lupd7wu0q0C5Ou8fgu1MrcAVtOy6CZ1zyyIFjSzTd8OAwAWQE',
        category: catMap['sustainability'],
        tags: ['Rural', 'Sustainability', 'Biomass'],
        author: {
          name: 'ADITYA VERMA',
          designation: 'Editor & Researcher',
          image: '',
          bio: 'Aditya has spent a decade studying clean energy transitions in South Asia.'
        },
        readTime: '8 MIN READ',
        featured: true,
        published: true,
        displayOrder: 1,
        status: 'active'
      },
      {
        title: 'Reinventing the Pellet: High-Density Combustion and Its Environmental Impact',
        slug: 'reinventing-pellet-high-density-combustion',
        excerpt: 'Our R&D department unveils new manufacturing techniques that increase thermal efficiency by 15% while reducing ash content to record lows.',
        content: `
          <p class="mb-6">Our R&D department unveils new manufacturing techniques that increase thermal efficiency by 15% while reducing ash content to record lows.</p>
          <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Advanced Compression Techniques</h3>
          <p class="mb-6">Through years of testing, we have optimized moisture control and particle distribution to create pellets that ignite cleaner and burn longer. This next generation of biofuels is designed specifically for high-capacity industrial boilers.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFx6_nYsDKNjQiSP2yQdZFQ-LPgTWTSUJK7_t8DtxNK_zXe1WogpcDG2Y-afA8YRkh-AxrgOx_05wFbcnObd2aQ_xvuoYt6EUhZC4mgbXvEACaj0TAs_D5MXxSSXQYJ8YgRPEDGytduvJENnHS7J-X_6mRbLugnk_yb6W9C7g3oSuPAPCYOyHgW-gA1f-SZAlan4ZcFcJe4BsvIrDeKQoTfXT0wTEHid2ccmmkuuzh_l8DTfqTkjxKH1wO0zakwOBmJ6L97wsN0r8',
        category: catMap['innovation'],
        tags: ['Innovation', 'Thermal Efficiency', 'R&D'],
        author: {
          name: 'DR. RAMESH KUMAR',
          designation: 'R&D Head',
          image: '',
          bio: 'Dr. Kumar leads materials science research for renewable fuels.'
        },
        readTime: '6 MIN READ',
        featured: false,
        published: true,
        displayOrder: 2,
        status: 'active'
      },
      {
        title: 'Our Path to Zero Carbon: 2024 Roadmap',
        slug: 'path-to-zero-carbon-2024-roadmap',
        excerpt: 'A comprehensive deep-dive into our supply chain optimizations and carbon sequestration initiatives.',
        content: `
          <p class="mb-6">A comprehensive deep-dive into our supply chain optimizations and carbon sequestration initiatives to ensure our entire business remains carbon-negative.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAoAjkc5xd7uUFRN3-V0v7S2se4PhYIMkqH2A6X4tBsIsvejKBqK_9gnTdPqtlIHEmp18OlOkF0tnFptXyXTNWIvRZhuHtBk92XZreWfYSQtRutGEyYTZGEAqWIxvJTQhme5TJUOcPH2zI4Qe_TTKISSAETYFvakS49l6lq2d0dVigL6Ya2WOhdJZtIMZ25dA-_qbQvKEL402RC0nS1O9tg2BSD59VrrYVvw1t2WIL-T0WBXypHEyg1xA5-bACgqJp7o56rcRgvH0',
        category: catMap['sustainability'],
        tags: ['Sustainability', 'Decarbonization', 'Supply Chain'],
        author: {
          name: 'SIDDHARTH SEN',
          designation: 'Sustainability Director',
          image: '',
          bio: 'Siddharth oversees environmental policy compliance.'
        },
        readTime: '5 MIN READ',
        featured: false,
        published: true,
        displayOrder: 3,
        status: 'active'
      },
      {
        title: 'Global Energy Summit 2024: Key Takeaways',
        slug: 'global-energy-summit-2024-takeaways',
        excerpt: 'Observations from our leadership team at the summit regarding the shifting landscape of industrial fuels.',
        content: `
          <p class="mb-6">Observations from our leadership team at the summit regarding the shifting landscape of industrial fuels. The consensus was clear: biomass and wind will dominate energy transitions in the next decade.</p>
        `,
        featuredImage: '',
        category: catMap['industry-news'],
        tags: ['Global Summit', 'Bio-fuels', 'Policy'],
        author: {
          name: 'RAJESH SINGHAL',
          designation: 'CEO',
          image: '',
          bio: 'Rajesh is the founder and CEO of Green Pellets India.'
        },
        readTime: '4 MIN READ',
        featured: false,
        published: true,
        displayOrder: 4,
        status: 'active'
      },
      {
        title: 'Biodiversity and Biomass: A Synergistic Relationship',
        slug: 'biodiversity-and-biomass',
        excerpt: 'How managing crop residues benefits local wildlife and maintains soil biodiversity in rural farming zones.',
        content: `
          <p class="mb-6">Managing crop residue helps prevent uncontrolled field fires that devastate local ecosystems and soil microbial populations.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdUJDPR_6DyYvluXtoVNqOZvQbwV1kb8fTESf24WCgbua59ULMuqXGceoelndHoFPePljocmxIj-SKg9FJyn5tDcYD2GToTGnFlyJM2fkuAto5n7jlh4QuMuO5V5Q12nDM3cvYzVFvTekVwHUGku3EjwGaB2w1gDJ-psIgqy7eFSijBprJ9yxWXZByx4BXbKvlTARluYk_VEDydJcyrQkU_DClzzZP3N--8A-ZQJXMxOeCvIrB_SSDDZd71FPSOo9eZ8-aaAZt-hQ',
        category: catMap['sustainability'],
        tags: ['Biodiversity', 'Environment', 'Soil Health'],
        author: {
          name: 'NISHA PATEL',
          designation: 'Environmental Analyst',
          image: '',
          bio: 'Nisha holds a PhD in environmental science.'
        },
        readTime: '4 MIN READ',
        featured: false,
        published: true,
        publishedAt: new Date('2024-05-12'),
        displayOrder: 5,
        status: 'active'
      },
      {
        title: 'Hybrid Grids: Integrating Solar and Biomass Storage',
        slug: 'hybrid-grids-solar-biomass-storage',
        excerpt: 'Combining solar energy generation with biomass thermal units represents the ultimate baseload utility solution.',
        content: `
          <p class="mb-6">A deep dive into hybrid clean energy systems that provide uninterruptible power day and night.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpcdSLM3id7YGyOAR6yxs6pfdwi_uf8jolgCS5pZwGzYzrHkFSiZTZaLnkWN20BsZIUXGpjo-U13PMCB_wL8oKHzVolc2K72ws9Y-t5wzuKqUmJtERvnORXnyJvoxHpqxWGewJkHNTE3wtqSI9Ed9SrJ8pMWdzSSx3_cfy_lPo6ldFOaG0KpyRLTL6MszfDSOgXDE_61BZF6zSJuSApnzXnnbpEDZ_qgeT3V48SZdEwToP0-MhZsoG59zmY-MDtP-TKXiuriLbp0U',
        category: catMap['innovation'],
        tags: ['Solar', 'Grid Storage', 'Baseload'],
        author: {
          name: 'VARUN MEHTA',
          designation: 'Grid Engineer',
          image: '',
          bio: 'Varun designs hybrid clean energy grids.'
        },
        readTime: '6 MIN READ',
        featured: false,
        published: true,
        publishedAt: new Date('2024-05-05'),
        displayOrder: 6,
        status: 'active'
      },
      {
        title: 'Traceability in Bio-fuels: The Blockchain Solution',
        slug: 'traceability-biofuels-blockchain-solution',
        excerpt: 'How blockchain records verify crop origins, carbon lifecycle data, and supply chain accountability.',
        content: `
          <p class="mb-6">Using distributed ledgers to provide verifiable carbon emission tracking from field to furnace.</p>
        `,
        featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLNte3hPG4UOq55bdOLLKDxBgtLaZYq7nhweUsZBYfgOu2jBaFkrWjIvTVNaREJK9tZ1Re_0rlYLbnEp2M85VMGBDY-pkLJjbOvHSUHnxnLTG7ybG2MCHawGUG9ZunaXT_clkC5NJdJRUZIBSFn-SutsdkW6BCw8kZ2Z4_Pk8PC3tPDGs4MSxQNVDKcXkrYgmnFWF_M03hsCIk16lRu-Az6jh4fV1KwhWcZ_gsZ0kfJaVuuODOqYeO8Ep34Ixep5zkMRUmBHmdDbk',
        category: catMap['corporate'],
        tags: ['Supply Chain', 'Blockchain', 'Traceability'],
        author: {
          name: 'SNEHA ROY',
          designation: 'Supply Chain Expert',
          image: '',
          bio: 'Sneha specializes in digital trust networks.'
        },
        readTime: '5 MIN READ',
        featured: false,
        published: true,
        publishedAt: new Date('2024-04-28'),
        displayOrder: 7,
        status: 'active'
      }
    ]);
    console.log('🌱 Blog categories and posts seeded');

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();