import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const BlogCard = ({ blog, index = 0 }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  return (
    <motion.article
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="aspect-square rounded-[32px] overflow-hidden mb-6 relative bg-surface-container">
        {blog.featuredImage ? (
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            src={blog.featuredImage}
            alt={blog.title}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary/30">article</span>
          </div>
        )}
      </div>
      <span className="font-technical-data text-technical-data text-on-surface-variant/60 mb-2 block uppercase">
        {formatDate(blog.publishedAt || blog.createdAt)}
      </span>
      <h4 className="font-headline-lg-mobile text-headline-lg-mobile group-hover:text-primary transition-colors line-clamp-2">
        {blog.title}
      </h4>
    </motion.article>
  );
};

export default BlogCard;
