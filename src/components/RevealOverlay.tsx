'use client';

import { useEffect, useState } from 'react';
import { FloralBackground } from '@/components/FloralBackground';

const HOLD_MS = 3200;
const FADE_MS = 1200;
const PANEL_OPEN_DELAY_MS = 400;

type RevealOverlayProps = {
  onComplete: () => void;
};

export function RevealOverlay({ onComplete }: RevealOverlayProps) {
  const [panelsOpen, setPanelsOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const panelTimer = window.setTimeout(() => setPanelsOpen(true), PANEL_OPEN_DELAY_MS);
    const contentTimer = window.setTimeout(() => setContentVisible(true), PANEL_OPEN_DELAY_MS + 600);
    const closeTimer = window.setTimeout(() => setClosing(true), HOLD_MS);
    const doneTimer = window.setTimeout(onComplete, HOLD_MS + FADE_MS);
    return () => {
      window.clearTimeout(panelTimer);
      window.clearTimeout(contentTimer);
      window.clearTimeout(closeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-white transition-opacity duration-[1200ms] ease-out ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      role="presentation"
      aria-hidden="true"
    >
      <FloralBackground />

      {/* Content revealed behind opening panels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex flex-col items-center px-6 transition-all duration-[1000ms] ease-out ${
            contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
          }`}
        >
          <p
            className={`text-[0.6rem] sm:text-xs uppercase tracking-[0.35em] text-warm-gray-light mb-5 transition-all duration-[800ms] ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{
              fontFamily: 'var(--font-body)',
              transitionDelay: contentVisible ? '200ms' : '0ms',
            }}
          >
            You are cordially invited
          </p>

          <h1
            className={`font-display text-5xl sm:text-6xl text-foil text-center leading-tight transition-all duration-[900ms] ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: contentVisible ? '450ms' : '0ms' }}
          >
            Amaya &amp; Shavin
          </h1>

          <div
            className={`flex items-center gap-3 mt-7 transition-all duration-[800ms] ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: contentVisible ? '700ms' : '0ms' }}
          >
            <span className="h-px w-10 sm:w-14 bg-[color:var(--color-gold-light)]" />
            <span className="text-[color:var(--color-gold)] text-xs">✦</span>
            <span className="h-px w-10 sm:w-14 bg-[color:var(--color-gold-light)]" />
          </div>

          <p
            className={`mt-5 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.3em] text-warm-gray-light transition-all duration-[800ms] ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{
              fontFamily: 'var(--font-body)',
              transitionDelay: contentVisible ? '900ms' : '0ms',
            }}
          >
            10th October 2026
          </p>
        </div>
      </div>

      {/* Split panels — card opening effect */}
      <div
        className={`reveal-panel reveal-panel-left ${panelsOpen ? 'reveal-panel-open' : ''}`}
      />
      <div
        className={`reveal-panel reveal-panel-right ${panelsOpen ? 'reveal-panel-open' : ''}`}
      />
    </div>
  );
}
