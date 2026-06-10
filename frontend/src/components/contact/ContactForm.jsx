import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motionVariants';
import { submitContactInquiry } from '../../services/contactService';

const ContactForm = ({ formConfig }) => {
  const { title, responseTime, submitButtonText, industries } = formConfig || {
    title: 'Submit Inquiry',
    responseTime: 'Average response: 4 hours',
    submitButtonText: 'Send Inquiry',
    industries: ['Power Generation', 'Heavy Manufacturing', 'Textile & Apparel', 'FMCG Logistics', 'Other'],
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    industry: industries && industries.length > 0 ? industries[0] : 'Other',
    tonnage: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName, value) => {
    if (!value) {
      setFocusedField('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setResponseMsg('');

    try {
      const response = await submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        industry: formData.industry,
        tonnage: formData.tonnage,
        message: formData.message,
      });

      setSubmitStatus('success');
      setResponseMsg(response.message || 'Inquiry submitted successfully. We will get back to you shortly.');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        industry: industries && industries.length > 0 ? industries[0] : 'Other',
        tonnage: '',
        message: '',
      });
      setFocusedField('');
    } catch (error) {
      setSubmitStatus('error');
      const backendErrors = error.response?.data?.errors;
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setResponseMsg(Array.isArray(backendErrors) ? backendErrors.join(', ') : errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="col-span-12 lg:col-span-7"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-panel p-8 lg:p-16 rounded-[48px] shadow-2xl relative">
        {/* Response Time Indicator */}
        {responseTime && (
          <div className="absolute -top-6 right-8 lg:right-16 bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-tertiary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-on-tertiary-fixed"></span>
            </span>
            <span className="font-technical-data text-technical-data">{responseTime}</span>
          </div>
        )}

        <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg mb-12">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                className={`font-label-caps text-label-caps uppercase transition-colors duration-300 ${
                  focusedField === 'fullName' || formData.fullName ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => handleFocus('fullName')}
                onBlur={() => handleBlur('fullName', formData.fullName)}
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant font-body-md text-body-md"
                placeholder="John Doe"
                type="text"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                className={`font-label-caps text-label-caps uppercase transition-colors duration-300 ${
                  focusedField === 'email' || formData.email ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Company Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email', formData.email)}
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant font-body-md text-body-md"
                placeholder="john@enterprise.com"
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Industry */}
            <div className="space-y-2">
              <label
                className={`font-label-caps text-label-caps uppercase transition-colors duration-300 ${
                  focusedField === 'industry' || formData.industry ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                onFocus={() => handleFocus('industry')}
                onBlur={() => handleBlur('industry', formData.industry)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-all font-body-md text-body-md"
              >
                {industries && industries.map((ind, index) => (
                  <option key={index} className="bg-surface text-on-surface">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Tonnage */}
            <div className="space-y-2">
              <label
                className={`font-label-caps text-label-caps uppercase transition-colors duration-300 ${
                  focusedField === 'tonnage' || formData.tonnage ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Annual Tonnage Requirement
              </label>
              <input
                name="tonnage"
                value={formData.tonnage}
                onChange={handleChange}
                onFocus={() => handleFocus('tonnage')}
                onBlur={() => handleBlur('tonnage', formData.tonnage)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant font-body-md text-body-md"
                placeholder="e.g. 500+ Metric Tons"
                type="text"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              className={`font-label-caps text-label-caps uppercase transition-colors duration-300 ${
                focusedField === 'message' || formData.message ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              Message / Inquiry Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={() => handleBlur('message', formData.message)}
              required
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant font-body-md text-body-md resize-none"
              placeholder="How can our energy solutions serve your organization?"
              rows="4"
            />
          </div>

          {submitStatus && (
            <div
              className={`p-4 rounded-xl text-body-md ${
                submitStatus === 'success' ? 'bg-primary-container/20 text-primary-container' : 'bg-error-container/20 text-error'
              }`}
            >
              {responseMsg}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <button
              disabled={isSubmitting}
              className="group flex items-center justify-between w-full lg:w-auto lg:min-w-[280px] bg-primary text-white font-label-caps text-label-caps py-6 px-10 rounded-full hover:bg-tertiary-container hover:text-on-tertiary-container transition-all duration-500 shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? 'Sending...' : submitButtonText}
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
