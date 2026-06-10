import React, { useEffect, useState } from 'react';
import { fetchBlogs, fetchCategories } from '../../services/blogService';
import BlogsHero from '../../components/blogs/BlogsHero';
import BlogCategories from '../../components/blogs/BlogCategories';
import FeaturedBlog from '../../components/blogs/FeaturedBlog';
import BlogCard from '../../components/blogs/BlogCard';
import NewsletterSection from '../../components/blogs/NewsletterSection';
import { motion } from 'framer-motion';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination states for the lower grid
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      const data = await fetchBlogs(params);
      setBlogs(data);
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      const data = await fetchBlogs(params);
      setBlogs(data);
      setCurrentPage(1);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Determine layouts
  const isFilteredOrSearched = selectedCategory !== '' || searchQuery !== '';

  // Filter local results by search query if they want client-side responsiveness
  const displayBlogs = blogs;

  // Split content for the default layout
  const featuredNews = displayBlogs.find(b => b.featured) || displayBlogs[0];
  const remainingBlogs = displayBlogs.filter(b => b._id !== (featuredNews?._id));
  const bentoBlogs = remainingBlogs.slice(0, 3);
  const lowerGridBlogs = remainingBlogs.slice(3);

  // Pagination for lower grid
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentLowerPosts = lowerGridBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(lowerGridBlogs.length / postsPerPage);

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-body-md text-on-surface-variant">Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      {/* Search Bar & Header */}
      <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-technical-data text-technical-data text-primary uppercase tracking-widest block mb-2">
              Newsroom
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
              Insights & Industry Updates
            </h1>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-sm w-full">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-grow px-4 py-2 border border-outline-variant/40 rounded-full bg-white/60 focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-xs uppercase tracking-wider cursor-pointer hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category Filters */}
      <BlogCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setCurrentPage(1);
        }}
      />

      {error && (
        <div className="max-w-container-max-width mx-auto px-grid-margin-desktop py-12 text-center">
          <p className="text-error font-body-md">{error}</p>
        </div>
      )}

      {/* Dynamic Content Layout */}
      {displayBlogs.length === 0 ? (
        <div className="max-w-container-max-width mx-auto px-grid-margin-desktop py-24 text-center">
          <p className="font-body-lg text-on-surface-variant">No articles found matching the filters.</p>
        </div>
      ) : isFilteredOrSearched ? (
        // Plain Grid for filtered/searched results
        <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
            {displayBlogs.map((blog, idx) => (
              <BlogCard key={blog._id} blog={blog} index={idx} />
            ))}
          </div>
        </section>
      ) : (
        // Elegant Stitch layout (Hero + Bento Grid + Newsletter + Lower Grid)
        <>
          {/* Main Hero Featured */}
          {featuredNews && <BlogsHero blog={featuredNews} />}

          {/* Bento Asymmetric Grid */}
          {bentoBlogs.length > 0 && <FeaturedBlog blogs={bentoBlogs} />}

          {/* Bulletin Callout */}
          <NewsletterSection />

          {/* Lower Grid (More Stories) */}
          {lowerGridBlogs.length > 0 && (
            <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="font-technical-data text-technical-data text-primary uppercase tracking-widest mb-2 block">
                    Latest Thinking
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg">
                    More from the Newsroom
                  </h2>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
                {currentLowerPosts.map((blog, idx) => (
                  <BlogCard key={blog._id} blog={blog} index={idx} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Blogs;
