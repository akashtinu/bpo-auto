import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Settings, FileText, Receipt, LogOut, Plus,
  Trash2, CheckCircle, Clock, AlertCircle, X, RefreshCw, DollarSign, Activity, Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const PORTALS_LIST = [
  'Voxtur', 'Xome', 'Clear Capital', 'Solidifi', 'LRES',
  'Valuation Connect', 'Proteck', 'First American', 'Realty Pilot',
  'Estreet Appraisal', 'Valuenet Groundworks', 'RRR', 'Altisource',
  'ServiceLink', 'National BPO Group'
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Portal form state
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [portalForm, setPortalForm] = useState({ portal_name: '', portal_username: '', portal_password: '', min_fee: '', zip_codes: '', order_type: 'standard', status: 'active', id: null });

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [o, i, p] = await Promise.all([
        api.get('/api/orders'),
        api.get('/api/invoices'),
        api.get('/api/portals')
      ]);
      setOrders(o.orders || []);
      setInvoices(i.invoices || []);
      setPortals(p.portals || []);
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePortalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/portals', portalForm);
      showMsg('success', portalForm.id ? 'Portal updated successfully.' : 'Portal added successfully.');
      setShowPortalModal(false);
      setPortalForm({ portal_name: '', portal_username: '', portal_password: '', min_fee: '', zip_codes: '', order_type: 'standard', status: 'active', id: null });
      await loadData();
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePortal = async (id) => {
    if (!window.confirm('Delete this portal configuration?')) return;
    try {
      await api.delete(`/api/portals?id=${id}`);
      showMsg('success', 'Portal configuration deleted.');
      await loadData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handlePayInvoice = async (invoiceId) => {
    if (!window.confirm('Mark this invoice as paid?')) return;
    try {
      await api.post('/api/invoices/pay', { invoice_id: invoiceId });
      showMsg('success', 'Payment recorded successfully.');
      await loadData();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const openEditPortal = (portal) => {
    setPortalForm({ ...portal, portal_password: '' });
    setShowPortalModal(true);
  };

  const totalEarnings = orders.reduce((s, o) => s + parseFloat(o.fee || 0), 0);
  const acceptedOrders = orders.filter(o => o.status === 'accepted').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const unpaidInvoices = invoices.filter(i => i.status === 'unpaid');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'portals', label: 'Portal Config', icon: <Settings size={18} /> },
    { id: 'orders', label: 'Orders Log', icon: <Activity size={18} /> },
    { id: 'invoices', label: 'Invoices', icon: <Receipt size={18} /> },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Client Portal</p>
          <p style={{ color: 'var(--text-bright)', fontWeight: 600, fontSize: '0.95rem' }}>{user?.name}</p>
          <span className={`badge ${user?.status === 'active' ? 'badge-success' : user?.status === 'trial' ? 'badge-warning' : 'badge-danger'}`} style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>{user?.status || 'Active'}</span>
        </div>

        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`sidebar-link ${activeTab === tab.id ? 'active' : ''}`}
            style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'none', fontFamily: 'inherit', textAlign: 'left' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'none', fontFamily: 'inherit', textAlign: 'left', color: 'var(--danger)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Toast */}
        {msg.text && (
          <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 999, padding: '1rem 1.5rem', borderRadius: '10px', background: msg.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`, color: msg.type === 'success' ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', maxWidth: '380px' }}>
            {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span style={{ fontSize: '0.9rem' }}>{msg.text}</span>
            <button onClick={() => setMsg({ type: '', text: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 'auto' }}><X size={16} /></button>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Dashboard Overview</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back, {user?.name?.split(' ')[0]}</p>
              </div>
              <button onClick={loadData} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            <div className="stat-grid">
              <div className="glass-card stat-card">
                <span className="stat-title">Total Orders Captured</span>
                <span className="stat-value" style={{ color: 'var(--primary)' }}>{orders.length}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Active Orders</span>
                <span className="stat-value" style={{ color: 'var(--warning)' }}>{acceptedOrders}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Completed Orders</span>
                <span className="stat-value" style={{ color: 'var(--success)' }}>{completedOrders}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Total Fees Earned</span>
                <span className="stat-value">${totalEarnings.toFixed(2)}</span>
              </div>
            </div>

            {/* Unpaid Invoices Warning */}
            {unpaidInvoices.length > 0 && (
              <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <AlertCircle size={22} style={{ color: 'var(--warning)', flexShrink: 0 }} />
                <div>
                  <p style={{ color: 'var(--warning)', fontWeight: 600 }}>You have {unpaidInvoices.length} unpaid invoice{unpaidInvoices.length > 1 ? 's' : ''}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Please check the Invoices tab and complete payment to avoid service interruption.</p>
                </div>
                <button onClick={() => setActiveTab('invoices')} className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>View Invoices</button>
              </div>
            )}

            {/* Recent Orders */}
            <h3 style={{ marginBottom: '1rem' }}>Recent Orders</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Portal</th>
                    <th>Property</th>
                    <th>Fee</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)' }}>{o.order_external_id}</td>
                      <td>{o.portal_name}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.property_address}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 600 }}>${parseFloat(o.fee).toFixed(2)}</td>
                      <td><span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{o.type}</span></td>
                      <td>
                        <span className={`badge ${o.status === 'completed' ? 'badge-success' : o.status === 'accepted' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(o.captured_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No orders yet. Configure your portals to start capturing.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Portal Config Tab */}
        {activeTab === 'portals' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Portal Configurations</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your BPO portal credentials and order preferences</p>
              </div>
              <button onClick={() => { setPortalForm({ portal_name: '', portal_username: '', portal_password: '', min_fee: '', zip_codes: '', order_type: 'standard', status: 'active', id: null }); setShowPortalModal(true); }} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                <Plus size={16} /> Add Portal
              </button>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Portal</th>
                    <th>Username</th>
                    <th>Min Fee</th>
                    <th>ZIP Codes</th>
                    <th>Order Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portals.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{p.portal_name}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{p.portal_username}</td>
                      <td style={{ color: 'var(--success)' }}>${parseFloat(p.min_fee || 0).toFixed(2)}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.zip_codes || '—'}</td>
                      <td><span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{p.order_type}</span></td>
                      <td>
                        <span className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>{p.status}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEditPortal(p)} className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}>Edit</button>
                          <button onClick={() => handleDeletePortal(p.id)} className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {portals.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>
                      No portals configured yet. Click "Add Portal" to get started.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Orders Log</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{orders.length} total orders captured</p>
              </div>
              <button onClick={loadData} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Portal</th>
                    <th>Property Address</th>
                    <th>Fee Earned</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Captured At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)' }}>{o.order_external_id}</td>
                      <td style={{ fontWeight: 600 }}>{o.portal_name}</td>
                      <td style={{ fontSize: '0.88rem' }}>{o.property_address}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 600 }}>${parseFloat(o.fee).toFixed(2)}</td>
                      <td><span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{o.type}</span></td>
                      <td>
                        <span className={`badge ${o.status === 'completed' ? 'badge-success' : o.status === 'accepted' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(o.captured_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No orders captured yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Invoices & Billing</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>View and pay your weekly service invoices</p>
              </div>
            </div>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Due Date</th>
                    <th>Paid At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary)' }}>{inv.invoice_number}</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-bright)' }}>${parseFloat(inv.amount).toFixed(2)}</td>
                      <td>
                        <span className={`badge ${inv.status === 'paid' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(inv.created_at).toLocaleDateString()}</td>
                      <td style={{ fontSize: '0.85rem' }}>{inv.due_date}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.paid_at ? new Date(inv.paid_at).toLocaleDateString() : '—'}</td>
                      <td>
                        {inv.status === 'unpaid' ? (
                          <button onClick={() => handlePayInvoice(inv.id)} className="btn btn-primary" style={{ padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}>
                            <DollarSign size={13} /> Pay Now
                          </button>
                        ) : (
                          <span style={{ color: 'var(--success)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle size={14} /> Paid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No invoices yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Portal Modal */}
        {showPortalModal && (
          <div className="modal-overlay" onClick={() => setShowPortalModal(false)}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowPortalModal(false)}><X size={22} /></button>
              <h3 style={{ marginBottom: '1.5rem' }}>{portalForm.id ? 'Edit Portal' : 'Add New Portal'}</h3>
              <form onSubmit={handlePortalSubmit}>
                <div className="form-group">
                  <label className="form-label">Portal Name *</label>
                  <select className="form-input" value={portalForm.portal_name} onChange={e => setPortalForm({ ...portalForm, portal_name: e.target.value })} required>
                    <option value="">Select portal...</option>
                    {PORTALS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Portal Username *</label>
                  <input className="form-input" type="text" placeholder="Your portal login username" value={portalForm.portal_username} onChange={e => setPortalForm({ ...portalForm, portal_username: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Portal Password {portalForm.id ? '(leave blank to keep existing)' : '*'}</label>
                  <input className="form-input" type="password" placeholder="Your portal login password" value={portalForm.portal_password} onChange={e => setPortalForm({ ...portalForm, portal_password: e.target.value })} required={!portalForm.id} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Minimum Fee ($)</label>
                    <input className="form-input" type="number" min="0" step="0.01" placeholder="e.g. 55.00" value={portalForm.min_fee} onChange={e => setPortalForm({ ...portalForm, min_fee: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Type</label>
                    <select className="form-input" value={portalForm.order_type} onChange={e => setPortalForm({ ...portalForm, order_type: e.target.value })}>
                      <option value="standard">Standard ($3/order)</option>
                      <option value="conditional">Conditional ($4/order)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Target ZIP Codes (comma-separated)</label>
                  <input className="form-input" type="text" placeholder="e.g. 32801, 32802, 32803" value={portalForm.zip_codes} onChange={e => setPortalForm({ ...portalForm, zip_codes: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={portalForm.status} onChange={e => setPortalForm({ ...portalForm, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  {loading ? 'Saving...' : (portalForm.id ? 'Update Portal' : 'Add Portal')}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
