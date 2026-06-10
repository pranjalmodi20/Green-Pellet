import React, { useEffect, useState, useCallback } from 'react';
import ProductsHero from '../../components/products/ProductsHero';
import ProductGrid from '../../components/products/ProductGrid';
import ProductComparison from '../../components/products/ProductComparison';
import ProductCTA from '../../components/products/ProductCTA';
import { fetchProductsConfig, fetchProducts } from '../../services/productService';

const DEFAULT_PRODUCTS_CONFIG = {
  hero: {
    badge: 'PREMIUM ENERGY SOLUTIONS',
    title: 'Engineered for High-Performance',
    subtitle: 'Our diverse portfolio of biomass fuel pellets represents the pinnacle of sustainable energy technology, delivering unrivaled calorific efficiency and industrial precision.',
    bgImage: 'https://lh3.googleusercontent.com/aida/AP1WRLudrAfW8c3o8y_of9ckFB-8-feUvfZxDmw3AdOnspBFsoyE2MctWdV54ENawwi_vjbEQ76KkPbYVxJV26YnoNT-76d-iuYTr5vstsoYYagsoZuJd7DBlXNNWWozddO2l0jW4dBfRlvGzpzu17sAFFZRXVVTvKAE6v4lh48NPrt2932TC4bYogqmzrXjutxfNEG_pOgPp_hn0s2-Sbp_fqlZ6d-4-8a7FTEvmmSniRK7KqPX4QaUCAuRJNo',
    button1Text: 'Request Catalog',
    button1Link: '#',
    button2Text: 'Technical Support',
    button2Link: '#',
    glassTitle: 'SUSTAINABILITY CERTIFIED',
    glassText: 'Carbon-neutral energy production through circular economy principles and advanced biomass engineering.'
  },
  cta: {
    title: 'Ready to Transition?',
    subtitle: 'Consult with our thermal engineering experts to find the optimal biomass solution for your specific industrial requirements.',
    button1Text: 'Get a Quote',
    button1Link: '#',
    button2Text: 'Schedule a Call',
    button2Link: '#'
  }
};

const DEFAULT_PRODUCTS = [
  {
    title: 'Sawdust & Groundnut Shell Pellets',
    slug: 'sawdust-groundnut-pellets',
    shortDescription: 'Low ash content minimizes boiler maintenance while high density ensures logistical efficiency and stable combustion.',
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
    status: 'active'
  },
  {
    title: 'Mustard Fuel Pellets',
    slug: 'mustard-fuel-pellets',
    shortDescription: 'Specifically engineered for high-temperature stability, our mustard residue pellets offer a sustainable alternative.',
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
    status: 'active'
  },
  {
    title: 'Biomass Fuel Briquettes',
    slug: 'biomass-fuel-briquettes',
    shortDescription: 'High-density compression for long-duration combustion in heavy industrial applications.',
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
    status: 'active'
  },
  {
    title: 'Paddy Husk Fuel Pellets',
    slug: 'paddy-husk-pellets',
    shortDescription: 'Innovative utilization of rice processing residue into a uniform, high-density fuel source.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnuh5Uz8Fz5OPbI5DFz7c7oqu0bKEXaNTZ3MYuwputhkxqgTiQTFtK6ucVjLOCYi-dEiaT-S2LyXZGfKaa3oZmo1JY2Y8z_tHvq41_ggBSiJyWEJNHIx5dgVDQiqyVMEZL-qlQP5wEGyKFFWJnslayVa00BzFhZq-xS0sgJz3uxrjIsa8pNZWK-YzSTiS8EBui6_y68NvsgUchNiVgksnxAXJ9JgHZ35z9MXBFEKMloLR9m_rOa8',
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
    status: 'active'
  },
  {
    title: 'Biomass Fuel Pellets (Mixed)',
    slug: 'mixed-biomass-pellets',
    shortDescription: 'A cost-effective, versatile blend of agricultural residues optimized for consistent boiler feed.',
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
    status: 'active'
  }
];

const Products = () => {
  const [config, setConfig] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPageData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [configData, productsData] = await Promise.all([
        fetchProductsConfig(),
        fetchProducts()
      ]);
      setConfig(configData);
      setProducts(productsData.length > 0 ? productsData : DEFAULT_PRODUCTS);
    } catch (err) {
      console.error('Failed to load Our Products data:', err);
      setConfig(DEFAULT_PRODUCTS_CONFIG);
      setProducts(DEFAULT_PRODUCTS);
      if (import.meta.env.DEV) {
        setError('Unable to connect to the server. Showing default content.');
      }
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
          <p className="font-body-md text-on-surface-variant">Loading Our Products...</p>
        </div>
      </div>
    );
  }

  const displayConfig = config || DEFAULT_PRODUCTS_CONFIG;
  const displayProducts = products.length > 0 ? products : DEFAULT_PRODUCTS;

  return (
    <div className="w-full mt-24">
      {/* Error notification banner */}
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-2xl shadow-2xl font-body-md max-w-lg text-center border border-tertiary/30">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <ProductsHero config={displayConfig} />
      <ProductGrid products={displayProducts} />
      <ProductComparison products={displayProducts} />
      <ProductCTA config={displayConfig} />
    </div>
  );
};

export default Products;