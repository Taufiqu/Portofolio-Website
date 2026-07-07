"use client";

import React, { useState, useEffect } from 'react';

function GuestbookSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook');
      if (res.ok) {
        const data = await res.json();
        setEntries(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch guestbook:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan.');
      }

      setStatus('success');
      setName('');
      setMessage('');
      fetchEntries();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="guestbook" className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
            [ 04. Guestbook ]
          </p>
          <h2 className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl">
            Leave a Message
          </h2>
          <p className="mt-4 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
            Tinggalkan nama dan pesan kamu. Siapa tau kita bisa connect.
          </p>
          <div className="h-px w-16 bg-[var(--color-primary)] mt-6 mx-auto" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-14">
          <div>
            <label className="block text-xs font-mono-code text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              maxLength={50}
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
              Pesan
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis sesuatu..."
              maxLength={200}
              required
              rows={4}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30 transition"
            />
            <div className="text-right text-[10px] font-mono-code text-white/20 mt-1">
              {message.length}/200
            </div>
          </div>

          {/* Feedback */}
          {status === 'success' && (
            <p className="text-xs font-mono-code text-emerald-400">✓ Pesan berhasil dikirim!</p>
          )}
          {status === 'error' && (
            <p className="text-xs font-mono-code text-red-400">✗ {errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-[#0B0F17] tracking-wider uppercase hover:opacity-90 hover:shadow-[0_0_24px_rgba(0,242,254,0.25)] active:scale-[0.98] transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim →'}
          </button>
        </form>

        {/* Entries */}
        <div className="space-y-4">
          <p className="text-xs font-mono-code text-[var(--color-text-muted)] uppercase tracking-wider">
            — {entries.length} pesan terakhir
          </p>

          {entries.length === 0 ? (
            <p className="text-sm text-white/20 font-mono-code text-center py-8">
              Belum ada pesan. Jadilah yang pertama!
            </p>
          ) : (
            entries.map((entry) => {
              const date = new Date(entry.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
              return (
                <div
                  key={entry.id}
                  className="rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 hover:border-[var(--color-primary)]/20 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-white">{entry.name}</span>
                    <span className="text-[11px] font-mono-code text-white/30">{date}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed break-words">{entry.message}</p>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}

export default GuestbookSection;
