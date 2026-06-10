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
import Industries from './pages/Industries/Industries';
import IndustriesEditor from './pages/Admin/AdminIndustries/IndustriesEditor';
import Blogs from './pages/Blogs/Blogs';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import BlogEditor from './pages/Admin/AdminBlog/BlogEditor';
import Contact from './pages/Contact/Contact';
import ContactEditor from './pages/Admin/AdminContact/ContactEditor';
import ContactSubmissions from './pages/Admin/AdminContact/ContactSubmissions';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/about" element={<AboutEditor />} />
        <Route path="/admin/why-biomass" element={<WhyBiomassEditor />} />
        <Route path="/admin/products" element={<ProductEditor />} />
        <Route path="/admin/industries" element={<IndustriesEditor />} />
        <Route path="/admin/blogs" element={<BlogEditor />} />
        <Route path="/admin/contact" element={<ContactEditor />} />
        <Route path="/admin/contact/submissions" element={<ContactSubmissions />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/why-biomass" element={<WhyBiomass />} />
                <Route path="/products" element={<Products />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogDetails />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
