export function FloralBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backgrounds/floral-bg.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Light centre scrim — keeps text readable while florals show at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/30 to-white/45" />
    </div>
  );
}
