import React, { useEffect, useRef, useState } from 'react';
import { Message, AccessTier } from '../types';
import { TIER_CONFIG } from '../constants';

interface TerminalProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  tier: AccessTier;
}

export const Terminal: React.FC<TerminalProps> = ({ messages, isTyping, onSendMessage, tier }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const tierStyle = TIER_CONFIG[tier];

  return (
    <div className="flex flex-col h-full bg-obsidian border-r border-neutral-900 relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex justify-between items-center z-20 bg-obsidian/90 backdrop-blur">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${tier === AccessTier.GHOST ? 'bg-red-900 animate-pulse' : 'bg-green-900'}`}></div>
          <span className="font-mono-tech text-xs tracking-widest text-neutral-500">
            SECURE_LINK_V4 // {tierStyle.label}
          </span>
        </div>
        <div className="text-[10px] font-mono-tech text-neutral-700">
          ENC: AES-256
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-20 font-mono-tech text-sm scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 border-l-2 ${
                msg.sender === 'user'
                  ? 'border-neutral-700 bg-neutral-900/50 text-neutral-300'
                  : `border-transparent text-neutral-400 ${msg.isGlitch ? 'animate-glitch text-red-800' : ''}`
              }`}
            >
               {msg.type === 'payment_request' ? (
                 <div className="border border-gold-900 p-4 bg-gold-900/10">
                    <p className="mb-2 text-gold-500 font-serif-luxury uppercase tracking-widest text-xs">Clearance Required</p>
                    <p className="mb-4 text-stone-300">{msg.text}</p>
                    <button className="text-xs border border-gold-700 text-gold-500 px-4 py-2 hover:bg-gold-900/30 transition-colors uppercase tracking-wider">
                       [ Authorize Transfer ]
                    </button>
                 </div>
               ) : (
                 <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
               )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <span className="text-neutral-700 text-xs animate-pulse">System calculating...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-800 z-20 bg-obsidian">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className="text-neutral-600 font-mono-tech">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-neutral-300 font-mono-tech placeholder-neutral-800"
            placeholder="Enter command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};