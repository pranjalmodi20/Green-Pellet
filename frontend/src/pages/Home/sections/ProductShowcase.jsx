import React from 'react';
import { motion } from 'framer-motion';

const ProductShowcase = ({ products = [] }) => {
  const defaultProducts = [
    {
      _id: 'pine-pellets',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD41fVSdNEuCUamuGfDfPqku0qNGCdkP3864alvXCpK5I5H5LYF8MPNsNu51PdrVhEo8W6_GR3ocSkoNF8UdNRx_IsS6aLDBuY56qdfS4V1Mz_Wvw_UrxFH3lsB2QJJ3Fp4OMTQ2a95f1gSjZsm4JLpPGd3BNPXq6rsN7rDhEFL0zhekU-_6AlVCZk1MiqOLYopLL1ACOUW_jFFWP-WxuiHr-3sqS47axIIfX1N8r29Tq9B1E_J3lPOn62tBCfz-byiz-DIpyWy6Q8',
      title: 'Premium Pine Pellets',
      description: 'Ultra-low ash content (< 0.5%) designed for residential heating and sensitive industrial boilers.',
      spec: '4800 kcal/kg Avg.'
    },
    {
      _id: 'industrial-grade-a',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuPhXLOx-gkxbOPlGuprKyPeumyYTuGuYdJG1jIIXDLrrczqolLv96oIo4agGvya8gz6f9pgTtCLzSLoH--xEsuXx5VmQ99yQgiKDosI1zaN9e9zMmRWI1kq2N9yfx1vlUK9YX0BCLrTEy0VZXoz9g5BFfe0YZyxwM4-DD8chZrFqlQeOblX0r6KbZzwmdugcfL2_hTUKsQ7Ym5vwSMtH4LlqkY5lJi_5GsLhUB9Xz4NDPgU-sRbNG_1IpGpxKucUC0a5u-cU0M0Hg',
      title: 'Industrial Grade-A',
      description: 'High-performance blend optimized for cement kilns and large-scale power plants.',
      spec: '4200 kcal/kg Avg.'
    },
    {
      _id: 'rice-husk-briquettes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhzHEZ4aCZA00pUNrnGzuWyyyvR2IwHWkVyfwt265xDifzxAKzoX0qsE1Ceafm5gG6zbnfidGFrQuklHCYTAvG7-mlWxCWAMiTCaWuerxTNH3n86MLeuVGnw59rX22mjrkFbch6hoPQsoeHt7H4zejampQ4SI-t6NJgG7KNsa8QCIrKHA2h6NABwj8BPkv30nl8bAGs3JBXZtiIZE7vIB3eY_2OJsL6eQKvX8NucqkVWeCvlYyx8AXnIStX2zfy2kT5If6ituFVRg',
      title: 'Rice Husk Briquettes',
      description: 'Sustainable solution for brick kilns and rural energy generation at scale.',
      spec: '3800 kcal/kg Avg.'
    }
  ];

  const displayProducts = products && products.length > 0 ? products : defaultProducts;

  return (
    <section className="py-section-gap-desktop bg-primary text-on-primary">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24">
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-tertiary-fixed-dim uppercase tracking-widest mb-4 block">Our Products</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">Engineering Higher Caloric Performance</h2>
          </div>
          <button className="border border-on-primary/30 px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-on-primary hover:text-primary transition-all mb-8 lg:mb-0">Technical Datasheets</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayProducts.map((product) => (
            <div key={product._id} className="group cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-[48px] overflow-hidden aspect-[4/5] relative mb-8"
              >
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000" 
                  src={product.image} 
                  alt={product.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              </motion.div>
              <h3 className="font-headline-lg text-2xl mb-4">{product.title}</h3>
              <p className="font-body-md text-on-primary/70 mb-6">{product.description}</p>
              <span className="font-technical-data text-technical-data text-tertiary-fixed uppercase">{product.spec}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
