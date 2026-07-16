'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { WEDDING } from '@/lib/constants';

type Phase = 'idle' | 'show-prefix' | 'show-year' | 'overlap' | 'reveal' | 'fade';

const TAP_WINDOW_MS = 700;
const YEAR_DIGITS = ['2', '0', '2', '6'] as const;

export function DateTenEasterEgg() {
  const [phase, setPhase] = useState<Phase>('idle');
  const tapsRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAnimTimers = useCallback(() => {
    animTimersRef.current.forEach(clearTimeout);
    animTimersRef.current = [];
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    clearAnimTimers();
  }, [clearAnimTimers]);

  const runSequence = useCallback(() => {
    clearAnimTimers();
    setPhase('show-prefix');

    const schedule = (next: Phase, delay: number) => {
      const id = setTimeout(() => setPhase(next), delay);
      animTimersRef.current.push(id);
    };

    schedule('show-year', 650);
    schedule('overlap', 1450);
    schedule('reveal', 2600);
    schedule('fade', 3800);
    schedule('idle', 4600);
  }, [clearAnimTimers]);

  const handleTap = () => {
    if (phase !== 'idle') return;

    tapsRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (tapsRef.current >= 3) {
      tapsRef.current = 0;
      runSequence();
      return;
    }

    timerRef.current = setTimeout(() => {
      tapsRef.current = 0;
    }, TAP_WINDOW_MS);
  };

  const active = phase !== 'idle';

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        aria-label={`${WEDDING.dateDay}. Tap three times for a surprise.`}
        className="font-display my-1 text-6xl sm:text-7xl leading-none tracking-tight text-foil bg-transparent border-0 p-0 cursor-pointer appearance-none"
      >
        {WEDDING.dateDay}
      </button>

      {active && (
        <div
          className={`date-ten-overlay date-ten-overlay--${phase}`}
          role="presentation"
          aria-hidden="true"
        >
          <div className="date-ten-popup">
            <div className="date-ten-row">
              <span className="date-ten-part date-ten-prefix">10.10.</span>
              <span className="date-ten-year-wrap">
                <span className="date-ten-digits">
                  {YEAR_DIGITS.map((digit, i) => (
                    <span
                      key={`${digit}-${i}`}
                      className="date-ten-part date-ten-digit"
                      style={{ ['--i' as string]: i }}
                    >
                      {digit}
                    </span>
                  ))}
                </span>
                <span className="date-ten-part date-ten-sum">10</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
