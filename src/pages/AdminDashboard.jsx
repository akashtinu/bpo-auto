import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Zap, MessageSquare, LogOut,
  CheckCircle, AlertCircle, X, RefreshCw, Play, Package,
  PencilLine, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const initialProductForm = {
  id: '',
  name: '',
  price: '',
  originalPrice: '',
  imageUrl: '',
  description: '',
  sale: false,
  status: 'active'
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [productForm, setProductForm] = useState(initialProductForm);
  const [selectedProductImage, setSelectedProductImage] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
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

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/orders');
      setOrders(res.orders || []);
    } catch (err) {
      showMsg('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/products');
      setProducts(res.products || []);
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
    if (activeTab === 'orders') loadOrders();
    if (activeTab === 'products') loadProducts();
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

  const handleProductFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetProductForm = () => {
    setProductForm(initialProductForm);
    setSelectedProductImage(null);
    setIsProductFormOpen(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: productForm.name.trim(),
      price: Number(productForm.price),
      original_price: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      image_url: productForm.imageUrl.trim(),
      description: productForm.description.trim(),
      sale: Boolean(productForm.sale),
      status: productForm.status || 'active'
    };

    if (!payload.name || Number.isNaN(payload.price) || payload.price < 0) {
      showMsg('error', 'Product name and a valid price are required.');
      return;
    }

    try {
      if (selectedProductImage) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            formData.append(key, value);
          }
        });
        formData.append('image', selectedProductImage);

        if (productForm.id) {
          await api.postForm(`/api/admin/products/${productForm.id}`, formData);
          showMsg('success', 'Product updated successfully.');
        } else {
          await api.postForm('/api/admin/products', formData);
          showMsg('success', 'Product added successfully.');
        }
      } else {
        if (productForm.id) {
          await api.post(`/api/admin/products/${productForm.id}`, payload);
          showMsg('success', 'Product updated successfully.');
        } else {
          await api.post('/api/admin/products', payload);
          showMsg('success', 'Product added successfully.');
        }
      }
      setIsProductFormOpen(false);
      setProductForm(initialProductForm);
      setSelectedProductImage(null);
      loadProducts();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handleEditProduct = (product) => {
    setProductForm({
      id: product.id,
      name: product.name || '',
      price: product.price ?? '',
      originalPrice: product.original_price ?? '',
      imageUrl: product.image_url || '',
      description: product.description || '',
      sale: Boolean(product.sale),
      status: product.status || 'active'
    });
    setSelectedProductImage(null);
    setIsProductFormOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Remove this product from the catalog?')) return;

    try {
      await api.delete(`/api/admin/products/${productId}`);
      showMsg('success', 'Product removed successfully.');
      loadProducts();
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const nonAdminUsers = users.filter(u => u.role !== 'admin');

  const tabs = [
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'orders', label: 'Orders', icon: <Zap size={18} /> },
    { id: 'simulate', label: 'Simulate Order', icon: <Zap size={18} /> },
    { id: 'messages', label: 'Contact Messages', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="dashboard-wrapper"   style={{ marginTop:'120px'}}>
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

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Customer Orders</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{orders.length} total purchase records</p>
              </div>
              <button onClick={loadOrders} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Billing</th>
                    <th>Order Notes</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{order.customer_name || order.billing_name || 'Customer'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customer_email || order.billing_email || '—'}</div>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {order.billing_phone || order.customer_phone || '—'}<br />
                        {order.billing_city || '—'}{order.billing_postcode ? `, ${order.billing_postcode}` : ''}
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '220px', whiteSpace: 'pre-wrap' }}>
                        {order.billing_notes || '—'}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--primary)' }}>{order.order_external_id}</td>
                      <td style={{ fontWeight: 600 }}>${parseFloat(order.fee || 0).toFixed(2)}</td>
                      <td>
                        <span className={`badge ${order.status === 'accepted' ? 'badge-success' : order.status === 'completed' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(order.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No customer orders have been captured yet.</td>
                    </tr>
                  )}
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

        {activeTab === 'products' && (
          <>
            <div className="dashboard-header">
              <div>
                <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Product Management</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{products.length} catalog item{products.length !== 1 ? 's' : ''}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button onClick={loadProducts} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <RefreshCw size={15} /> Refresh
                </button>
                <button
                  onClick={() => {
                    setProductForm(initialProductForm);
                    setSelectedProductImage(null);
                    setIsProductFormOpen(true);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  + Add New Product
                </button>
              </div>
            </div>

            {!isProductFormOpen ? (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-bright)' }}>{product.name}</div>
                          {product.sale && product.original_price && (
                            <small style={{ color: 'var(--text-muted)' }}>Sale: ${Number(product.original_price).toFixed(2)}</small>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>
                          ${Number(product.price || 0).toFixed(2)}
                        </td>
                        <td>
                          <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                            {product.status || 'active'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button onClick={() => handleEditProduct(product)} className="btn btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>
                              <PencilLine size={13} /> Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}>
                              <Trash2 size={13} /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No products found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>

                <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input className="form-input" name="name" value={productForm.name} onChange={handleProductFieldChange} placeholder="Ex: Xome BPO auto accept" required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Price</label>
                      <input className="form-input" type="number" step="0.01" min="0" name="price" value={productForm.price} onChange={handleProductFieldChange} placeholder="75.00" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Original Price</label>
                      <input className="form-input" type="number" step="0.01" min="0" name="originalPrice" value={productForm.originalPrice} onChange={handleProductFieldChange} placeholder="75.00" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-input"
                      onChange={(e) => setSelectedProductImage(e.target.files?.[0] || null)}
                    />
                    {(productForm.imageUrl || selectedProductImage) && (
                      <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                        {selectedProductImage ? `Selected file: ${selectedProductImage.name}` : `Current image: ${productForm.imageUrl}`}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Image URL (optional fallback)</label>
                    <input className="form-input" name="imageUrl" value={productForm.imageUrl} onChange={handleProductFieldChange} placeholder="https://.../product-image.jpg" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-input" name="description" value={productForm.description} onChange={handleProductFieldChange} rows="4" placeholder="Brief description of the product" />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <input type="checkbox" name="sale" checked={productForm.sale} onChange={handleProductFieldChange} />
                      Mark as sale
                    </label>

                    <select className="form-input" name="status" value={productForm.status} onChange={handleProductFieldChange} style={{ width: '140px' }}>
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {productForm.id ? 'Update Product' : 'Add Product'}
                    </button>
                    <button type="button" onClick={resetProductForm} className="btn btn-secondary" style={{ flex: '0 0 auto' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
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
