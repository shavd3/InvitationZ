import { FloralBackground } from '@/components/FloralBackground';

export function InvitationCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="invitation-card">
      <div className="invitation-card-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/backgrounds/invitation-card-bg.svg" alt="" />
      </div>
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
      <span className="h-px w-12 sm:w-16 bg-[color:var(--color-gold-light)]" />
      <span className="text-[color:var(--color-gold)] text-sm leading-none">✦</span>
      <span className="h-px w-12 sm:w-16 bg-[color:var(--color-gold-light)]" />
    </div>
  );
}

/** @deprecated Use OrnamentalDivider */
export const HeartDivider = OrnamentalDivider;

export function InvitationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <FloralBackground />
      <div className="relative max-w-md mx-auto px-4 py-10 sm:py-14 min-h-screen flex flex-col justify-center">
        <InvitationCard>
          <div className="stagger-in">{children}</div>
        </InvitationCard>
      </div>
    </div>
  );
}
