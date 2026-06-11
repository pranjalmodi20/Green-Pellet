import { useState, useEffect } from 'react';
import { fetchRelatedBlogs } from '../services/blogService';

/**
 * Fetches related blog posts for a given slug.
 * @param {string} slug  - current blog slug
 * @param {number} limit - max related posts to return (default 3)
 */
const useRelatedBlogs = (slug, limit = 3) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchRelatedBlogs(slug, limit)
      .then((data) => { if (!cancelled) setBlogs(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setError('Failed to load related articles.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug, limit]);

  return { blogs, loading, error };
};

export default useRelatedBlogs;
