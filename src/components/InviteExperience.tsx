'use client';

import { useCallback, useEffect, useState } from 'react';
import { RevealOverlay } from '@/components/RevealOverlay';
import { InviteAudio, MusicToggle, type InviteMusicControls } from '@/components/InviteAudio';
import { shouldShowReveal } from '@/lib/invite-reveal';

type InviteExperienceProps = {
  children: React.ReactNode;
};

export function InviteExperience({ children }: InviteExperienceProps) {
  const [showReveal, setShowReveal] = useState(false);
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleMusicReady = useCallback((controls: InviteMusicControls) => {
    void controls.start();
  }, []);

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
      <InviteAudio onReady={handleMusicReady} />
      <MusicToggle />
      {!checked ? (
        <div className="min-h-screen bg-[color:var(--color-cream)]" />
      ) : (
        <>
          {showReveal && <RevealOverlay onComplete={handleRevealComplete} />}
          <div className={ready ? 'invite-content-visible' : 'invite-content-hidden'}>{children}</div>
        </>
      )}
    </>
  );
}
