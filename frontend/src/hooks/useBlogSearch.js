import { useState, useCallback } from 'react';
import useDebounce from './useDebounce';

/**
 * Manages search query state with debouncing for blog filtering.
 * Returns the raw input value for the controlled input and the
 * debounced value to pass to the API call.
 *
 * @param {number} delay - debounce delay in ms (default 400)
 */
const useBlogSearch = (delay = 400) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, delay);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const clear = useCallback(() => setQuery(''), []);

  return { query, debouncedQuery, handleChange, clear };
};

export default useBlogSearch;
