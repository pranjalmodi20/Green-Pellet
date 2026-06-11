import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogsHero = ({ blog }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
      <motion.div
        onClick={() => navigate(`/blogs/${blog.slug}`)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[21/9] rounded-[48px] overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        {blog.featuredImage && (
          <img
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            src={blog.featuredImage}
            alt={blog.title}
            loading="eager"
          />
        )}
        <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 max-w-3xl">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full font-technical-data text-technical-data mb-6 inline-block uppercase">
            Featured News
          </span>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-6 leading-none">
            {blog.title}
          </h1>
          <p className="font-body-lg text-body-lg text-white/80 mb-8 max-w-xl line-clamp-2">
            {blog.excerpt}
          </p>
          <div className="flex items-center gap-4 text-white/60 font-label-caps text-label-caps">
            <span className="uppercase">BY {blog.author?.name || 'Green Pellets India'}</span>
            <span className="w-1.5 h-1.5 bg-tertiary-fixed rounded-full" />
            <span className="uppercase">{blog.readTime || '5 MIN READ'}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogsHero;
