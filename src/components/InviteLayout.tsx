import { MapPin, Phone } from 'lucide-react';
import { DateTenEasterEgg } from '@/components/DateTenEasterEgg';
import { WEDDING } from '@/lib/constants';

/* Engraved rules, applied throughout this file:
   - Everything a paper invitation would say is set in Cormorant (var(--font-sans)).
     Inter is for app mechanics only (validation errors, "you may revisit" micro-copy).
   - The couple's names are the only script on the card, and gold appears just where
     an engraver would spend it: names, "together with", the addressee, the day. */

function ParentLine({ name }: { name: string }) {
  const lateMatch = name.match(/^(.+?)\s*\(Late\)$/i);
  const lineClass =
    'uppercase tracking-[0.15em] text-sm sm:text-[0.95rem] text-warm-gray font-semibold';

  if (lateMatch) {
    return (
      <p className={lineClass} style={{ fontFamily: 'var(--font-sans)' }}>
        {lateMatch[1]}{' '}
        <span className="inline text-[0.72em] tracking-[0.1em] align-baseline whitespace-nowrap">
          (Late)
        </span>
      </p>
    );
  }

  return (
    <p className={lineClass} style={{ fontFamily: 'var(--font-sans)' }}>
      {name}
    </p>
  );
}

export function CoupleNames() {
  /* Paint (gold + living foil), font, and entrance write-on all live on .couple-names.
     Sized a step up from the Pinyon days — Great Vibes carries a smaller body at the
     same font-size. */
  return (
    <h1 className="couple-names text-center text-[3.4rem] sm:text-[4rem] leading-[1.15]">
      Amaya &amp; Shavin
    </h1>
  );
}

export function ParentsBlessing({ inviteeName }: { inviteeName?: string }) {
  return (
    <div className="text-center leading-relaxed">
      <ParentLine name={WEDDING.brideParents} />
      <p className="font-display text-base sm:text-lg text-[color:var(--color-gold-dark)] my-3 tracking-[0.02em]">
        together with
      </p>
      <ParentLine name={WEDDING.groomParents} />
      {inviteeName ? (
        <div className="mt-8">
          <p
            className="uppercase tracking-[0.3em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-muted font-medium"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Invite
          </p>
          <p
            className="text-2xl sm:text-3xl text-[color:var(--color-gold-dark)] my-3"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {inviteeName}
          </p>
          <p
            className="uppercase tracking-[0.14em] text-xs sm:text-sm text-warm-gray-light font-medium leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            to the Wedding Ceremony of Their Children
          </p>
        </div>
      ) : (
        <p
          className="uppercase tracking-[0.14em] text-xs sm:text-sm text-warm-gray-light font-medium mt-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)' }}
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
    <div className="text-center">
      <div
        className={`mx-auto flex max-w-md items-stretch justify-center ${compact ? 'my-3' : 'mt-0 mb-5'}`}
        aria-label={WEDDING.dateDisplay}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:px-2">
          <span className="date-rule-h mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/55" />
          <p
            className="py-3 text-center text-[0.65rem] sm:text-xs font-medium uppercase leading-snug tracking-[0.16em] text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateWeekday}
          </p>
          <span className="date-rule-h mx-auto h-px w-full max-w-[4.5rem] bg-[color:var(--color-gold-light)]/55" />
        </div>

        <span className="date-rule-v w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/55" aria-hidden="true" />

        <div className="flex shrink-0 flex-col items-center justify-center px-4 sm:px-6">
          <p
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.26em] text-warm-gray-light"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateMonth}
          </p>
          <DateTenEasterEgg />
          <p
            className="text-base sm:text-lg font-medium uppercase tracking-[0.2em] text-warm-gray-light"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {WEDDING.dateYear}
          </p>
        </div>

        <span className="date-rule-v w-px shrink-0 self-stretch bg-[color:var(--color-gold-light)]/55" aria-hidden="true" />

        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 sm:px-2">
          <span className="date-rule-h mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/55" />
          <p
            className="py-3 text-center font-medium uppercase text-warm-gray"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="block text-base sm:text-lg leading-tight tracking-[0.06em]">
              {WEDDING.timeDisplay}
            </span>
          </p>
          <span className="date-rule-h mx-auto h-px w-full max-w-[5.5rem] bg-[color:var(--color-gold-light)]/55" />
        </div>
      </div>

      <p
        className={`uppercase tracking-[0.3em] text-[0.6rem] text-warm-gray-muted font-medium ${compact ? 'mt-4' : 'mt-6'}`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        At
      </p>
      <p
        className={`text-lg sm:text-xl text-warm-gray font-medium mt-2 ${compact ? 'mb-2' : 'mb-3'}`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {WEDDING.venueFull}
      </p>

      {showDirections && (
        <a
          href={WEDDING.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-[0.7rem] py-2 px-5"
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
    <p className="font-display text-center text-sm sm:text-base text-warm-gray-light font-medium leading-relaxed">
      {WEDDING.refreshmentsNote}
    </p>
  );
}

export function ContactDetails() {
  return (
    <div className="text-center space-y-3 pt-2">
      <p
        className="uppercase tracking-[0.3em] text-[0.6rem] text-warm-gray-muted font-medium"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        Enquiries
      </p>
      <div className="flex flex-col items-center gap-2.5">
        {WEDDING.contacts.map((c) => (
          <a
            key={c.tel}
            href={c.tel}
            className="inline-flex items-center gap-2 text-base font-medium text-[color:var(--color-gold-dark)] hover:underline tracking-wide"
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
