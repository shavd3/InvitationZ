import Link from 'next/link';
import { InvitationFrame, HeartDivider } from '@/components/Floral';
import { CoupleNames, ParentsBlessing, EventDetails } from '@/components/InviteLayout';

export default function HomePage() {
  return (
    <InvitationFrame>
      <p className="text-center uppercase tracking-[0.2em] text-xs sm:text-sm text-warm-gray-light mb-6">
        You Are Cordially Invited
      </p>

      <ParentsBlessing />

      <div className="my-4">
        <CoupleNames />
      </div>

      <HeartDivider />

      <EventDetails />

      <HeartDivider />

      <div className="text-center">
        <Link href="/find" className="btn-gold">
          Find your invitation
        </Link>
        <p className="text-sm text-warm-gray-light mt-4">
          If you received a personal link, open that directly to view your invitation and RSVP.
        </p>
      </div>
    </InvitationFrame>
  );
}
