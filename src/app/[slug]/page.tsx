'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Minus, Plus, CalendarPlus, Pencil } from 'lucide-react';
import { InvitationFrame, OrnamentalDivider } from '@/components/Floral';
import { InviteExperience } from '@/components/InviteExperience';
import {
  CoupleNames,
  ParentsBlessing,
  EventDetails,
  ContactDetails,
} from '@/components/InviteLayout';
import { WEDDING, googleCalendarUrl } from '@/lib/constants';
import type { GuestPublic } from '@/lib/guest';

type Step = 'view' | 'accept-count';

export default function RsvpPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [guest, setGuest] = useState<GuestPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState<Step>('view');
  const [editing, setEditing] = useState(false);
  const [attendingCount, setAttendingCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/guest/${slug}`);
        if (!res.ok) {
          setError(res.status === 404 ? 'Invitation not found.' : 'Unable to load invitation.');
          return;
        }
        const data: GuestPublic = await res.json();
        setGuest(data);
        setAttendingCount(data.confirmedCount ?? data.invitedCount ?? 1);
        setEditing(data.rsvpStatus === 'pending');
      } catch {
        setError('Unable to load invitation. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function submitRsvp(status: 'confirmed' | 'declined', count?: number) {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/guest/${slug}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          confirmed_count: status === 'confirmed' ? count : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to save your response.');
        return;
      }
      setGuest(data);
      setEditing(false);
      setStep('view');
    } catch {
      setError('Unable to save your response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit() {
    setEditing(true);
    setStep('view');
    setError('');
  }

  if (loading) {
    return (
      <InviteExperience>
        <InvitationFrame>
          <p className="text-center text-warm-gray-muted text-sm tracking-widest uppercase">
            Loading your invitation...
          </p>
        </InvitationFrame>
      </InviteExperience>
    );
  }

  if (error && !guest) {
    return (
      <InviteExperience>
        <InvitationFrame>
          <div className="text-center">
            <p className="text-base text-warm-gray mb-4">{error}</p>
            <p className="text-[0.65rem] text-warm-gray-muted tracking-wide leading-relaxed">
              Please open the personal invitation link sent to you.
            </p>
          </div>
        </InvitationFrame>
      </InviteExperience>
    );
  }

  if (!guest) return null;

  const hasResponded = guest.rsvpStatus !== 'pending';
  const showSummary = hasResponded && !editing && step !== 'accept-count';

  return (
    <InviteExperience>
      <InvitationFrame>
        <ParentsBlessing inviteeName={guest.displayName} />

        <CoupleNames />

        <OrnamentalDivider />

        <EventDetails showDirections={guest.rsvpStatus === 'confirmed'} />

        <p className="text-center uppercase tracking-[0.2em] text-[0.6rem] sm:text-[0.65rem] text-warm-gray-muted font-normal leading-relaxed">
          {WEDDING.refreshmentsNote}
        </p>

        {!hasResponded && (
          <p className="text-center text-[0.65rem] sm:text-xs text-warm-gray-muted tracking-wide">
            Kindly respond by{' '}
            <span className="text-[color:var(--color-gold-dark)] font-medium">
              {WEDDING.rsvpDeadline}
            </span>
          </p>
        )}

        {error && (
          <div className="mb-4 p-3 border border-red-200 bg-red-50/80 text-red-800 text-center text-sm">
            {error}
          </div>
        )}

        {showSummary && (
          <div className="panel text-center">
            {guest.rsvpStatus === 'confirmed' ? (
              <>
                <p className="font-display text-2xl text-foil mb-3">
                  With gratitude
                </p>
                <p className="text-sm text-warm-gray-light font-light leading-relaxed mb-1">
                  We are honoured you will join us
                  {guest.confirmedCount && guest.confirmedCount > 1
                    ? ` with ${guest.confirmedCount} guests`
                    : ''}
                  .
                </p>
              </>
            ) : (
              <>
                <p
                  className="text-2xl text-[color:var(--color-gold-dark)] mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Thank you
                </p>
                <p className="text-sm text-warm-gray-light font-light leading-relaxed">
                  We understand, and appreciate you letting us know.
                </p>
              </>
            )}
            <p className="text-[0.65rem] text-warm-gray-muted mt-5 tracking-wide">
              You may revisit this link to amend your response.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              {guest.rsvpStatus === 'confirmed' && (
                <a
                  href={googleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center justify-center gap-2"
                >
                  <CalendarPlus size={16} strokeWidth={1.5} />
                  Add to Calendar
                </a>
              )}
              <button
                type="button"
                onClick={startEdit}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Pencil size={15} strokeWidth={1.5} />
                Amend Response
              </button>
            </div>
          </div>
        )}

        {!showSummary && (
          <div className="panel py-5">
            {hasResponded && step === 'view' && (
              <div className="text-center mb-5">
                <p className="text-warm-gray-muted text-[0.65rem] uppercase tracking-[0.2em] mb-2">
                  Your response
                </p>
                <span className={`status-badge status-${guest.rsvpStatus}`}>
                  {guest.rsvpStatus === 'confirmed'
                    ? `Attending${guest.confirmedCount ? ` · ${guest.confirmedCount}` : ''}`
                    : 'Unable to attend'}
                </span>
              </div>
            )}

            {step === 'view' && (
              <div className="space-y-4">
                <button
                  type="button"
                  className="btn-gold"
                  disabled={submitting}
                  onClick={() => {
                    if (guest.invitedCount > 1) {
                      setAttendingCount(guest.confirmedCount ?? guest.invitedCount);
                      setStep('accept-count');
                    } else {
                      submitRsvp('confirmed', 1);
                    }
                  }}
                >
                  Accept with pleasure
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  disabled={submitting}
                  onClick={() => submitRsvp('declined')}
                >
                  Regretfully decline
                </button>
              </div>
            )}

            {step === 'accept-count' && (
              <div>
                <h2
                  className="text-xl text-[color:var(--color-gold-dark)] text-center mb-2 font-semibold"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  How many will attend?
                </h2>
                <p className="text-center text-warm-gray-muted text-[0.65rem] uppercase tracking-[0.15em] mb-7">
                  Up to {guest.invitedCount} guest{guest.invitedCount > 1 ? 's' : ''}
                </p>
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    type="button"
                    aria-label="Decrease count"
                    className="w-12 h-12 border border-[color:var(--color-gold)] text-[color:var(--color-gold-dark)] flex items-center justify-center hover:bg-[color:var(--color-gold)]/10 transition-colors disabled:opacity-30"
                    disabled={attendingCount <= 1}
                    onClick={() => setAttendingCount((c) => Math.max(1, c - 1))}
                  >
                    <Minus size={20} strokeWidth={1.5} />
                  </button>
                  <span
                    className="font-display text-4xl text-[color:var(--color-gold-dark)] w-14 text-center"
                  >
                    {attendingCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase count"
                    className="w-12 h-12 border border-[color:var(--color-gold)] text-[color:var(--color-gold-dark)] flex items-center justify-center hover:bg-[color:var(--color-gold)]/10 transition-colors disabled:opacity-30"
                    disabled={attendingCount >= guest.invitedCount}
                    onClick={() => setAttendingCount((c) => Math.min(guest.invitedCount, c + 1))}
                  >
                    <Plus size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="space-y-4">
                  <button
                    type="button"
                    className="btn-gold"
                    disabled={submitting}
                    onClick={() => submitRsvp('confirmed', attendingCount)}
                  >
                    {submitting ? 'Saving...' : 'Confirm attendance'}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full"
                    disabled={submitting}
                    onClick={() => setStep('view')}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {hasResponded && (
          <>
            <OrnamentalDivider />
            <ContactDetails />
          </>
        )}
      </InvitationFrame>
    </InviteExperience>
  );
}
