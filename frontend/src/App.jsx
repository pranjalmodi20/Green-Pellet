import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AboutEditor from './pages/Admin/AdminAbout/AboutEditor';
import WhyBiomass from './pages/WhyBiomass/WhyBiomass';
import WhyBiomassEditor from './pages/Admin/AdminWhyBiomass/WhyBiomassEditor';
import Products from './pages/Products/Products';
import ProductEditor from './pages/Admin/AdminProducts/ProductEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/about" element={<AboutEditor />} />
        <Route path="/admin/why-biomass" element={<WhyBiomassEditor />} />
        <Route path="/admin/products" element={<ProductEditor />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/why-biomass" element={<WhyBiomass />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
