'use client';

import { useCallback, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export type InviteMusicControls = {
  start: () => Promise<boolean>;
};

type InviteAudioProps = {
  onReady?: (controls: InviteMusicControls) => void;
};

const MUTED_KEY = 'invite-music-muted';
const DEFAULT_VOLUME = 0.3;

export function getInviteAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  return window.__inviteAudio ?? null;
}

export function InviteAudio({ onReady }: InviteAudioProps) {
  const start = useCallback(async () => {
    const audio = getInviteAudio();
    if (!audio) return false;

    audio.volume = DEFAULT_VOLUME;
    audio.loop = true;

    try {
      if (audio.paused) {
        await audio.play();
      }
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = getInviteAudio();
    if (audio && sessionStorage.getItem(MUTED_KEY) === '1') {
      audio.muted = true;
    }

    onReady?.({ start });
    void start();

    const unlock = () => {
      void start();
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [onReady, start]);

  return null;
}

export function MusicToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = getInviteAudio();
    if (!audio) return;
    const savedMuted = sessionStorage.getItem(MUTED_KEY) === '1';
    audio.muted = savedMuted;
    setMuted(savedMuted);
  }, []);

  const toggle = useCallback(() => {
    const audio = getInviteAudio();
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    sessionStorage.setItem(MUTED_KEY, nextMuted ? '1' : '0');
    setMuted(nextMuted);

    if (!nextMuted && audio.paused) {
      audio.volume = DEFAULT_VOLUME;
      void audio.play().catch(() => {});
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      aria-pressed={muted}
      className="fixed bottom-4 right-4 z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-gold-light)]/70 bg-[color:var(--color-cream)]/90 text-[color:var(--color-gold-dark)] shadow-sm transition-colors hover:bg-[color:var(--color-cream)] hover:border-[color:var(--color-gold)]"
    >
      {muted ? <VolumeX size={16} strokeWidth={1.75} /> : <Volume2 size={16} strokeWidth={1.75} />}
    </button>
  );
}
