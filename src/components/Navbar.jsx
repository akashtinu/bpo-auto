import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Menu, X, LogOut, LayoutDashboard, User,
  Linkedin, Instagram, Mail, ShoppingCart, Search
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Order Capture', path: '/order-capture' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contacts', path: '/contact' },
  ];

  return (
    <header className="site-header">
      {/* ─── Top Bar ─── */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          {/* Social Icons */}
          <div className="top-bar-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href="mailto:info@bpoautoaccept.com" className="social-icon" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>

          {/* Top Bar Right */}
          <div className="top-bar-right">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="top-bar-btn">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="top-bar-btn logout-btn">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="top-bar-btn login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ─── Main Navbar ─── */}
      <nav className="main-navbar">
        <div className="container nav-wrapper">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L4 20h6v20h10V30h8v10h10V20h6L24 4z" fill="var(--primary)" stroke="var(--text-bright)" strokeWidth="1.5"/>
                <rect x="18" y="16" width="5" height="6" rx="1" fill="var(--text-bright)" opacity="0.85"/>
                <rect x="25" y="16" width="5" height="6" rx="1" fill="var(--text-bright)" opacity="0.85"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-bpo">BPO</span>
              <span className="logo-acceptor">Acceptor</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions (Cart + Search) */}
          <div className="nav-actions">
            <Link to="/cart" className="nav-action-icon cart-icon" aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button
              className="nav-action-icon"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="mobile-toggle-btn" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Search Bar Dropdown */}
        {showSearch && (
          <div className="search-dropdown">
            <div className="container" style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search pages, portals, FAQs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{ flex: 1 }}
              />
              <button onClick={() => setShowSearch(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Mobile Menu ─── */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-menu-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

          {/* Mobile Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0' }}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
            <a href="mailto:info@bpoautoaccept.com" className="social-icon"><Mail size={18} /></a>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ color: 'var(--text-bright)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} /> {user.name}
              </div>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-secondary" onClick={toggleMobileMenu}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-primary" onClick={toggleMobileMenu}>Login</Link>
              <Link to="/register" className="btn btn-secondary" onClick={toggleMobileMenu}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
