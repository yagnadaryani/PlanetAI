import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, X, Sparkles, User } from 'lucide-react';
import type { ChatMessage } from '../types';
import { getAIResponse, suggestedQuestions, createInitialMessages } from '../lib/aiAssistant';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIAssistant({ isOpen, onToggle }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const question = text ?? input;
    if (!question.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: question, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(question);
      const aiMsg: ChatMessage = { role: 'ai', content: response, timestamp: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric-400 to-electric-600 shadow-lg shadow-electric-400/30 transition hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6 text-space-900" /> : <Brain className="h-6 w-6 text-space-900" />}
        <span className="absolute inset-0 animate-pulse-glow rounded-full bg-electric-400/30 blur-lg" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-panel-strong fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-electric-400/20 bg-space-800/50 p-4">
              <div className="relative">
                <Brain className="h-6 w-6 text-electric-400" />
                <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Earth Assistant</h3>
                <p className="text-xs text-slate-400">Ask me about Earth & space</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-400/20">
                      <Sparkles className="h-4 w-4 text-electric-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-electric-400/20 text-white'
                        : 'glass-panel text-slate-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-space-700">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-400/20">
                    <Sparkles className="h-4 w-4 text-electric-400" />
                  </div>
                  <div className="glass-panel flex items-center gap-1 rounded-2xl px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-electric-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-electric-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-electric-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="border-t border-electric-400/10 p-3">
                <p className="mb-2 text-xs text-slate-500">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 5).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="rounded-full border border-electric-400/20 bg-electric-400/5 px-3 py-1 text-xs text-electric-400 transition hover:bg-electric-400/15"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-electric-400/20 p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Earth..."
                  className="flex-1 rounded-xl border border-electric-400/20 bg-space-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-electric-400/50"
                />
                <button
                  onClick={() => handleSend()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-400 text-space-900 transition hover:bg-electric-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
