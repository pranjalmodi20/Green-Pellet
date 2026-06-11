import React, { useEffect, useState, useCallback } from 'react';
import AboutHero from '../../components/about/AboutHero';
import MissionVisionSection from '../../components/about/MissionVisionSection';
import JourneyTimeline from '../../components/about/JourneyTimeline';
import LeadershipSection from '../../components/about/LeadershipSection';
import SustainabilitySection from '../../components/about/SustainabilitySection';
import AchievementsSection from '../../components/about/AchievementsSection';
import AboutCTA from '../../components/about/AboutCTA';
import { fetchAboutPage } from '../../services/aboutService';

const DEFAULT_ABOUT_DATA = {
  hero: {
    badge: 'Established 2011',
    title: 'Pioneering the',
    titleHighlight: 'Green Energy',
    titleSuffix: 'Revolution',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAccvJxJMTAesBpIfTxhI_W3cXgwbK8PlyUOmlHsMNmml40jXYxsh6ZqN2NOyQvssks1Xl2JcI5Zfr6Tf9PlsRrEfEXyGHfOoqm2I0hqbCkA5NsJY4VbCXliuoO3TWxx6EgTjmygzvnaUvTtfI4NnrQ1enCpxeT-iWyhg2wEyboHsHthc9GGUbgfWd6ajxs7ixN7klWQ3vzLcTkrpjThsJK3SDcZH_CQa4PXILZ6r3NTqz1dT3PtVfy8sTIGzGGcu5emlbonzGQAc',
    imageAlt: 'Sustainable forest landscape during golden hour'
  },
  companyStory: {
    text: "From a humble foundation in 2011 to becoming India's leading force in sustainable biomass production. We are redefining industrial power through precision engineering and ecological integrity.",
    imageAlt: 'Sustainable forest landscape'
  },
  purpose: {
    badge: 'OUR PURPOSE',
    title: 'Engineering a Carbon-Neutral Future.',
    sideImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmM9TPRrULC_xdtNjuqAFVpsJhy4IAqCauPEM8Mtd1DnTwzsovXsDt47nGmW6mdiF69b__9uk_s02Al14Jazhc0L3fEmqLkTsBgntuiMqlMTZofRownAuRw8hDLEqj8v_wBRVcxEb-97BSL26MTb1nPkEUao34qLXinZaLmAuQ8qMeVAWA3bP4ueM9Hwl--FMW4awNWYbpGXpcDP9RL8-ezsgytcWwUPN_7LrpxFvxrb2g3CeTJ_04MeGKC2e4DvFUfuGaoScAHsQ'
  },
  vision: {
    icon: 'visibility',
    title: 'Vision',
    description: 'To lead the global transition towards sustainable industrial energy by becoming the benchmark for biomass quality, innovation, and environmental responsibility.'
  },
  mission: {
    icon: 'rocket_launch',
    title: 'Mission',
    description: 'Empowering industries with high-calorific, eco-friendly pellet solutions while fostering a circular economy that benefits local farmers and global ecosystems.'
  },
  timeline: {
    badge: 'MILESTONES',
    title: 'Our Growth Journey',
    entries: [
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
    ]
  },
  leadership: {
    badge: 'Leadership',
    title: 'Visionaries at the Helm',
    members: [
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
    ]
  },
  sustainability: {
    badge: 'COMMITMENT',
    title: 'Harmony with Nature',
    description: "Our sustainability commitment goes beyond production. We ensure a transparent supply chain that prevents deforestation, minimizes logistics carbon footprint, and reinvests in rural communities. Every pellet produced is a step toward restoring the Earth's balance.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOwnTijigkeUxWuiHC9GtM9OiUrAiRTpjJ9bGathwfRArTWR4IGWvTnRxL_TL3owUH0Z8Hp4APpVqeQ6QMFd2fPKeQfIDX3EE2gvhmTIxuc-KzpuT28azo1p8JI3oBg5E-CRZwpTFmQIob1YFwpwBEMK3aa1w6HcCPgIAzVBLbFu-z_put3UPStf6sLiDVEChhxOaWvijH6JHzUXdJaa6qNbi1X5Y6q0m33g3zFy38rM0eXdYBRUUGIcIWcwI68DH9vegnZNHHhJk',
    stats: [
      { value: '500K+', label: 'Tons of CO2 Offset' },
      { value: '100%', label: 'Renewable Sourcing' }
    ]
  },
  achievements: {
    title: 'Global Standards. Local Pride.',
    items: [
      { icon: 'verified', label: 'ISO 9001:2015' },
      { icon: 'eco', label: 'ENplus Certified' },
      { icon: 'public', label: 'UN Global Compact' },
      { icon: 'workspace_premium', label: 'Top Innovator 2023' }
    ]
  },
  cta: {
    isEnabled: false,
    title: 'Join the Clean Energy Revolution',
    subtitle: "Ready to transition your industry to high-performance biomass fuel? Let's engineer your carbon-neutral path today.",
    bgImage: 'https://lh3.googleusercontent.com/aida/AP1WRLvGSb1VdTpxt1ylPy_XRpihKO4urH-tLZXH6EwvYPVXNyy4v7xB1mEo-Jr8EITzB8YVxLyBRag6U5HsdIztdvBtvjW6SYftpM8W4MCG3ahnFw2SJhC4xf3lZZg7TZ_MORiy5CTvH6GCiSk0M-7JVD-iswoabFaC6yzoGQv5NlPAqhlwMp_fZPph_wWN8jYNbyDq_YZGLW0UOY-BfE_XRYNtUpZXnwvhXsGSPwHAHt3Z1pz9DgKB8TrDbyI',
    primaryCtaText: 'Partner with Us',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Request a Site Visit',
    secondaryCtaLink: '/contact'
  }
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAbout = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAboutPage();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty response');
      }
      setAboutData(data);
    } catch (err) {
      console.error('Failed to load about page:', err);
      setAboutData(DEFAULT_ABOUT_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant">Loading About Us...</p>
        </div>
      </div>
    );
  }

  const displayData = aboutData || DEFAULT_ABOUT_DATA;

  return (
    <div className="w-full mt-24">
      <AboutHero hero={displayData.hero} companyStory={displayData.companyStory} />
      <MissionVisionSection
        purpose={displayData.purpose}
        vision={displayData.vision}
        mission={displayData.mission}
      />
      <JourneyTimeline timeline={displayData.timeline} />
      <LeadershipSection leadership={displayData.leadership} />
      <SustainabilitySection sustainability={displayData.sustainability} />
      <AchievementsSection achievements={displayData.achievements} />
      <AboutCTA cta={displayData.cta} />
    </div>
  );
};

export default About;
