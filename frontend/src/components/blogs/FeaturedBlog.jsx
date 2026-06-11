import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedBlog = ({ blogs = [] }) => {
  const navigate = useNavigate();

  if (blogs.length === 0) return null;

  const [first, second, third] = blogs;

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
      <div className="grid grid-cols-12 gap-grid-gutter">
        {/* Large editorial card */}
        {first && (
          <motion.div
            onClick={() => navigate(`/blogs/${first.slug}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-span-8 group cursor-pointer"
          >
            <div className="rounded-[48px] overflow-hidden aspect-[16/9] mb-8 bg-surface-container">
              {first.featuredImage && (
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={first.featuredImage}
                  alt={first.title}
                  loading="lazy"
                />
              )}
            </div>
            <div className="max-w-2xl">
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant tracking-widest mb-4 block uppercase">
                {first.category?.name || 'UPDATE'}
              </span>
              <h2 className="font-headline-lg text-headline-lg mb-4 group-hover:text-primary transition-colors leading-tight">
                {first.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                {first.excerpt}
              </p>
            </div>
          </motion.div>
        )}

        {/* Side stack */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-12">
          {second && (
            <motion.article
              onClick={() => navigate(`/blogs/${second.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-[32px] overflow-hidden aspect-video mb-6 bg-surface-container">
                {second.featuredImage && (
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={second.featuredImage}
                    alt={second.title}
                    loading="lazy"
                  />
                )}
              </div>
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant mb-2 block uppercase">
                {second.category?.name || 'UPDATE'}
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {second.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                {second.excerpt}
              </p>
            </motion.article>
          )}

          {third && (
            <motion.article
              onClick={() => navigate(`/blogs/${third.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer border-t border-surface-variant pt-8"
            >
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant mb-2 block uppercase">
                {third.category?.name || 'UPDATE'}
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {third.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                {third.excerpt}
              </p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
