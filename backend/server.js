require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (/^http:\/\/localhost:\d+$/.test(origin) || origin.endsWith('.vercel.app') || origin === 'https://green-pellet.vercel.app') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/home',          require('./routes/home'));
app.use('/api/products',      require('./routes/products'));
app.use('/api/product-categories', require('./routes/categories'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/industries/config', require('./routes/industryConfig'));
app.use('/api/industries',    require('./routes/industries'));
app.use('/api/case-studies',  require('./routes/caseStudies'));
app.use('/api/testimonials',  require('./routes/testimonials'));
app.use('/api/newsletter',    require('./routes/newsletter'));
app.use('/api/about',         require('./routes/about'));
app.use('/api/why-biomass',   require('./routes/whyBiomass'));
app.use('/api/blogs',         require('./routes/blogRoutes'));
app.use('/api/contact',       require('./routes/contactRoutes'));


// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── MongoDB Connection ─────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green_pellet';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGO_URI);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;