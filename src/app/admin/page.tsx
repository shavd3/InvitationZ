'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, LogOut, RefreshCw, RotateCcw } from 'lucide-react';
import type { GuestAdmin } from '@/lib/guest';

type AdminGuest = GuestAdmin & { inviteUrl: string };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [guests, setGuests] = useState<AdminGuest[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState('');
  const [resettingId, setResettingId] = useState('');
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'declined'>('all');

  async function loadGuests() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/guests');
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setGuests(data.guests ?? []);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGuests();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError('Incorrect password.');
      return;
    }
    setPassword('');
    await loadGuests();
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setAuthenticated(false);
    setGuests([]);
  }

  async function copyLink(slug: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(''), 2000);
  }

  async function resetRsvp(guest: AdminGuest) {
    if (guest.rsvpStatus === 'pending') return;
    if (!confirm(`Reset RSVP for ${guest.displayName}? They will need to respond again.`)) return;

    setResettingId(guest.id);
    try {
      const res = await fetch(`/api/admin/guests/${guest.id}/reset-rsvp`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Unable to reset RSVP.');
        return;
      }
      setGuests((prev) => prev.map((g) => (g.id === guest.id ? data.guest : g)));
    } catch {
      alert('Unable to reset RSVP. Please try again.');
    } finally {
      setResettingId('');
    }
  }

  const filtered = guests.filter((g) => {
    const matchesText =
      !filter ||
      g.displayName.toLowerCase().includes(filter.toLowerCase()) ||
      g.category.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || g.rsvpStatus === statusFilter;
    return matchesText && matchesStatus;
  });

  const stats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.rsvpStatus === 'confirmed').length,
    declined: guests.filter((g) => g.rsvpStatus === 'declined').length,
    pending: guests.filter((g) => g.rsvpStatus === 'pending').length,
    attending: guests
      .filter((g) => g.rsvpStatus === 'confirmed')
      .reduce((sum, g) => sum + (g.confirmedCount ?? g.invitedCount), 0),
  };

  if (authenticated === null) {
    return (
      <div className="theme-ivory admin-surface">
        <main className="max-w-md mx-auto px-4 py-16">
        <div className="card text-center text-warm-gray-light">Loading...</div>
      </main>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="theme-ivory admin-surface">
        <main className="max-w-md mx-auto px-4 py-16">
        <div className="card">
          <h1 className="text-2xl font-bold text-gold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            {loginError && <p className="text-red-600 text-sm text-center">{loginError}</p>}
            <button type="submit" className="btn-gold">
              Sign in
            </button>
          </form>
        </div>
      </main>
      </div>
    );
  }

  return (
    <div className="theme-ivory admin-surface">
      <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gold">Invitation Links</h1>
          <p className="text-warm-gray-light text-sm mt-1">
            {stats.total} invites · {stats.confirmed} confirmed · {stats.declined} declined ·{' '}
            {stats.pending} pending · {stats.attending} attending
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={loadGuests} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button type="button" onClick={handleLogout} className="btn-secondary flex items-center gap-2">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>

      <div className="card mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search by name or category..."
          className="flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="sm:w-44 px-3 py-2 border-2 border-ivory-dark rounded-lg text-sm"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {loading ? (
        <div className="card text-center text-warm-gray-light">Loading guests...</div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ivory-dark bg-ivory/50">
                <th className="text-left p-3 font-semibold text-warm-gray">Name</th>
                <th className="text-left p-3 font-semibold text-warm-gray hidden sm:table-cell">Side</th>
                <th className="text-center p-3 font-semibold text-warm-gray">Invited</th>
                <th className="text-center p-3 font-semibold text-warm-gray">RSVP</th>
                <th className="text-center p-3 font-semibold text-warm-gray hidden md:table-cell">Attending</th>
                <th className="text-right p-3 font-semibold text-warm-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.id} className="border-b border-ivory-dark last:border-0 hover:bg-ivory/30">
                  <td className="p-3">
                    <div className="font-medium text-gold">{g.displayName}</div>
                    {g.category && (
                      <div className="text-xs text-warm-gray-light">{g.category}</div>
                    )}
                  </td>
                  <td className="p-3 capitalize hidden sm:table-cell text-warm-gray">{g.side}</td>
                  <td className="p-3 text-center">{g.invitedCount}</td>
                  <td className="p-3 text-center">
                    <span className={`status-badge status-${g.rsvpStatus}`}>{g.rsvpStatus}</span>
                  </td>
                  <td className="p-3 text-center hidden md:table-cell">
                    {g.rsvpStatus === 'confirmed' ? (g.confirmedCount ?? g.invitedCount) : '—'}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-col sm:flex-row items-end sm:justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => copyLink(g.slug, g.inviteUrl)}
                        className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1.5 px-3"
                      >
                        {copiedSlug === g.slug ? (
                          <>
                            <Check size={14} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copy link
                          </>
                        )}
                      </button>
                      {g.rsvpStatus !== 'pending' && (
                        <button
                          type="button"
                          onClick={() => resetRsvp(g)}
                          disabled={resettingId === g.id}
                          className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1.5 px-3 text-red-700 border-red-200 hover:border-red-400 hover:text-red-800"
                        >
                          <RotateCcw size={14} />
                          {resettingId === g.id ? 'Resetting...' : 'Reset RSVP'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-warm-gray-light py-8">No guests match your filters.</p>
          )}
        </div>
      )}
    </main>
    </div>
  );
}
