

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './barba-init';
import Lenis from 'lenis';
import { useEffect } from 'react';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// LenisProvider component to globally enable Lenis smooth scroll
function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
    });
    document.body.classList.add('scroll-smooth');
    // Optionally add snap classes globally for immersive section stops
    document.body.classList.add('snap-y', 'snap-mandatory');
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      document.body.classList.remove('scroll-smooth', 'snap-y', 'snap-mandatory');
    };
  }, []);
  return <>{children}</>;
}

root.render(
  <React.StrictMode>
    <LenisProvider>
    <App />
    </LenisProvider>
  </React.StrictMode>
);
