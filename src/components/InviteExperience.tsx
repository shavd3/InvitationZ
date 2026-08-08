'use client';

import { useCallback, useEffect, useState } from 'react';
import { RevealOverlay } from '@/components/RevealOverlay';
import { INVITE_THEME } from '@/components/Floral';
import { shouldShowReveal } from '@/lib/invite-reveal';

type InviteExperienceProps = {
  children: React.ReactNode;
};

export function InviteExperience({ children }: InviteExperienceProps) {
  const [showReveal, setShowReveal] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const reveal = shouldShowReveal();
    setShowReveal(reveal);
    setReady(!reveal);
    setChecked(true);
  }, []);

  const handleRevealComplete = useCallback(() => {
    setShowReveal(false);
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <>
      {!checked ? (
        /* Must carry the theme, or a dark invitation flashes white before hydration */
        <div className={`min-h-screen invite-page ${INVITE_THEME}`} />
      ) : (
        <>
          {showReveal && <RevealOverlay onComplete={handleRevealComplete} />}
          <div className={ready ? 'invite-content-visible' : 'invite-content-hidden'}>{children}</div>
        </>
      )}
    </>
  );
}
