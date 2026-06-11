import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchBlogs } from '../services/blogService';

/**
 * Fetches a paginated, filterable list of blog posts.
 *
 * @param {Object} options
 * @param {string}  options.category  - category slug filter
 * @param {string}  options.search    - search query
 * @param {string}  options.tag       - tag filter
 * @param {number}  options.pageSize  - posts per page (default 9)
 */
const useBlogs = ({ category = '', search = '', tag = '', pageSize = 9 } = {}) => {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track whether a request is still relevant when deps change mid-flight
  const abortRef = useRef(null);

  const load = useCallback(async (currentPage) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, pageSize };
      if (category) params.category = category;
      if (search) params.search = search;
      if (tag) params.tag = tag;

      console.log(`[useBlogs] Fetching blogs with params:`, params);
      const data = await fetchBlogs(params);
      if (controller.signal.aborted) return;

      console.log(`[useBlogs] Successfully fetched blogs data:`, data);

      // Backend returns { blogs, total, page, pages } for paginated requests
      if (data && data.blogs) {
        setBlogs(data.blogs);
        setTotal(data.total);
        setPages(data.pages);
        setPage(data.page);
      } else {
        // Backwards compat: plain array
        setBlogs(Array.isArray(data) ? data : []);
        setTotal(Array.isArray(data) ? data.length : 0);
        setPages(1);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        console.error(`[useBlogs] Error fetching blogs:`, err);
        setError('Failed to load articles.');
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [category, search, tag, pageSize]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
    load(1);
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [load]);

  const goToPage = useCallback((p) => {
    setPage(p);
    load(p);
  }, [load]);

  const nextPage = useCallback(() => {
    if (page < pages) goToPage(page + 1);
  }, [page, pages, goToPage]);

  const prevPage = useCallback(() => {
    if (page > 1) goToPage(page - 1);
  }, [page, goToPage]);

  return { blogs, total, pages, page, loading, error, nextPage, prevPage, goToPage };
};

export default useBlogs;
