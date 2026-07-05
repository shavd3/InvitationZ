'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import InviteHeader, { EventDetails } from '@/components/InviteLayout';
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
    <main className="max-w-lg mx-auto px-4 py-10">
      <InviteHeader />

      <div className="card mb-6">
        <h2 className="text-2xl font-semibold text-gold text-center mb-2">Find Your Invitation</h2>
        <p className="text-center text-warm-gray-light text-base mb-6">
          Type your name below to find your personal invitation link.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray-light" size={22} />
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
        <div className="card text-center text-warm-gray">
          <p className="text-lg">No matching invitation found.</p>
          <p className="text-sm text-warm-gray-light mt-2">
            Try a different spelling, or contact us for help.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="card">
          <p className="text-warm-gray-light text-sm mb-3">Tap your name:</p>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.slug}>
                <button
                  type="button"
                  onClick={() => router.push(`/${r.slug}`)}
                  className="w-full text-left px-4 py-4 rounded-lg border-2 border-ivory-dark hover:border-gold hover:bg-gold/5 transition-colors text-lg font-medium text-gold"
                >
                  {r.displayName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card mt-6">
        <h3 className="text-xl font-semibold text-gold mb-4 text-center">Event Details</h3>
        <EventDetails />
      </div>
    </main>
  );
}
