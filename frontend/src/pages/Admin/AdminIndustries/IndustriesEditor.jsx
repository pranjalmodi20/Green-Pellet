import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchIndustriesConfig,
  updateIndustriesConfig,
  fetchAllIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  uploadFile
} from '../../../services/industryService';
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

const IndustriesEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Data States
  const [configForm, setConfigForm] = useState(null);
  const [industries, setIndustries] = useState([]);

  // Selection/Edit States
  const [activeTab, setActiveTab] = useState('config'); // 'config', 'industries'
  const [editingIndustry, setEditingIndustry] = useState(null);

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
      const [configData, industriesData] = await Promise.all([
        fetchIndustriesConfig(),
        fetchAllIndustries(token)
      ]);
      setConfigForm(configData);
      setIndustries(industriesData);
    } catch (err) {
      setError('Failed to load Industries CMS data.');
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
    setIndustries([]);
  };

  // ── Config Save ──
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const updated = await updateIndustriesConfig(configForm, token);
      setConfigForm(updated);
      setMessage('Industries page configuration saved successfully.');
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

  // Sectors helpers
  const addSector = () => {
    setConfigForm(prev => ({
      ...prev,
      detailedSectors: {
        ...prev.detailedSectors,
        sectors: [...(prev.detailedSectors?.sectors || []), { title: '', description: '', features: [] }]
      }
    }));
  };

  const removeSector = (index) => {
    setConfigForm(prev => ({
      ...prev,
      detailedSectors: {
        ...prev.detailedSectors,
        sectors: prev.detailedSectors.sectors.filter((_, i) => i !== index)
      }
    }));
  };

  const updateSector = (index, field, value) => {
    setConfigForm(prev => {
      const sectors = [...prev.detailedSectors.sectors];
      sectors[index] = { ...sectors[index], [field]: value };
      return { ...prev, detailedSectors: { ...prev.detailedSectors, sectors } };
    });
  };

  const updateSectorFeatures = (sectorIdx, featuresStr) => {
    const features = featuresStr.split(',').map(f => f.trim()).filter(Boolean);
    updateSector(sectorIdx, 'features', features);
  };

  // ── Industry Operations ──
  const handleIndustrySubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      if (editingIndustry._id) {
        const updated = await updateIndustry(editingIndustry._id, editingIndustry, token);
        setIndustries(industries.map(ind => ind._id === updated._id ? updated : ind));
        setMessage('Industry updated successfully.');
      } else {
        const created = await createIndustry(editingIndustry, token);
        setIndustries([...industries, created]);
        setMessage('Industry created successfully.');
      }
      setEditingIndustry(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save industry.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteIndustry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this industry?')) return;
    try {
      await deleteIndustry(id, token);
      setIndustries(industries.filter(ind => ind._id !== id));
      setMessage('Industry deleted.');
    } catch (err) {
      setError('Failed to delete industry.');
    }
  };

  const initNewIndustry = () => {
    setEditingIndustry({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      featuredImage: '',
      icon: '',
      statistics: [],
      benefits: [],
      quoteText: '',
      quoteAuthor: '',
      quoteAvatar: '',
      displayOrder: industries.length + 1,
      status: 'active'
    });
  };

  // Statistics helpers
  const addStat = () => {
    setEditingIndustry(prev => ({
      ...prev,
      statistics: [...(prev.statistics || []), { title: '', value: '', unit: '' }]
    }));
  };

  const removeStat = (index) => {
    setEditingIndustry(prev => ({
      ...prev,
      statistics: prev.statistics.filter((_, i) => i !== index)
    }));
  };

  // Benefits helpers
  const addBenefit = () => {
    setEditingIndustry(prev => ({
      ...prev,
      benefits: [...(prev.benefits || []), { title: '', description: '', icon: '' }]
    }));
  };

  const removeBenefit = (index) => {
    setEditingIndustry(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  // File Upload
  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { url } = await uploadFile(file, token);
      if (targetField === 'hero.bgImage') {
        updateConfigField('hero.bgImage', url);
      } else if (targetField === 'industry.featuredImage') {
        setEditingIndustry(prev => ({ ...prev, featuredImage: url }));
      } else if (targetField === 'industry.quoteAvatar') {
        setEditingIndustry(prev => ({ ...prev, quoteAvatar: url }));
      }
      setMessage('File uploaded successfully.');
    } catch (err) {
      setError('File upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // ── Login Screen ──
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
          <Link to="/industries" className="block text-center font-body-md text-on-surface-variant hover:text-primary">← Back to Industries page</Link>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-body-md text-on-surface-variant">Loading industries editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Edit Industries CMS</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Manage industries, sectors, case studies and page config.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/industries" className="px-6 py-3 rounded-full border border-outline-variant font-label-caps text-sm uppercase">View Page</Link>
            <button type="button" onClick={handleLogout} className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-caps text-sm uppercase cursor-pointer">Logout</button>
          </div>
        </div>

        {message && <p className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md">{message}</p>}
        {error && <p className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md">{error}</p>}
        {uploading && <p className="p-4 rounded-2xl bg-tertiary-container text-on-tertiary-container font-body-md">Uploading file, please wait...</p>}

        {/* Tab Selection */}
        {!editingIndustry && (
          <div className="flex border-b border-outline-variant/40 gap-2 mb-6">
            {['config', 'industries'].map((tab) => (
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
                {tab === 'config' ? 'Page Config' : 'Industries'}
              </button>
            ))}
          </div>
        )}

        {/* ── Sub-Editor: Add/Edit Industry ── */}
        {editingIndustry && (
          <form onSubmit={handleIndustrySubmit} className="glass-card p-8 rounded-[32px] space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">
                {editingIndustry._id ? 'Edit Industry' : 'Add New Industry'}
              </h2>
              <button type="button" onClick={() => setEditingIndustry(null)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold cursor-pointer">Cancel</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Title">
                <input required className={inputClass} value={editingIndustry.title} onChange={e => setEditingIndustry({ ...editingIndustry, title: e.target.value })} />
              </Field>
              <Field label="Slug (unique-url)">
                <input required className={inputClass} value={editingIndustry.slug} onChange={e => setEditingIndustry({ ...editingIndustry, slug: e.target.value })} />
              </Field>
            </div>

            <Field label="Short Description">
              <textarea rows={2} className={inputClass} value={editingIndustry.shortDescription || ''} onChange={e => setEditingIndustry({ ...editingIndustry, shortDescription: e.target.value })} />
            </Field>
            <Field label="Full Description">
              <textarea rows={4} className={inputClass} value={editingIndustry.fullDescription || ''} onChange={e => setEditingIndustry({ ...editingIndustry, fullDescription: e.target.value })} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Featured Image URL">
                <input className={inputClass} value={editingIndustry.featuredImage || ''} onChange={e => setEditingIndustry({ ...editingIndustry, featuredImage: e.target.value })} />
              </Field>
              <label className="block space-y-2">
                <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Upload Image</span>
                <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'industry.featuredImage')} />
              </label>
            </div>

            <Field label="Material Symbol Icon (e.g. inventory_2, arrow_outward)">
              <input className={inputClass} value={editingIndustry.icon || ''} onChange={e => setEditingIndustry({ ...editingIndustry, icon: e.target.value })} />
            </Field>

            {/* Statistics */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Statistics</h3>
              {(editingIndustry.statistics || []).map((stat, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-2 items-end">
                  <Field label="Label">
                    <input className={inputClass} value={stat.title} onChange={e => {
                      const stats = [...editingIndustry.statistics];
                      stats[idx] = { ...stats[idx], title: e.target.value };
                      setEditingIndustry({ ...editingIndustry, statistics: stats });
                    }} />
                  </Field>
                  <Field label="Value">
                    <input className={inputClass} value={stat.value} onChange={e => {
                      const stats = [...editingIndustry.statistics];
                      stats[idx] = { ...stats[idx], value: e.target.value };
                      setEditingIndustry({ ...editingIndustry, statistics: stats });
                    }} />
                  </Field>
                  <Field label="Unit">
                    <input className={inputClass} value={stat.unit || ''} onChange={e => {
                      const stats = [...editingIndustry.statistics];
                      stats[idx] = { ...stats[idx], unit: e.target.value };
                      setEditingIndustry({ ...editingIndustry, statistics: stats });
                    }} />
                  </Field>
                  <button type="button" onClick={() => removeStat(idx)} className="text-error text-xs font-semibold cursor-pointer pb-3">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addStat} className="px-6 py-2.5 rounded-full border border-primary text-primary font-label-caps text-xs uppercase cursor-pointer">+ Add Statistic</button>
            </div>

            {/* Benefits */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Benefits / Sub-cards</h3>
              {(editingIndustry.benefits || []).map((benefit, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-xs uppercase text-primary">Benefit {idx + 1}</span>
                    <button type="button" onClick={() => removeBenefit(idx)} className="text-error text-xs font-semibold cursor-pointer">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title">
                      <input className={inputClass} value={benefit.title} onChange={e => {
                        const benefits = [...editingIndustry.benefits];
                        benefits[idx] = { ...benefits[idx], title: e.target.value };
                        setEditingIndustry({ ...editingIndustry, benefits });
                      }} />
                    </Field>
                    <Field label="Icon (optional)">
                      <input className={inputClass} value={benefit.icon || ''} onChange={e => {
                        const benefits = [...editingIndustry.benefits];
                        benefits[idx] = { ...benefits[idx], icon: e.target.value };
                        setEditingIndustry({ ...editingIndustry, benefits });
                      }} />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea rows={2} className={inputClass} value={benefit.description} onChange={e => {
                      const benefits = [...editingIndustry.benefits];
                      benefits[idx] = { ...benefits[idx], description: e.target.value };
                      setEditingIndustry({ ...editingIndustry, benefits });
                    }} />
                  </Field>
                </div>
              ))}
              <button type="button" onClick={addBenefit} className="px-6 py-2.5 rounded-full border border-primary text-primary font-label-caps text-xs uppercase cursor-pointer">+ Add Benefit</button>
            </div>

            {/* Quote Block */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-primary text-sm uppercase">Quote / Testimonial</h3>
              <Field label="Quote Text">
                <textarea rows={3} className={inputClass} value={editingIndustry.quoteText || ''} onChange={e => setEditingIndustry({ ...editingIndustry, quoteText: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Quote Author">
                  <input className={inputClass} value={editingIndustry.quoteAuthor || ''} onChange={e => setEditingIndustry({ ...editingIndustry, quoteAuthor: e.target.value })} />
                </Field>
                <Field label="Author Avatar URL">
                  <input className={inputClass} value={editingIndustry.quoteAvatar || ''} onChange={e => setEditingIndustry({ ...editingIndustry, quoteAvatar: e.target.value })} />
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Display Order">
                <input type="number" className={inputClass} value={editingIndustry.displayOrder} onChange={e => setEditingIndustry({ ...editingIndustry, displayOrder: parseInt(e.target.value, 10) })} />
              </Field>
              <Field label="Status">
                <select className={inputClass} value={editingIndustry.status} onChange={e => setEditingIndustry({ ...editingIndustry, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase tracking-wider cursor-pointer">
              {saving ? 'Saving...' : 'Save Industry Record'}
            </button>
          </form>
        )}

        {/* ── Tab: Config ── */}
        {!editingIndustry && activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="space-y-12">
            {/* Hero Section */}
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Hero Configuration</h2>
              <Field label="Badge"><input className={inputClass} value={configForm.hero?.badge || ''} onChange={e => updateConfigField('hero.badge', e.target.value)} /></Field>
              <Field label="Title"><input className={inputClass} value={configForm.hero?.title || ''} onChange={e => updateConfigField('hero.title', e.target.value)} /></Field>
              <Field label="Subtitle"><textarea rows={3} className={inputClass} value={configForm.hero?.subtitle || ''} onChange={e => updateConfigField('hero.subtitle', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Background Image URL"><input className={inputClass} value={configForm.hero?.bgImage || ''} onChange={e => updateConfigField('hero.bgImage', e.target.value)} /></Field>
                <label className="block space-y-2">
                  <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest font-bold">Upload Background Image</span>
                  <input type="file" className="block text-sm" onChange={e => handleFileUpload(e, 'hero.bgImage')} />
                </label>
              </div>
            </section>

            {/* Detailed Sectors */}
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Detailed Sectors Section</h2>
              <Field label="Title"><input className={inputClass} value={configForm.detailedSectors?.title || ''} onChange={e => updateConfigField('detailedSectors.title', e.target.value)} /></Field>
              <Field label="Description"><textarea rows={3} className={inputClass} value={configForm.detailedSectors?.description || ''} onChange={e => updateConfigField('detailedSectors.description', e.target.value)} /></Field>

              <div className="space-y-6 pt-6 border-t border-outline-variant/30">
                <h3 className="font-label-caps text-primary text-sm uppercase">Sectors List</h3>
                {configForm.detailedSectors?.sectors?.map((sector, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20">
                    <div className="flex justify-between items-center">
                      <span className="font-label-caps text-xs uppercase text-primary">Sector {idx + 1}</span>
                      <button type="button" onClick={() => removeSector(idx)} className="text-error text-xs font-semibold cursor-pointer">Remove</button>
                    </div>
                    <Field label="Title"><input className={inputClass} value={sector.title} onChange={e => updateSector(idx, 'title', e.target.value)} /></Field>
                    <Field label="Description"><textarea rows={2} className={inputClass} value={sector.description} onChange={e => updateSector(idx, 'description', e.target.value)} /></Field>
                    <Field label="Features (comma-separated)">
                      <input className={inputClass} value={(sector.features || []).join(', ')} onChange={e => updateSectorFeatures(idx, e.target.value)} />
                    </Field>
                  </div>
                ))}
                <button type="button" onClick={addSector} className="px-6 py-3 rounded-full border border-primary text-primary font-label-caps text-xs uppercase cursor-pointer">+ Add Sector</button>
              </div>
            </section>

            {/* CTA Section */}
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">CTA Configuration</h2>
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
              {saving ? 'Saving...' : 'Save Industries Page Config'}
            </button>
          </form>
        )}

        {/* ── Tab: Industries ── */}
        {!editingIndustry && activeTab === 'industries' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Manage Industries</h2>
              <button type="button" onClick={initNewIndustry} className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-caps text-xs uppercase cursor-pointer">+ Add Industry</button>
            </div>
            <div className="grid gap-4">
              {industries.filter(ind => !ind.type).map(ind => (
                <div key={ind._id} className="p-6 bg-white rounded-3xl border border-outline-variant/30 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-bold text-primary text-lg">{ind.title}</h3>
                    <p className="text-sm text-on-surface-variant">Slug: {ind.slug} • Order: {ind.displayOrder} • {ind.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingIndustry(ind)} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-label-caps font-bold hover:bg-surface-container cursor-pointer">Edit</button>
                    <button type="button" onClick={() => handleDeleteIndustry(ind._id)} className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-label-caps font-bold hover:opacity-80 cursor-pointer">Delete</button>
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

export default IndustriesEditor;
