import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBlog from '../../hooks/useBlog';
import useRelatedBlogs from '../../hooks/useRelatedBlogs';
import BlogCard from '../../components/blogs/BlogCard';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const ArticleSkeleton = () => (
  <div className="max-w-4xl mx-auto px-6 animate-pulse">
    <div className="h-4 w-32 bg-surface-container rounded mb-10" />
    <div className="h-6 w-24 bg-surface-container rounded mb-6" />
    <div className="h-12 w-full bg-surface-container rounded mb-4" />
    <div className="h-12 w-3/4 bg-surface-container rounded mb-10" />
    <div className="w-full aspect-[21/9] rounded-[32px] bg-surface-container mb-12" />
    <div className="space-y-4">
      {[1,2,3,4].map(i => <div key={i} className="h-5 bg-surface-container rounded" />)}
    </div>
  </div>
);

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { blog, loading, error } = useBlog(slug);
  const { blogs: relatedBlogs } = useRelatedBlogs(slug, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen pt-28 pb-24">
        <ArticleSkeleton />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 gap-4">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">article</span>
        <p className="font-body-lg text-on-surface-variant">{error || 'Article not found'}</p>
        <Link
          to="/blogs"
          className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps text-xs uppercase"
        >
          Back to Newsroom
        </Link>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <article className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-caps text-xs uppercase tracking-widest cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Newsroom
          </button>
        </div>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full font-technical-data text-xs uppercase tracking-widest">
            {blog.category?.name || 'NEWS'}
          </span>
          <span className="text-on-surface-variant/60 font-body-md text-sm">
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
          <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
          <span className="text-on-surface-variant/60 font-body-md text-sm uppercase">
            {blog.readTime || '5 MIN READ'}
          </span>
          {blog.views > 0 && (
            <>
              <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
              <span className="text-on-surface-variant/60 font-body-md text-sm">
                {blog.views.toLocaleString()} views
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight mb-8"
        >
          {blog.title}
        </motion.h1>

        {/* Author & Share row */}
        <div className="flex items-center justify-between border-y border-outline-variant/30 py-6 mb-10">
          <div className="flex items-center gap-4">
            {blog.author?.image ? (
              <img
                src={blog.author.image}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {blog.author?.name?.charAt(0) || 'G'}
              </div>
            )}
            <div>
              <p className="font-bold text-primary font-body-md">{blog.author?.name || 'Green Pellets India'}</p>
              <p className="text-xs text-on-surface-variant/70 font-body-md">{blog.author?.designation || 'Editorial Team'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy link"
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">{copied ? 'done' : 'link'}</span>
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Twitter/X"
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-lg">alternate_email</span>
            </a>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-[21/9] rounded-[32px] overflow-hidden mb-12 shadow-md"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-outline-variant/40 font-technical-data text-xs text-on-surface-variant/70 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-16 blog-html-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author Bio */}
        <div className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/20 flex flex-col md:flex-row items-center md:items-start gap-6 mb-16">
          {blog.author?.image ? (
            <img
              src={blog.author.image}
              alt={blog.author.name}
              className="w-20 h-20 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
              {blog.author?.name?.charAt(0) || 'G'}
            </div>
          )}
          <div className="text-center md:text-left space-y-2">
            <span className="font-label-caps text-xs text-primary tracking-widest uppercase">About the Author</span>
            <h3 className="font-bold text-primary text-lg">{blog.author?.name}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {blog.author?.bio ||
                `${blog.author?.name} is a ${blog.author?.designation || 'contributor'} at Green Pellets India.`}
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-surface-container-low border-t border-outline-variant/20 py-20 mt-8">
          <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
            <div className="mb-12">
              <span className="font-technical-data text-technical-data text-primary uppercase tracking-widest block mb-2">
                Related Content
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg">
                Continue Reading
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
              {relatedBlogs.map((r, idx) => (
                <BlogCard key={r._id} blog={r} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
