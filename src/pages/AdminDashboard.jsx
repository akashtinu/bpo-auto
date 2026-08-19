import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Zap, MessageSquare, LogOut,
  CheckCircle, AlertCircle, X, RefreshCw, Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 4500);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.users || []);
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/messages');
      setMessages(res.messages || []);
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'messages') loadMessages();
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await api.post('/api/admin/users/status', { user_id: userId, status });
      showMsg('success', `User status updated to "${status}".`);
      loadUsers();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handleSimulate = async () => {
    if (!selectedUserId) {
      showMsg('error', 'Please select a user first.');
      return;
    }
    setLoading(true);
    setSimResult(null);
    try {
      const res = await api.post('/api/admin/orders/simulate', { user_id: parseInt(selectedUserId) });
      setSimResult(res);
      showMsg('success', 'Order capture simulated successfully!');
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const nonAdminUsers = users.filter(u => u.role !== 'admin');

  const tabs = [
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'simulate', label: 'Simulate Order', icon: <Zap size={18} /> },
    { id: 'messages', label: 'Contact Messages', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Toast */}
      {msg.text && (
        <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '1rem 1.5rem', borderRadius: '10px', background: msg.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`, color: msg.type === 'success' ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', maxWidth: '380px' }}>
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span style={{ fontSize: '0.9rem' }}>{msg.text}</span>
          <button onClick={() => setMsg({ type: '', text: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 'auto' }}><X size={16} /></button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Admin Panel</p>
          <p style={{ color: 'var(--text-bright)', fontWeight: 600, fontSize: '0.95rem' }}>{user?.name}</p>
          <span className="badge badge-danger" style={{ marginTop: '0.25rem', fontSize: '0.7rem', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>ADMIN</span>
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

        {/* <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'none', fontFamily: 'inherit', textAlign: 'left', color: 'var(--danger)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div> */}
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>User Management</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{nonAdminUsers.length} registered client{nonAdminUsers.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={loadUsers} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            <div className="stat-grid" style={{ marginBottom: '2rem' }}>
              <div className="glass-card stat-card">
                <span className="stat-title">Total Clients</span>
                <span className="stat-value" style={{ color: 'var(--primary)' }}>{nonAdminUsers.length}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Active</span>
                <span className="stat-value" style={{ color: 'var(--success)' }}>{nonAdminUsers.filter(u => u.status === 'active').length}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Trial</span>
                <span className="stat-value" style={{ color: 'var(--warning)' }}>{nonAdminUsers.filter(u => u.status === 'trial').length}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Expired</span>
                <span className="stat-value" style={{ color: '#f59e0b' }}>{nonAdminUsers.filter(u => u.status === 'expired').length}</span>
              </div>
              <div className="glass-card stat-card">
                <span className="stat-title">Suspended</span>
                <span className="stat-value" style={{ color: 'var(--danger)' }}>{nonAdminUsers.filter(u => u.status === 'suspended').length}</span>
              </div>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>#{u.id}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{u.name}</td>
                      <td style={{ fontSize: '0.88rem' }}>{u.email}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.phone || '—'}</td>
                      <td>
                        <span className={`badge ${u.status === 'active' ? 'badge-success' : u.status === 'trial' ? 'badge-warning' : u.status === 'expired' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                          {u.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td>
                        {u.role === 'admin' ? (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin Account</span>
                        ) : (
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {u.status !== 'active' && (
                              <button onClick={() => handleStatusChange(u.id, 'active')} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>Activate</button>
                            )}
                            {u.status !== 'trial' && u.status !== 'active' && (
                              <button onClick={() => handleStatusChange(u.id, 'trial')} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', borderColor: 'rgba(245,158,11,0.4)', color: 'var(--warning)' }}>Set Trial</button>
                            )}
                            {u.status !== 'suspended' && (
                              <button onClick={() => handleStatusChange(u.id, 'suspended')} className="btn btn-danger" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>Suspend</button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* SIMULATE ORDER TAB */}
        {activeTab === 'simulate' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Simulate Order Capture</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trigger a simulated BPO order capture for any active client account</p>
              </div>
            </div>

            <div className="simulate-order-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Capture Settings</h3>

                <div className="form-group">
                  <label className="form-label">Select Client</label>
                  <select
                    className="form-input"
                    value={selectedUserId}
                    onChange={e => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Choose a client...</option>
                    {nonAdminUsers.filter(u => u.status === 'active' || u.status === 'trial').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email}) - {u.status}</option>
                    ))}
                  </select>
                </div>

                <div style={{ background: 'rgba(4,146,194,0.08)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--primary)' }}>What this does:</strong><br />
                  Selects one of the client's active portal configurations at random, generates a realistic BPO order, logs it to the orders table, and adds the capture fee ($3 or $4) to their current unpaid invoice.
                </div>

                <button
                  id="simulate-btn"
                  onClick={handleSimulate}
                  className="btn btn-primary"
                  disabled={loading || !selectedUserId}
                  style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', whiteSpace: 'normal', textAlign: 'center' }}
                >
                  {loading ? 'Simulating...' : <><Play size={18} /> Simulate Order Capture</>}
                </button>
              </div>

              {/* Simulation Result */}
              <div>
                {simResult ? (
                  <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.35)', background: 'rgba(16,185,129,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                      <h3 style={{ margin: 0, color: 'var(--success)' }}>Order Captured!</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {[
                        { label: 'Portal', val: simResult.order?.portal },
                        { label: 'Order ID', val: simResult.order?.order_id, mono: true },
                        { label: 'Property', val: simResult.order?.address },
                        { label: 'BPO Fee Earned', val: `$${parseFloat(simResult.order?.fee || 0).toFixed(2)}` },
                        { label: 'Order Type', val: simResult.order?.type },
                        { label: 'Capture Fee Charged', val: `$${parseFloat(simResult.invoice?.added_fee || 0).toFixed(2)}` },
                        { label: 'Invoice #', val: simResult.invoice?.invoice_number, mono: true },
                        { label: 'Invoice Total Now', val: `$${parseFloat(simResult.invoice?.total_invoice_amount || 0).toFixed(2)}` },
                      ].map(row => (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{row.label}</span>
                          <span style={{ color: 'var(--text-bright)', fontWeight: 600, fontFamily: row.mono ? 'var(--font-mono)' : 'inherit', fontSize: '0.9rem' }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <Zap size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>Simulation results will appear here after you trigger a capture.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Contact Messages</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{messages.length} total messages received</p>
              </div>
              <button onClick={loadMessages} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {messages.map(m => (
                <div key={m.id} className="glass-card" style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--text-bright)' }}>{m.name}</h4>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                        <a href={`mailto:${m.email}`} style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{m.email}</a>
                        {m.phone && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.phone}</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', align: 'center', gap: '0.75rem' }}>
                      <span className={`badge ${m.status === 'new' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>{m.status}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(m.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, background: 'rgba(6,11,19,0.3)', padding: '1rem', borderRadius: '8px' }}>{m.message}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  <MessageSquare size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>No contact messages received yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
