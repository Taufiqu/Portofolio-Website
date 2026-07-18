"use client";

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiArrowRight } from 'react-icons/fi';

const MY_EMAIL = "taufiqu.dev@gmail.com";

export default function ContactSection() {
  const form = useRef();
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [copied, setCopied] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
 
    emailjs.sendForm('service_j4eifiq', 'template_0o1pdwi', form.current, 'Twqk5ZjbD6WXRHN69')
      .then((result) => {
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.error(error.text);
          setStatus('error');
          setTimeout(() => setStatus(''), 5000);
      });
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(MY_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section 
      id="contact" 
      className="w-full bg-[#0F0F11] pt-24 pb-16 section-padding"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col gap-24">
        {/* Main Section Content (Asymmetric Grid) */}
        <div className="asymmetric-grid w-full">
          {/* Left Column */}
          <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2 select-none">
            <span className="font-mono text-xs tracking-widest text-[#2563EB]">05.</span>
            <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Contact</span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 items-start w-full">
            <div className="max-w-[640px]">
              <p className="text-editorial">
                If you value precision, structure, and maintainable code, let's start a conversation.
              </p>
            </div>

            {/* Contact Grid: Form & Email copy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full pt-6">
              {/* Form */}
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="clean-input p-3 text-sm rounded-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Email
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="clean-input p-3 text-sm rounded-sm"
                    placeholder="Your email address"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Message
                  </label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    required
                    className="clean-input p-3 text-sm resize-none rounded-sm"
                    placeholder="Describe your inquiry"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="group flex items-center justify-center gap-2 border border-zinc-800 bg-[#18181B] py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:border-[#2563EB] disabled:opacity-50 interactive-transition select-none cursor-pointer"
                >
                  {status === 'sending' ? 'Sending' : 'Send Inquiry'}
                  <FiArrowRight className="group-hover:translate-x-0.5 interactive-transition" />
                </button>

                {status === 'success' && (
                  <p className="font-mono text-[10px] text-emerald-500">
                    ✓ Message successfully dispatched.
                  </p>
                )}
                {status === 'error' && (
                  <p className="font-mono text-[10px] text-red-500">
                    ✗ Transmission error. Please retry.
                  </p>
                )}
              </form>

              {/* Direct connection */}
              <div className="flex flex-col justify-between items-start gap-8">
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Direct Channel
                  </span>
                  <button 
                    onClick={handleCopyEmail}
                    className="text-left font-geist text-lg text-[#FAFAFA] hover:text-[#2563EB] interactive-transition"
                  >
                    {MY_EMAIL}
                  </button>
                  <p className="font-inter text-xs leading-relaxed text-zinc-500 max-w-[320px]">
                    Click above to copy the primary address, or use the form to dispatch an inquiry.
                  </p>
                  {copied && (
                    <span className="font-mono text-[10px] text-[#2563EB]">
                      ✓ Address copied to clipboard.
                    </span>
                  )}
                </div>

                <div className="flex gap-6">
                  <a 
                    href="https://github.com/Taufiqu" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/muhammad-hafizh-taufiqurrohman-421121290/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Designed Ending (Closing spread of the book) */}
        <div className="w-full border-t border-[#27272A] pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB]">
            Designed for longevity.
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            Muhammad Hafizh © 2026.
          </span>
        </div>
      </div>
    </section>
  );
}
