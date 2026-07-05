import Link from 'next/link';
import InviteHeader, { EventDetails } from '@/components/InviteLayout';

export default function HomePage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <InviteHeader />

      <div className="card mb-6 text-center">
        <p className="text-xl text-warm-gray leading-relaxed mb-6">
          We joyfully invite you to celebrate our wedding ceremony with us.
        </p>
        <Link href="/find" className="btn-gold">
          Find your invitation
        </Link>
        <p className="text-sm text-warm-gray-light mt-4">
          If you received a personal link, open that directly to view your invitation and RSVP.
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold text-gold mb-4 text-center">When & Where</h2>
        <EventDetails />
      </div>
    </main>
  );
}
