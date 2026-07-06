import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { WEDDING } from '@/lib/constants';

export function CoupleNames() {
  return (
    <h1
      className="text-center text-5xl sm:text-6xl text-[#c9636f] italic font-semibold leading-tight"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      Amaya &amp; Shavin
    </h1>
  );
}

export function ParentsBlessing() {
  return (
    <div className="text-center">
      <p className="uppercase tracking-widest text-xs sm:text-sm text-warm-gray font-medium">
        {WEDDING.brideParents}
      </p>
      <p className="uppercase tracking-widest text-[0.65rem] sm:text-xs text-warm-gray-light my-1.5">
        Together With
      </p>
      <p className="uppercase tracking-widest text-xs sm:text-sm text-warm-gray font-medium">
        {WEDDING.groomParents}
      </p>
      <p className="uppercase tracking-widest text-[0.65rem] sm:text-xs text-warm-gray-light mt-3">
        Invite You To The Wedding Ceremony Of Their Children
      </p>
    </div>
  );
}

export function EventDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className="text-center">
      <p className="uppercase tracking-widest text-xs text-warm-gray-light">On</p>
      <p className="text-lg sm:text-xl text-[color:var(--color-gold-dark)] font-semibold my-0.5">
        {WEDDING.dateDisplay}
      </p>

      <p className={`uppercase tracking-widest text-xs text-warm-gray-light ${compact ? 'mt-2' : 'mt-3'}`}>
        At
      </p>
      <p className="text-base sm:text-lg text-warm-gray font-medium mt-0.5">{WEDDING.venueFull}.</p>
      <p className={`text-sm text-warm-gray-light ${compact ? 'mb-2' : 'mb-3'}`}>
        {WEDDING.timeDisplayShort}.
      </p>

      <a
        href={WEDDING.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-flex items-center gap-2 text-sm py-1.5 px-4"
      >
        <MapPin size={16} />
        Get Directions
      </a>
    </div>
  );
}

export function RefreshmentsNote() {
  return (
    <p className="text-center uppercase tracking-widest text-xs sm:text-sm text-warm-gray-light leading-relaxed">
      {WEDDING.refreshmentsNote}
    </p>
  );
}

export function ContactDetails() {
  return (
    <div className="text-center space-y-2">
      <p className="text-warm-gray-light text-xs sm:text-sm">Questions? Please call us</p>
      <div className="flex flex-col items-center gap-2">
        {WEDDING.contacts.map((c) => (
          <a
            key={c.tel}
            href={c.tel}
            className="inline-flex items-center gap-2 text-base font-medium text-[color:var(--color-gold-dark)] hover:underline"
          >
            <Phone size={18} />
            <span>
              {c.label}: {c.phone}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function FindInviteLink() {
  return (
    <p className="text-center text-warm-gray-light text-sm mt-4">
      Lost your link?{' '}
      <Link href="/find" className="text-[color:var(--color-gold-dark)] font-medium hover:underline">
        Find your invitation
      </Link>
    </p>
  );
}
