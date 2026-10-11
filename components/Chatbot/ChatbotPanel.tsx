'use client';

import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { answerPortfolioQuestion } from '@/data/portfolio';

type Message = { role: 'assistant' | 'user'; content: string };
const prompts = ['About Arvinth', 'Skills & tech', 'Projects', 'Experience'];

export function ChatbotPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "Hi — I’m Arvinth’s AI assistant. Ask me about his work, skills, or the systems he builds." }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((current) => [...current, { role: 'user', content: text }]);
    setInput(''); setThinking(true);
    window.setTimeout(() => { setMessages((current) => [...current, { role: 'assistant', content: answerPortfolioQuestion(text) }]); setThinking(false); }, 420);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); send(input); };
  return <AnimatePresence>{open && <motion.aside className="chat-panel" aria-label="Arvinth AI assistant" initial={{ opacity: 0, x: 34, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 34, scale: 0.94 }} transition={{ type: 'spring', stiffness: 230, damping: 25 }}>
    <div className="scan-line" /><header><span><i /> ARVINTH AI</span><button onClick={onClose} aria-label="Close assistant">×</button></header>
    <div className="messages" aria-live="polite">{messages.map((message, index) => <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={`${message.role}-${index}`} className={message.role}>{message.content}</motion.p>)}{thinking && <div className="typing" aria-label="Assistant is typing"><b /> <b /> <b /></div>}</div>
    <div className="chat-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => send(prompt)}>{prompt}</button>)}</div>
    <form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Ask Arvinth AI a question" placeholder="Ask me something…" /><button aria-label="Send message">↗</button></form>
  </motion.aside>}</AnimatePresence>;
}
