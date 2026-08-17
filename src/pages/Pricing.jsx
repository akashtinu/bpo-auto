import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import rrrImage from '../assets/RRR-300x300-1.webp';
import classValuationImage from '../assets/Class-Valuation-300x300-1.webp';
import clearCapitalImage from '../assets/clear-captial-300x300-1.webp';
import estreetImage from '../assets/estreet-300x300-1.webp';
import proteckImage from '../assets/proteck-300x300-ezgif.com-png-to-webp-converter.webp';
import singleSourceImage from '../assets/single-source.webp';
import xomeImage from '../assets/xome-300x300-1.webp';
import amo from '../assets/amos-300x293.webp';
import Ascribe from '../assets/GetPublicFiles-300x300.jpg';
import amv from '../assets/Avm-300x300-1.webp';
import Consolidated from '../assets/Consolidated.jpg';
import firstamerican from '../assets/first-American-300x300-ezgif.com-jpg-to-webp-converter.webp';
import lres from '../assets/Untitled-design-2025-04-09T131527.012-300x300-1.webp';
import Pilot from '../assets/Untitled-design-2025-04-09T131229.491-300x300-1.webp';
import Redbell from '../assets/homegenius-Real-Estate-300x300.webp';
import Solidifi from '../assets/Solidify-300x300.jpg';
import Think from '../assets/Think-lattice-300x300.webp';
import Valuation from '../assets/valuation-connect-300x140.jpg';
import Valuenet from '../assets/valunet-logo-300x300.webp';
import Voxtur from '../assets/Solidify-300x300.jpg';

Think

const PRODUCTS = [
  { id: 1, name: 'AMO BPO Auto accept', price: 75.00, image: amo },
  { id: 2, name: 'Ascribe BPO Auto accept', price: 49.00, originalPrice: 75.00, sale: true ,image: Ascribe},
  { id: 3, name: 'AVM BPO auto accept', price: 75.00, image: amv },
  { id: 4, name: 'Class Valuation BPO auto accept', price: 75.00, image: classValuationImage },
  { id: 5, name: 'Clear Capital BPO auto accept', price: 75.00, image: clearCapitalImage },
  { id: 6, name: 'Consolidated Analytics BPO auto accept', price: 75.00, image: Consolidated },
  { id: 7, name: 'Estreet BPO auto accept', price: 75.00, image: estreetImage },
  { id: 8, name: 'First American BPO auto accept', price: 75.00, image: firstamerican },
  { id: 9, name: 'LRES or Ascribe BPO auto accept', price: 75.00, image: lres },
  { id: 10, name: 'Opteon Jarodesk BPO auto accept', price: 75.00, image: rrrImage },
  { id: 11, name: 'Proteck BPO auto accept', price: 75.00, image: proteckImage },
  { id: 12, name: 'Realty Pilot BPO auto accept', price: 75.00, image: Pilot },
  { id: 13, name: 'Redbell BPO auto accept', price: 75.00, image: Redbell },
  { id: 14, name: 'RRR BPO auto accept', price: 75.00, image: rrrImage },
  { id: 15, name: 'Single Source BPO auto accept', price: 75.00, image: singleSourceImage },
  { id: 16, name: 'Solidifi BPO auto accept', price: 75.00, image: Solidifi },
  { id: 17, name: 'Think Lattice BPO auto accept', price: 75.00, image: Think },
  { id: 18, name: 'Valuation Connect BPO auto accept', price: 75.00, image: Valuation },
  { id: 19, name: 'Valuenet Groundworks BPO auto accept', price: 75.00, image: Valuenet },
  { id: 20, name: 'Voxtur BPO Auto accept', price: 75.00, image: Voxtur },
  { id: 21, name: 'Xome BPO auto accept', price: 75.00, image: xomeImage },
];

const Pricing = () => {
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    navigate('/cart');
  };

  const getSortedProducts = () => {
    let sorted = [...PRODUCTS];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
      case 'latest':
      default:
        // Default sorting
        break;
    }
    return sorted;
  };

  return (
    <div style={{ paddingBottom: '5rem', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="hero-section container" style={{ paddingBottom: '2rem' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem' }}>Pricing</h1>
      </section>

      {/* Catalog Header */}
      <section className="container" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Showing all {PRODUCTS.length} results</p>
        
        <select 
          className="form-input" 
          style={{ width: 'auto', display: 'inline-block', padding: '0.5rem 2.5rem 0.5rem 1rem' }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default sorting</option>
          <option value="popularity">Sort by popularity</option>
          <option value="latest">Sort by latest</option>
          <option value="price-low">Sort by price: low to high</option>
          <option value="price-high">Sort by price: high to low</option>
        </select>
      </section>

      {/* Product Grid */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {getSortedProducts().map((product) => (
            <div key={product.id} className="product-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {product.sale && (
                <div style={{
                  position: 'absolute', top: '10px', left: '10px', 
                  background: 'var(--primary)', color: '#fff', 
                  padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2
                }}>
                  Sale!
                </div>
              )}
              <div className="product-image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderBottom: 'none', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  className="product-img"
                />
                
                {/* Hover Add to Cart Button */}
                <div className="add-to-cart-overlay">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.95 }}
                  >
                    <ShoppingCart size={18} />
                    Add to cart
                  </button>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '0 0 12px 12px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-main)', flexGrow: 1 }}>{product.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                  {product.sale && (
                    <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span style={{ color: product.sale ? 'var(--primary)' : 'var(--text-main)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .product-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        
        .add-to-cart-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          backdrop-filter: blur(2px);
        }
        
        .product-image-container:hover .add-to-cart-overlay {
          opacity: 1;
        }

        @media (max-width: 1200px) {
          .container > div {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Pricing;
