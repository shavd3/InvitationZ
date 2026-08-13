'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/invite-reveal';

const FILLS = ['#e7d3a8', '#d9bd85', '#cfae74'];
const SPAWN_EVERY_MS = 1900;
// Backstop for throttled background tabs, where finished petals can pile up
// faster than onfinish clears them.
const MAX_ON_SCREEN = 14;

/**
 * Continuous, sparse petal fall on the ground layer of every invitation page.
 * Deliberately behind the sheet (.ambient-petals is z-0 under the card wrapper):
 * the world around the invitation celebrates, the stationery itself stays still.
 * Spawns nothing under prefers-reduced-motion.
 */
export function AmbientPetals() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion()) return;

    const animations = new Set<Animation>();

    const spawn = () => {
      const width = layer.clientWidth;
      const height = layer.clientHeight;
      if (!width || !height || layer.childElementCount >= MAX_ON_SCREEN) return;

      const size = 9 + Math.random() * 7;
      const petal = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      petal.setAttribute('viewBox', '-8 -10 16 20');
      petal.setAttribute('width', String(size));
      petal.setAttribute('height', String(size * 1.25));
      petal.setAttribute('aria-hidden', 'true');
      petal.classList.add('petal');
      const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shape.setAttribute('d', 'M0 -9 C 5 -5, 5 3, 0 9 C -5 3, -5 -5, 0 -9 Z');
      shape.setAttribute('fill', FILLS[Math.floor(Math.random() * FILLS.length)]);
      petal.appendChild(shape);
      petal.style.left = `${Math.random() * width}px`;
      layer.appendChild(petal);

      const drift = (Math.random() - 0.5) * 120;
      const spinFrom = Math.random() * 360;
      const spinTo = spinFrom + (Math.random() - 0.5) * 360;
      // Constant descent (~55–80 px/s) so tall RSVP pages and the short home page
      // fall at the same gentle speed; clamped so nothing outlives its welcome.
      const speed = 0.055 + Math.random() * 0.025;
      const duration = Math.min(22000, Math.max(6000, (height + 90) / speed));

      const animation = petal.animate(
        [
          { transform: `translate(0, 0) rotate(${spinFrom}deg)`, opacity: 0 },
          { opacity: 0.8, offset: 0.06 },
          {
            transform: `translate(${drift * 0.45}px, ${height * 0.5}px) rotate(${(spinFrom + spinTo) / 2}deg)`,
            offset: 0.5,
          },
          { opacity: 0.8, offset: 0.92 },
          { transform: `translate(${drift}px, ${height + 60}px) rotate(${spinTo}deg)`, opacity: 0 },
        ],
        { duration, easing: 'linear' }
      );
      animation.onfinish = () => {
        petal.remove();
        animations.delete(animation);
      };
      animations.add(animation);
    };

    const timer = window.setInterval(spawn, SPAWN_EVERY_MS);

    return () => {
      window.clearInterval(timer);
      animations.forEach((a) => a.cancel());
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="ambient-petals" aria-hidden="true" />;
}
