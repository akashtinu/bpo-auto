import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PrivateRoute, AdminRoute, GuestRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OrderCapture from './pages/OrderCapture';
import HowItWorks from './pages/HowItWorks';
import Portals from './pages/Portals';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

// Layout wrapper for public pages (with Navbar + Footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ flex: 1 }}>
      {children}
    </main>
    <Footer />
  </>
);

// Layout for dashboard pages (Navbar only, no Footer — dashboards handle own layout)
const DashboardLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/order-capture" element={<PublicLayout><OrderCapture /></PublicLayout>} />
            <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
            <Route path="/portals" element={<PublicLayout><Portals /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
            <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />
                        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />


            {/* ── Guest-only Routes (redirect if already logged in) ── */}
            <Route path="/login" element={<GuestRoute><PublicLayout><Login /></PublicLayout></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><PublicLayout><Register /></PublicLayout></GuestRoute>} />

            {/* ── Protected User Dashboard ── */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* ── Protected Admin Dashboard ── */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <AdminDashboard />
                  </DashboardLayout>
                </AdminRoute>
              }
            />

            {/* ── 404 Fallback ── */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '5rem', margin: 0, color: 'var(--primary)' }}>404</h1>
                    <h2>Page Not Found</h2>
                    <p style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist.</p>
                    <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
                </PublicLayout>
              }
            />
          </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
