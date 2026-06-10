import React, { useEffect, useState, useCallback } from 'react';
import WhyBiomassHero from '../../components/why-biomass/WhyBiomassHero';
import BiomassDefinition from '../../components/why-biomass/BiomassDefinition';
import ComparisonSection from '../../components/why-biomass/ComparisonSection';
import IndustryBenefits from '../../components/why-biomass/IndustryBenefits';
import WhyBiomassCTA from '../../components/why-biomass/WhyBiomassCTA';
import { fetchWhyBiomassPage } from '../../services/whyBiomassService';

const DEFAULT_WHY_BIOMASS_DATA = {
  hero: {
    badge: 'THE FUTURE OF INDUSTRIAL ENERGY',
    title: 'Powering Tomorrow with Biomass.',
    subtitle: "Transitioning to biomass isn't just an environmental choice—it's a high-performance industrial strategy. Discover how we turn organic residues into consistent, high-calorific energy.",
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcY6XVUpIxZzA_jA6faDg5alJ5k70h613FRy7KuVQYRpGM0eKgrZZpfQ9ynUekWqdXi4RCZyI1FgXIeQ2COlx1i0hXCqhnYNLthkCq1VYCqq3bBhn1ZCYQhAAVFDOIWyUHr7joMxoP_dbLZalUOneSJ1M3HvN2na448u0HZ4OE9Q391ExayjUyZ0WvchSMLAtjqWtiJRn-u2irABZbJL2zOZ4KeDTRnymIwsgHAnscrPMAI1JbPW5bhKx_YDo1NmXM2dNGKzBaEJs',
    primaryCtaText: 'Explore the Impact',
    primaryCtaLink: '#',
    secondaryCtaText: 'Download Report',
    secondaryCtaLink: '#'
  },
  definition: {
    badge: 'CORE DEFINITION',
    title: 'What is Biomass?',
    description: 'Biomass is organic material that comes from plants and animals, serving as a renewable energy source. It contains stored energy from the sun through the process of photosynthesis.',
    quote: 'Unlike fossil fuels which take millions of years to form, biomass represents a cycle of energy that can be replenished annually, creating a closed-loop carbon system.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDy2dc0EGOS5L3Ckgw96eeeOKMDGV_o0wzfI76wUL7MnpKLvuKI_q4toUGHcn1ib-NdpggQyFDVoSolhal_cX55vM1nkmfhnQFECnAz62m9HETtZ2ME-Zmvg-ijgP_Ns7qw5NQs86Ga1558eGhOBdBwhxZM0MMeJ5lmCJVkHCfZOLdYQngRLYlVc56zS1RcRfro32snYEO9b_7BoejxcAhYMGgxU8dRORaZ0gdb-B_VTovWQ6Xgdv7A7jvegHf0NNJGPc8eb9Ikco',
    densityValue: '4500+ kcal/kg',
    densityLabel: 'ENERGY DENSITY',
    items: [
      { title: 'Agricultural Residue', text: 'Rice husk, mustard stalks, and corn cobs.' },
      { title: 'Wood Waste', text: 'Sawdust, wood chips, and timber processing waste.' },
      { title: 'Energy Crops', text: 'Purpose-grown fast-rotation species for energy production.' }
    ]
  },
  comparison: {
    badge: 'THE ECONOMIC EDGE',
    title: 'Biomass vs. Traditional Fuels'
  },
  costComparison: {
    title: 'Annual Fuel Cost Comparison',
    subtitle: 'Projected for a medium-scale industrial boiler (10 TPH)',
    badgeText: '30% AVG. SAVINGS',
    items: [
      { name: 'COAL', cost: '$2.4M / Year', percentage: 85, colorClass: 'bg-on-surface-variant' },
      { name: 'LPG / OIL', cost: '$3.1M / Year', percentage: 100, colorClass: 'bg-error' },
      { name: 'GREEN PELLETS (BIOMASS)', cost: '$1.8M / Year', percentage: 60, colorClass: 'bg-primary' }
    ]
  },
  carbonNeutral: {
    title: 'Carbon Neutral Cycle',
    description: 'Biomass releases only as much CO2 as the plant absorbed during its growth, making it a "Carbon Neutral" energy source.',
    value: '90%',
    label: 'REDUCTION VS COAL'
  },
  fuelQuality: {
    badgeText: 'FUEL QUALITY',
    items: [
      { icon: 'water_drop', title: 'Low Moisture', text: 'Under 10% consistently' },
      { icon: 'local_fire_department', title: 'High Ash Fusion', text: 'Optimized for boiler life' }
    ]
  },
  reliability: {
    title: 'Uninterrupted Supply',
    description: 'Our proprietary logistics network ensures that your industrial operations never face a fuel shortage. We manage the entire supply chain from raw material to your boiler.',
    circleValue: '24/7',
    circleLabel: 'MONITORING',
    bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi4pETNNrbmTg0WnM9-48W6eGRSx4CPoIm3GNsTjUqK5_QigYgJ09HMnb7LuIpblGtiUluGEX2EP0Se-s80zMDhpEAX0zGAAwIp8ogIYmDNLZfOMLrNmpRnnme5SgCDGmEoMpQy8_UqOg3RTLl43O5bL__a0oBURZvI0lXV_iJA-IspDSeXVI2mBdkWyqXnzX1JzbqSDsqeLEsGBQuTSi-ud6BUXDTdGXLNdkTn5rRkUtG8aFJbC6iv6CYBaqbOe9mmvBIMdQuG2Q'
  },
  industries: {
    badge: 'VERSATILITY',
    title: 'Tailored for Major Industries.',
    description: 'Our green pellets are engineered to meet the stringent demands of various high-energy industrial sectors, providing a seamless drop-in replacement for fossil fuels.',
    items: [
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
  },
  cta: {
    title: 'Ready to Transition?',
    subtitle: 'Let our engineers perform a free feasibility study for your facility. Calculate your ROI and carbon footprint reduction in just 48 hours.',
    primaryCtaText: 'Request Feasibility Study',
    primaryCtaLink: '#',
    secondaryCtaText: 'Speak to an Expert',
    secondaryCtaLink: '#',
    isEnabled: true
  }
};

const WhyBiomass = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWhyBiomass = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWhyBiomassPage();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty response');
      }
      setPageData(data);
    } catch (err) {
      console.error('Failed to load Why Biomass page:', err);
      setPageData(DEFAULT_WHY_BIOMASS_DATA);
      if (import.meta.env.DEV) {
        setError('Unable to connect to the server. Showing default content.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWhyBiomass();
  }, [loadWhyBiomass]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant">Loading Why Biomass...</p>
        </div>
      </div>
    );
  }

  const displayData = pageData || DEFAULT_WHY_BIOMASS_DATA;

  return (
    <div className="w-full mt-24">
      {/* Error notification banner */}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-2xl shadow-2xl font-body-md max-w-lg text-center border border-tertiary/30">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <WhyBiomassHero hero={displayData.hero} />
      <BiomassDefinition definition={displayData.definition} />
      <ComparisonSection
        comparison={displayData.comparison}
        costComparison={displayData.costComparison}
        carbonNeutral={displayData.carbonNeutral}
        fuelQuality={displayData.fuelQuality}
        reliability={displayData.reliability}
      />
      <IndustryBenefits industries={displayData.industries} />
      <WhyBiomassCTA cta={displayData.cta} />
    </div>
  );
};

export default WhyBiomass;
