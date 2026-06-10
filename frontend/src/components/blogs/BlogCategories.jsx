import React from 'react';
import { motion } from 'framer-motion';

const BlogCategories = ({ categories = [], selectedCategory = '', onSelectCategory }) => {
  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-12">
      <div className="flex items-center gap-8 border-b border-surface-variant/30 pb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectCategory('')}
          className={`font-label-caps text-label-caps pb-6 -mb-[26px] whitespace-nowrap cursor-pointer transition-all border-b-2 ${
            selectedCategory === ''
              ? 'text-primary border-primary font-bold'
              : 'text-on-surface-variant border-transparent hover:text-primary'
          }`}
        >
          ALL UPDATES
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`font-label-caps text-label-caps pb-6 -mb-[26px] whitespace-nowrap cursor-pointer transition-all border-b-2 uppercase ${
              selectedCategory === cat.slug
                ? 'text-primary border-primary font-bold'
                : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BlogCategories;
