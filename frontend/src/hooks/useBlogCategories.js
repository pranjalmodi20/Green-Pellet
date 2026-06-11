import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/blogService';

/**
 * Fetches all blog categories.
 */
const useBlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCategories()
      .then((data) => { if (!cancelled) setCategories(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setError('Failed to load categories.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
};

export default useBlogCategories;
