import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWhyBiomassPage, updateWhyBiomassPage } from '../../../services/whyBiomassService';
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

const WhyBiomassEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'definition', 'comparison', 'industries', 'cta'

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    loadWhyBiomass();
  }, [token]);

  const loadWhyBiomass = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWhyBiomassPage();
      setForm(data);
    } catch (err) {
      setError('Failed to load Why Biomass page data.');
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
    setForm(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const updated = await updateWhyBiomassPage(form, token);
      setForm(updated);
      setMessage('Why Biomass page saved successfully.');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.join(', ') || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    setForm((prev) => {
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

  const updateArrayItem = (path, index, field, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const parts = path.split('.');
      let obj = next;
      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          obj[parts[i]] = [...obj[parts[i]]];
          obj[parts[i]][index] = { ...obj[parts[i]][index], [field]: value };
        } else {
          obj[parts[i]] = { ...obj[parts[i]] };
          obj = obj[parts[i]];
        }
      }
      return next;
    });
  };

  // Add / Remove helpers for Lists
  const addDefinitionItem = () => {
    setForm((prev) => ({
      ...prev,
      definition: {
        ...prev.definition,
        items: [...(prev.definition?.items || []), { title: '', text: '' }],
      },
    }));
  };

  const removeDefinitionItem = (index) => {
    setForm((prev) => ({
      ...prev,
      definition: {
        ...prev.definition,
        items: prev.definition.items.filter((_, i) => i !== index),
      },
    }));
  };

  const addIndustryItem = () => {
    setForm((prev) => ({
      ...prev,
      industries: {
        ...prev.industries,
        items: [
          ...(prev.industries?.items || []),
          { title: '', badgeText: '', subtitle: '', description: '', image: '', caseStudyLink: '#', imageLabel: '' },
        ],
      },
    }));
  };

  const removeIndustryItem = (index) => {
    setForm((prev) => ({
      ...prev,
      industries: {
        ...prev.industries,
        items: prev.industries.items.filter((_, i) => i !== index),
      },
    }));
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
          <Link to="/why-biomass" className="block text-center font-body-md text-on-surface-variant hover:text-primary">
            ← Back to Why Biomass page
          </Link>
        </form>
      </div>
    );
  }

  if (loading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-body-md text-on-surface-variant">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Edit Why Biomass</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Manage all Why Biomass sections content.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/why-biomass" className="px-6 py-3 rounded-full border border-outline-variant font-label-caps text-sm uppercase">
              View Page
            </Link>
            <button type="button" onClick={handleLogout} className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-caps text-sm uppercase cursor-pointer">
              Logout
            </button>
          </div>
        </div>

        {message && <p className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md">{message}</p>}
        {error && <p className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md">{error}</p>}

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-outline-variant/40 gap-2 mb-6">
          {['hero', 'definition', 'comparison', 'industries', 'cta'].map((tab) => (
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

        <form onSubmit={handleSave} className="space-y-12">
          {/* Tab Content: Hero */}
          {activeTab === 'hero' && (
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Hero Section</h2>
              <Field label="Badge"><input className={inputClass} value={form.hero?.badge || ''} onChange={(e) => updateField('hero.badge', e.target.value)} /></Field>
              <Field label="Title"><input className={inputClass} value={form.hero?.title || ''} onChange={(e) => updateField('hero.title', e.target.value)} /></Field>
              <Field label="Subtitle"><textarea className={inputClass} rows={3} value={form.hero?.subtitle || ''} onChange={(e) => updateField('hero.subtitle', e.target.value)} /></Field>
              <Field label="Background Image URL"><input className={inputClass} value={form.hero?.bgImage || ''} onChange={(e) => updateField('hero.bgImage', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary CTA Text"><input className={inputClass} value={form.hero?.primaryCtaText || ''} onChange={(e) => updateField('hero.primaryCtaText', e.target.value)} /></Field>
                <Field label="Primary CTA Link"><input className={inputClass} value={form.hero?.primaryCtaLink || ''} onChange={(e) => updateField('hero.primaryCtaLink', e.target.value)} /></Field>
                <Field label="Secondary CTA Text"><input className={inputClass} value={form.hero?.secondaryCtaText || ''} onChange={(e) => updateField('hero.secondaryCtaText', e.target.value)} /></Field>
                <Field label="Secondary CTA Link"><input className={inputClass} value={form.hero?.secondaryCtaLink || ''} onChange={(e) => updateField('hero.secondaryCtaLink', e.target.value)} /></Field>
              </div>
            </section>
          )}

          {/* Tab Content: Definition */}
          {activeTab === 'definition' && (
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Biomass Definition</h2>
              <Field label="Badge"><input className={inputClass} value={form.definition?.badge || ''} onChange={(e) => updateField('definition.badge', e.target.value)} /></Field>
              <Field label="Title"><input className={inputClass} value={form.definition?.title || ''} onChange={(e) => updateField('definition.title', e.target.value)} /></Field>
              <Field label="Description"><textarea className={inputClass} rows={4} value={form.definition?.description || ''} onChange={(e) => updateField('definition.description', e.target.value)} /></Field>
              <Field label="Quote"><textarea className={inputClass} rows={3} value={form.definition?.quote || ''} onChange={(e) => updateField('definition.quote', e.target.value)} /></Field>
              <Field label="Image URL"><input className={inputClass} value={form.definition?.image || ''} onChange={(e) => updateField('definition.image', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Density Value"><input className={inputClass} value={form.definition?.densityValue || ''} onChange={(e) => updateField('definition.densityValue', e.target.value)} /></Field>
                <Field label="Density Label"><input className={inputClass} value={form.definition?.densityLabel || ''} onChange={(e) => updateField('definition.densityLabel', e.target.value)} /></Field>
              </div>

              {/* Items List */}
              <div className="space-y-4 pt-6 border-t border-outline-variant/30">
                <h3 className="font-label-caps text-primary text-sm uppercase">Biomass Sources checklist</h3>
                {form.definition?.items?.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/20 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-label-caps text-xs uppercase text-primary">Source {index + 1}</span>
                      <button type="button" onClick={() => removeDefinitionItem(index)} className="text-error text-xs font-semibold cursor-pointer">Remove</button>
                    </div>
                    <Field label="Title"><input className={inputClass} value={item.title} onChange={(e) => updateArrayItem('definition.items', index, 'title', e.target.value)} /></Field>
                    <Field label="Text"><input className={inputClass} value={item.text} onChange={(e) => updateArrayItem('definition.items', index, 'text', e.target.value)} /></Field>
                  </div>
                ))}
                <button type="button" onClick={addDefinitionItem} className="px-6 py-2.5 rounded-full border border-primary text-primary font-label-caps text-xs uppercase cursor-pointer">Add Source</button>
              </div>
            </section>
          )}

          {/* Tab Content: Comparison */}
          {activeTab === 'comparison' && (
            <div className="space-y-8">
              {/* General header */}
              <section className="glass-card p-8 rounded-[32px] space-y-6">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Comparison Intro</h2>
                <Field label="Badge"><input className={inputClass} value={form.comparison?.badge || ''} onChange={(e) => updateField('comparison.badge', e.target.value)} /></Field>
                <Field label="Title"><input className={inputClass} value={form.comparison?.title || ''} onChange={(e) => updateField('comparison.title', e.target.value)} /></Field>
              </section>

              {/* Fuel Cost Comparisons */}
              <section className="glass-card p-8 rounded-[32px] space-y-6">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Fuel Cost Grid Cell</h2>
                <Field label="Title"><input className={inputClass} value={form.costComparison?.title || ''} onChange={(e) => updateField('costComparison.title', e.target.value)} /></Field>
                <Field label="Subtitle"><input className={inputClass} value={form.costComparison?.subtitle || ''} onChange={(e) => updateField('costComparison.subtitle', e.target.value)} /></Field>
                <Field label="Badge text"><input className={inputClass} value={form.costComparison?.badgeText || ''} onChange={(e) => updateField('costComparison.badgeText', e.target.value)} /></Field>

                {form.costComparison?.items?.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container">
                    <Field label="Fuel Name"><input className={inputClass} value={item.name} onChange={(e) => updateArrayItem('costComparison.items', index, 'name', e.target.value)} /></Field>
                    <Field label="Cost Text"><input className={inputClass} value={item.cost} onChange={(e) => updateArrayItem('costComparison.items', index, 'cost', e.target.value)} /></Field>
                    <Field label="Percentage Fill (0-100)"><input type="number" min="0" max="100" className={inputClass} value={item.percentage} onChange={(e) => updateArrayItem('costComparison.items', index, 'percentage', parseInt(e.target.value, 10))} /></Field>
                    <Field label="CSS Color Class"><input className={inputClass} value={item.colorClass} onChange={(e) => updateArrayItem('costComparison.items', index, 'colorClass', e.target.value)} /></Field>
                  </div>
                ))}
              </section>

              {/* Carbon Neutral stats */}
              <section className="glass-card p-8 rounded-[32px] space-y-6">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Carbon Neutral Grid Cell</h2>
                <Field label="Title"><input className={inputClass} value={form.carbonNeutral?.title || ''} onChange={(e) => updateField('carbonNeutral.title', e.target.value)} /></Field>
                <Field label="Description"><textarea className={inputClass} rows={3} value={form.carbonNeutral?.description || ''} onChange={(e) => updateField('carbonNeutral.description', e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Percentage Value"><input className={inputClass} value={form.carbonNeutral?.value || ''} onChange={(e) => updateField('carbonNeutral.value', e.target.value)} /></Field>
                  <Field label="Label Text"><input className={inputClass} value={form.carbonNeutral?.label || ''} onChange={(e) => updateField('carbonNeutral.label', e.target.value)} /></Field>
                </div>
              </section>

              {/* Fuel Quality Consistency */}
              <section className="glass-card p-8 rounded-[32px] space-y-6">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Fuel Quality Grid Cell</h2>
                <Field label="Header Badge"><input className={inputClass} value={form.fuelQuality?.badgeText || ''} onChange={(e) => updateField('fuelQuality.badgeText', e.target.value)} /></Field>
                {form.fuelQuality?.items?.map((item, index) => (
                  <div key={index} className="p-4 bg-surface-container rounded-xl grid grid-cols-3 gap-4">
                    <Field label="Icon ID"><input className={inputClass} value={item.icon} onChange={(e) => updateArrayItem('fuelQuality.items', index, 'icon', e.target.value)} /></Field>
                    <Field label="Title"><input className={inputClass} value={item.title} onChange={(e) => updateArrayItem('fuelQuality.items', index, 'title', e.target.value)} /></Field>
                    <Field label="Text Description"><input className={inputClass} value={item.text} onChange={(e) => updateArrayItem('fuelQuality.items', index, 'text', e.target.value)} /></Field>
                  </div>
                ))}
              </section>

              {/* Uninterrupted Supply (Reliability) */}
              <section className="glass-card p-8 rounded-[32px] space-y-6">
                <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Reliability & Supply Cell</h2>
                <Field label="Title"><input className={inputClass} value={form.reliability?.title || ''} onChange={(e) => updateField('reliability.title', e.target.value)} /></Field>
                <Field label="Description"><textarea className={inputClass} rows={3} value={form.reliability?.description || ''} onChange={(e) => updateField('reliability.description', e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Circular Gauge Value"><input className={inputClass} value={form.reliability?.circleValue || ''} onChange={(e) => updateField('reliability.circleValue', e.target.value)} /></Field>
                  <Field label="Circular Gauge Label"><input className={inputClass} value={form.reliability?.circleLabel || ''} onChange={(e) => updateField('reliability.circleLabel', e.target.value)} /></Field>
                </div>
                <Field label="Background Image URL"><input className={inputClass} value={form.reliability?.bgImage || ''} onChange={(e) => updateField('reliability.bgImage', e.target.value)} /></Field>
              </section>
            </div>
          )}

          {/* Tab Content: Industries */}
          {activeTab === 'industries' && (
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Industries Content</h2>
              <Field label="Badge"><input className={inputClass} value={form.industries?.badge || ''} onChange={(e) => updateField('industries.badge', e.target.value)} /></Field>
              <Field label="Title"><input className={inputClass} value={form.industries?.title || ''} onChange={(e) => updateField('industries.title', e.target.value)} /></Field>
              <Field label="Overview Description"><textarea className={inputClass} rows={3} value={form.industries?.description || ''} onChange={(e) => updateField('industries.description', e.target.value)} /></Field>

              <div className="space-y-6 pt-6 border-t border-outline-variant/30">
                <h3 className="font-label-caps text-primary text-sm uppercase">Industry Showcase Rows</h3>
                {form.industries?.items?.map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20">
                    <div className="flex justify-between items-center font-label-caps text-sm uppercase text-primary">
                      <span>Row {index + 1} ({index % 2 === 0 ? 'Image Left' : 'Image Right'})</span>
                      <button type="button" onClick={() => removeIndustryItem(index)} className="text-error text-xs font-semibold cursor-pointer">Remove</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Overlay Title (Text on Image)"><input className={inputClass} value={item.title} onChange={(e) => updateArrayItem('industries.items', index, 'title', e.target.value)} /></Field>
                      <Field label="Technical Tagline"><input className={inputClass} value={item.badgeText} onChange={(e) => updateArrayItem('industries.items', index, 'badgeText', e.target.value)} /></Field>
                    </div>
                    <Field label="Secondary Header"><input className={inputClass} value={item.subtitle} onChange={(e) => updateArrayItem('industries.items', index, 'subtitle', e.target.value)} /></Field>
                    <Field label="Detail Description"><textarea className={inputClass} rows={3} value={item.description} onChange={(e) => updateArrayItem('industries.items', index, 'description', e.target.value)} /></Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Image URL"><input className={inputClass} value={item.image} onChange={(e) => updateArrayItem('industries.items', index, 'image', e.target.value)} /></Field>
                      <Field label="Image Alt Label"><input className={inputClass} value={item.imageLabel} onChange={(e) => updateArrayItem('industries.items', index, 'imageLabel', e.target.value)} /></Field>
                    </div>
                    <Field label="Case Study Link"><input className={inputClass} value={item.caseStudyLink} onChange={(e) => updateArrayItem('industries.items', index, 'caseStudyLink', e.target.value)} /></Field>
                  </div>
                ))}
                <button type="button" onClick={addIndustryItem} className="px-6 py-3 rounded-full border border-primary text-primary font-label-caps text-xs uppercase cursor-pointer">Add Industry Row</button>
              </div>
            </section>
          )}

          {/* Tab Content: CTA */}
          {activeTab === 'cta' && (
            <section className="glass-card p-8 rounded-[32px] space-y-6">
              <h2 className="font-headline-lg text-headline-lg-mobile text-primary">CTA Section</h2>
              <label className="flex items-center gap-3 font-body-md cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.cta?.isEnabled || false}
                  onChange={(e) => updateField('cta.isEnabled', e.target.checked)}
                />
                Show CTA Section on page
              </label>
              <Field label="Title"><input className={inputClass} value={form.cta?.title || ''} onChange={(e) => updateField('cta.title', e.target.value)} /></Field>
              <Field label="Subtitle"><textarea className={inputClass} rows={3} value={form.cta?.subtitle || ''} onChange={(e) => updateField('cta.subtitle', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary CTA Text"><input className={inputClass} value={form.cta?.primaryCtaText || ''} onChange={(e) => updateField('cta.primaryCtaText', e.target.value)} /></Field>
                <Field label="Primary CTA Link"><input className={inputClass} value={form.cta?.primaryCtaLink || ''} onChange={(e) => updateField('cta.primaryCtaLink', e.target.value)} /></Field>
                <Field label="Secondary CTA Text"><input className={inputClass} value={form.cta?.secondaryCtaText || ''} onChange={(e) => updateField('cta.secondaryCtaText', e.target.value)} /></Field>
                <Field label="Secondary CTA Link"><input className={inputClass} value={form.cta?.secondaryCtaLink || ''} onChange={(e) => updateField('cta.secondaryCtaLink', e.target.value)} /></Field>
              </div>
            </section>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-on-primary py-5 rounded-full font-label-caps uppercase tracking-widest disabled:opacity-60 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Why Biomass Page'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhyBiomassEditor;
