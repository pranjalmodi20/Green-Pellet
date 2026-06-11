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
    console.log('[useBlogCategories] Fetching categories');
    fetchCategories()
      .then((data) => {
        console.log('[useBlogCategories] Successfully fetched categories:', data);
        if (!cancelled) setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('[useBlogCategories] Error fetching categories:', err);
        if (!cancelled) setError('Failed to load categories.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
};

export default useBlogCategories;
