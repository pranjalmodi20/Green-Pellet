import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchAllBlogsAdmin,
  fetchCategories,
  createBlog,
  updateBlog,
  deleteBlog,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadFile
} from '../../../services/blogService';
import { adminLogin } from '../../../services/aboutService';

const TOKEN_KEY = 'adminToken';

const Field = ({ label, children }) => (
  <label className="block space-y-2">
    <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">{label}</span>
    {children}
  </label>
);

const ic = 'w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30';

const BLANK_BLOG = {
  title: '', slug: '', excerpt: '', content: '',
  featuredImage: '', gallery: [],
  category: '',
  tags: [],
  author: { name: '', designation: '', image: '', bio: '' },
  seo: { metaTitle: '', metaDescription: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '' },
  readTime: '5 min read',
  featured: false, published: true,
  status: 'active', displayOrder: 0,
  scheduledAt: ''
};

const BlogEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    loadAll();
  }, [token]);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [b, c] = await Promise.all([fetchAllBlogsAdmin(token), fetchCategories()]);
      setBlogs(b);
      setCategories(c);
    } catch {
      setError('Failed to load CMS data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const { token: t } = await adminLogin(loginForm.email, loginForm.password);
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setBlogs([]);
    setCategories([]);
  };

  // ── Blog CRUD ────────────────────────────────────────────────────────────────
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const payload = {
        ...editingBlog,
        scheduledAt: editingBlog.scheduledAt || null
      };
      if (editingBlog._id) {
        const updated = await updateBlog(editingBlog._id, payload, token);
        setBlogs(prev => prev.map(b => b._id === updated._id ? updated : b));
        setMessage('Article saved.');
      } else {
        const created = await createBlog(payload, token);
        setBlogs(prev => [created, ...prev]);
        setMessage('Article created.');
      }
      setEditingBlog(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      await deleteBlog(id, token);
      setBlogs(prev => prev.filter(b => b._id !== id));
      setMessage('Article deleted.');
    } catch {
      setError('Delete failed.');
    }
  };

  const initBlog = (base = null) => {
    setEditingBlog(base ? { ...BLANK_BLOG, ...base, seo: { ...BLANK_BLOG.seo, ...(base.seo || {}) }, author: { ...BLANK_BLOG.author, ...(base.author || {}) } } : { ...BLANK_BLOG, category: categories[0]?._id || '', displayOrder: blogs.length + 1 });
  };

  // ── Category CRUD ────────────────────────────────────────────────────────────
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(''); setError('');
    try {
      if (editingCategory._id) {
        const u = await updateCategory(editingCategory._id, editingCategory, token);
        setCategories(prev => prev.map(c => c._id === u._id ? u : c));
        setMessage('Category saved.');
      } else {
        const c = await createCategory(editingCategory, token);
        setCategories(prev => [...prev, c]);
        setMessage('Category created.');
      }
      setEditingCategory(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCat = async (id) => {
    if (!window.confirm('Delete this category? Articles linked to it may be affected.')) return;
    try {
      await deleteCategory(id, token);
      setCategories(prev => prev.filter(c => c._id !== id));
      setMessage('Category deleted.');
    } catch {
      setError('Delete failed.');
    }
  };

  // ── File Upload ──────────────────────────────────────────────────────────────
  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setError('');
    try {
      const { url } = await uploadFile(file, token);
      if (field === 'featuredImage') {
        setEditingBlog(p => ({ ...p, featuredImage: url }));
      } else if (field === 'authorImage') {
        setEditingBlog(p => ({ ...p, author: { ...p.author, image: url } }));
      }
      setMessage('File uploaded.');
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const patchBlog = (key, val) => setEditingBlog(p => ({ ...p, [key]: val }));
  const patchAuthor = (key, val) => setEditingBlog(p => ({ ...p, author: { ...p.author, [key]: val } }));
  const patchSeo = (key, val) => setEditingBlog(p => ({ ...p, seo: { ...p.seo, [key]: val } }));

  const filteredBlogs = blogs.filter(b =>
    !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.slug.includes(searchQuery)
  );

  // ── Login Gate ───────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md glass-card p-10 rounded-[48px] space-y-6">
          <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Admin Login</h1>
          <Field label="Email">
            <input type="email" required className={ic} value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
          </Field>
          <Field label="Password">
            <input type="password" required className={ic} value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
          </Field>
          {loginError && <p className="text-error font-body-md text-sm">{loginError}</p>}
          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase cursor-pointer">Sign In</button>
          <Link to="/blogs" className="block text-center font-body-md text-on-surface-variant hover:text-primary text-sm">← Back to Newsroom</Link>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant">Loading Newsroom CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Newsroom CMS</h1>
            <p className="font-body-md text-on-surface-variant mt-1 text-sm">Manage articles, categories, and editorial settings.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/blogs" className="px-5 py-2.5 rounded-full border border-outline-variant font-label-caps text-xs uppercase cursor-pointer hover:bg-surface-container transition-colors">View Page</Link>
            <button onClick={handleLogout} className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-label-caps text-xs uppercase cursor-pointer">Logout</button>
          </div>
        </div>

        {/* Alerts */}
        {message && <div className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md text-sm">{message}</div>}
        {error && <div className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md text-sm">{error}</div>}
        {uploading && <div className="p-4 rounded-2xl bg-tertiary-container text-on-tertiary-container font-body-md text-sm">Uploading file...</div>}

        {/* Tab bar */}
        {!editingBlog && !editingCategory && (
          <div className="flex border-b border-outline-variant/40 gap-2">
            {['blogs', 'categories'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-label-caps text-xs uppercase transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}>
                {tab === 'blogs' ? `Articles (${blogs.length})` : `Categories (${categories.length})`}
              </button>
            ))}
          </div>
        )}

        {/* ── Blog Form ── */}
        {editingBlog && (
          <form onSubmit={handleBlogSubmit} className="bg-white rounded-[32px] border border-outline-variant/20 p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingBlog._id ? 'Edit Article' : 'New Article'}
              </h2>
              <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Title *">
                <input required className={ic} value={editingBlog.title} onChange={e => patchBlog('title', e.target.value)} />
              </Field>
              <Field label="Slug * (url-safe-key)">
                <input required className={ic} value={editingBlog.slug} onChange={e => patchBlog('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
              </Field>
            </div>

            <Field label="Excerpt / Summary *">
              <textarea rows={2} required className={ic} value={editingBlog.excerpt} onChange={e => patchBlog('excerpt', e.target.value)} />
            </Field>

            <Field label="Content * (HTML supported)">
              <textarea rows={10} required className={`${ic} font-mono text-sm`} value={editingBlog.content} onChange={e => patchBlog('content', e.target.value)} />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Category *">
                <select required className={ic} value={editingBlog.category} onChange={e => patchBlog('category', e.target.value)}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Tags (comma separated)">
                <input className={ic} value={(editingBlog.tags || []).join(', ')} onChange={e => patchBlog('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
              </Field>
            </div>

            {/* Featured Image */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-xs uppercase">Featured Image</h3>
              <Field label="Image URL">
                <input className={ic} value={editingBlog.featuredImage || ''} onChange={e => patchBlog('featuredImage', e.target.value)} />
              </Field>
              <label className="block space-y-2">
                <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Or Upload File</span>
                <input type="file" accept="image/*" className="block text-sm text-on-surface-variant" onChange={e => handleUpload(e, 'featuredImage')} />
              </label>
              {editingBlog.featuredImage && (
                <img src={editingBlog.featuredImage} alt="preview" className="h-24 object-cover rounded-xl" />
              )}
            </div>

            {/* Author */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-xs uppercase">Author</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name *"><input required className={ic} value={editingBlog.author?.name || ''} onChange={e => patchAuthor('name', e.target.value)} /></Field>
                <Field label="Designation *"><input required className={ic} value={editingBlog.author?.designation || ''} onChange={e => patchAuthor('designation', e.target.value)} /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Avatar URL"><input className={ic} value={editingBlog.author?.image || ''} onChange={e => patchAuthor('image', e.target.value)} /></Field>
                <label className="block space-y-2">
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Upload Avatar</span>
                  <input type="file" accept="image/*" className="block text-sm text-on-surface-variant" onChange={e => handleUpload(e, 'authorImage')} />
                </label>
              </div>
              <Field label="Bio">
                <textarea rows={2} className={ic} value={editingBlog.author?.bio || ''} onChange={e => patchAuthor('bio', e.target.value)} />
              </Field>
            </div>

            {/* SEO */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-xs uppercase">SEO &amp; Social</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Meta Title"><input className={ic} value={editingBlog.seo?.metaTitle || ''} onChange={e => patchSeo('metaTitle', e.target.value)} /></Field>
                <Field label="Canonical URL"><input className={ic} value={editingBlog.seo?.canonicalUrl || ''} onChange={e => patchSeo('canonicalUrl', e.target.value)} /></Field>
              </div>
              <Field label="Meta Description">
                <textarea rows={2} className={ic} value={editingBlog.seo?.metaDescription || ''} onChange={e => patchSeo('metaDescription', e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="OG Title"><input className={ic} value={editingBlog.seo?.ogTitle || ''} onChange={e => patchSeo('ogTitle', e.target.value)} /></Field>
                <Field label="OG Image URL"><input className={ic} value={editingBlog.seo?.ogImage || ''} onChange={e => patchSeo('ogImage', e.target.value)} /></Field>
              </div>
              <Field label="OG Description">
                <textarea rows={2} className={ic} value={editingBlog.seo?.ogDescription || ''} onChange={e => patchSeo('ogDescription', e.target.value)} />
              </Field>
            </div>

            {/* Publishing */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-xs uppercase">Publishing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Read Time">
                  <input className={ic} value={editingBlog.readTime || ''} onChange={e => patchBlog('readTime', e.target.value)} placeholder="5 min read" />
                </Field>
                <Field label="Display Order">
                  <input type="number" className={ic} value={editingBlog.displayOrder || 0} onChange={e => patchBlog('displayOrder', parseInt(e.target.value, 10))} />
                </Field>
                <Field label="Status">
                  <select className={ic} value={editingBlog.status} onChange={e => patchBlog('status', e.target.value)}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </Field>
              </div>
              <Field label="Schedule Publish At (optional)">
                <input type="datetime-local" className={ic} value={editingBlog.scheduledAt || ''} onChange={e => patchBlog('scheduledAt', e.target.value)} />
              </Field>
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!editingBlog.featured} onChange={e => patchBlog('featured', e.target.checked)} className="rounded" />
                  <span className="font-body-md text-sm">Featured Article</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={!!editingBlog.published} onChange={e => patchBlog('published', e.target.checked)} className="rounded" />
                  <span className="font-body-md text-sm">Published</span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer disabled:opacity-60">
              {saving ? 'Saving...' : editingBlog._id ? 'Update Article' : 'Publish Article'}
            </button>
          </form>
        )}

        {/* ── Category Form ── */}
        {editingCategory && (
          <form onSubmit={handleCatSubmit} className="bg-white rounded-[32px] border border-outline-variant/20 p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">{editingCategory._id ? 'Edit Category' : 'New Category'}</h2>
              <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps cursor-pointer">Cancel</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name *"><input required className={ic} value={editingCategory.name} onChange={e => setEditingCategory(p => ({ ...p, name: e.target.value }))} /></Field>
              <Field label="Slug * (url-safe)"><input required className={ic} value={editingCategory.slug} onChange={e => setEditingCategory(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} /></Field>
            </div>
            <Field label="Description">
              <textarea rows={3} className={ic} value={editingCategory.description || ''} onChange={e => setEditingCategory(p => ({ ...p, description: e.target.value }))} />
            </Field>
            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        )}

        {/* ── Articles Tab ── */}
        {!editingBlog && !editingCategory && activeTab === 'blogs' && (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Search articles..."
                className="px-4 py-2 border border-outline-variant/40 rounded-full bg-white text-sm font-body-md focus:outline-none focus:ring-1 focus:ring-primary w-64"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button onClick={() => initBlog()} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">
                + New Article
              </button>
            </div>
            {filteredBlogs.length === 0 && (
              <p className="font-body-md text-on-surface-variant text-center py-12">No articles found.</p>
            )}
            <div className="grid gap-3">
              {filteredBlogs.map(blog => (
                <div key={blog._id} className="bg-white rounded-2xl border border-outline-variant/20 p-5 flex flex-wrap justify-between items-center gap-3 shadow-sm">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-primary truncate">{blog.title}</h3>
                      {blog.featured && <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-2 py-0.5 rounded-full">Featured</span>}
                      {!blog.published && <span className="bg-error-container text-on-error-container text-xs px-2 py-0.5 rounded-full">Unpublished</span>}
                      {blog.status === 'draft' && <span className="bg-surface-container-high text-on-surface-variant text-xs px-2 py-0.5 rounded-full">Draft</span>}
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      /{blog.slug} · {blog.category?.name || 'Uncategorised'} · Order: {blog.displayOrder} · Views: {blog.views || 0}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => initBlog(blog)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps cursor-pointer hover:bg-surface-container">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps cursor-pointer hover:opacity-80">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Categories Tab ── */}
        {!editingBlog && !editingCategory && activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => setEditingCategory({ name: '', slug: '', description: '' })} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">
                + New Category
              </button>
            </div>
            <div className="grid gap-3">
              {categories.map(cat => (
                <div key={cat._id} className="bg-white rounded-2xl border border-outline-variant/20 p-5 flex justify-between items-center gap-3 shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary">{cat.name}</h3>
                    <p className="text-xs text-on-surface-variant">/{cat.slug} · {cat.description || 'No description'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingCategory(cat)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps cursor-pointer hover:bg-surface-container">Edit</button>
                    <button onClick={() => handleDeleteCat(cat._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps cursor-pointer hover:opacity-80">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
