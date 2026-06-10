import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedBlog = ({ blogs = [] }) => {
  const navigate = useNavigate();

  if (blogs.length === 0) return null;

  const firstPost = blogs[0];
  const secondPost = blogs[1];
  const thirdPost = blogs[2];

  return (
    <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
      <div className="grid grid-cols-12 gap-grid-gutter">
        {/* Editorial Card 1 */}
        {firstPost && (
          <motion.div 
            onClick={() => navigate(`/blogs/${firstPost.slug}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-span-8 group cursor-pointer"
          >
            <div className="rounded-[48px] overflow-hidden aspect-[16/9] mb-8 bg-surface-container relative">
              {firstPost.featuredImage && (
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={firstPost.featuredImage} 
                  alt={firstPost.title} 
                />
              )}
            </div>
            <div className="max-w-2xl">
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant tracking-widest mb-4 block uppercase">
                {firstPost.category?.name || 'UPDATE'}
              </span>
              <h2 className="font-headline-lg text-headline-lg mb-4 group-hover:text-primary transition-colors leading-tight">
                {firstPost.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {firstPost.excerpt}
              </p>
            </div>
          </motion.div>
        )}

        {/* Secondary Side Stack */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-between gap-12">
          {secondPost && (
            <motion.article 
              onClick={() => navigate(`/blogs/${secondPost.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-[32px] overflow-hidden aspect-video mb-6 bg-surface-container relative">
                {secondPost.featuredImage && (
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={secondPost.featuredImage} 
                    alt={secondPost.title} 
                  />
                )}
              </div>
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant mb-2 block uppercase">
                {secondPost.category?.name || 'UPDATE'}
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {secondPost.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                {secondPost.excerpt}
              </p>
            </motion.article>
          )}

          {thirdPost && (
            <motion.article 
              onClick={() => navigate(`/blogs/${thirdPost.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group cursor-pointer border-t border-surface-variant pt-8"
            >
              <span className="font-technical-data text-technical-data text-tertiary-fixed-variant mb-2 block uppercase">
                {thirdPost.category?.name || 'UPDATE'}
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {thirdPost.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                {thirdPost.excerpt}
              </p>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
