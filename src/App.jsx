import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Inscriptions from './pages/Inscriptions';
import Groups from './pages/Groups';
import Staff from './pages/Staff';
import Finance from './pages/Finance';
import Health from './pages/Health';
import Events from './pages/Events';
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inscripciones" element={<Inscriptions />} />
          <Route path="/grupos" element={<Groups />} />
          <Route path="/personal" element={<Staff />} />
          <Route path="/finanzas" element={<Finance />} />
          <Route path="/salud" element={<Health />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/inventario" element={<Inventory />} />
          <Route path="*" element={<div className="p-8 text-white">404 - Página no encontrada</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
