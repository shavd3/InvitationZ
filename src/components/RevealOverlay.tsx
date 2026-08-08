'use client';

import { useEffect, useState } from 'react';
import { InvitationCard, OrnamentalDivider, INVITE_THEME } from '@/components/Floral';
import { CoupleNames } from '@/components/InviteLayout';

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
      className={`fixed inset-0 z-50 invite-page ${INVITE_THEME} transition-opacity duration-[1200ms] ease-out ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="relative max-w-md mx-auto px-4 min-h-screen flex items-center justify-center">
        <InvitationCard>
          <div
            className={`flex flex-col items-center text-center transition-all duration-[1000ms] ease-out ${
              contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
            }`}
          >
            <p
              className={`uppercase tracking-[0.3em] text-xs sm:text-sm text-warm-gray-light font-medium text-shadow-soft mb-6 transition-all duration-[800ms] ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                fontFamily: 'var(--font-body)',
                transitionDelay: contentVisible ? '200ms' : '0ms',
              }}
            >
              You&apos;re cordially invited
              <br />
              to the wedding of
            </p>

            <div
              className={`transition-all duration-[900ms] ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: contentVisible ? '450ms' : '0ms' }}
            >
              <CoupleNames />
            </div>

            <div
              className={`transition-all duration-[800ms] ease-out ${
                contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: contentVisible ? '700ms' : '0ms' }}
            >
              <OrnamentalDivider />
            </div>
          </div>
        </InvitationCard>
      </div>

      <div
        className={`reveal-panel reveal-panel-left ${panelsOpen ? 'reveal-panel-open' : ''}`}
      />
      <div
        className={`reveal-panel reveal-panel-right ${panelsOpen ? 'reveal-panel-open' : ''}`}
      />
    </div>
  );
}
