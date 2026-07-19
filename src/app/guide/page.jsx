"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';

const SUGGESTIONS = [
  "Tell me about E-ULT Saidata",
  "How do you approach frontend architecture?",
  "What technologies do you use most?",
  "What kind of engineer are you?",
  "Why photography?",
];

export default function PortfolioGuide() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('taufiqu_guide_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse cached chat history:', err);
      }
    }
  }, []);

  // Save chat history to localStorage when updated
  const saveMessages = (updated) => {
    setMessages(updated);
    localStorage.setItem('taufiqu_guide_messages', JSON.stringify(updated));
  };

  // Scroll to bottom of message viewport
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    setInputValue('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error. Please try again.');
      }

      const assistantMessage = await res.json();
      saveMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error('Failed to dispatch query:', err);
      setError(err.message || 'Transmission error. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem('taufiqu_guide_messages');
    setError('');
  };

  const renderMessageContent = (text) => {
    return text.split('\n\n').map((block, idx) => {
      // Clean lists formatting
      if (block.startsWith('- ') || block.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-5 flex flex-col gap-1.5 w-full text-sm leading-relaxed my-2 text-[#A1A1AA]">
            {block.split('\n').map((li, lidx) => (
              <li key={lidx}>{li.replace(/^[\-\*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      
      // Clean numbered lists formatting
      if (block.match(/^\d+\.\s+/)) {
        return (
          <ol key={idx} className="list-decimal pl-5 flex flex-col gap-1.5 w-full text-sm leading-relaxed my-2 text-[#A1A1AA]">
            {block.split('\n').map((li, lidx) => (
              <li key={lidx}>{li.replace(/^\d+\.\s+/, '')}</li>
            ))}
          </ol>
        );
      }
      
      // Inline bold parsing (**text** -> strong)
      const parts = block.split(/(\*\*.*?\*\*)/g);
      const parsedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-[#FAFAFA]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={idx} className="text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
          {parsedParts}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 section-padding">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          {/* Back link */}
          <div>
            <Link 
              href="/" 
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              <span>←</span> Back to Overview
            </Link>
          </div>

          {/* Asymmetric Split Layout */}
          <div className="asymmetric-grid w-full items-start">
            {/* Left Column: Metadata & Suggestions */}
            <div className="flex flex-col gap-8 select-none">
              <div className="flex flex-row md:flex-col items-baseline md:items-start gap-2">
                <span className="font-mono text-xs tracking-widest text-[#2563EB]">ASK.</span>
                <span className="font-geist text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">Questions?</span>
              </div>
              <p className="text-xs text-zinc-500 max-w-[200px] leading-relaxed hidden md:block border-t border-[#27272A] pt-4">
                Ask about my projects, engineering decisions, experience, or the way I build software.
              </p>
              
              {/* Quick suggestions block */}
              <div className="hidden md:flex flex-col gap-3 pt-4 border-t border-[#27272A] max-w-[220px]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Suggestions</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSendMessage(s)}
                    className="text-left text-xs text-[#A1A1AA] hover:text-[#FAFAFA] hover:underline cursor-pointer select-none leading-normal transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Chat interface */}
            <div className="flex flex-col gap-8 w-full items-start">
              {/* Header Title */}
              <div className="max-w-[640px] border-b border-[#27272A] pb-8 w-full flex flex-col gap-3">
                <h2 className="font-geist text-2xl font-bold text-[#FAFAFA] tracking-tight">Portfolio Assistant</h2>
                <p className="text-editorial">
                  An intelligent guide to help you explore my systems, architecture choices, and notebook entries.
                </p>
              </div>

              {/* Chat Viewport */}
              <div className="w-full max-w-[640px] min-h-[300px] max-h-[500px] overflow-y-auto border border-[#27272A] bg-[#18181B]/40 rounded-sm p-6 flex flex-col gap-6 scrollbar-thin">
                {messages.length === 0 ? (
                  <div className="flex-grow flex flex-col justify-center items-center text-center py-12 px-4 gap-4 select-none">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      Gateway Ready // No active session
                    </span>
                    <p className="text-xs text-zinc-500 max-w-[340px] leading-relaxed">
                      Select a suggestion prompt below or type your question in the entry field.
                    </p>
                    
                    {/* Mobile responsive suggestions index */}
                    <div className="flex flex-col gap-2.5 md:hidden w-full pt-4 mt-2 border-t border-zinc-800/60">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSendMessage(s)}
                          className="w-full text-center text-xs border border-zinc-800 bg-[#18181B] hover:border-zinc-700 py-2.5 px-4 text-[#A1A1AA] rounded-sm transition-colors cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {messages.map((msg, index) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div key={index} className="flex flex-col gap-2 w-full">
                          <span className={`font-mono text-[9px] uppercase tracking-wider select-none ${
                            isUser ? 'text-zinc-500' : 'text-[#2563EB] font-bold'
                          }`}>
                            {isUser ? 'Visitor' : 'Portfolio Guide'}
                          </span>
                          <div className="pl-0 md:pl-2">
                            {isUser ? (
                              <p className="text-sm text-[#FAFAFA] leading-relaxed">{msg.content}</p>
                            ) : (
                              <div className="flex flex-col gap-3">{renderMessageContent(msg.content)}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Typing loader state */}
                {loading && (
                  <div className="flex flex-col gap-2 w-full animate-pulse select-none">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#2563EB] font-bold">
                      Portfolio Guide
                    </span>
                    <span className="text-xs text-zinc-500 font-mono pl-0 md:pl-2">
                      Compiling response...
                    </span>
                  </div>
                )}

                {/* Error log */}
                {error && (
                  <div className="flex flex-col gap-1 w-full border border-red-500/20 bg-red-500/5 p-3 rounded-sm select-none">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">
                      Error Status
                    </span>
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form Fields */}
              <form onSubmit={handleSubmit} className="w-full max-w-[640px] flex flex-col gap-4">
                <div className="flex gap-3 w-full">
                  <input
                    type="text"
                    required
                    disabled={loading}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about my work, Laravel, React or arsitektur choices..."
                    className="clean-input flex-grow p-3.5 text-sm rounded-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className="border border-zinc-800 bg-[#18181B] hover:border-zinc-700 hover:text-[#FAFAFA] disabled:opacity-50 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] px-6 py-3.5 rounded-sm interactive-transition cursor-pointer select-none shrink-0"
                  >
                    Submit
                  </button>
                </div>
                
                {/* Reset button panel */}
                {messages.length > 0 && (
                  <div className="flex justify-end select-none">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] transition-colors cursor-pointer"
                    >
                      Clear Conversation
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
