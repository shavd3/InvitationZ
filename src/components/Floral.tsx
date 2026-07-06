export function Corner() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-28 sm:h-28" aria-hidden="true">
      <g opacity="0.85">
        <path
          d="M8 100 C 10 70, 25 45, 55 25"
          stroke="#9db894"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M14 92 C 20 68, 32 52, 48 38"
          stroke="#c3d8bc"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="30" cy="60" rx="7" ry="3.5" fill="#c3d8bc" transform="rotate(-35 30 60)" />
        <ellipse cx="42" cy="42" rx="6" ry="3" fill="#9db894" transform="rotate(-20 42 42)" />
        <ellipse cx="18" cy="80" rx="6" ry="3" fill="#9db894" transform="rotate(-50 18 80)" />

        <g transform="translate(20,22)">
          <circle cx="0" cy="8" r="9" fill="#f2d3ce" />
          <circle cx="8" cy="2" r="7.5" fill="#e8a3a1" />
          <circle cx="-6" cy="0" r="6.5" fill="#f7e2df" />
          <circle cx="2" cy="-6" r="5.5" fill="#dd8886" />
          <circle cx="2" cy="2" r="3.5" fill="#c9636f" />
        </g>
        <g transform="translate(46,10) scale(0.65)">
          <circle cx="0" cy="8" r="9" fill="#f7e2df" />
          <circle cx="8" cy="2" r="7.5" fill="#f2d3ce" />
          <circle cx="-6" cy="0" r="6.5" fill="#fbeeec" />
          <circle cx="2" cy="-6" r="5.5" fill="#e8a3a1" />
          <circle cx="2" cy="2" r="3" fill="#dd8886" />
        </g>
        <g transform="translate(6,52) scale(0.55)">
          <circle cx="0" cy="8" r="9" fill="#e8a3a1" />
          <circle cx="8" cy="2" r="7.5" fill="#f7e2df" />
          <circle cx="-6" cy="0" r="6.5" fill="#f2d3ce" />
          <circle cx="2" cy="-6" r="5.5" fill="#dd8886" />
          <circle cx="2" cy="2" r="3" fill="#c9636f" />
        </g>
      </g>
    </svg>
  );
}

export function InvitationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 -translate-x-2 -translate-y-2">
        <Corner />
      </div>
      <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 scale-x-[-1]">
        <Corner />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-2 translate-y-2 scale-y-[-1]">
        <Corner />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 scale-x-[-1] scale-y-[-1]">
        <Corner />
      </div>
      <div className="relative max-w-md mx-auto px-5 py-8 sm:py-10">{children}</div>
    </div>
  );
}

export function HeartDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${compact ? 'my-3' : 'my-5'}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 sm:w-14 bg-[color:var(--color-blush-dark)]" />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9636f">
        <path d="M12 21s-7.5-4.7-10.2-9.1C.3 9.3 1.2 5.9 4.3 4.6c2.2-.9 4.6-.1 6 1.8l1.7 2.2 1.7-2.2c1.4-1.9 3.8-2.7 6-1.8 3.1 1.3 4 4.7 2.5 7.3C19.5 16.3 12 21 12 21z" />
      </svg>
      <span className="h-px w-10 sm:w-14 bg-[color:var(--color-blush-dark)]" />
    </div>
  );
}
