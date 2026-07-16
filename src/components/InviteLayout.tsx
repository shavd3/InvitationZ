import { MapPin, Phone } from 'lucide-react';
import { startInviteMusic } from '@/components/InviteAudio';
import { DateTenEasterEgg } from '@/components/DateTenEasterEgg';
import { WEDDING } from '@/lib/constants';

function ParentLine({ name }: { name: string }) {
  const lateMatch = name.match(/^(.+?)\s*\(Late\)$/i);
  const lineClass =
    'uppercase tracking-[0.2em] text-xs sm:text-sm text-warm-gray font-medium text-shadow-soft';

  if (lateMatch) {
    return (
      <p className={lineClass} style={{ fontFamily: 'var(--font-body)' }}>
        {lateMatch[1]}{' '}
        <span className="inline text-[0.72em] tracking-[0.14em] align-baseline whitespace-nowrap">
          (Late)
        </span>
      </p>
    );
  }

  return (
    <p className={lineClass} style={{ fontFamily: 'var(--font-body)' }}>
      {name}
    </p>
  );
}

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
      <ParentLine name={WEDDING.brideParents} />
      <p
        className="italic tracking-[0.06em] text-sm sm:text-base text-[#6b4f28] font-medium my-4 text-shadow-soft"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        together with
      </p>
      <ParentLine name={WEDDING.groomParents} />
      {inviteeName ? (
        <div className="mt-7">
          <p
            className="uppercase tracking-[0.18em] text-xs sm:text-sm text-warm-gray-light font-medium text-shadow-soft"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Invite
          </p>
          <p
            className="font-display text-2xl sm:text-3xl text-[color:var(--color-gold-dark)] my-4 tracking-normal text-shadow-soft"
          >
            {inviteeName}
          </p>
          <p
            className="uppercase tracking-[0.16em] text-xs sm:text-sm text-warm-gray-light font-medium leading-relaxed text-shadow-soft"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            to the Wedding Ceremony of Their Children
          </p>
        </div>
      ) : (
        <p
          className="uppercase tracking-[0.16em] text-xs sm:text-sm text-warm-gray-light font-medium mt-7 leading-relaxed text-shadow-soft"
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
          <span className="mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/55" />
          <p
            className="py-3 text-center text-[0.65rem] sm:text-xs font-medium uppercase leading-snug tracking-[0.16em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateWeekday}
          </p>
          <span className="mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/55" />
        </div>

        <span className="w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/55" aria-hidden="true" />

        <div className="flex shrink-0 flex-col items-center justify-center px-4 sm:px-6">
          <p
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.26em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateMonth}
          </p>
          <DateTenEasterEgg />
          <p
            className="text-base sm:text-lg font-medium uppercase tracking-[0.2em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateYear}
          </p>
        </div>

        <span className="w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/55" aria-hidden="true" />

        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:px-2">
          <span className="mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/55" />
          <p
            className="py-3 text-center font-medium uppercase text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="block text-base sm:text-lg leading-tight tracking-[0.06em]">
              {WEDDING.timeDisplay}
            </span>
          </p>
          <span className="mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/55" />
        </div>
      </div>

      <p
        className={`uppercase tracking-[0.3em] text-[0.6rem] text-warm-gray-muted font-normal ${compact ? 'mt-4' : 'mt-6'}`}
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
          onClick={startInviteMusic}
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
      className="text-center uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-muted font-normal leading-relaxed"
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
        className="text-warm-gray-muted text-[0.65rem] tracking-[0.2em] uppercase font-normal"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Enquiries
      </p>
      <div className="flex flex-col items-center gap-2.5">
        {WEDDING.contacts.map((c) => (
          <a
            key={c.tel}
            href={c.tel}
            onClick={startInviteMusic}
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