import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PrivateRoute, AdminRoute, GuestRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import floatingImage from './assets/automation-Ba47pPjZ.png';

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
import TermsConditions from './pages/TermsConditions'
import Checkout from  './pages/Checkout'

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastProvider } from './components/Toast';
import { ScrollRevealObserver } from './components/ScrollReveal';

import './App.css';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AdRd-MNWRwMbiLzo5I0jcR0u1u9RmLvW2N_Cm_8dFnRSl7WvVelPl1qqSdIL6B-3WfqfwvipM2wk6gTW';

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
  const [scrollRotation, setScrollRotation] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const ratio = Math.min(window.scrollY / maxScroll, 1);
      const rotation = (ratio * 180 - 90) * 200;
      setScrollRotation(rotation);
      setScrollProgress(ratio * 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (

    <BrowserRouter>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <ScrollRevealObserver />
      <img
        src={floatingImage}
        alt=""
        className="scroll-rotating-image"
        style={{ transform: `rotate(${scrollRotation}deg)` }}
      />
      <ToastProvider>
        <PayPalScriptProvider
          options={{
            "client-id": PAYPAL_CLIENT_ID || "sb",
            currency: "USD"
          }}
          deferLoading={!PAYPAL_CLIENT_ID}
        >
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
                  <Route path="/terms-conditions" element={<PublicLayout><TermsConditions /></PublicLayout>} />
                  <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />

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
        </PayPalScriptProvider>
      </ToastProvider>
    </BrowserRouter>
    
  );
}

export default App;
