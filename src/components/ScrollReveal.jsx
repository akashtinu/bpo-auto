import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollRevealObserver component.
 * Automatically scans the DOM for elements with '.reveal', '.reveal-fade', '.reveal-left',
 * '.reveal-right', or '.reveal-scale' classes and reveals them smoothly as the user scrolls.
 */
export const ScrollRevealObserver = () => {
  const location = useLocation();

  useEffect(() => {
    // Helper to observe elements
    const observeElements = () => {
      const selector = '.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-img-grow, .reveal-up';
      const elements = document.querySelectorAll(selector);

      if (!elements || elements.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target); // Reveal once and keep visible
          }
        });
      }, observerOptions);

      elements.forEach((el) => {
        // If element is already in viewport on initial render, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('active');
        } else {
          observer.observe(el);
        }
      });

      return observer;
    };

    // Run observation on mount and route change
    let activeObserver = null;
    const timer = setTimeout(() => {
      activeObserver = observeElements();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (activeObserver) {
        activeObserver.disconnect();
      }
    };
  }, [location.pathname]);

  return null;
};

export default ScrollRevealObserver;
