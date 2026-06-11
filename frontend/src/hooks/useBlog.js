import { useState, useEffect } from 'react';
import { fetchBlogBySlug } from '../services/blogService';

/**
 * Fetches a single blog post by its slug.
 * Automatically sets document title and meta description for SEO.
 */
const useBlog = (slug) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setBlog(null);

    console.log(`[useBlog] Fetching blog post with slug:`, slug);
    fetchBlogBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        console.log(`[useBlog] Successfully fetched blog post:`, data);
        setBlog(data);

        // SEO: update document title and meta description
        const seoTitle = data.seo?.metaTitle || data.seoTitle || data.title;
        const seoDesc = data.seo?.metaDescription || data.seoDescription || data.excerpt;

        document.title = `${seoTitle} | Green Pellets India`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', seoDesc);

        // OG tags
        const ogTags = {
          'og:title': data.seo?.ogTitle || seoTitle,
          'og:description': data.seo?.ogDescription || seoDesc,
          'og:image': data.seo?.ogImage || data.featuredImage || '',
          'og:type': 'article'
        };
        Object.entries(ogTags).forEach(([property, content]) => {
          let tag = document.querySelector(`meta[property="${property}"]`);
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        });
      })
      .catch((err) => {
        console.error(`[useBlog] Error fetching blog post with slug ${slug}:`, err);
        if (!cancelled) setError('Article not found.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { blog, loading, error };
};

export default useBlog;
