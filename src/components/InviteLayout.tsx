import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Phone } from 'lucide-react';
import { WEDDING } from '@/lib/constants';

export default function InviteHeader() {
  return (
    <div className="text-center mb-8">
      <Image
        src="/logo.png"
        alt="Amaya & Shavin"
        width={140}
        height={140}
        className="mx-auto mb-4"
        style={{ mixBlendMode: 'multiply' }}
        priority
      />
      <h1 className="text-4xl sm:text-5xl font-bold text-gold mb-1">Amaya & Shavin</h1>
      <p className="text-warm-gray-light text-lg italic">Forever & Always</p>
    </div>
  );
}

export function EventDetails() {
  return (
    <div className="space-y-4 text-lg">
      <div className="flex items-start gap-3">
        <Calendar className="text-gold shrink-0 mt-0.5" size={22} />
        <div>
          <p className="font-semibold text-gold">{WEDDING.dateDisplay}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Clock className="text-gold shrink-0 mt-0.5" size={22} />
        <div>
          <p className="font-semibold">{WEDDING.timeDisplay}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="text-gold shrink-0 mt-0.5" size={22} />
        <div>
          <p className="font-semibold">{WEDDING.venue}</p>
          <p className="text-warm-gray-light">{WEDDING.venueAddress}</p>
        </div>
      </div>
      <a
        href={WEDDING.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-flex items-center gap-2 mt-2"
      >
        <MapPin size={18} />
        Get Directions
      </a>
    </div>
  );
}

export function ContactDetails() {
  return (
    <div className="space-y-3">
      <p className="text-warm-gray-light text-sm">
        Questions? Please call us:
      </p>
      {WEDDING.contacts.map((c) => (
        <a
          key={c.tel}
          href={c.tel}
          className="flex items-center gap-3 text-lg font-medium text-gold hover:underline"
        >
          <Phone size={20} />
          <span>
            {c.label}: {c.phone}
          </span>
        </a>
      ))}
    </div>
  );
}

export function FindInviteLink() {
  return (
    <p className="text-center text-warm-gray-light text-sm mt-6">
      Lost your link?{' '}
      <Link href="/find" className="text-gold font-medium hover:underline">
        Find your invitation
      </Link>
    </p>
  );
}
