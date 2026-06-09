import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AboutEditor from './pages/Admin/AdminAbout/AboutEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/about" element={<AboutEditor />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
