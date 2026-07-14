'use client';

import { useCallback, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export type InviteMusicControls = {
  start: () => boolean;
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

/** Invoke inside a user-gesture handler; play() rejections are swallowed. */
export function startInviteMusic(): void {
  const audio = getInviteAudio();
  if (!audio || audio.muted) return;

  audio.volume = DEFAULT_VOLUME;
  audio.loop = true;

  if (!audio.paused) return;

  audio.play().catch(() => {});
}

export function InviteAudio({ onReady }: InviteAudioProps) {
  useEffect(() => {
    const audio = getInviteAudio();
    if (audio && sessionStorage.getItem(MUTED_KEY) === '1') {
      audio.muted = true;
    }

    onReady?.({ start: () => {
      startInviteMusic();
      return true;
    } });

    const unlock = () => {
      startInviteMusic();
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    document.addEventListener('pointerdown', unlock, opts);
    document.addEventListener('touchstart', unlock, opts);
    document.addEventListener('click', unlock, opts);
    document.addEventListener('keydown', unlock);

    return () => {
      document.removeEventListener('pointerdown', unlock, opts);
      document.removeEventListener('touchstart', unlock, opts);
      document.removeEventListener('click', unlock, opts);
      document.removeEventListener('keydown', unlock);
    };
  }, [onReady]);

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

    if (!nextMuted) {
      startInviteMusic();
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
