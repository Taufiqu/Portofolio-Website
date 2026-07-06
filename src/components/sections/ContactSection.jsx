"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope } from 'react-icons/fa';

const MY_EMAIL = "taufiqu.dev@gmail.com";

function ContactSection() {
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
      className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#161F30] p-8 md:p-12 border border-white/5 shadow-2xl">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Left Column: Context & Socials */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono-code text-xs text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
                [ 03. Open Port ]
              </p>
              <h2 className="font-sans text-3xl font-extrabold uppercase tracking-wide text-white mb-6">
                Let's Connect
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-8">
                Punya ide proyek menarik, riset kolaborasi, atau sekadar ingin menyapa? Inbox saya selalu terbuka. Saya akan membalas secepat mungkin melalui port komunikasi email!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <a
                  href="https://github.com/Taufiqu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 text-xs font-mono-code font-bold text-white hover:text-[var(--color-primary)]"
                >
                  <FaGithub className="text-base" />
                  <span>GITHUB_SYS</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 text-xs font-mono-code font-bold text-white hover:text-[var(--color-primary)]"
                >
                  <FaLinkedin className="text-base" />
                  <span>LINKEDIN_PORT</span>
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 py-3 text-xs font-mono-code font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[#0B0F17] transition active:scale-95"
              >
                {showCopyToast ? "EMAIL_COPIED_TO_CLIPBOARD" : "COPY_EMAIL_ADDRESS"}
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 font-mono-code text-xs">
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Nama
              </label>
              <input 
                type="text" 
                name="name" 
                required
                className="rounded-xl border border-white/10 bg-black/25 p-4 text-white placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 font-mono-code text-xs">
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                required
                className="rounded-xl border border-white/10 bg-black/25 p-4 text-white placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5 font-mono-code text-xs">
              <label className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Pesan
              </label>
              <textarea 
                name="message" 
                rows="4" 
                required
                className="resize-none rounded-xl border border-white/10 bg-black/25 p-4 text-white placeholder-white/20 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Tulis pesanmu di sini..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 font-mono-code text-xs font-bold uppercase tracking-wider text-[#0B0F17] transition hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? 'SENDING_LOGS...' : (
                <>
                  SEND_MESSAGE_LOG() <FaPaperPlane />
                </>
              )}
            </button>

            {/* Status Feedback */}
            {status === 'success' && (
              <p className="text-center font-mono-code text-[11px] font-medium text-[var(--color-accent-green)] animate-pulse mt-2">
                ✓ SYS_MSG: Message successfully sent!
              </p>
            )}
            {status === 'error' && (
              <p className="text-center font-mono-code text-[11px] font-medium text-red-400 mt-2">
                ✗ SYS_ERR: Failed to dispatch logs. Please retry.
              </p>
            )}
          </form>

        </div>
      </div>

      {/* Email copy toast */}
      <div 
        className={`fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[var(--color-primary)]/30 bg-[#161F30]/95 px-6 py-3.5 text-xs font-mono-code text-white shadow-[0_10px_30px_rgba(0,242,254,0.15)] backdrop-blur-md transition-all duration-500 ${
          showCopyToast 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[#0B0F17] font-bold text-[10px]">
          ✓
        </span>
        SYS_MSG: Email copied to clipboard!
      </div>
    </section>
  );
}

export default ContactSection;
