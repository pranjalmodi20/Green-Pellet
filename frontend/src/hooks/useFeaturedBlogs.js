import { useState, useEffect } from 'react';
import { fetchFeaturedBlogs } from '../services/blogService';

/**
 * Fetches featured blog posts.
 * @param {number} limit - how many featured posts to return (default 1)
 */
const useFeaturedBlogs = (limit = 1) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFeaturedBlogs(limit)
      .then((data) => { if (!cancelled) setBlogs(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setError('Failed to load featured articles.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [limit]);

  return { blogs, featured: blogs[0] || null, loading, error };
};

export default useFeaturedBlogs;
