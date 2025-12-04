import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const form = useRef();
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
 
    emailjs.sendForm('service_j4eifiq', 'template_0o1pdwi', form.current, 'Twqk5ZjbD6WXRHN69')
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          e.target.reset(); // Reset form setelah sukses
          setTimeout(() => setStatus(''), 5000); // Hapus pesan sukses setelah 5 detik
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`px-6 py-24 text-[var(--color-text)] transition-all duration-700 sm:px-10 lg:px-12 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[var(--color-card-bg)]/80 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-12">
        
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* KOLOM KIRI: Teks & Socials */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-['Oswald',sans-serif] text-4xl uppercase tracking-wide text-[var(--color-primary)]">
              Let's Connect!
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--color-text)]/85">
              Punya ide proyek menarik atau sekadar ingin menyapa? Inbox saya selalu terbuka. 
              Saya akan berusaha membalas secepat mungkin!
            </p>
            
            <div className="flex gap-6">
              <a
                href="https://github.com/Taufiqu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* KOLOM KANAN: Form Input */}
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]/60">
                Nama
              </label>
              <input 
                type="text" 
                name="name" 
                required
                className="rounded-xl border border-white/10 bg-black/20 p-4 text-[var(--color-text)] placeholder-white/20 outline-none transition-all focus:border-[var(--color-primary)] focus:bg-black/40 focus:shadow-[0_0_15px_rgba(0,255,127,0.1)]"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]/60">
                Email
              </label>
              <input 
                type="email" 
                name="email" 
                required
                className="rounded-xl border border-white/10 bg-black/20 p-4 text-[var(--color-text)] placeholder-white/20 outline-none transition-all focus:border-[var(--color-primary)] focus:bg-black/40 focus:shadow-[0_0_15px_rgba(0,255,127,0.1)]"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]/60">
                Pesan
              </label>
              <textarea 
                name="message" 
                rows="4" 
                required
                className="resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-[var(--color-text)] placeholder-white/20 outline-none transition-all focus:border-[var(--color-primary)] focus:bg-black/40 focus:shadow-[0_0_15px_rgba(0,255,127,0.1)]"
                placeholder="Tulis pesanmu di sini..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 font-['Oswald',sans-serif] text-lg font-bold uppercase tracking-wide text-[var(--color-background)] transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,255,127,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? 'Sending...' : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <p className="text-center text-sm font-medium text-green-400 animate-pulse">
                ✅ Pesan berhasil terkirim!
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm font-medium text-red-400">
                ❌ Gagal mengirim pesan. Coba lagi nanti.
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;