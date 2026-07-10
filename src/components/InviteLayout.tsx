import { MapPin, Phone } from 'lucide-react';
import { WEDDING } from '@/lib/constants';

export function CoupleNames() {
  return (
    <h1 className="font-display text-center text-5xl sm:text-6xl text-foil leading-[1.15] tracking-tight">
      Amaya &amp; Shavin
    </h1>
  );
}

export function ParentsBlessing({ inviteeName }: { inviteeName?: string }) {
  return (
    <div className="text-center leading-relaxed">
      <p
        className="uppercase tracking-[0.2em] text-[0.65rem] sm:text-xs text-warm-gray font-medium"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {WEDDING.brideParents}
      </p>
      <p
        className="uppercase tracking-[0.25em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-light font-normal my-3"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Together With
      </p>
      <p
        className="uppercase tracking-[0.2em] text-[0.65rem] sm:text-xs text-warm-gray font-medium"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {WEDDING.groomParents}
      </p>
      {inviteeName ? (
        <div className="mt-6">
          <p
            className="uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-light font-normal"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Invite
          </p>
          <p
            className="font-display text-xl sm:text-2xl text-[color:var(--color-gold-dark)] my-3 tracking-normal"
          >
            {inviteeName}
          </p>
          <p
            className="uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-light font-normal"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            to the Wedding Ceremony of Their Children
          </p>
        </div>
      ) : (
        <p
          className="uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-light font-normal mt-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Invite You to the Wedding Ceremony of Their Children
        </p>
      )}
    </div>
  );
}

export function EventDetails({
  compact = false,
  showDirections = false,
}: {
  compact?: boolean;
  showDirections?: boolean;
}) {
  return (
    <div className="text-center -mt-3">
      <div
        className={`mx-auto flex max-w-md items-stretch justify-center ${compact ? 'my-3' : 'mt-0 mb-5'}`}
        aria-label={WEDDING.dateDisplay}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:px-2">
          <span className="mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/70" />
          <p
            className="py-3 text-center text-[0.65rem] sm:text-xs font-medium uppercase leading-snug tracking-[0.16em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateWeekday}
          </p>
          <span className="mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/70" />
        </div>

        <span className="w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/70" aria-hidden="true" />

        <div className="flex shrink-0 flex-col items-center justify-center px-4 sm:px-6">
          <p
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.26em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateMonth}
          </p>
          <p className="font-display my-1 text-6xl sm:text-7xl leading-none tracking-tight text-foil">
            {WEDDING.dateDay}
          </p>
          <p
            className="text-base sm:text-lg font-medium uppercase tracking-[0.2em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateYear}
          </p>
        </div>

        <span className="w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/70" aria-hidden="true" />

        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:px-2">
          <span className="mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/70" />
          <p
            className="py-2 text-center font-medium uppercase text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="block text-[0.6rem] sm:text-xs tracking-[0.2em]">At</span>
            <span className="mt-1 block text-base sm:text-lg leading-tight tracking-[0.06em]">
              {WEDDING.timeDisplay}
            </span>
          </p>
          <span className="mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/70" />
        </div>
      </div>

      <p
        className={`uppercase tracking-[0.3em] text-[0.6rem] text-warm-gray-light font-normal ${compact ? 'mt-4' : 'mt-6'}`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        At
      </p>
      <p
        className={`text-base sm:text-lg text-warm-gray font-medium mt-2 ${compact ? 'mb-2' : 'mb-3'}`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {WEDDING.venueFull}
      </p>

      {showDirections && (
        <a
          href={WEDDING.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-[0.65rem] py-2 px-5"
        >
          <MapPin size={14} />
          Get Directions
        </a>
      )}
    </div>
  );
}

export function RefreshmentsNote() {
  return (
    <p
      className="text-center uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-light font-normal leading-relaxed"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {WEDDING.refreshmentsNote}
    </p>
  );
}

export function ContactDetails() {
  return (
    <div className="text-center space-y-3 pt-2">
      <p
        className="text-warm-gray-light text-[0.65rem] tracking-[0.2em] uppercase font-normal"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Enquiries
      </p>
      <div className="flex flex-col items-center gap-2.5">
        {WEDDING.contacts.map((c) => (
          <a
            key={c.tel}
            href={c.tel}
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-gold-dark)] hover:underline tracking-wide"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <Phone size={15} strokeWidth={1.5} />
            <span>
              {c.label} · {c.phone}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}