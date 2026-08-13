import { AmbientPetals } from '@/components/AmbientPetals';

export function InvitationCard({ children }: { children: React.ReactNode }) {
  return <div className="invitation-card">{children}</div>;
}

/** Engraved ivory — the only theme. (theme-midnight lives in git history.) */
export const INVITE_THEME = 'theme-ivory';

export function InvitationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`invite-page ${INVITE_THEME}`}>
      {/* First in DOM + z-0, so the positioned content wrapper paints over it */}
      <AmbientPetals />
      <div className="relative max-w-md mx-auto px-4 py-10 sm:py-14 min-h-screen flex flex-col justify-center">
        <InvitationCard>
          <div className="stagger-in">{children}</div>
        </InvitationCard>
      </div>
    </div>
  );
}
