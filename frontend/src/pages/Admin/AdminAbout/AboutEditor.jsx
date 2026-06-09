import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAboutPage, updateAboutPage, adminLogin } from '../../../services/aboutService';

const TOKEN_KEY = 'adminToken';

const Field = ({ label, children }) => (
  <label className="block space-y-2">
    <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">{label}</span>
    {children}
  </label>
);

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30';

const AboutEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    loadAbout();
  }, [token]);

  const loadAbout = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAboutPage();
      setForm(data);
    } catch (err) {
      setError('Failed to load About page data.');
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
      const updated = await updateAboutPage(form, token);
      setForm(updated);
      setMessage('About page saved successfully.');
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

  const addTimelineEntry = () => {
    setForm((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        entries: [
          ...(prev.timeline?.entries || []),
          { year: '', title: '', description: '', align: 'left' },
        ],
      },
    }));
  };

  const removeTimelineEntry = (index) => {
    setForm((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        entries: prev.timeline.entries.filter((_, i) => i !== index),
      },
    }));
  };

  const addLeader = () => {
    setForm((prev) => ({
      ...prev,
      leadership: {
        ...prev.leadership,
        members: [
          ...(prev.leadership?.members || []),
          { name: '', role: '', image: '', offset: false },
        ],
      },
    }));
  };

  const removeLeader = (index) => {
    setForm((prev) => ({
      ...prev,
      leadership: {
        ...prev.leadership,
        members: prev.leadership.members.filter((_, i) => i !== index),
      },
    }));
  };

  const addAchievement = () => {
    setForm((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: [...(prev.achievements?.items || []), { icon: 'verified', label: '' }],
      },
    }));
  };

  const removeAchievement = (index) => {
    setForm((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: prev.achievements.items.filter((_, i) => i !== index),
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
          <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps uppercase">
            Sign In
          </button>
          <Link to="/about" className="block text-center font-body-md text-on-surface-variant hover:text-primary">
            ← Back to About page
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
            <h1 className="font-headline-lg text-headline-lg-mobile text-primary">Edit About Page</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Manage all About Us content from CMS.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/about" className="px-6 py-3 rounded-full border border-outline-variant font-label-caps text-sm uppercase">
              View Page
            </Link>
            <button type="button" onClick={handleLogout} className="px-6 py-3 rounded-full bg-secondary text-on-secondary font-label-caps text-sm uppercase">
              Logout
            </button>
          </div>
        </div>

        {message && <p className="p-4 rounded-2xl bg-primary-fixed text-on-primary-fixed font-body-md">{message}</p>}
        {error && <p className="p-4 rounded-2xl bg-error-container text-on-error-container font-body-md">{error}</p>}

        <form onSubmit={handleSave} className="space-y-12">
          {/* Hero */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Hero</h2>
            <Field label="Badge"><input className={inputClass} value={form.hero?.badge || ''} onChange={(e) => updateField('hero.badge', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.hero?.title || ''} onChange={(e) => updateField('hero.title', e.target.value)} /></Field>
            <Field label="Title Highlight (italic)"><input className={inputClass} value={form.hero?.titleHighlight || ''} onChange={(e) => updateField('hero.titleHighlight', e.target.value)} /></Field>
            <Field label="Title Suffix"><input className={inputClass} value={form.hero?.titleSuffix || ''} onChange={(e) => updateField('hero.titleSuffix', e.target.value)} /></Field>
            <Field label="Background Image URL"><input className={inputClass} value={form.hero?.bgImage || ''} onChange={(e) => updateField('hero.bgImage', e.target.value)} /></Field>
            <Field label="Background Image Alt"><input className={inputClass} value={form.hero?.imageAlt || ''} onChange={(e) => updateField('hero.imageAlt', e.target.value)} /></Field>
          </section>

          {/* Company Story */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Company Story</h2>
            <Field label="Narrative Text">
              <textarea className={inputClass} rows={4} value={form.companyStory?.text || ''} onChange={(e) => updateField('companyStory.text', e.target.value)} />
            </Field>
            <Field label="Image Alt Text">
              <input className={inputClass} value={form.companyStory?.imageAlt || ''} onChange={(e) => updateField('companyStory.imageAlt', e.target.value)} />
            </Field>
          </section>

          {/* Purpose */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Purpose</h2>
            <Field label="Badge"><input className={inputClass} value={form.purpose?.badge || ''} onChange={(e) => updateField('purpose.badge', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.purpose?.title || ''} onChange={(e) => updateField('purpose.title', e.target.value)} /></Field>
            <Field label="Side Image URL"><input className={inputClass} value={form.purpose?.sideImage || ''} onChange={(e) => updateField('purpose.sideImage', e.target.value)} /></Field>
          </section>

          {/* Vision */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Vision</h2>
            <Field label="Icon"><input className={inputClass} value={form.vision?.icon || ''} onChange={(e) => updateField('vision.icon', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.vision?.title || ''} onChange={(e) => updateField('vision.title', e.target.value)} /></Field>
            <Field label="Description"><textarea className={inputClass} rows={3} value={form.vision?.description || ''} onChange={(e) => updateField('vision.description', e.target.value)} /></Field>
          </section>

          {/* Mission */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Mission</h2>
            <Field label="Icon"><input className={inputClass} value={form.mission?.icon || ''} onChange={(e) => updateField('mission.icon', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.mission?.title || ''} onChange={(e) => updateField('mission.title', e.target.value)} /></Field>
            <Field label="Description"><textarea className={inputClass} rows={3} value={form.mission?.description || ''} onChange={(e) => updateField('mission.description', e.target.value)} /></Field>
          </section>

          {/* Timeline */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Timeline</h2>
            <Field label="Badge"><input className={inputClass} value={form.timeline?.badge || ''} onChange={(e) => updateField('timeline.badge', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.timeline?.title || ''} onChange={(e) => updateField('timeline.title', e.target.value)} /></Field>
            {form.timeline?.entries?.map((entry, index) => (
              <div key={index} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-sm uppercase text-primary">Entry {index + 1}</span>
                  <button type="button" onClick={() => removeTimelineEntry(index)} className="text-error text-sm font-body-md">Remove</button>
                </div>
                <Field label="Year"><input className={inputClass} value={entry.year} onChange={(e) => updateArrayItem('timeline.entries', index, 'year', e.target.value)} /></Field>
                <Field label="Title"><input className={inputClass} value={entry.title} onChange={(e) => updateArrayItem('timeline.entries', index, 'title', e.target.value)} /></Field>
                <Field label="Description"><textarea className={inputClass} rows={2} value={entry.description} onChange={(e) => updateArrayItem('timeline.entries', index, 'description', e.target.value)} /></Field>
                <Field label="Align">
                  <select className={inputClass} value={entry.align} onChange={(e) => updateArrayItem('timeline.entries', index, 'align', e.target.value)}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </Field>
              </div>
            ))}
            <button type="button" onClick={addTimelineEntry} className="px-6 py-3 rounded-full border border-primary text-primary font-label-caps text-sm uppercase">Add Entry</button>
          </section>

          {/* Leadership */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Leadership</h2>
            <Field label="Badge"><input className={inputClass} value={form.leadership?.badge || ''} onChange={(e) => updateField('leadership.badge', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.leadership?.title || ''} onChange={(e) => updateField('leadership.title', e.target.value)} /></Field>
            {form.leadership?.members?.map((member, index) => (
              <div key={index} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-sm uppercase text-primary">Member {index + 1}</span>
                  <button type="button" onClick={() => removeLeader(index)} className="text-error text-sm font-body-md">Remove</button>
                </div>
                <Field label="Name"><input className={inputClass} value={member.name} onChange={(e) => updateArrayItem('leadership.members', index, 'name', e.target.value)} /></Field>
                <Field label="Role"><input className={inputClass} value={member.role} onChange={(e) => updateArrayItem('leadership.members', index, 'role', e.target.value)} /></Field>
                <Field label="Image URL"><input className={inputClass} value={member.image} onChange={(e) => updateArrayItem('leadership.members', index, 'image', e.target.value)} /></Field>
                <label className="flex items-center gap-3 font-body-md">
                  <input type="checkbox" checked={member.offset} onChange={(e) => updateArrayItem('leadership.members', index, 'offset', e.target.checked)} />
                  Offset card (md:mt-12)
                </label>
              </div>
            ))}
            <button type="button" onClick={addLeader} className="px-6 py-3 rounded-full border border-primary text-primary font-label-caps text-sm uppercase">Add Member</button>
          </section>

          {/* Sustainability */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Sustainability</h2>
            <Field label="Badge"><input className={inputClass} value={form.sustainability?.badge || ''} onChange={(e) => updateField('sustainability.badge', e.target.value)} /></Field>
            <Field label="Title"><input className={inputClass} value={form.sustainability?.title || ''} onChange={(e) => updateField('sustainability.title', e.target.value)} /></Field>
            <Field label="Description"><textarea className={inputClass} rows={4} value={form.sustainability?.description || ''} onChange={(e) => updateField('sustainability.description', e.target.value)} /></Field>
            <Field label="Image URL"><input className={inputClass} value={form.sustainability?.image || ''} onChange={(e) => updateField('sustainability.image', e.target.value)} /></Field>
            {form.sustainability?.stats?.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <Field label={`Stat ${index + 1} Value`}><input className={inputClass} value={stat.value} onChange={(e) => updateArrayItem('sustainability.stats', index, 'value', e.target.value)} /></Field>
                <Field label={`Stat ${index + 1} Label`}><input className={inputClass} value={stat.label} onChange={(e) => updateArrayItem('sustainability.stats', index, 'label', e.target.value)} /></Field>
              </div>
            ))}
          </section>

          {/* Achievements */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">Achievements</h2>
            <Field label="Title"><input className={inputClass} value={form.achievements?.title || ''} onChange={(e) => updateField('achievements.title', e.target.value)} /></Field>
            {form.achievements?.items?.map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-sm uppercase text-primary">Item {index + 1}</span>
                  <button type="button" onClick={() => removeAchievement(index)} className="text-error text-sm font-body-md">Remove</button>
                </div>
                <Field label="Icon"><input className={inputClass} value={item.icon} onChange={(e) => updateArrayItem('achievements.items', index, 'icon', e.target.value)} /></Field>
                <Field label="Label"><input className={inputClass} value={item.label} onChange={(e) => updateArrayItem('achievements.items', index, 'label', e.target.value)} /></Field>
              </div>
            ))}
            <button type="button" onClick={addAchievement} className="px-6 py-3 rounded-full border border-primary text-primary font-label-caps text-sm uppercase">Add Achievement</button>
          </section>

          {/* CTA */}
          <section className="glass-card p-8 rounded-[32px] space-y-6">
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary">CTA Section</h2>
            <label className="flex items-center gap-3 font-body-md">
              <input
                type="checkbox"
                checked={form.cta?.isEnabled || false}
                onChange={(e) => updateField('cta.isEnabled', e.target.checked)}
              />
              Show CTA section on About page
            </label>
            <Field label="Title"><input className={inputClass} value={form.cta?.title || ''} onChange={(e) => updateField('cta.title', e.target.value)} /></Field>
            <Field label="Subtitle"><textarea className={inputClass} rows={3} value={form.cta?.subtitle || ''} onChange={(e) => updateField('cta.subtitle', e.target.value)} /></Field>
            <Field label="Background Image URL"><input className={inputClass} value={form.cta?.bgImage || ''} onChange={(e) => updateField('cta.bgImage', e.target.value)} /></Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Primary CTA Text"><input className={inputClass} value={form.cta?.primaryCtaText || ''} onChange={(e) => updateField('cta.primaryCtaText', e.target.value)} /></Field>
              <Field label="Primary CTA Link"><input className={inputClass} value={form.cta?.primaryCtaLink || ''} onChange={(e) => updateField('cta.primaryCtaLink', e.target.value)} /></Field>
              <Field label="Secondary CTA Text"><input className={inputClass} value={form.cta?.secondaryCtaText || ''} onChange={(e) => updateField('cta.secondaryCtaText', e.target.value)} /></Field>
              <Field label="Secondary CTA Link"><input className={inputClass} value={form.cta?.secondaryCtaLink || ''} onChange={(e) => updateField('cta.secondaryCtaLink', e.target.value)} /></Field>
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-on-primary py-5 rounded-full font-label-caps uppercase tracking-widest disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save About Page'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutEditor;
