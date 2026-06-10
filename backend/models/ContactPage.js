const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'Connect with our experts' },
    title: { type: String, default: 'The Future of Energy is a' },
    titleHighlight: { type: String, default: 'Conversation' },
    titleEnd: { type: String, default: 'Away.' },
    subtitle: { type: String, default: 'From industrial logistics to sustainable fuel sourcing, we provide personalized consultations for enterprises ready to transition.' }
  },
  contactInfo: {
    headquarters: {
      label: { type: String, default: 'HEADQUARTERS' },
      address: { type: String, default: '12th Floor, Sustainability Tower, Business District, New Delhi, India' },
      icon: { type: String, default: 'location_on' }
    },
    email: {
      label: { type: String, default: 'EMAIL' },
      primary: { type: String, default: 'partnerships@greenpelletsindia.com' },
      secondary: { type: String, default: 'General: info@greenpelletsindia.com' },
      icon: { type: String, default: 'mail' }
    },
    phone: {
      label: { type: String, default: 'PHONE' },
      number: { type: String, default: '+91 (11) 4500-2300' },
      hours: { type: String, default: 'Available Mon-Sat: 9AM - 7PM IST' },
      icon: { type: String, default: 'call' }
    }
  },
  trustedBy: {
    label: { type: String, default: 'TRUSTED BY' },
    logos: { type: [String], default: ['ECO-CERT', 'ISO 9001', 'B-CORP'] }
  },
  form: {
    title: { type: String, default: 'Submit Inquiry' },
    responseTime: { type: String, default: 'Average response: 4 hours' },
    submitButtonText: { type: String, default: 'Send Inquiry' },
    industries: { type: [String], default: ['Power Generation', 'Heavy Manufacturing', 'Textile & Apparel', 'FMCG Logistics', 'Other'] }
  },
  bgImage: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZHVGdU3YL1-2PcNfR03y7ck1zis552_4P-TFRfc7vQP2uCW0UB-696NyvhMDdhcvy44wOvMzqYmCtM1dZWcdDVXMRt1QK329GfLcSwTwOxjBwddHU5u53t4iusG54OhykI2gLQ-s_B7R_tOvl11B8Kopku1O__bmDMbCRTjPiIPJhVg9n_T4SvoFIXJwG5RDyUwLPNHFFUHzWw3bW6hJcH3_9uUh9Kr3xPmBLFg5wmmczdqFjlpCf6T7UxBYQb_Z8tSLig_qMd94' },
  map: {
    image: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT6dXQGykvWPYtgA2cLDByeVK1Oao7jD2G9pc8k_sIrGwhEzxcPxP_cSIJWgMmxx5bArLBnMi15YSuICGVY5cnP3KlXwFDPSVGl55He7X20qbbx0P5-AHHj2AVsK2vDf6VQRHjJwIy116OQSxkhVpfMIuN5ejWSgfkHXeOKpHJHiW0kVbJh3k2UKq7OU7pfgz-TsrFymaxB-2fd7bDAtRuU913GJbh53xSi7PhFuJuHUIEYXyPUITGUMo4x8MBrZ76yIW225zjxM4' },
    title: { type: String, default: 'Regional Presence' },
    description: { type: String, default: 'Strategically located to manage our 4 nationwide production facilities and global logistics partnerships.' },
    linkText: { type: String, default: 'VIEW ALL LOCATIONS' },
    embedUrl: { type: String, default: '' },
    lat: { type: String, default: '28.6139' },
    lng: { type: String, default: '77.2090' }
  },
  expertServices: {
    badge: { type: String, default: 'Consultation' },
    title: { type: String, default: 'Expert Advisory Services' },
    cards: [{
      icon: { type: String, default: 'engineering' },
      title: { type: String, default: 'Technical Integration' },
      description: { type: String, default: 'On-site assessments for switching traditional boilers to biomass pellet systems.' }
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactPage', contactPageSchema);
