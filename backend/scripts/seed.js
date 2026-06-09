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

    // 4. Seed Products
    await Product.deleteMany({});
    await Product.insertMany([
      {
        title: 'Premium Pine Pellets',
        description: 'Ultra-low ash content (< 0.5%) designed for residential heating and sensitive industrial boilers.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD41fVSdNEuCUamuGfDfPqku0qNGCdkP3864alvXCpK5I5H5LYF8MPNsNu51PdrVhEo8W6_GR3ocSkoNF8UdNRx_IsS6aLDBuY56qdfS4V1Mz_Wvw_UrxFH3lsB2QJJ3Fp4OMTQ2a95f1gSjZsm4JLpPGd3BNPXq6rsN7rDhEFL0zhekU-_6AlVCZk1MiqOLYopLL1ACOUW_jFFWP-WxuiHr-3sqS47axIIfX1N8r29Tq9B1E_J3lPOn62tBCfz-byiz-DIpyWy6Q8',
        spec: '4800 kcal/kg Avg.',
        order: 1
      },
      {
        title: 'Industrial Grade-A',
        description: 'High-performance blend optimized for cement kilns and large-scale power plants.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuPhXLOx-gkxbOPlGuprKyPeumyYTuGuYdJG1jIIXDLrrczqolLv96oIo4agGvya8gz6f9pgTtCLzSLoH--xEsuXx5VmQ99yQgiKDosI1zaN9e9zMmRWI1kq2N9yfx1vlUK9YX0BCLrTEy0VZXoz9g5BFfe0YZyxwM4-DD8chZrFqlQeOblX0r6KbZzwmdugcfL2_hTUKsQ7Ym5vwSMtH4LlqkY5lJi_5GsLhUB9Xz4NDPgU-sRbNG_1IpGpxKucUC0a5u-cU0M0Hg',
        spec: '4200 kcal/kg Avg.',
        order: 2
      },
      {
        title: 'Rice Husk Briquettes',
        description: 'Sustainable solution for brick kilns and rural energy generation at scale.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhzHEZ4aCZA00pUNrnGzuWyyyvR2IwHWkVyfwt265xDifzxAKzoX0qsE1Ceafm5gG6zbnfidGFrQuklHCYTAvG7-mlWxCWAMiTCaWuerxTNH3n86MLeuVGnw59rX22mjrkFbch6hoPQsoeHt7H4zejampQ4SI-t6NJgG7KNsa8QCIrKHA2h6NABwj8BPkv30nl8bAGs3JBXZtiIZE7vIB3eY_2OJsL6eQKvX8NucqkVWeCvlYyx8AXnIStX2zfy2kT5If6ituFVRg',
        spec: '3800 kcal/kg Avg.',
        order: 3
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

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();