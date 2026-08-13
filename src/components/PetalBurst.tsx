'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/invite-reveal';

const FILLS = ['#e7d3a8', '#d9bd85', '#cfae74'];
const COUNT = 26;

/**
 * One-shot flurry of gold petals over the invitation card — the celebration for
 * "Accept with pleasure". Mount with a fresh `key` to fire again; unmounting
 * cancels anything mid-flight. Does nothing under prefers-reduced-motion.
 *
 * The layer is absolutely positioned against .invitation-card, so it must be
 * rendered inside InvitationFrame's children.
 */
export function PetalBurst() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || prefersReducedMotion()) return;

    const width = layer.clientWidth;
    const height = layer.clientHeight;
    const animations: Animation[] = [];

    for (let i = 0; i < COUNT; i++) {
      const size = 8 + Math.random() * 7;
      const petal = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      petal.setAttribute('viewBox', '-8 -10 16 20');
      petal.setAttribute('width', String(size));
      petal.setAttribute('height', String(size * 1.25));
      petal.setAttribute('aria-hidden', 'true');
      petal.classList.add('petal');
      const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shape.setAttribute('d', 'M0 -9 C 5 -5, 5 3, 0 9 C -5 3, -5 -5, 0 -9 Z');
      shape.setAttribute('fill', FILLS[Math.floor(Math.random() * FILLS.length)]);
      shape.setAttribute('opacity', '0.9');
      petal.appendChild(shape);
      petal.style.left = `${Math.random() * width}px`;
      layer.appendChild(petal);

      const drift = (Math.random() - 0.5) * 90;
      const spinFrom = Math.random() * 360;
      const spinTo = spinFrom + (Math.random() - 0.5) * 400;
      const animation = petal.animate(
        [
          { transform: `translate(0, 0) rotate(${spinFrom}deg)`, opacity: 0 },
          { opacity: 0.95, offset: 0.08 },
          {
            transform: `translate(${drift * 0.5}px, ${height * 0.55}px) rotate(${(spinFrom + spinTo) / 2}deg)`,
            opacity: 0.95,
            offset: 0.55,
          },
          { transform: `translate(${drift}px, ${height + 40}px) rotate(${spinTo}deg)`, opacity: 0 },
        ],
        {
          duration: 2300 + Math.random() * 1300,
          delay: Math.random() * 500,
          easing: 'cubic-bezier(0.3, 0.1, 0.5, 1)',
        }
      );
      animation.onfinish = () => petal.remove();
      animations.push(animation);
    }

    return () => {
      animations.forEach((a) => a.cancel());
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="petal-burst-layer" aria-hidden="true" />;
}
