import { InvitationFrame } from '@/components/Floral';
import { CoupleNames, ParentsBlessing, EventDetails } from '@/components/InviteLayout';

export default function HomePage() {
  return (
    <InvitationFrame>
      <ParentsBlessing />

      <CoupleNames />

      <EventDetails />

      <p className="text-center text-[0.65rem] text-warm-gray-muted tracking-wide leading-relaxed">
        Please open the personal invitation link sent to you to view your invitation and RSVP.
      </p>
    </InvitationFrame>
  );
}
