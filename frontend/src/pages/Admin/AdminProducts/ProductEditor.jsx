import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchProductsConfig,
  updateProductsConfig,
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadFile
} from '../../../services/productService';
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

const ProductEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Data States
  const [configForm, setConfigForm] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Selection/Edit States
  const [activeTab, setActiveTab] = useState('config'); // 'config', 'products', 'categories'
  const [editingProduct, setEditingProduct] = useState(null); // null, 'new', or Product object
  const [editingCategory, setEditingCategory] = useState(null); // null, 'new', or Category object
  
  // File Upload Status
  const [uploading, setUploading] = useState(false);

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
      const [configData, productsData, categoriesData] = await Promise.all([
        fetchProductsConfig(),
        fetchAllProducts(token),
        fetchCategories()
      ]);
      setConfigForm(configData);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load required data from backend CMS.');
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
    setConfigForm(null);
    setProducts([]);
    setCategories([]);
  };

  // ── Config Save ──
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const updated = await updateProductsConfig(configForm, token);
      setConfigForm(updated);
      setMessage('Products layout settings saved successfully.');
    } catch (err) {
      setError('Failed to save configuration settings.');
    } finally {
      setSaving(false);
    }
  };

  const updateConfigField = (path, value) => {
    setConfigForm((prev) => {
      const next = { ...prev };
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  // ── Product Operations ──
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      if (editingProduct._id) {
        // Update
        const updated = await updateProduct(editingProduct._id, editingProduct, token);
        setProducts(products.map(p => p._id === updated._id ? updated : p));
        setMessage('Product updated successfully.');
      } else {
        // Create
        const created = await createProduct(editingProduct, token);
        setProducts([...products, created]);
        setMessage('Product created successfully.');
      }
      setEditingProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id, token);
      setProducts(products.filter(p => p._id !== id));
      setMessage('Product deleted.');
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  const initNewProduct = () => {
    setEditingProduct({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      image: '',
      gallery: [],
      category: categories[0]?._id || '',
      specifications: [
        { parameter: 'Calorific Value', value: '', unit: 'Kcal/kg' },
        { parameter: 'Moisture Content', value: '', unit: '%' }
      ],
      benefits: [],
      applications: [],
      technicalData: { ash: '', moisture: '', density: '', diameter: '' },
      downloads: [],
      featured: false,
      displayOrder: products.length + 1,
      status: 'active'
    });
  };

  // ── Category Operations ──
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
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id, token);
      setCategories(categories.filter(c => c._id !== id));
      setMessage('Category deleted.');
    } catch (err) {
      setError('Failed to delete category.');
    }
  };

  // ── Image Uploads ──
  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadFile(file, token);
      if (targetField === 'hero.bgImage') {
        updateConfigField('hero.bgImage', url);
      } else if (targetField === 'product.image') {
        setEditingProduct(prev => ({ ...prev, image: url }));
      } else if (targetField === 'product.brochure') {
        setEditingProduct(prev => ({
          ...prev,
          downloads: [{ label: 'Brochure PDF', url }]
        }));
      }
      setMessage('File uploaded successfully.');
    } catch (err) {
      setError('File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md glass-card p-10 rounded-[48px] space-y-6">
          <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Admin Login</h1>
          <Field label="Email">
            <input
              type="email"
              required
              className={inputClass}
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              className={inputClass}
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </Field>
          {loginError && <p className="text-error font-body-md text-sm">{loginError}</p>}
          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase cursor-pointer">
            Sign In
          </button>
          <Link to="/products" className="block text-center font-body-md text-on-surface-variant hover:text-primary">
            ← Back to Products page
          </Link>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-body-md text-on-surface-variant">Loading product editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Edit Products CMS</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Manage categories, catalog files, specs and products.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/products" className="px-6 py-3 rounded-full border border-outline-variant font-label-caps text-sm uppercase">
              View Page
            </Link>
            <button type="button" onClick={handleLogout} className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-caps text-sm uppercase cursor-pointer">
              Logout
            </button>
          </div>
        </div>

        {message && <p className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md">{message}</p>}
        {error && <p className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md">{error}</p>}
        {uploading && <p className="p-4 rounded-2xl bg-tertiary-container text-on-tertiary-container font-body-md">Uploading file, please wait...</p>}

        {/* Tab Selection */}
        {!editingProduct && !editingCategory && (
          <div className="flex border-b border-outline-variant/40 gap-2 mb-6">
            {['config', 'products', 'categories'].map((tab) => (
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
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* ── Sub-Editor: Add/Edit Product ── */}
        {editingProduct && (
          <form onSubmit={handleProductSubmit} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingProduct._id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold">
                Cancel
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Field label="Product Title">
                <input required className={inputClass} value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} />
              </Field>
              <Field label="Product Slug (unique-url)">
                <input required className={inputClass} value={editingProduct.slug} onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })} />
              </Field>
            </div>

            <Field label="Category">
              <select className={inputClass} value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </Field>

            <Field label="Short Description">
              <textarea required rows={2} className={inputClass} value={editingProduct.shortDescription} onChange={e => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })} />
            </Field>

            <Field label="Full Description">
              <textarea rows={4} className={inputClass} value={editingProduct.fullDescription} onChange={e => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Image URL">
                <input className={inputClass} value={editingProduct.image} onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })} />
              </Field>
              <label className="block space-y-2">
                <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Upload Image</span>
                <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'product.image')} />
              </label>
            </div>

            {/* Specifications */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Quick Specifications</h3>
              {editingProduct.specifications.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2">
                  <input placeholder="Parameter" className={inputClass} value={s.parameter} onChange={e => {
                    const nextSpecs = [...editingProduct.specifications];
                    nextSpecs[idx].parameter = e.target.value;
                    setEditingProduct({ ...editingProduct, specifications: nextSpecs });
                  }} />
                  <input placeholder="Value" className={inputClass} value={s.value} onChange={e => {
                    const nextSpecs = [...editingProduct.specifications];
                    nextSpecs[idx].value = e.target.value;
                    setEditingProduct({ ...editingProduct, specifications: nextSpecs });
                  }} />
                  <input placeholder="Unit" className={inputClass} value={s.unit} onChange={e => {
                    const nextSpecs = [...editingProduct.specifications];
                    nextSpecs[idx].unit = e.target.value;
                    setEditingProduct({ ...editingProduct, specifications: nextSpecs });
                  }} />
                </div>
              ))}
            </div>

            {/* Technical Data parameters */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Technical Specs (Matrix Columns)</h3>
              <div className="grid grid-cols-4 gap-2">
                <Field label="Ash content (%)">
                  <input className={inputClass} value={editingProduct.technicalData?.ash || ''} onChange={e => setEditingProduct({ ...editingProduct, technicalData: { ...editingProduct.technicalData, ash: e.target.value } })} />
                </Field>
                <Field label="Moisture (%)">
                  <input className={inputClass} value={editingProduct.technicalData?.moisture || ''} onChange={e => setEditingProduct({ ...editingProduct, technicalData: { ...editingProduct.technicalData, moisture: e.target.value } })} />
                </Field>
                <Field label="Density (kg/m³)">
                  <input className={inputClass} value={editingProduct.technicalData?.density || ''} onChange={e => setEditingProduct({ ...editingProduct, technicalData: { ...editingProduct.technicalData, density: e.target.value } })} />
                </Field>
                <Field label="Diameter (mm)">
                  <input className={inputClass} value={editingProduct.technicalData?.diameter || ''} onChange={e => setEditingProduct({ ...editingProduct, technicalData: { ...editingProduct.technicalData, diameter: e.target.value } })} />
                </Field>
              </div>
            </div>

            {/* Upload Datasheet */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
              <Field label="Brochure PDF Link">
                <input className={inputClass} value={editingProduct.downloads?.[0]?.url || ''} onChange={e => setEditingProduct({ ...editingProduct, downloads: [{ label: 'Brochure PDF', url: e.target.value }] })} />
              </Field>
              <label className="block space-y-2">
                <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Upload PDF Brochure</span>
                <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'product.brochure')} />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-3 font-body-md cursor-pointer">
                <input type="checkbox" checked={editingProduct.featured} onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })} />
                Featured Flagship
              </label>
              <label className="flex items-center gap-3 font-body-md cursor-pointer">
                <select className={inputClass} value={editingProduct.status} onChange={e => setEditingProduct({ ...editingProduct, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                Status
              </label>
              <Field label="Display Order">
                <input type="number" className={inputClass} value={editingProduct.displayOrder} onChange={e => setEditingProduct({ ...editingProduct, displayOrder: parseInt(e.target.value, 10) })} />
              </Field>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer">
              {saving ? 'Saving...' : 'Save Product Record'}
            </button>
          </form>
        )}

        {/* ── Sub-Editor: Add/Edit Category ── */}
        {editingCategory && (
          <form onSubmit={handleCategorySubmit} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingCategory._id ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold">
                Cancel
              </button>
            </div>
            <Field label="Category Name">
              <input required className={inputClass} value={editingCategory.name} onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} />
            </Field>
            <Field label="Category Slug">
              <input required className={inputClass} value={editingCategory.slug} onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea rows={3} className={inputClass} value={editingCategory.description} onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })} />
            </Field>
            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer">
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        )}

        {/* ── Tab: Config ── */}
        {!editingProduct && !editingCategory && activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="space-y-12">
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Hero configuration</h2>
              <Field label="Badge"><input className={inputClass} value={configForm.hero?.badge || ''} onChange={e => updateConfigField('hero.badge', e.target.value)} /></Field>
              <Field label="Title"><input className={inputClass} value={configForm.hero?.title || ''} onChange={e => updateConfigField('hero.title', e.target.value)} /></Field>
              <Field label="Subtitle"><textarea rows={3} className={inputClass} value={configForm.hero?.subtitle || ''} onChange={e => updateConfigField('hero.subtitle', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Background image URL"><input className={inputClass} value={configForm.hero?.bgImage || ''} onChange={e => updateConfigField('hero.bgImage', e.target.value)} /></Field>
                <label className="block space-y-2">
                  <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest font-bold">Upload Background Image</span>
                  <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'hero.bgImage')} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Button 1 Text"><input className={inputClass} value={configForm.hero?.button1Text || ''} onChange={e => updateConfigField('hero.button1Text', e.target.value)} /></Field>
                <Field label="Button 1 Link"><input className={inputClass} value={configForm.hero?.button1Link || ''} onChange={e => updateConfigField('hero.button1Link', e.target.value)} /></Field>
                <Field label="Button 2 Text"><input className={inputClass} value={configForm.hero?.button2Text || ''} onChange={e => updateConfigField('hero.button2Text', e.target.value)} /></Field>
                <Field label="Button 2 Link"><input className={inputClass} value={configForm.hero?.button2Link || ''} onChange={e => updateConfigField('hero.button2Link', e.target.value)} /></Field>
              </div>
              <Field label="Floating Card title"><input className={inputClass} value={configForm.hero?.glassTitle || ''} onChange={e => updateConfigField('hero.glassTitle', e.target.value)} /></Field>
              <Field label="Floating Card text"><textarea className={inputClass} value={configForm.hero?.glassText || ''} onChange={e => updateConfigField('hero.glassText', e.target.value)} /></Field>
            </section>

            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">CTA configuration</h2>
              <Field label="Title"><input className={inputClass} value={configForm.cta?.title || ''} onChange={e => updateConfigField('cta.title', e.target.value)} /></Field>
              <Field label="Subtitle"><textarea rows={3} className={inputClass} value={configForm.cta?.subtitle || ''} onChange={e => updateConfigField('cta.subtitle', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Button 1 Text"><input className={inputClass} value={configForm.cta?.button1Text || ''} onChange={e => updateConfigField('cta.button1Text', e.target.value)} /></Field>
                <Field label="Button 1 Link"><input className={inputClass} value={configForm.cta?.button1Link || ''} onChange={e => updateConfigField('cta.button1Link', e.target.value)} /></Field>
                <Field label="Button 2 Text"><input className={inputClass} value={configForm.cta?.button2Text || ''} onChange={e => updateConfigField('cta.button2Text', e.target.value)} /></Field>
                <Field label="Button 2 Link"><input className={inputClass} value={configForm.cta?.button2Link || ''} onChange={e => updateConfigField('cta.button2Link', e.target.value)} /></Field>
              </div>
            </section>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-5 rounded-full font-label-caps uppercase tracking-widest disabled:opacity-60 cursor-pointer">
              {saving ? 'Saving...' : 'Save Products config Settings'}
            </button>
          </form>
        )}

        {/* ── Tab: Products ── */}
        {!editingProduct && !editingCategory && activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Manage Products</h2>
              <button type="button" onClick={initNewProduct} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">
                + Add Product
              </button>
            </div>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p._id} className="p-6 bg-white rounded-3xl border border-outline-variant/30 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{p.title}</h3>
                    <p className="text-sm text-on-surface-variant">{p.category?.name || 'No Category'} • Order: {p.displayOrder} • {p.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingProduct(p)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold hover:bg-surface-container cursor-pointer">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteProduct(p._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps font-bold hover:opacity-80 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Categories ── */}
        {!editingProduct && !editingCategory && activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Manage Categories</h2>
              <button type="button" onClick={() => setEditingCategory({ name: '', slug: '', description: '' })} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">
                + Add Category
              </button>
            </div>
            <div className="grid gap-4">
              {categories.map(c => (
                <div key={c._id} className="p-6 bg-white rounded-3xl border border-outline-variant/30 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{c.name}</h3>
                    <p className="text-sm text-on-surface-variant">Slug: {c.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingCategory(c)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold hover:bg-surface-container cursor-pointer">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDeleteCategory(c._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps font-bold hover:opacity-80 cursor-pointer">
                      Delete
                    </button>
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

export default ProductEditor;
