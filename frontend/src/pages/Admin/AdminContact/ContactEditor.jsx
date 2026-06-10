import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchContactPage, updateContactPage } from '../../../services/contactService';
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

const ContactEditor = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'info', 'form', 'map', 'services', 'trusted'

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    loadContactData();
  }, [token]);

  const loadContactData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchContactPage();
      setForm(data);
    } catch (err) {
      setError('Failed to load contact page configuration.');
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
      const updated = await updateContactPage(form, token);
      setForm(updated);
      setMessage('Contact page configuration saved successfully.');
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

  // Add & remove helpers for list arrays
  const addIndustryOption = () => {
    setForm((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        industries: [...(prev.form?.industries || []), 'New Industry Option']
      }
    }));
  };

  const removeIndustryOption = (index) => {
    setForm((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        industries: prev.form.industries.filter((_, i) => i !== index)
      }
    }));
  };

  const updateIndustryOptionText = (index, val) => {
    setForm((prev) => {
      const list = [...(prev.form?.industries || [])];
      list[index] = val;
      return {
        ...prev,
        form: {
          ...prev.form,
          industries: list
        }
      };
    });
  };

  const addTrustedLogo = () => {
    setForm((prev) => ({
      ...prev,
      trustedBy: {
        ...prev.trustedBy,
        logos: [...(prev.trustedBy?.logos || []), 'NEW-LOGO']
      }
    }));
  };

  const removeTrustedLogo = (index) => {
    setForm((prev) => ({
      ...prev,
      trustedBy: {
        ...prev.trustedBy,
        logos: prev.trustedBy.logos.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTrustedLogoText = (index, val) => {
    setForm((prev) => {
      const list = [...(prev.trustedBy?.logos || [])];
      list[index] = val;
      return {
        ...prev,
        trustedBy: {
          ...prev.trustedBy,
          logos: list
        }
      };
    });
  };

  const addExpertServiceCard = () => {
    setForm((prev) => ({
      ...prev,
      expertServices: {
        ...prev.expertServices,
        cards: [...(prev.expertServices?.cards || []), { icon: 'engineering', title: '', description: '' }]
      }
    }));
  };

  const removeExpertServiceCard = (index) => {
    setForm((prev) => ({
      ...prev,
      expertServices: {
        ...prev.expertServices,
        cards: prev.expertServices.cards.filter((_, i) => i !== index)
      }
    }));
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4 mt-20">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-surface-container p-8 lg:p-12 rounded-[32px] shadow-2xl border border-outline-variant/30 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-headline-lg text-[28px] text-primary">Admin Access</h1>
            <p className="font-body-md text-on-surface-variant">Sign in to edit the Contact Page CMS</p>
          </div>
          {loginError && (
            <div className="p-4 bg-error-container/20 text-error rounded-xl font-body-md text-center">{loginError}</div>
          )}
          <Field label="Email Address">
            <input
              type="email"
              required
              className={inputClass}
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="admin@greenpellets.in"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              className={inputClass}
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder="••••••••"
            />
          </Field>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-label-caps uppercase hover:bg-tertiary-container hover:text-on-tertiary-container transition-all cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface mt-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="font-body-md text-on-surface-variant">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="min-h-screen bg-surface px-grid-margin-desktop py-12 mt-20">
      <div className="max-w-container-max-width mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">Contact Page Editor</h1>
            <p className="font-body-md text-on-surface-variant">Manage layout headings, office info, map options, and advisory services.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/contact/submissions" className="px-6 py-3 bg-secondary-container text-on-secondary-container hover:bg-primary-container hover:text-on-primary-container transition-all rounded-full font-label-caps text-xs uppercase text-center">
              View Submissions
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 bg-error-container/20 text-error hover:bg-error-container/40 transition-all rounded-full font-label-caps text-xs uppercase cursor-pointer">
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="p-4 bg-primary-container/20 text-primary-container rounded-2xl font-body-md border border-primary/20 text-center">{message}</div>
        )}
        {error && (
          <div className="p-4 bg-error-container/20 text-error rounded-2xl font-body-md border border-error/20 text-center">{error}</div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-4">
          {[
            { id: 'hero', label: 'Hero Section' },
            { id: 'info', label: 'Office Info' },
            { id: 'form', label: 'Inquiry Form' },
            { id: 'map', label: 'Map Settings' },
            { id: 'services', label: 'Advisory Services' },
            { id: 'trusted', label: 'Integrations & BG' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-full font-label-caps text-xs uppercase transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="space-y-10">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
              <h2 className="font-headline-lg text-[22px] text-primary">Hero Section Configuration</h2>
              <Field label="Hero Badge / Tagline">
                <input className={inputClass} value={form.hero?.badge || ''} onChange={(e) => updateField('hero.badge', e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Title Pre-Highlight">
                  <input className={inputClass} value={form.hero?.title || ''} onChange={(e) => updateField('hero.title', e.target.value)} />
                </Field>
                <Field label="Highlight Word">
                  <input className={inputClass} value={form.hero?.titleHighlight || ''} onChange={(e) => updateField('hero.titleHighlight', e.target.value)} />
                </Field>
                <Field label="Title Post-Highlight">
                  <input className={inputClass} value={form.hero?.titleEnd || ''} onChange={(e) => updateField('hero.titleEnd', e.target.value)} />
                </Field>
              </div>
              <Field label="Hero Subtitle">
                <textarea className={inputClass} rows={3} value={form.hero?.subtitle || ''} onChange={(e) => updateField('hero.subtitle', e.target.value)} />
              </Field>
            </div>
          )}

          {/* Office Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Headquarters */}
              <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
                <h2 className="font-headline-lg text-[22px] text-primary">Headquarters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Label">
                    <input className={inputClass} value={form.contactInfo?.headquarters?.label || ''} onChange={(e) => updateField('contactInfo.headquarters.label', e.target.value)} />
                  </Field>
                  <Field label="Icon Name">
                    <input className={inputClass} value={form.contactInfo?.headquarters?.icon || ''} onChange={(e) => updateField('contactInfo.headquarters.icon', e.target.value)} />
                  </Field>
                </div>
                <Field label="Address (Use \n for line breaks)">
                  <textarea className={inputClass} rows={3} value={form.contactInfo?.headquarters?.address || ''} onChange={(e) => updateField('contactInfo.headquarters.address', e.target.value)} />
                </Field>
              </div>

              {/* Email */}
              <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
                <h2 className="font-headline-lg text-[22px] text-primary">Emails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Label">
                    <input className={inputClass} value={form.contactInfo?.email?.label || ''} onChange={(e) => updateField('contactInfo.email.label', e.target.value)} />
                  </Field>
                  <Field label="Icon Name">
                    <input className={inputClass} value={form.contactInfo?.email?.icon || ''} onChange={(e) => updateField('contactInfo.email.icon', e.target.value)} />
                  </Field>
                  <Field label="Primary Partnerships Email">
                    <input className={inputClass} value={form.contactInfo?.email?.primary || ''} onChange={(e) => updateField('contactInfo.email.primary', e.target.value)} />
                  </Field>
                  <Field label="Secondary / General Email">
                    <input className={inputClass} value={form.contactInfo?.email?.secondary || ''} onChange={(e) => updateField('contactInfo.email.secondary', e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* Phone */}
              <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
                <h2 className="font-headline-lg text-[22px] text-primary">Phone & Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Label">
                    <input className={inputClass} value={form.contactInfo?.phone?.label || ''} onChange={(e) => updateField('contactInfo.phone.label', e.target.value)} />
                  </Field>
                  <Field label="Icon Name">
                    <input className={inputClass} value={form.contactInfo?.phone?.icon || ''} onChange={(e) => updateField('contactInfo.phone.icon', e.target.value)} />
                  </Field>
                  <Field label="Primary Phone Number">
                    <input className={inputClass} value={form.contactInfo?.phone?.number || ''} onChange={(e) => updateField('contactInfo.phone.number', e.target.value)} />
                  </Field>
                  <Field label="Availability Hours Description">
                    <input className={inputClass} value={form.contactInfo?.phone?.hours || ''} onChange={(e) => updateField('contactInfo.phone.hours', e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* Form Configuration Tab */}
          {activeTab === 'form' && (
            <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
              <h2 className="font-headline-lg text-[22px] text-primary">Inquiry Form Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Form Heading Title">
                  <input className={inputClass} value={form.form?.title || ''} onChange={(e) => updateField('form.title', e.target.value)} />
                </Field>
                <Field label="Average Response Time Tag">
                  <input className={inputClass} value={form.form?.responseTime || ''} onChange={(e) => updateField('form.responseTime', e.target.value)} />
                </Field>
                <Field label="Submit Button Text">
                  <input className={inputClass} value={form.form?.submitButtonText || ''} onChange={(e) => updateField('form.submitButtonText', e.target.value)} />
                </Field>
              </div>

              <div className="space-y-4 pt-6 border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-label-caps text-sm text-primary uppercase">Industry Dropdown Options</h3>
                  <button type="button" onClick={addIndustryOption} className="px-4 py-2 border border-primary text-primary text-xs font-label-caps uppercase rounded-full hover:bg-primary/5 cursor-pointer">
                    Add Option
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {form.form?.industries?.map((ind, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        className={inputClass}
                        value={ind}
                        onChange={(e) => updateIndustryOptionText(index, e.target.value)}
                      />
                      <button type="button" onClick={() => removeIndustryOption(index)} className="p-3 text-error hover:bg-error-container/20 rounded-xl cursor-pointer">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Map Settings Tab */}
          {activeTab === 'map' && (
            <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
              <h2 className="font-headline-lg text-[22px] text-primary">Regional Presence Map Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Card Title">
                  <input className={inputClass} value={form.map?.title || ''} onChange={(e) => updateField('map.title', e.target.value)} />
                </Field>
                <Field label="Action Link Text">
                  <input className={inputClass} value={form.map?.linkText || ''} onChange={(e) => updateField('map.linkText', e.target.value)} />
                </Field>
              </div>
              <Field label="Short description paragraph">
                <textarea className={inputClass} rows={2} value={form.map?.description || ''} onChange={(e) => updateField('map.description', e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/20">
                <Field label="Static Map Image URL">
                  <input className={inputClass} value={form.map?.image || ''} onChange={(e) => updateField('map.image', e.target.value)} />
                </Field>
                <Field label="Google Map Embed URL (iframe src) - Optional">
                  <input className={inputClass} value={form.map?.embedUrl || ''} onChange={(e) => updateField('map.embedUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
                </Field>
                <Field label="Latitude (for query link)">
                  <input className={inputClass} value={form.map?.lat || ''} onChange={(e) => updateField('map.lat', e.target.value)} />
                </Field>
                <Field label="Longitude (for query link)">
                  <input className={inputClass} value={form.map?.lng || ''} onChange={(e) => updateField('map.lng', e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {/* Advisory Services Tab */}
          {activeTab === 'services' && (
            <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-lg text-[22px] text-primary">Expert Advisory Services</h2>
                  <p className="font-body-md text-on-surface-variant">The technical consultation cards shown in the dark section.</p>
                </div>
                <button type="button" onClick={addExpertServiceCard} className="px-5 py-3 border border-primary text-primary font-label-caps text-xs uppercase rounded-full hover:bg-primary/5 cursor-pointer">
                  Add Service Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Section Header Tag / Badge">
                  <input className={inputClass} value={form.expertServices?.badge || ''} onChange={(e) => updateField('expertServices.badge', e.target.value)} />
                </Field>
                <Field label="Section Heading Title">
                  <input className={inputClass} value={form.expertServices?.title || ''} onChange={(e) => updateField('expertServices.title', e.target.value)} />
                </Field>
              </div>

              <div className="space-y-6 pt-6 border-t border-outline-variant/20">
                {form.expertServices?.cards?.map((card, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-surface-container space-y-4 border border-outline-variant/20 relative">
                    <button type="button" onClick={() => removeExpertServiceCard(index)} className="absolute top-4 right-4 text-error font-label-caps text-xs uppercase hover:underline cursor-pointer">
                      Remove Card
                    </button>
                    <h4 className="font-label-caps text-xs text-primary uppercase">Card #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Material Symbol Icon">
                        <input className={inputClass} value={card.icon} onChange={(e) => updateArrayItem('expertServices.cards', index, 'icon', e.target.value)} />
                      </Field>
                      <Field label="Service Title">
                        <input className={inputClass} value={card.title} onChange={(e) => updateArrayItem('expertServices.cards', index, 'title', e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Card Description / Text">
                      <textarea className={inputClass} rows={2} value={card.description} onChange={(e) => updateArrayItem('expertServices.cards', index, 'description', e.target.value)} />
                    </Field>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trusted Tab */}
          {activeTab === 'trusted' && (
            <div className="space-y-6">
              {/* Trusted Logos */}
              <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-lg text-[22px] text-primary">Trusted By Badges</h2>
                    <p className="font-body-md text-on-surface-variant">Client/certificate labels displayed below the phone details.</p>
                  </div>
                  <button type="button" onClick={addTrustedLogo} className="px-4 py-2 border border-primary text-primary text-xs font-label-caps uppercase rounded-full hover:bg-primary/5 cursor-pointer">
                    Add Logo
                  </button>
                </div>
                <Field label="Trusted By Label">
                  <input className={inputClass} value={form.trustedBy?.label || ''} onChange={(e) => updateField('trustedBy.label', e.target.value)} />
                </Field>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {form.trustedBy?.logos?.map((logo, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        className={inputClass}
                        value={logo}
                        onChange={(e) => updateTrustedLogoText(index, e.target.value)}
                      />
                      <button type="button" onClick={() => removeTrustedLogo(index)} className="p-3 text-error hover:bg-error-container/20 rounded-xl cursor-pointer">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Decorative Image */}
              <div className="glass-card p-8 rounded-[32px] space-y-6 bg-surface-container-lowest border border-outline-variant/30">
                <h2 className="font-headline-lg text-[22px] text-primary">Background Decorative Styling</h2>
                <Field label="Background Image URL (Asymmetric Storytelling)">
                  <input className={inputClass} value={form.bgImage || ''} onChange={(e) => updateField('bgImage', e.target.value)} />
                </Field>
                {form.bgImage && (
                  <div className="w-full h-48 rounded-2xl overflow-hidden border border-outline-variant/40">
                    <img className="w-full h-full object-cover" src={form.bgImage} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-on-primary py-5 rounded-full font-label-caps uppercase tracking-widest disabled:opacity-60 cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl"
          >
            {saving ? 'Saving...' : 'Save Contact Page Configuration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactEditor;
