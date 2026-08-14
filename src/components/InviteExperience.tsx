'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RevealOverlay } from '@/components/RevealOverlay';
import { INVITE_THEME } from '@/components/Floral';
import { shouldShowReveal } from '@/lib/invite-reveal';

/* Slightly past the last one-shot in the entrance (names' catch ends ~3.25s).
   After this, .invite-entering is removed so panels mounted later (Amend
   Response, the thank-you card) appear instantly instead of replaying the
   press-in through their ladder delay. */
const ENTRANCE_MS = 3400;

type InviteExperienceProps = {
  children: React.ReactNode;
  /** The reveal doors hold until this turns true (e.g. the guest fetch resolving),
      so they never open onto a loading flash. Defaults to true. */
  contentReady?: boolean;
};

export function InviteExperience({ children, contentReady = true }: InviteExperienceProps) {
  const [showReveal, setShowReveal] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [entering, setEntering] = useState(false);
  const enteringTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reveal = shouldShowReveal();
    setShowReveal(reveal);
    setReady(!reveal);
    setChecked(true);
  }, []);

  useEffect(
    () => () => {
      if (enteringTimer.current) clearTimeout(enteringTimer.current);
    },
    []
  );

  const handleRevealComplete = useCallback(() => {
    setShowReveal(false);
    requestAnimationFrame(() => {
      setReady(true);
      setEntering(true);
      enteringTimer.current = setTimeout(() => setEntering(false), ENTRANCE_MS);
    });
  }, []);

  return (
    <>
      {!checked ? (
        /* Must carry the theme, or a dark invitation flashes white before hydration */
        <div className={`min-h-screen invite-page ${INVITE_THEME}`} />
      ) : (
        <>
          {showReveal && <RevealOverlay onComplete={handleRevealComplete} canClose={contentReady} />}
          <div
            className={`${ready ? 'invite-content-visible' : 'invite-content-hidden'}${
              entering ? ' invite-entering' : ''
            }`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
