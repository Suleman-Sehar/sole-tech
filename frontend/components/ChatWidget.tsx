"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function HeaderRobotAvatar({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="32" rx="10" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.5" />
      <rect x="18" y="20" width="28" height="20" rx="5" fill="#0F172A" stroke="#008CFF" strokeWidth="1" />
      <circle cx="27" cy="30" r="3.5" fill="#00D4FF" opacity="0.9" />
      <circle cx="37" cy="30" r="3.5" fill="#00D4FF" opacity="0.9" />
      <path d="M26 36 Q32 40 38 36" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the Sole-Tech assistant — ask me about our services, or anything AI-related." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/chat`, {
        message: userMessage,
        history: messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
      });
      setMessages(prev => [...prev, { role: "assistant", content: response.data.response }]);
    } catch (_e) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again or use the Contact form." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Animated Robot Chat Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group cursor-pointer bg-transparent border-none p-0"
        aria-label="Open Sole-Tech AI Assistant"
      >
        <div className="relative animate-robot-float">
          <svg
            width="72"
            height="88"
            viewBox="0 0 72 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_16px_rgba(0,212,255,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(0,212,255,1)] transition-all duration-300"
          >
            {/* Antenna */}
            <line x1="36" y1="0" x2="36" y2="14" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="36" cy="4" r="4" fill="#00D4FF" className="animate-pulse"/>

            {/* Head */}
            <rect x="12" y="14" width="48" height="36" rx="10" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.5"/>

            {/* Screen face — glowing panel */}
            <rect x="18" y="20" width="36" height="24" rx="6" fill="#0F172A" stroke="#008CFF" strokeWidth="1"/>

            {/* Eyes */}
            <circle cx="27" cy="32" r="5" fill="#00D4FF" opacity="0.9"/>
            <circle cx="45" cy="32" r="5" fill="#00D4FF" opacity="0.9"/>
            {/* Eye shine */}
            <circle cx="29" cy="30" r="1.5" fill="white" opacity="0.8"/>
            <circle cx="47" cy="30" r="1.5" fill="white" opacity="0.8"/>

            {/* Smile */}
            <path d="M26 38 Q36 44 46 38" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" fill="none"/>

            {/* Neck */}
            <rect x="30" y="50" width="12" height="6" rx="2" fill="#1E293B" stroke="#00D4FF" strokeWidth="1"/>

            {/* Body */}
            <rect x="8" y="56" width="56" height="28" rx="10" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.5"/>

            {/* Chest panel / logo area */}
            <rect x="20" y="62" width="32" height="16" rx="5" fill="#0F172A" stroke="#008CFF" strokeWidth="1"/>
            {/* ST logo text on chest */}
            <text x="36" y="73" textAnchor="middle" fill="#00D4FF" fontSize="8" fontWeight="bold" fontFamily="Space Grotesk, sans-serif">ST</text>

            {/* Arms */}
            <rect x="0" y="58" width="10" height="20" rx="5" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.2"/>
            <rect x="62" y="58" width="10" height="20" rx="5" fill="#1E293B" stroke="#00D4FF" strokeWidth="1.2"/>

            {/* Feet */}
            <rect x="14" y="82" width="16" height="6" rx="3" fill="#1E293B" stroke="#00D4FF" strokeWidth="1"/>
            <rect x="42" y="82" width="16" height="6" rx="3" fill="#1E293B" stroke="#00D4FF" strokeWidth="1"/>
          </svg>

          {/* Glow ring at base — indicates clickability */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-[#00D4FF] opacity-20 blur-md rounded-full animate-pulse" />

          {/* Notification dot when chat is closed — shows there's something to interact with */}
          {!isOpen && (
            <div className="absolute top-1 right-1 w-3 h-3 bg-[#00D4FF] rounded-full animate-ping" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-full max-w-[400px] h-[500px] max-h-[80vh] rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden md:w-[400px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#008CFF]/20 flex items-center justify-center border border-white/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 to-[#008CFF]/10"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  />
                  <HeaderRobotAvatar size={22} />
                </div>
                <div>
                  <h3 className="text-white font-semibold font-heading text-sm">Sole-Tech Assistant</h3>
                  <motion.p
                    className="text-[10px] text-[#00D4FF] font-body"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    AI Online
                  </motion.p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm font-body ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#00D4FF] to-[#008CFF] text-white"
                        : "bg-white/[0.05] text-gray-300 border border-white/10"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] px-3 py-3 rounded-lg border border-white/10 flex items-center gap-2">
                    <motion.div
                      className="flex gap-1"
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                    </motion.div>
                    <span className="text-gray-400 text-xs font-body">Processing</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/[0.08]">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 min-h-[40px] max-h-[100px] bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-white text-sm font-body placeholder-gray-500 resize-none focus:outline-none focus:border-[#00D4FF]/50"
                  rows={1}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#008CFF] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}