import React, { useEffect, useState, useCallback } from 'react';
import IndustriesHero from '../../components/industries/IndustriesHero';
import IndustryGrid from '../../components/industries/IndustryGrid';
import DetailedSectors from '../../components/industries/DetailedSectors';
import IndustriesCTA from '../../components/industries/IndustriesCTA';
import { fetchIndustriesConfig, fetchIndustries } from '../../services/industryService';

const DEFAULT_INDUSTRIES_CONFIG = {
  hero: {
    badge: 'GLOBAL INDUSTRIAL IMPACT',
    title: "Powering the World's Leading Industries.",
    subtitle: "From pharmaceutical precision to the scale of global FMCG manufacturing, we provide high-performance biomass solutions that define the next generation of industrial energy.",
    bgImage: '/images/industries-hero.png'
  },
  detailedSectors: {
    title: 'Tailored for your scale.',
    description: 'Our engineering team works with your plant managers to retrofit or design boilers that maximize the output of our premium biomass pellets.',
    sectors: [
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
  },
  cta: {
    title: 'Transition Your Enterprise Today',
    subtitle: 'Join a global network of industrial leaders who have optimized their energy strategy with Green Pellets India.',
    button1Text: 'Request a Consultation',
    button1Link: '#',
    button2Text: 'Download Brochure',
    button2Link: '#'
  }
};

const Industries = () => {
  const [config, setConfig] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPageData = useCallback(async () => {
    setLoading(true);
    try {
      const [configData, industriesData] = await Promise.all([
        fetchIndustriesConfig(),
        fetchIndustries()
      ]);
      setConfig(configData);
      // Filter out bento types from the homepage to prevent overlap
      const filteredIndustries = industriesData.filter(ind => !ind.type);
      setIndustries(filteredIndustries);
    } catch (err) {
      console.error('Failed to load Industries page data:', err);
      setConfig(DEFAULT_INDUSTRIES_CONFIG);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant font-bold">Loading Industries Experience...</p>
        </div>
      </div>
    );
  }

  const displayConfig = config || DEFAULT_INDUSTRIES_CONFIG;

  return (
    <div className="w-full">

      {/* Hero Header */}
      <IndustriesHero config={displayConfig} />

      {/* Main Bento Grid */}
      <IndustryGrid industries={industries} />

      {/* Bottom detailed sectors list */}
      <DetailedSectors config={displayConfig} />

      {/* Full screen CTA */}
      <IndustriesCTA config={displayConfig} />
    </div>
  );
};

export default Industries;
