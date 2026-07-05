'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Minus, Plus, CalendarPlus, CheckCircle, XCircle, Pencil } from 'lucide-react';
import InviteHeader, { ContactDetails, EventDetails, FindInviteLink } from '@/components/InviteLayout';
import { WEDDING, googleCalendarUrl } from '@/lib/constants';
import type { GuestPublic } from '@/lib/guest';

type Step = 'view' | 'accept-count' | 'submitting' | 'done';

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
      setStep('done');
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
      <main className="max-w-lg mx-auto px-4 py-10">
        <InviteHeader />
        <div className="card text-center text-warm-gray-light text-lg">Loading your invitation...</div>
      </main>
    );
  }

  if (error && !guest) {
    return (
      <main className="max-w-lg mx-auto px-4 py-10">
        <InviteHeader />
        <div className="card text-center">
          <p className="text-lg text-warm-gray mb-4">{error}</p>
          <Link href="/find" className="btn-gold">
            Find your invitation
          </Link>
        </div>
      </main>
    );
  }

  if (!guest) return null;

  const hasResponded = guest.rsvpStatus !== 'pending';
  const showSummary = hasResponded && !editing && step !== 'accept-count';

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <InviteHeader />

      <div className="card mb-6">
        <p className="text-center text-xl sm:text-2xl text-warm-gray mb-2">Dear {guest.displayName},</p>
        <p className="text-center text-lg text-warm-gray-light leading-relaxed">
          You are cordially invited to celebrate our wedding ceremony with us.
        </p>
        {guest.invitedCount > 1 && (
          <p className="text-center text-warm-gray mt-3 text-base">
            This invitation is for <strong>{guest.invitedCount} guests</strong>.
          </p>
        )}
      </div>

      <div className="card mb-6">
        <h2 className="text-2xl font-semibold text-gold mb-4 text-center">When & Where</h2>
        <EventDetails />
      </div>

      <div className="card mb-6">
        <p className="text-center text-warm-gray-light text-sm mb-1">Please respond by</p>
        <p className="text-center text-lg font-semibold text-gold">{WEDDING.rsvpDeadline}</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-800 text-center">{error}</div>
      )}

      {/* Already responded — summary view */}
      {showSummary && (
        <div className="card mb-6 text-center">
          {guest.rsvpStatus === 'confirmed' ? (
            <>
              <CheckCircle className="mx-auto text-green-600 mb-3" size={48} />
              <h2 className="text-2xl font-semibold text-gold mb-2">Thank you!</h2>
              <p className="text-lg text-warm-gray mb-1">
                We&apos;re delighted you&apos;ll be joining us
                {guest.confirmedCount && guest.confirmedCount > 1
                  ? ` with ${guest.confirmedCount} guests`
                  : ''}
                .
              </p>
            </>
          ) : (
            <>
              <XCircle className="mx-auto text-warm-gray-light mb-3" size={48} />
              <h2 className="text-2xl font-semibold text-gold mb-2">Thank you for letting us know</h2>
              <p className="text-lg text-warm-gray">We&apos;ll miss you on our special day.</p>
            </>
          )}
          <p className="text-sm text-warm-gray-light mt-4">
            You can reopen this link anytime to change your response.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center justify-center gap-2">
              <CalendarPlus size={20} />
              Add to Google Calendar
            </a>
            <a href="/api/calendar" className="btn-secondary text-center">
              Download calendar file (.ics)
            </a>
            <button type="button" onClick={startEdit} className="btn-secondary flex items-center justify-center gap-2">
              <Pencil size={18} />
              Edit my RSVP
            </button>
          </div>
        </div>
      )}

      {/* Fresh visit or editing */}
      {!showSummary && step !== 'done' && (
        <>
          {hasResponded && step === 'view' && (
            <div className="card mb-4 text-center">
              <p className="text-warm-gray mb-2">Your current response:</p>
              <span className={`status-badge status-${guest.rsvpStatus}`}>
                {guest.rsvpStatus === 'confirmed'
                  ? `Attending${guest.confirmedCount ? ` (${guest.confirmedCount})` : ''}`
                  : 'Not attending'}
              </span>
            </div>
          )}

          {step === 'view' && (
            <div className="space-y-3">
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
                Yes, we&apos;re coming!
              </button>
              <button
                type="button"
                className="btn-outline"
                disabled={submitting}
                onClick={() => submitRsvp('declined')}
              >
                Sorry, we can&apos;t make it
              </button>
            </div>
          )}

          {step === 'accept-count' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gold text-center mb-4">
                How many of you are coming?
              </h2>
              <p className="text-center text-warm-gray-light mb-6">
                Up to {guest.invitedCount} guest{guest.invitedCount > 1 ? 's' : ''}
              </p>
              <div className="flex items-center justify-center gap-6 mb-8">
                <button
                  type="button"
                  aria-label="Decrease count"
                  className="w-14 h-14 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors disabled:opacity-40"
                  disabled={attendingCount <= 1}
                  onClick={() => setAttendingCount((c) => Math.max(1, c - 1))}
                >
                  <Minus size={24} />
                </button>
                <span className="text-5xl font-bold text-gold w-16 text-center">{attendingCount}</span>
                <button
                  type="button"
                  aria-label="Increase count"
                  className="w-14 h-14 rounded-full border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors disabled:opacity-40"
                  disabled={attendingCount >= guest.invitedCount}
                  onClick={() => setAttendingCount((c) => Math.min(guest.invitedCount, c + 1))}
                >
                  <Plus size={24} />
                </button>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  className="btn-gold"
                  disabled={submitting}
                  onClick={() => submitRsvp('confirmed', attendingCount)}
                >
                  {submitting ? 'Saving...' : 'Confirm'}
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
        </>
      )}

      {/* Just submitted */}
      {step === 'done' && (
        <div className="card mb-6 text-center">
          {guest.rsvpStatus === 'confirmed' ? (
            <>
              <CheckCircle className="mx-auto text-green-600 mb-3" size={48} />
              <h2 className="text-2xl font-semibold text-gold mb-2">Thank you!</h2>
              <p className="text-lg text-warm-gray">
                We&apos;re delighted you&apos;ll be joining us
                {guest.confirmedCount && guest.confirmedCount > 1
                  ? ` with ${guest.confirmedCount} guests`
                  : ''}
                .
              </p>
            </>
          ) : (
            <>
              <XCircle className="mx-auto text-warm-gray-light mb-3" size={48} />
              <h2 className="text-2xl font-semibold text-gold mb-2">Thank you for letting us know</h2>
              <p className="text-lg text-warm-gray">We&apos;ll miss you on our special day.</p>
            </>
          )}
          <p className="text-sm text-warm-gray-light mt-4">
            You can reopen this link anytime to change your response.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center justify-center gap-2">
              <CalendarPlus size={20} />
              Add to Google Calendar
            </a>
            <a href="/api/calendar" className="btn-secondary text-center">
              Download calendar file (.ics)
            </a>
            <button type="button" onClick={startEdit} className="btn-secondary flex items-center justify-center gap-2">
              <Pencil size={18} />
              Edit my RSVP
            </button>
          </div>
        </div>
      )}

      <div className="card mt-6">
        <ContactDetails />
      </div>

      <FindInviteLink />
    </main>
  );
}
