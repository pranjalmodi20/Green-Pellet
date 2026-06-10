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
      heroBgImage: 'https://lh3.googleusercontent.com/aida/AP1WRLsHrZQ_ikFwFOhAscpiZ1QAQ7UNIYgO1INVdpCok2efFvh9FUb7iIoTd5jtDfOFX5cP18aQl9tnIGG0Iv-uzJK4KmSQsXVLWFtHoCm3VJ38sR6VkI3ovUw5ljaW4rBkMZncZyhU_iWVJGQ37EtpkTVVXRl7sxIEdTRLnljsh7gZFe3BqsTPyz7xttkWoMTuogAdcq6ebq0JCTsli7AzuV7F7beGA0AqPy8FSZXq6Ycepa82VXQ8JZLYdl8',
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

    // 5. Seed Bento Grid Industries
    await Industry.deleteMany({});
    await Industry.insertMany([
      {
        title: 'Energy & Utilities',
        description: 'Replacement of coal for grid-scale energy production, achieving up to 60% carbon reduction per MWh.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxZpLBYsNqpLFC5eOEObwFa98kOvOHh_-dZxlmtVQuKNrz8Oi4s-jcTs5ZZC5bJztylVaWnI7B7RT2bbE5yEqA0BfvH5sOY0SaE8U4V_exab0RL8eN7CtF__nPymBQ89eUEVyZTO_1DEsI5lVwDmv18YaZhC6lxd6S60rmLa-pg73zwG93qmWpZFiHxu3f0TmhYZ0HIwDlNklw0qJskcls9nC7_NjlqcaQ2BQ9Bd0aENSoO5HR8DaUG65OcYwhDOiXD1I-whBdvnE',
        type: 'hero',
        order: 1
      },
      {
        title: 'Hospitality',
        description: 'Premium heating for luxury resorts and eco-conscious hotel chains.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsuMYnQIHF6nhhUFOits7KrPCBgjtZlHCQOgUj6eEl8x7ptzKSmgHlHgGI5gzrzj2DUs1eNNt3RFSKNtdwqS1F54E_5OtV7_f9tSIIDR-6owB9cBio-6oNapv_AdWLlGCjQ5wmXsY3pxbkn70BIxMuaJUK8pT6um2x1L1nJnmw2xj3NN-ds9WwpgWWm9k3NDL4l3rdaaKIT-YilxmKNZgVVp86-vaUkQenOru5YhLFpiMUtVIwuixTParszb3VSSi894qlblnkH4',
        type: 'medium',
        order: 2
      },
      {
        title: 'Manufacturing',
        icon: 'factory',
        type: 'small',
        order: 3
      },
      {
        title: 'Chemical Processing',
        icon: 'science',
        type: 'accent',
        order: 4
      }
    ]);
    console.log('🌱 Industry bento grid cards database seeded');

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

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();