import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchContactSubmissions,
  updateContactSubmission,
  deleteContactSubmission,
} from '../../../services/contactService';
import { adminLogin } from '../../../services/aboutService';

const TOKEN_KEY = 'adminToken';

const ContactSubmissions = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected detail modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [savingDetails, setSavingDetails] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('new');

  const loadSubmissions = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchContactSubmissions(
        { status: statusFilter, search: searchQuery },
        token
      );
      setSubmissions(data);
    } catch (err) {
      setError('Failed to fetch contact submissions.');
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, searchQuery]);

  useEffect(() => {
    if (token) {
      loadSubmissions();
    } else {
      setLoading(false);
    }
  }, [token, loadSubmissions]);

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
    setSubmissions([]);
  };

  const handleOpenDetail = (inquiry) => {
    setSelectedInquiry(inquiry);
    setEditNotes(inquiry.notes || '');
    setEditStatus(inquiry.status || 'new');
  };

  const handleCloseDetail = () => {
    setSelectedInquiry(null);
  };

  const handleUpdateInquiry = async (e) => {
    e.preventDefault();
    if (!selectedInquiry || !token) return;
    setSavingDetails(true);
    try {
      const updated = await updateContactSubmission(
        selectedInquiry._id,
        { status: editStatus, notes: editNotes },
        token
      );
      // Update local state list
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === updated._id ? updated : sub))
      );
      setSelectedInquiry(updated);
      alert('Inquiry updated successfully.');
    } catch (err) {
      alert('Failed to update inquiry.');
    } finally {
      setSavingDetails(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission? This action is permanent.')) {
      return;
    }
    try {
      await deleteContactSubmission(id, token);
      setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(null);
      }
      alert('Submission deleted successfully.');
    } catch (err) {
      alert('Failed to delete submission.');
    }
  };

  // Stats
  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === 'new').length;
  const contactedCount = submissions.filter((s) => s.status === 'contacted').length;
  const closedCount = submissions.filter((s) => s.status === 'closed').length;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4 mt-20">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-surface-container p-8 lg:p-12 rounded-[32px] shadow-2xl border border-outline-variant/30 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-headline-lg text-[28px] text-primary">Admin Access</h1>
            <p className="font-body-md text-on-surface-variant">Sign in to view contact form submissions</p>
          </div>
          {loginError && (
            <div className="p-4 bg-error-container/20 text-error rounded-xl font-body-md text-center">{loginError}</div>
          )}
          <label className="block space-y-2">
            <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Email Address</span>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface focus:outline-none"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="admin@greenpellets.in"
            />
          </label>
          <label className="block space-y-2">
            <span className="font-label-caps text-label-caps text-primary text-xs uppercase tracking-widest">Password</span>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface focus:outline-none"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-label-caps uppercase hover:bg-tertiary-container hover:text-on-tertiary-container transition-all cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-grid-margin-desktop py-12 mt-20">
      <div className="max-w-container-max-width mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">Inquiries & Leads</h1>
            <p className="font-body-md text-on-surface-variant">Review enterprise inquiries, track response statuses, and document follow-up notes.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/contact" className="px-6 py-3 bg-secondary-container text-on-secondary-container hover:bg-primary-container hover:text-on-primary-container transition-all rounded-full font-label-caps text-xs uppercase text-center">
              Page Editor
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 bg-error-container/20 text-error hover:bg-error-container/40 transition-all rounded-full font-label-caps text-xs uppercase cursor-pointer">
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-error-container/20 text-error rounded-2xl font-body-md border border-error/20 text-center">{error}</div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-surface-container rounded-[24px] border border-outline-variant/20">
            <div className="font-label-caps text-xs text-on-surface-variant mb-1">TOTAL LEADS</div>
            <div className="font-headline-lg text-[32px] text-primary">{totalCount}</div>
          </div>
          <div className="p-6 bg-surface-container rounded-[24px] border border-outline-variant/20">
            <div className="font-label-caps text-xs text-on-surface-variant mb-1">NEW INQUIRIES</div>
            <div className="font-headline-lg text-[32px] text-tertiary-container">{newCount}</div>
          </div>
          <div className="p-6 bg-surface-container rounded-[24px] border border-outline-variant/20">
            <div className="font-label-caps text-xs text-on-surface-variant mb-1">CONTACTED</div>
            <div className="font-headline-lg text-[32px] text-primary-container">{contactedCount}</div>
          </div>
          <div className="p-6 bg-surface-container rounded-[24px] border border-outline-variant/20">
            <div className="font-label-caps text-xs text-on-surface-variant mb-1">CLOSED</div>
            <div className="font-headline-lg text-[32px] text-on-surface-variant">{closedCount}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/20">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('')}
              className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase transition-all cursor-pointer ${
                statusFilter === ''
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setStatusFilter('new')}
              className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase transition-all cursor-pointer ${
                statusFilter === 'new'
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              New
            </button>
            <button
              onClick={() => setStatusFilter('contacted')}
              className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase transition-all cursor-pointer ${
                statusFilter === 'contacted'
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => setStatusFilter('closed')}
              className={`px-5 py-2.5 rounded-full font-label-caps text-[11px] uppercase transition-all cursor-pointer ${
                statusFilter === 'closed'
                  ? 'bg-primary text-white'
                  : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              Closed
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, company, email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline-variant/40 bg-surface font-body-md text-on-surface text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
          </div>
        </div>

        {/* List of submissions */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="font-body-md text-on-surface-variant">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center bg-surface-container rounded-[32px] border border-outline-variant/20">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">
              mail_outline
            </span>
            <p className="font-headline-lg text-[20px] text-primary">No submissions found</p>
            <p className="font-body-md text-on-surface-variant">Try adjusting filters or search query.</p>
          </div>
        ) : (
          <div className="bg-surface-container rounded-[32px] border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-label-caps text-xs text-on-surface-variant uppercase bg-surface-container-high/50">
                    <th className="p-6">Client Name</th>
                    <th className="p-6">Company / Industry</th>
                    <th className="p-6">Tonnage Req</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Submitted At</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 font-body-md text-on-surface">
                  {submissions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="hover:bg-surface-container-high/20 transition-all cursor-pointer"
                      onClick={() => handleOpenDetail(sub)}
                    >
                      <td className="p-6">
                        <div className="font-semibold">{sub.fullName}</div>
                        <div className="text-xs text-on-surface-variant">{sub.email}</div>
                        {sub.phone && <div className="text-xs text-on-surface-variant">{sub.phone}</div>}
                      </td>
                      <td className="p-6">
                        <div>{sub.company || 'N/A'}</div>
                        <div className="text-xs text-on-surface-variant uppercase tracking-wider">{sub.industry}</div>
                      </td>
                      <td className="p-6 font-semibold">{sub.tonnage || 'N/A'}</td>
                      <td className="p-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            sub.status === 'new'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : sub.status === 'contacted'
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-6 text-xs text-on-surface-variant">
                        {new Date(sub.createdAt).toLocaleString()}
                      </td>
                      <td className="p-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenDetail(sub)}
                          className="px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-semibold rounded-lg transition-all"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(sub._id)}
                          className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal Overlay */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-surface rounded-[40px] shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 lg:p-8 bg-surface-container border-b border-outline-variant/20 flex justify-between items-start">
                <div>
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">
                    Submission Detail
                  </span>
                  <h3 className="font-headline-lg text-[22px] text-primary">{selectedInquiry.fullName}</h3>
                </div>
                <button
                  onClick={handleCloseDetail}
                  className="p-2 hover:bg-surface-container-high rounded-full transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 lg:p-8 overflow-y-auto space-y-6 flex-1">
                <div className="grid grid-cols-2 gap-4 text-sm bg-surface-container-low p-6 rounded-2xl">
                  <div>
                    <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Email Address</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="font-body-md font-semibold text-primary hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Phone</span>
                    <span className="font-body-md font-semibold">{selectedInquiry.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Company</span>
                    <span className="font-body-md font-semibold">{selectedInquiry.company || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Industry</span>
                    <span className="font-body-md font-semibold">{selectedInquiry.industry || 'N/A'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Annual Tonnage Requirement</span>
                    <span className="font-body-md font-semibold">{selectedInquiry.tonnage || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Message / Inquiry Details</span>
                  <div className="p-6 bg-surface-container rounded-2xl font-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleUpdateInquiry} className="space-y-4 border-t border-outline-variant/20 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block space-y-2">
                      <span className="font-label-caps text-[10px] text-primary uppercase">Response Status</span>
                      <select
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface text-sm focus:outline-none"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed / Solved</option>
                      </select>
                    </label>
                  </div>
                  <label className="block space-y-2">
                    <span className="font-label-caps text-[10px] text-primary uppercase">Internal Admin Notes</span>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low font-body-md text-on-surface text-sm focus:outline-none resize-none"
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add phone call log, contract proposal detail..."
                    />
                  </label>
                  <div className="flex gap-3 justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteInquiry(selectedInquiry._id)}
                      className="px-5 py-3 border border-error text-error hover:bg-error-container/20 rounded-full font-label-caps text-xs uppercase cursor-pointer transition-all"
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      disabled={savingDetails}
                      className="px-6 py-3 bg-primary text-white hover:bg-tertiary-container hover:text-on-tertiary-container rounded-full font-label-caps text-xs uppercase cursor-pointer disabled:opacity-50 transition-all"
                    >
                      {savingDetails ? 'Saving...' : 'Update Lead'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactSubmissions;
