import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import BlogsHero from '../../components/blogs/BlogsHero';
import FeaturedBlog from '../../components/blogs/FeaturedBlog';
import BlogCard from '../../components/blogs/BlogCard';
import BlogCategories from '../../components/blogs/BlogCategories';
import NewsletterSection from '../../components/blogs/NewsletterSection';
import useBlogs from '../../hooks/useBlogs';
import useBlogCategories from '../../hooks/useBlogCategories';
import useBlogSearch from '../../hooks/useBlogSearch';

// ── Skeleton loaders ──────────────────────────────────────────────────────────

const HeroSkeleton = () => (
  <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
    <div className="w-full aspect-[21/9] rounded-[48px] bg-surface-container animate-pulse" />
  </section>
);

const CardSkeleton = () => (
  <div className="group">
    <div className="aspect-square rounded-[32px] bg-surface-container animate-pulse mb-6" />
    <div className="h-3 w-24 bg-surface-container animate-pulse rounded mb-3" />
    <div className="h-6 w-full bg-surface-container animate-pulse rounded mb-2" />
    <div className="h-6 w-3/4 bg-surface-container animate-pulse rounded" />
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { query, debouncedQuery, handleChange, clear } = useBlogSearch(400);

  const { categories } = useBlogCategories();

  const { blogs, total, pages, page, loading, nextPage, prevPage } = useBlogs({
    category: selectedCategory,
    search: debouncedQuery,
    pageSize: 9
  });

  const isFiltered = selectedCategory !== '' || debouncedQuery !== '';

  const handleCategorySelect = useCallback((slug) => {
    setSelectedCategory(slug);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Layout split for the default (unfiltered) view
  const featuredHero = blogs.find(b => b.featured) || blogs[0];
  const remaining = blogs.filter(b => b._id !== featuredHero?._id);
  const bentoBlogs = remaining.slice(0, 3);
  const lowerBlogs = remaining.slice(3);

  return (
    <div className="bg-background min-h-screen pt-24 pb-16">

      {/* Search & Header */}
      <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-technical-data text-technical-data text-primary uppercase tracking-widest block mb-2">
              Newsroom
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
              Insights &amp; Industry Updates
            </h1>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-sm w-full">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 border border-outline-variant/40 rounded-full bg-white/60 focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-sm pr-8"
                value={query}
                onChange={handleChange}
              />
              {query && (
                <button
                  type="button"
                  onClick={clear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-xs uppercase tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
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
        onSelectCategory={handleCategorySelect}
      />

      {/* Loading skeleton */}
      {loading && (
        <>
          {!isFiltered && <HeroSkeleton />}
          <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
              {[0, 1, 2].map(i => <CardSkeleton key={i} />)}
            </div>
          </section>
        </>
      )}

      {/* Empty state */}
      {!loading && blogs.length === 0 && (
        <div className="max-w-container-max-width mx-auto px-grid-margin-desktop py-24 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-4">article</span>
          <p className="font-body-lg text-on-surface-variant">
            {isFiltered ? 'No articles found matching your filters.' : 'No articles published yet.'}
          </p>
          {isFiltered && (
            <button
              onClick={() => { setSelectedCategory(''); clear(); }}
              className="mt-6 px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps text-xs uppercase cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Filtered / search results: plain grid */}
      {!loading && blogs.length > 0 && isFiltered && (
        <section className="max-w-container-max-width mx-auto px-grid-margin-desktop mb-section-gap-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
            {blogs.map((blog, idx) => (
              <BlogCard key={blog._id} blog={blog} index={idx} />
            ))}
          </div>
          {pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <span className="font-body-md text-on-surface-variant text-sm">
                {page} / {pages}
              </span>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Default layout: Hero → Bento → Newsletter → Lower Grid */}
      {!loading && blogs.length > 0 && !isFiltered && (
        <>
          {/* Featured Hero */}
          {featuredHero && <BlogsHero blog={featuredHero} />}

          {/* Asymmetric bento grid */}
          {bentoBlogs.length > 0 && <FeaturedBlog blogs={bentoBlogs} />}

          {/* Newsletter callout */}
          <NewsletterSection />

          {/* More from the Newsroom */}
          {lowerBlogs.length > 0 && (
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
                {pages > 1 && (
                  <div className="hidden sm:flex items-center gap-4">
                    <button
                      onClick={prevPage}
                      disabled={page === 1}
                      className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={page === pages}
                      className="w-12 h-12 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
                {lowerBlogs.map((blog, idx) => (
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
