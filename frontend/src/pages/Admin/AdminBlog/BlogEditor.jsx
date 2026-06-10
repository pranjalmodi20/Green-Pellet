import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchBlogs,
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

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30';

const BlogEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Data States
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  // Selection/Edit States
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs', 'categories'
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    loadAllData();
  }, [token]);

  const loadAllData = async () => {
    setLoading(true);
    setError('');
    try {
      const [blogsData, categoriesData] = await Promise.all([
        fetchAllBlogsAdmin(token),
        fetchCategories()
      ]);
      setBlogs(blogsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load newsroom CMS data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const { token: newToken } = await adminLogin(loginForm.email, loginForm.password);
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
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

  // ── Blog CRUD operations ──
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      if (editingBlog._id) {
        const updated = await updateBlog(editingBlog._id, editingBlog, token);
        setBlogs(blogs.map(b => b._id === updated._id ? updated : b));
        setMessage('Article updated successfully.');
      } else {
        const created = await createBlog(editingBlog, token);
        setBlogs([...blogs, created]);
        setMessage('Article created successfully.');
      }
      setEditingBlog(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlog(id, token);
      setBlogs(blogs.filter(b => b._id !== id));
      setMessage('Article deleted.');
    } catch (err) {
      setError('Failed to delete article.');
    }
  };

  const initNewBlog = () => {
    setEditingBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      category: categories[0]?._id || '',
      tags: [],
      author: { name: '', designation: '', image: '', bio: '' },
      seoTitle: '',
      seoDescription: '',
      readTime: '5 min read',
      featured: false,
      published: true,
      displayOrder: blogs.length + 1,
      status: 'active'
    });
  };

  // ── Category CRUD operations ──
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      if (editingCategory._id) {
        const updated = await updateCategory(editingCategory._id, editingCategory, token);
        setCategories(categories.map(c => c._id === updated._id ? updated : c));
        setMessage('Category updated successfully.');
      } else {
        const created = await createCategory(editingCategory, token);
        setCategories([...categories, created]);
        setMessage('Category created successfully.');
      }
      setEditingCategory(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? This might affect articles linked to it.')) return;
    try {
      await deleteCategory(id, token);
      setCategories(categories.filter(c => c._id !== id));
      setMessage('Category deleted.');
    } catch (err) {
      setError('Failed to delete category.');
    }
  };

  const initNewCategory = () => {
    setEditingCategory({
      name: '',
      slug: '',
      description: ''
    });
  };

  // File Upload Helper
  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadFile(file, token);
      if (targetField === 'blog.featuredImage') {
        setEditingBlog(prev => ({ ...prev, featuredImage: url }));
      } else if (targetField === 'blog.authorImage') {
        setEditingBlog(prev => ({
          ...prev,
          author: { ...prev.author, image: url }
        }));
      }
      setMessage('File uploaded successfully.');
    } catch (err) {
      setError('File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // Login Screen Check
  if (!token) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md glass-card p-10 rounded-[48px] space-y-6">
          <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Admin Login</h1>
          <Field label="Email">
            <input type="email" required className={inputClass} value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
          </Field>
          <Field label="Password">
            <input type="password" required className={inputClass} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
          </Field>
          {loginError && <p className="text-error font-body-md text-sm">{loginError}</p>}
          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase cursor-pointer">Sign In</button>
          <Link to="/blogs" className="block text-center font-body-md text-on-surface-variant hover:text-primary">← Back to Newsroom</Link>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-body-md text-on-surface-variant">Loading newsroom CMS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Edit Newsroom CMS</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Create articles, filter categories, and maintain tags.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/blogs" className="px-6 py-3 rounded-full border border-outline-variant font-label-caps text-sm uppercase">View Page</Link>
            <button type="button" onClick={handleLogout} className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-caps text-sm uppercase cursor-pointer">Logout</button>
          </div>
        </div>

        {message && <p className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md">{message}</p>}
        {error && <p className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md">{error}</p>}
        {uploading && <p className="p-4 rounded-2xl bg-tertiary-container text-on-tertiary-container font-body-md">Uploading media, please wait...</p>}

        {/* Tab Selection */}
        {!editingBlog && !editingCategory && (
          <div className="flex border-b border-outline-variant/40 gap-2 mb-6">
            {['blogs', 'categories'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-label-caps text-sm uppercase transition-all border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab === 'blogs' ? 'Articles' : 'Categories'}
              </button>
            ))}
          </div>
        )}

        {/* ── Sub-Editor: Add/Edit Blog Post ── */}
        {editingBlog && (
          <form onSubmit={handleBlogSubmit} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingBlog._id ? 'Edit Article' : 'Write New Article'}
              </h2>
              <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Title">
                <input required className={inputClass} value={editingBlog.title} onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })} />
              </Field>
              <Field label="Slug (unique-url-key)">
                <input required className={inputClass} value={editingBlog.slug} onChange={e => setEditingBlog({ ...editingBlog, slug: e.target.value })} />
              </Field>
            </div>

            <Field label="Excerpt / Short Summary">
              <textarea rows={2} required className={inputClass} value={editingBlog.excerpt} onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} />
            </Field>

            <Field label="Content (HTML support)">
              <textarea rows={8} required className={`${inputClass} font-mono text-sm`} value={editingBlog.content} onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select className={inputClass} value={editingBlog.category} onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tags (comma separated)">
                <input className={inputClass} value={(editingBlog.tags || []).join(', ')} onChange={e => setEditingBlog({ ...editingBlog, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Featured Image URL">
                <input className={inputClass} value={editingBlog.featuredImage || ''} onChange={e => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })} />
              </Field>
              <label className="block space-y-2">
                <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Upload Featured Image</span>
                <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'blog.featuredImage')} />
              </label>
            </div>

            {/* Author Section */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Author Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Author Name">
                  <input required className={inputClass} value={editingBlog.author?.name || ''} onChange={e => setEditingBlog({ ...editingBlog, author: { ...editingBlog.author, name: e.target.value } })} />
                </Field>
                <Field label="Designation">
                  <input required className={inputClass} value={editingBlog.author?.designation || ''} onChange={e => setEditingBlog({ ...editingBlog, author: { ...editingBlog.author, designation: e.target.value } })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Avatar Image URL">
                  <input className={inputClass} value={editingBlog.author?.image || ''} onChange={e => setEditingBlog({ ...editingBlog, author: { ...editingBlog.author, image: e.target.value } })} />
                </Field>
                <label className="block space-y-2">
                  <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Upload Avatar</span>
                  <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'blog.authorImage')} />
                </label>
              </div>
              <Field label="Author Bio">
                <textarea rows={2} className={inputClass} value={editingBlog.author?.bio || ''} onChange={e => setEditingBlog({ ...editingBlog, author: { ...editingBlog.author, bio: e.target.value } })} />
              </Field>
            </div>

            {/* SEO Section */}
            <div className="p-6 bg-surface-container rounded-2xl space-y-4 border border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">SEO Fields</h3>
              <Field label="SEO Meta Title">
                <input className={inputClass} value={editingBlog.seoTitle || ''} onChange={e => setEditingBlog({ ...editingBlog, seoTitle: e.target.value })} />
              </Field>
              <Field label="SEO Meta Description">
                <textarea rows={2} className={inputClass} value={editingBlog.seoDescription || ''} onChange={e => setEditingBlog({ ...editingBlog, seoDescription: e.target.value })} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Read Time (e.g. 5 min read)">
                <input className={inputClass} value={editingBlog.readTime || ''} onChange={e => setEditingBlog({ ...editingBlog, readTime: e.target.value })} />
              </Field>
              <Field label="Display Order">
                <input type="number" className={inputClass} value={editingBlog.displayOrder} onChange={e => setEditingBlog({ ...editingBlog, displayOrder: parseInt(e.target.value, 10) })} />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <input type="checkbox" checked={editingBlog.featured || false} onChange={e => setEditingBlog({ ...editingBlog, featured: e.target.checked })} />
                <span className="font-body-md text-sm">Featured Flag</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <input type="checkbox" checked={editingBlog.published || false} onChange={e => setEditingBlog({ ...editingBlog, published: e.target.checked })} />
                <span className="font-body-md text-sm">Published Flag</span>
              </label>
              <Field label="Status">
                <select className={inputClass} value={editingBlog.status} onChange={e => setEditingBlog({ ...editingBlog, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer">
              {saving ? 'Saving...' : 'Save Article'}
            </button>
          </form>
        )}

        {/* ── Sub-Editor: Add/Edit Category ── */}
        {editingCategory && (
          <form onSubmit={handleCategorySubmit} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingCategory._id ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category Name">
                <input required className={inputClass} value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} />
              </Field>
              <Field label="Slug URL Key">
                <input required className={inputClass} value={editingCategory.slug} onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })} />
              </Field>
            </div>

            <Field label="Description">
              <textarea rows={3} className={inputClass} value={editingCategory.description || ''} onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })} />
            </Field>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer">
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        )}

        {/* ── Tab View: Articles ── */}
        {!editingBlog && !editingCategory && activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Manage Articles</h2>
              <button type="button" onClick={initNewBlog} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">+ New Article</button>
            </div>
            <div className="grid gap-4">
              {blogs.map(blog => (
                <div key={blog._id} className="p-6 bg-white rounded-3xl border border-outline-variant/30 flex flex-wrap justify-between items-center gap-4 shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                      {blog.title}
                      {blog.featured && <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs px-2 py-0.5 rounded-full font-bold">Featured</span>}
                      {!blog.published && <span className="bg-error-container text-on-error-container text-xs px-2 py-0.5 rounded-full font-bold">Draft</span>}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Slug: {blog.slug} • Category: {blog.category?.name || 'Unassigned'} • Order: {blog.displayOrder}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingBlog(blog)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold hover:bg-surface-container cursor-pointer">Edit</button>
                    <button type="button" onClick={() => handleDeleteBlog(blog._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps font-bold hover:opacity-80 cursor-pointer">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab View: Categories ── */}
        {!editingBlog && !editingCategory && activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Manage Categories</h2>
              <button type="button" onClick={initNewCategory} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">+ New Category</button>
            </div>
            <div className="grid gap-4">
              {categories.map(cat => (
                <div key={cat._id} className="p-6 bg-white rounded-3xl border border-outline-variant/30 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{cat.name}</h3>
                    <p className="text-sm text-on-surface-variant">Slug: {cat.slug} • {cat.description || 'No description'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingCategory(cat)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold hover:bg-surface-container cursor-pointer">Edit</button>
                    <button type="button" onClick={() => handleDeleteCategory(cat._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps font-bold hover:opacity-80 cursor-pointer">Delete</button>
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