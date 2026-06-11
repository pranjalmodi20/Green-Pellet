import React, { useEffect, useState, useCallback } from 'react';
import ContactHero from '../../components/contact/ContactHero';
import ContactInfo from '../../components/contact/ContactInfo';
import ContactForm from '../../components/contact/ContactForm';
import MapSection from '../../components/contact/MapSection';
import ExpertServices from '../../components/contact/ExpertServices';
import { fetchContactPage } from '../../services/contactService';

const DEFAULT_CONTACT_DATA = {
  hero: {
    badge: 'Connect with our experts',
    title: 'The Future of Energy is a',
    titleHighlight: 'Conversation',
    titleEnd: 'Away.',
    subtitle: 'From industrial logistics to sustainable fuel sourcing, we provide personalized consultations for enterprises ready to transition.'
  },
  contactInfo: {
    headquarters: {
      label: 'HEADQUARTERS',
      address: '12th Floor, Sustainability Tower,\nBusiness District, New Delhi, India',
      icon: 'location_on'
    },
    email: {
      label: 'EMAIL',
      primary: 'partnerships@greenpelletsindia.com',
      secondary: 'General: info@greenpelletsindia.com',
      icon: 'mail'
    },
    phone: {
      label: 'PHONE',
      number: '+91 (11) 4500-2300',
      hours: 'Available Mon-Sat: 9AM - 7PM IST',
      icon: 'call'
    }
  },
  trustedBy: {
    label: 'TRUSTED BY',
    logos: ['ECO-CERT', 'ISO 9001', 'B-CORP']
  },
  form: {
    title: 'Submit Inquiry',
    responseTime: 'Average response: 4 hours',
    submitButtonText: 'Send Inquiry',
    industries: ['Power Generation', 'Heavy Manufacturing', 'Textile & Apparel', 'FMCG Logistics', 'Other']
  },
  bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZHVGdU3YL1-2PcNfR03y7ck1zis552_4P-TFRfc7vQP2uCW0UB-696NyvhMDdhcvy44wOvMzqYmCtM1dZWcdDVXMRt1QK329GfLcSwTwOxjBwddHU5u53t4iusG54OhykI2gLQ-s_B7R_tOvl11B8Kopku1O__bmDMbCRTjPiIPJhVg9n_T4SvoFIXJwG5RDyUwLPNHFFUHzWw3bW6hJcH3_9uUh9Kr3xPmBLFg5wmmczdqFjlpCf6T7UxBYQb_Z8tSLig_qMd94',
  map: {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT6dXQGykvWPYtgA2cLDByeVK1Oao7jD2G9pc8k_sIrGwhEzxcPxP_cSIJWgMmxx5bArLBnMi15YSuICGVY5cnP3KlXwFDPSVGl55He7X20qbbx0P5-AHHj2AVsK2vDf6VQRHjJwIy116OQSxkhVpfMIuN5ejWSgfkHXeOKpHJHiW0kVbJh3k2UKq7OU7pfgz-TsrFymaxB-2fd7bDAtRuU913GJbh53xSi7PhFuJuHUIEYXyPUITGUMo4x8MBrZ76yIW225zjxM4',
    title: 'Regional Presence',
    description: 'Strategically located to manage our 4 nationwide production facilities and global logistics partnerships.',
    linkText: 'VIEW ALL LOCATIONS',
    embedUrl: '',
    lat: '28.6139',
    lng: '77.2090'
  },
  expertServices: {
    badge: 'Consultation',
    title: 'Expert Advisory Services',
    cards: [
      { icon: 'engineering', title: 'Technical Integration', description: 'On-site assessments for switching traditional boilers to biomass pellet systems.' },
      { icon: 'inventory_2', title: 'Logistics Planning', description: 'Customized delivery schedules and inventory management for high-volume users.' }
    ]
  }
};

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadContactPage = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchContactPage();
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty configuration');
      }
      setContactData(data);
    } catch (err) {
      console.error('Failed to load contact page:', err);
      setContactData(DEFAULT_CONTACT_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContactPage();
  }, [loadContactPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant">Loading Contact Page...</p>
        </div>
      </div>
    );
  }

  const displayData = contactData || DEFAULT_CONTACT_DATA;

  return (
    <div className="w-full">

      {/* Hero Section */}
      <ContactHero hero={displayData.hero} />

      {/* Main Inquiry Section */}
      <section className="relative max-w-container-max-width mx-auto px-grid-margin-desktop pb-section-gap-desktop overflow-visible">
        <div className="grid grid-cols-12 gap-grid-gutter relative z-10">
          <ContactInfo 
            contactInfo={displayData.contactInfo} 
            trustedBy={displayData.trustedBy} 
          />
          <ContactForm 
            formConfig={displayData.form} 
          />
        </div>

        {/* Background Decorative Image (Asymmetric Storytelling) */}
        {displayData.bgImage && (
          <div className="absolute -bottom-24 -left-32 w-2/3 h-[500px] -z-10 rounded-[120px] overflow-hidden opacity-50">
            <img
              className="w-full h-full object-cover"
              src={displayData.bgImage}
              alt="Decorative enterprise background"
            />
          </div>
        )}
      </section>

      {/* Map Section */}
      <MapSection mapConfig={displayData.map} />

      {/* Expert Services Section */}
      <ExpertServices expertServices={displayData.expertServices} />
    </div>
  );
};

export default Contact;