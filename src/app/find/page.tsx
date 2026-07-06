'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { InvitationFrame, HeartDivider } from '@/components/Floral';
import { CoupleNames, EventDetails } from '@/components/InviteLayout';
import type { GuestSearchResult } from '@/lib/guest';

export default function FindPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GuestSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) {
      setError('Please enter at least 2 letters.');
      return;
    }
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Search failed.');
        setResults([]);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <InvitationFrame>
      <div className="my-2 mb-6">
        <CoupleNames />
      </div>

      <div className="panel mb-6">
        <h2 className="text-xl font-semibold text-[color:var(--color-gold-dark)] text-center mb-2">
          Find Your Invitation
        </h2>
        <p className="text-center text-warm-gray-light text-sm mb-6">
          Type your name below to find your personal invitation link.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Your first or last name"
              className="pl-12"
              autoComplete="name"
            />
          </div>
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          <button type="submit" className="btn-gold" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {searched && !loading && results.length === 0 && !error && (
        <div className="panel text-center text-warm-gray mb-6">
          <p className="text-base">No matching invitation found.</p>
          <p className="text-sm text-warm-gray-light mt-2">
            Try a different spelling, or contact us for help.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="panel mb-6">
          <p className="text-warm-gray-light text-sm mb-3 text-center">Tap your name:</p>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.slug}>
                <button
                  type="button"
                  onClick={() => router.push(`/${r.slug}`)}
                  className="w-full text-center px-4 py-4 rounded-2xl bg-white/70 border-2 border-[color:var(--color-blush-dark)] hover:border-[color:var(--color-gold)] transition-colors text-lg font-medium text-[color:var(--color-gold-dark)]"
                >
                  {r.displayName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <HeartDivider />

      <EventDetails />
    </InvitationFrame>
  );
}
