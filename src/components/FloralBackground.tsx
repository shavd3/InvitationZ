type FloralBackgroundProps = {
  /** Background asset — defaults to the reveal/loading screen floral */
  src?: string;
  /** Optional scrim overlay class; pass empty string to disable */
  scrimClassName?: string;
};

export function FloralBackground({
  src = '/backgrounds/floral-bg.svg',
  scrimClassName = 'absolute inset-0 bg-gradient-to-b from-white/55 via-white/30 to-white/45',
}: FloralBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {scrimClassName ? <div className={scrimClassName} /> : null}
    </div>
  );
}
