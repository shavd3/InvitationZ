import type { CSSProperties } from 'react';

/**
 * Petals drifting down across the invitation.
 *
 * The silhouette is an elongated almond — rounded at the tip, tapering to a point at the base —
 * drawn as an SVG path. Deliberately no notch: at 10-20px a notched sakura petal reads as a
 * heart, not a flower.
 *
 * Each petal is two elements: the outer one falls in a straight line, the inner one sways,
 * tumbles and flips on its own slower cycle. Because the two periods do not divide evenly, the
 * combined path never visibly repeats — one element animating alone reads as a mechanical
 * diagonal. The scaleX in the flip makes the petal turn edge-on, as a real one does.
 *
 * Values are hand-authored rather than random: anything derived from Math.random() would differ
 * between the server render and hydration and throw a mismatch. Negative delays start each petal
 * partway down, so the screen is already alive on first paint instead of filling from the top.
 */

const PETAL_PATH =
  'M12 32 C6.2 26.5 2.4 19 3.1 12 C3.7 6 7.2 1.6 12 0.8 C16.8 1.6 20.3 6 20.9 12 ' +
  'C21.6 19 17.8 26.5 12 32 Z';

type Petal = {
  /** vw from the left */
  left: number;
  /** px width; height follows the 24:32 aspect of the path */
  size: number;
  /** seconds for the full fall */
  duration: number;
  /** seconds, applied negatively */
  delay: number;
  /** net horizontal travel over the fall, px */
  drift: number;
  /** half-width of the side-to-side sway, px */
  sway: number;
  /** seconds per sway/tumble cycle */
  swayDuration: number;
  /** degrees at each end of the tumble */
  rotFrom: number;
  rotTo: number;
  /** horizontal squash at the end of the flip (1 = face on, 0.2 = nearly edge on) */
  flip: number;
  /** peak alpha */
  alpha: number;
  tone: 'ivory' | 'gold';
};

const PETALS: Petal[] = [
  { left: 3, size: 16, duration: 17, delay: 2, drift: 34, sway: 13, swayDuration: 3.4, rotFrom: -24, rotTo: 32, flip: 0.45, alpha: 0.62, tone: 'ivory' },
  { left: 10, size: 12, duration: 23, delay: 11, drift: -26, sway: 9, swayDuration: 4.6, rotFrom: 18, rotTo: -38, flip: 0.7, alpha: 0.52, tone: 'gold' },
  { left: 17, size: 19, duration: 15, delay: 6, drift: 42, sway: 17, swayDuration: 2.9, rotFrom: -31, rotTo: 24, flip: 0.3, alpha: 0.58, tone: 'ivory' },
  { left: 23, size: 10, duration: 27, delay: 19, drift: -18, sway: 8, swayDuration: 5.2, rotFrom: 26, rotTo: -20, flip: 0.8, alpha: 0.44, tone: 'gold' },
  { left: 30, size: 15, duration: 19, delay: 4, drift: 28, sway: 12, swayDuration: 3.7, rotFrom: -14, rotTo: 36, flip: 0.5, alpha: 0.64, tone: 'ivory' },
  { left: 36, size: 20, duration: 14, delay: 13, drift: -38, sway: 19, swayDuration: 2.6, rotFrom: 34, rotTo: -26, flip: 0.25, alpha: 0.5, tone: 'gold' },
  { left: 43, size: 12, duration: 25, delay: 8, drift: 22, sway: 10, swayDuration: 4.9, rotFrom: -20, rotTo: 28, flip: 0.75, alpha: 0.54, tone: 'ivory' },
  { left: 49, size: 16, duration: 18, delay: 21, drift: -30, sway: 14, swayDuration: 3.2, rotFrom: 30, rotTo: -32, flip: 0.4, alpha: 0.62, tone: 'gold' },
  { left: 56, size: 13, duration: 22, delay: 5, drift: 36, sway: 11, swayDuration: 4.2, rotFrom: -28, rotTo: 22, flip: 0.65, alpha: 0.47, tone: 'ivory' },
  { left: 62, size: 17, duration: 16, delay: 15, drift: -24, sway: 16, swayDuration: 2.8, rotFrom: 20, rotTo: -34, flip: 0.35, alpha: 0.6, tone: 'gold' },
  { left: 69, size: 10, duration: 26, delay: 9, drift: 20, sway: 8, swayDuration: 5.5, rotFrom: -16, rotTo: 30, flip: 0.85, alpha: 0.46, tone: 'ivory' },
  { left: 75, size: 19, duration: 15, delay: 23, drift: -40, sway: 18, swayDuration: 3.0, rotFrom: 36, rotTo: -24, flip: 0.28, alpha: 0.58, tone: 'gold' },
  { left: 82, size: 13, duration: 21, delay: 3, drift: 30, sway: 12, swayDuration: 4.4, rotFrom: -26, rotTo: 26, flip: 0.6, alpha: 0.52, tone: 'ivory' },
  { left: 88, size: 16, duration: 18, delay: 17, drift: -22, sway: 15, swayDuration: 3.5, rotFrom: 24, rotTo: -30, flip: 0.42, alpha: 0.62, tone: 'gold' },
  { left: 95, size: 12, duration: 24, delay: 7, drift: 26, sway: 9, swayDuration: 4.8, rotFrom: -32, rotTo: 18, flip: 0.72, alpha: 0.48, tone: 'ivory' },
];

export function FallingPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {/* Gradients live once and are referenced by every petal. Stops read CSS variables so
          the petals retint with the theme. */}
      <svg width="0" height="0" className="petal-defs" focusable="false">
        <defs>
          <linearGradient id="petal-ivory" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--petal-ivory-a)" />
            <stop offset="55%" stopColor="var(--petal-ivory-b)" />
            <stop offset="100%" stopColor="var(--petal-ivory-c)" />
          </linearGradient>
          <linearGradient id="petal-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--petal-gold-a)" />
            <stop offset="55%" stopColor="var(--petal-gold-b)" />
            <stop offset="100%" stopColor="var(--petal-gold-c)" />
          </linearGradient>
        </defs>
      </svg>

      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal-fall"
          style={
            {
              left: `${p.left}vw`,
              animationDuration: `${p.duration}s`,
              animationDelay: `-${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as CSSProperties
          }
        >
          <svg
            className="petal"
            viewBox="0 0 24 32"
            width={p.size}
            height={Math.round((p.size * 32) / 24)}
            focusable="false"
            style={
              {
                animationDuration: `${p.swayDuration}s`,
                '--sway': `${p.sway}px`,
                '--rot-from': `${p.rotFrom}deg`,
                '--rot-to': `${p.rotTo}deg`,
                '--flip': p.flip,
                opacity: p.alpha,
              } as CSSProperties
            }
          >
            <path d={PETAL_PATH} fill={`url(#petal-${p.tone})`} />
          </svg>
        </span>
      ))}
    </div>
  );
}
