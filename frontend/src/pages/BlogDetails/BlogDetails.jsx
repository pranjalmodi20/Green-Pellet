import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBlogBySlug, fetchBlogs } from '../../services/blogService';
import BlogCard from '../../components/blogs/BlogCard';
import { motion } from 'framer-motion';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadBlogDetails();
  }, [slug]);

  const loadBlogDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchBlogBySlug(slug);
      setBlog(data);

      // Set SEO Meta tags dynamically
      document.title = `${data.seoTitle || data.title} | Green Pellets India`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.seoDescription || data.excerpt);
      }

      // Fetch related blogs from same category
      if (data.category?._id) {
        const related = await fetchBlogs({ category: data.category.slug, limit: 4 });
        // Exclude current blog
        setRelatedBlogs(related.filter(b => b._id !== data._id).slice(0, 3));
      }
    } catch (err) {
      setError('Article not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-body-md text-on-surface-variant">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <p className="font-body-lg text-error mb-4">{error || 'Article not found'}</p>
        <Link to="/blogs" className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps text-xs uppercase">
          Back to Newsroom
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      {/* Article Header & Main Banner */}
      <article className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-caps text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Newsroom
          </Link>
        </div>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full font-technical-data text-xs uppercase tracking-widest">
            {blog.category?.name || 'NEWS'}
          </span>
          <span className="text-on-surface-variant/60 font-body-md text-sm">
            {formatDate(blog.publishedAt || blog.createdAt)}
          </span>
          <span className="w-1.5 h-1.5 bg-outline-variant rounded-full"></span>
          <span className="text-on-surface-variant/60 font-body-md text-sm">
            {blog.readTime || '5 MIN READ'}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight mb-8">
          {blog.title}
        </h1>

        {/* Author Metadata Top */}
        <div className="flex items-center justify-between border-y border-outline-variant/30 py-6 mb-10">
          <div className="flex items-center gap-4">
            {blog.author?.image ? (
              <img src={blog.author.image} alt={blog.author.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {blog.author?.name?.charAt(0) || 'G'}
              </div>
            )}
            <div>
              <p className="font-bold text-primary font-body-md">{blog.author?.name || 'Green Pellets India'}</p>
              <p className="text-xs text-on-surface-variant/70 font-body-md">{blog.author?.designation || 'Specialist Editor'}</p>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyLink}
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer"
              title="Copy Link"
            >
              <span className="material-symbols-outlined text-lg">{copied ? 'done' : 'link'}</span>
            </button>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all"
              title="Share on LinkedIn"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden mb-12 shadow-md">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Rich HTML Content Body */}
        <div 
          className="prose prose-lg max-w-none font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-16 blog-html-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author Bio Section Bottom */}
        <div className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/20 flex flex-col md:flex-row items-center md:items-start gap-6 mb-20">
          {blog.author?.image ? (
            <img src={blog.author.image} alt={blog.author.name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
              {blog.author?.name?.charAt(0) || 'G'}
            </div>
          )}
          <div className="text-center md:text-left space-y-2">
            <span className="font-label-caps text-xs text-primary tracking-widest uppercase">ABOUT THE AUTHOR</span>
            <h3 className="font-bold text-primary text-lg">{blog.author?.name}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {blog.author?.bio || `${blog.author?.name} is a designated ${blog.author?.designation} contributing insights to Green Pellets India.`}
            </p>
          </div>
        </div>
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-surface-container-low border-t border-outline-variant/20 py-20 mt-16">
          <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
            <div className="mb-12">
              <span className="font-technical-data text-technical-data text-primary uppercase tracking-widest block mb-2">
                RELATED CONTENT
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg">
                Continue Reading
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
              {relatedBlogs.map((rBlog, idx) => (
                <BlogCard key={rBlog._id} blog={rBlog} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
