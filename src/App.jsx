// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import AttendeeOrder from './pages/AttendeeOrder';
import AttendeeStatus from './pages/AttendeeStatus';
import AdminDashboard from './pages/AdminDashboard';
import AdminQRGenerator from './pages/AdminQRGenerator';
import AdminStands from './pages/AdminStands';
import AdminMenu from './pages/AdminMenu';
import CateringDashboard from './pages/CateringDashboard';
import CateringOrders from './pages/CateringOrders';

import { ColorModeProvider } from './context/ThemeContext';

function App() {
  return (
    <ColorModeProvider>
      <RoleProvider>
        <Router>
          <Routes>
            {/* Public Landing */}
            <Route path="/" element={<Landing />} />

            {/* Attendee Routes */}
            <Route path="/attendee/order" element={<Layout><AttendeeOrder /></Layout>} />
            <Route path="/attendee/status" element={<Layout><AttendeeStatus /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/qr-generator" element={<Layout><AdminQRGenerator /></Layout>} />
            <Route path="/admin/stands" element={<Layout><AdminStands /></Layout>} />
            <Route path="/admin/menu" element={<Layout><AdminMenu /></Layout>} />

            {/* Catering Routes */}
            <Route path="/catering" element={<Layout><CateringDashboard /></Layout>} />
            <Route path="/catering/orders" element={<Layout><CateringOrders /></Layout>} />
          </Routes>
        </Router>
      </RoleProvider>
    </ColorModeProvider>
  );
}

export default App;