const mongoose = require('mongoose');

const TimelineEntrySchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  align: { type: String, enum: ['left', 'right'], default: 'left' }
}, { _id: false });

const LeadershipMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  offset: { type: Boolean, default: false }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true }
}, { _id: false });

const AchievementItemSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  label: { type: String, required: true }
}, { _id: false });

const VisionMissionSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const CompanyStorySchema = new mongoose.Schema({
  text: {
    type: String,
    default: "From a humble foundation in 2011 to becoming India's leading force in sustainable biomass production. We are redefining industrial power through precision engineering and ecological integrity."
  },
  imageAlt: { type: String, default: 'Sustainable forest landscape' }
}, { _id: false });

const CtaSchema = new mongoose.Schema({
  isEnabled: { type: Boolean, default: false },
  title: { type: String, default: 'Join the Clean Energy Revolution' },
  subtitle: {
    type: String,
    default: "Ready to transition your industry to high-performance biomass fuel? Let's engineer your carbon-neutral path today."
  },
  bgImage: {
    type: String,
    default: 'https://lh3.googleusercontent.com/aida/AP1WRLvGSb1VdTpxt1ylPy_XRpihKO4urH-tLZXH6EwvYPVXNyy4v7xB1mEo-Jr8EITzB8YVxLyBRag6U5HsdIztdvBtvjW6SYftpM8W4MCG3ahnFw2SJhC4xf3lZZg7TZ_MORiy5CTvH6GCiSk0M-7JVD-iswoabFaC6yzoGQv5NlPAqhlwMp_fZPph_wWN8jYNbyDq_YZGLW0UOY-BfE_XRYNtUpZXnwvhXsGSPwHAHt3Z1pz9DgKB8TrDbyI'
  },
  primaryCtaText: { type: String, default: 'Partner with Us' },
  primaryCtaLink: { type: String, default: '/contact' },
  secondaryCtaText: { type: String, default: 'Request a Site Visit' },
  secondaryCtaLink: { type: String, default: '/contact' }
}, { _id: false });

const AboutPageSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'Established 2011' },
    title: { type: String, default: 'Pioneering the' },
    titleHighlight: { type: String, default: 'Green Energy' },
    titleSuffix: { type: String, default: 'Revolution' },
    bgImage: {
      type: String,
      default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAccvJxJMTAesBpIfTxhI_W3cXgwbK8PlyUOmlHsMNmml40jXYxsh6ZqN2NOyQvssks1Xl2JcI5Zfr6Tf9PlsRrEfEXyGHfOoqm2I0hqbCkA5NsJY4VbCXliuoO3TWxx6EgTjmygzvnaUvTtfI4NnrQ1enCpxeT-iWyhg2wEyboHsHthc9GGUbgfWd6ajxs7ixN7klWQ3vzLcTkrpjThsJK3SDcZH_CQa4PXILZ6r3NTqz1dT3PtVfy8sTIGzGGcu5emlbonzGQAc'
    },
    imageAlt: { type: String, default: 'Sustainable forest landscape during golden hour' }
  },
  companyStory: {
    type: CompanyStorySchema,
    default: () => ({})
  },
  purpose: {
    badge: { type: String, default: 'OUR PURPOSE' },
    title: { type: String, default: 'Engineering a Carbon-Neutral Future.' },
    sideImage: {
      type: String,
      default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmM9TPRrULC_xdtNjuqAFVpsJhy4IAqCauPEM8Mtd1DnTwzsovXsDt47nGmW6mdiF69b__9uk_s02Al14Jazhc0L3fEmqLkTsBgntuiMqlMTZofRownAuRw8hDLEqj8v_wBRVcxEb-97BSL26MTb1nPkEUao34qLXinZaLmAuQ8qMeVAWA3bP4ueM9Hwl--FMW4awNWYbpGXpcDP9RL8-ezsgytcWwUPN_7LrpxFvxrb2g3CeTJ_04MeGKC2e4DvFUfuGaoScAHsQ'
    }
  },
  vision: {
    type: VisionMissionSchema,
    default: () => ({
      icon: 'visibility',
      title: 'Vision',
      description: 'To lead the global transition towards sustainable industrial energy by becoming the benchmark for biomass quality, innovation, and environmental responsibility.'
    })
  },
  mission: {
    type: VisionMissionSchema,
    default: () => ({
      icon: 'rocket_launch',
      title: 'Mission',
      description: 'Empowering industries with high-calorific, eco-friendly pellet solutions while fostering a circular economy that benefits local farmers and global ecosystems.'
    })
  },
  timeline: {
    badge: { type: String, default: 'MILESTONES' },
    title: { type: String, default: 'Our Growth Journey' },
    entries: {
      type: [TimelineEntrySchema],
      default: () => ([
        {
          year: '2011',
          title: 'The Foundation',
          description: 'Founded with a single manufacturing unit and a bold vision to replace coal with renewable biomass in industrial boilers.',
          align: 'left'
        },
        {
          year: '2015',
          title: 'Technological Leap',
          description: 'Implementation of European pelleting technology, increasing production capacity by 300% and achieving 99% purity.',
          align: 'right'
        },
        {
          year: '2019',
          title: 'National Reach',
          description: 'Expansion into 12 major industrial hubs across India, partnering with Fortune 500 manufacturing firms.',
          align: 'left'
        },
        {
          year: '2024',
          title: 'Global Impact',
          description: 'Setting the standard for biomass export quality and launching our R&D center for high-efficiency bio-fuels.',
          align: 'right'
        }
      ])
    }
  },
  leadership: {
    badge: { type: String, default: 'Leadership' },
    title: { type: String, default: 'Visionaries at the Helm' },
    members: {
      type: [LeadershipMemberSchema],
      default: () => ([
        {
          name: 'Arjun Mehta',
          role: 'Founder & CEO',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQaKAjhVeqVHNBtrox2OwFYJH16IL-GiQ8Mbq-sIMZFrdyCJ3j44se_JosVbz_QwJdkskb3c4vOuSX7fJIH_AZ8s5GeISJjaOsHGvFXXPfZwnczlohzJbXBEHWl5p0qLsXCWL2OGDVieCOcQ6JuPSDmgmOMey3Til1yEzbauWqi_egPxT-ZfHh6g6qcpbNpXuvI0yYpfP7oedhRjmzEYGaL3H6rojkk8vD1qarrllzsBlAYwusoOkc3fnAiC_1N2U1_Tbv_AN5uic',
          offset: false
        },
        {
          name: 'Sarah Chen',
          role: 'Chief Operations Officer',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQEd08YUqcUJ9D2p4uffphABzQ4YJwbf7KqjJixAUdFTK8CoBKFHCJdHajIbJOLi64xpBEuwTkcNiRKzFo3chREp6Ea90AbJ3uW7GXRVLatDCo1AXjaTDsAw06dKYVITex0pJTlBGePVhdSWF6NMpwJbS8HuBHL7w5cbKx9ybYkTLOFeUGMHyuuJrHMxRIw_uSr-J7s5hxZvJD1U9lh63SnPBg1Iy4W-n6xfcpz9y2w4QXvfBAPJplUfP8pkeBB2Eb4mxmrmF2zvg',
          offset: true
        },
        {
          name: 'Vikram Singh',
          role: 'Head of Innovation',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZt3fs-9bRHo6FQW-nhBozlwHPzZAt0UtZGsftzo0vG2zg_RMv3XvgyaEMNC-jMs4n3xqVMQTxPiCO5e3dvcJ48mN-WuPuvYyZFfk7rqoYcjb3_M-s-rJzSZTZ_z5yC1JoRVbp6yoekGMppDz8obA2-MzNgIzzKNg_SL8i_ig_5VS64BLNk9OBtv_0dfnjqoEy2RYUtrXyeoOG5jXJX9B5K9GyB2jFQjYAXv0BnEEZzSyzOUG5s3_cuHRppZFoLmy81uN5wUGuAeI',
          offset: false
        }
      ])
    }
  },
  sustainability: {
    badge: { type: String, default: 'COMMITMENT' },
    title: { type: String, default: 'Harmony with Nature' },
    description: {
      type: String,
      default: "Our sustainability commitment goes beyond production. We ensure a transparent supply chain that prevents deforestation, minimizes logistics carbon footprint, and reinvests in rural communities. Every pellet produced is a step toward restoring the Earth's balance."
    },
    image: {
      type: String,
      default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOwnTijigkeUxWuiHC9GtM9OiUrAiRTpjJ9bGathwfRArTWR4IGWvTnRxL_TL3owUH0Z8Hp4APpVqeQ6QMFd2fPKeQfIDX3EE2gvhmTIxuc-KzpuT28azo1p8JI3oBg5E-CRZwpTFmQIob1YFwpwBEMK3aa1w6HcCPgIAzVBLbFu-z_put3UPStf6sLiDVEChhxOaWvijH6JHzUXdJaa6qNbi1X5Y6q0m33g3zFy38rM0eXdYBRUUGIcIWcwI68DH9vegnZNHHhJk'
    },
    stats: {
      type: [StatSchema],
      default: () => ([
        { value: '500K+', label: 'Tons of CO2 Offset' },
        { value: '100%', label: 'Renewable Sourcing' }
      ])
    }
  },
  achievements: {
    title: { type: String, default: 'Global Standards. Local Pride.' },
    items: {
      type: [AchievementItemSchema],
      default: () => ([
        { icon: 'verified', label: 'ISO 9001:2015' },
        { icon: 'eco', label: 'ENplus Certified' },
        { icon: 'public', label: 'UN Global Compact' },
        { icon: 'workspace_premium', label: 'Top Innovator 2023' }
      ])
    }
  },
  cta: {
    type: CtaSchema,
    default: () => ({})
  }
}, { timestamps: true });

module.exports = mongoose.model('AboutPage', AboutPageSchema);
