import { FallingPetals } from '@/components/FallingPetals';

export function InvitationCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="invitation-card">
      <div className="invitation-card-bg" aria-hidden="true" />
      <span className="card-corner card-corner-tl" aria-hidden="true" />
      <span className="card-corner card-corner-tr" aria-hidden="true" />
      <span className="card-corner card-corner-bl" aria-hidden="true" />
      <span className="card-corner card-corner-br" aria-hidden="true" />
      <div className="invitation-card-content">{children}</div>
    </div>
  );
}

export function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${compact ? 'my-1' : 'mt-2 mb-0'}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 sm:w-14 bg-[color:var(--color-gold-light)]/55" />
      <span className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute h-2.5 w-2.5 rotate-45 border border-[color:var(--color-gold)]/70" />
        <span className="h-[3px] w-[3px] rotate-45 bg-[color:var(--color-gold)]/80" />
      </span>
      <span className="h-px w-10 sm:w-14 bg-[color:var(--color-gold-light)]/55" />
    </div>
  );
}

/** @deprecated Use OrnamentalDivider */
export const HeartDivider = OrnamentalDivider;

/** Swap to 'theme-midnight' for the ink-and-gold ground. */
export const INVITE_THEME = 'theme-midnight';

export function InvitationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`invite-page ${INVITE_THEME}`}>
      <FallingPetals />
      <div className="relative max-w-md mx-auto px-4 py-10 sm:py-14 min-h-screen flex flex-col justify-center">
        <InvitationCard>
          <div className="stagger-in">{children}</div>
        </InvitationCard>
      </div>
    </div>
  );
}
