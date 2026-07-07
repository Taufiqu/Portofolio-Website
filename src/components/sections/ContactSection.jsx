"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const MY_EMAIL = "taufiqu.dev@gmail.com";

function ContactSection() {
  const { theme } = useTheme();
  const isPro = theme === 'pro';
  const form = useRef();
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [showCopyToast, setShowCopyToast] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
 
    emailjs.sendForm('service_j4eifiq', 'template_0o1pdwi', form.current, 'Twqk5ZjbD6WXRHN69')
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
          setTimeout(() => setStatus(''), 5000);
      });
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(MY_EMAIL);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    }
  };

  return (
    <section 
      id="contact" 
      className="bg-[var(--color-background)] py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--color-outline)] transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto rounded-3xl bg-[var(--color-card-bg)] p-8 md:p-12 border border-[var(--color-outline)] shadow-2xl transition-colors duration-500">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Left Column: Context & Socials */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              {isPro ? (
                <p className="text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2 font-semibold">
                  Open Port
                </p>
              ) : (
                <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
                  [ 05. Open Port ]
                </p>
              )}
              <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wide mb-6" style={{ color: 'var(--color-text)' }}>
                Let's Connect
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                Punya ide proyek menarik, riset kolaborasi, atau sekadar ingin menyapa? Inbox saya selalu terbuka. Saya akan membalas secepat mungkin melalui port komunikasi email!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <a
                  href="https://github.com/Taufiqu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 px-5 py-3 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 text-xs font-bold ${
                    isPro ? 'font-sans text-[var(--color-text)]' : 'font-mono-code text-white hover:text-[var(--color-primary)]'
                  }`}
                >
                  <FaGithub className="text-base" />
                  <span>{isPro ? 'GitHub' : 'GITHUB_SYS'}</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 px-5 py-3 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 text-xs font-bold ${
                    isPro ? 'font-sans text-[var(--color-text)]' : 'font-mono-code text-white hover:text-[var(--color-primary)]'
                  }`}
                >
                  <FaLinkedin className="text-base" />
                  <span>{isPro ? 'LinkedIn' : 'LINKEDIN_PORT'}</span>
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 py-3 text-xs font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] transition active:scale-95"
                style={{
                  fontFamily: isPro ? 'inherit' : 'Fira Code, monospace',
                  color: 'var(--color-primary)'
                }}
                onMouseEnter={(e) => {
                  if (isPro) e.currentTarget.style.color = '#FFFFFF';
                  else e.currentTarget.style.color = '#0B0F17';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
              >
                {showCopyToast 
                  ? (isPro ? "Email Copied!" : "EMAIL_COPIED_TO_CLIPBOARD")
                  : (isPro ? "Copy Email Address" : "COPY_EMAIL_ADDRESS")}
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-xs" style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}>
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Nama
              </label>
              <input 
                type="text" 
                name="name" 
                required
                className="rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 p-4 text-[var(--color-text)] placeholder-slate-400 dark:placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 text-xs" style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}>
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                required
                className="rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 p-4 text-[var(--color-text)] placeholder-slate-400 dark:placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs" style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}>
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Pesan
              </label>
              <textarea 
                name="message" 
                rows="4" 
                required
                className="resize-none rounded-xl border border-[var(--color-outline)] bg-black/5 dark:bg-white/5 p-4 text-[var(--color-text)] placeholder-slate-400 dark:placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Tulis pesanmu di sini..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-xs font-bold uppercase tracking-wider transition hover:opacity-95 hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                color: isPro ? '#FFFFFF' : '#0B0F17',
                fontFamily: isPro ? 'inherit' : 'Fira Code, monospace'
              }}
            >
              {status === 'sending' 
                ? (isPro ? 'Sending...' : 'SENDING_LOGS...') 
                : isPro 
                  ? (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  ) : (
                    <>
                      SEND_MESSAGE_LOG() <FaPaperPlane />
                    </>
                  )}
            </button>

            {/* Status Feedback */}
            {status === 'success' && (
              <p 
                className="text-center text-[11px] font-medium text-[var(--color-accent-green)] animate-pulse mt-2"
                style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}
              >
                {isPro ? '✓ Message successfully sent!' : '✓ SYS_MSG: Message successfully sent!'}
              </p>
            )}
            {status === 'error' && (
              <p 
                className="text-center text-[11px] font-medium text-red-500 mt-2"
                style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}
              >
                {isPro ? '✗ Failed to send message. Please retry.' : '✗ SYS_ERR: Failed to dispatch logs. Please retry.'}
              </p>
            )}
          </form>

        </div>
      </div>

      {/* Email copy toast */}
      <div 
        className={`fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-card-bg)] px-6 py-3.5 text-xs text-[var(--color-text)] shadow-[0_10px_30px_rgba(37,99,235,0.15)] backdrop-blur-md transition-all duration-500 ${
          showCopyToast 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        style={{ fontFamily: isPro ? 'inherit' : 'Fira Code, monospace' }}
      >
        <span 
          className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-[10px]"
          style={{ color: isPro ? '#FFFFFF' : '#0B0F17' }}
        >
          ✓
        </span>
        {isPro ? 'Email copied to clipboard!' : 'SYS_MSG: Email copied to clipboard!'}
      </div>
    </section>
  );
}

export default ContactSection;
