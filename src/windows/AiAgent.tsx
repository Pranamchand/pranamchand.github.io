import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import {
  ArrowUp,
  AudioLines,
  Keyboard,
  Maximize2,
  Mic,
  Minimize2,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { useWindowManager } from '../hooks/useWindowManager';
import {
  retrieveKnowledgeChunks,
  synthesizeLocalRagResponse,
} from '../utils/ragEngine';
import { playMacSound } from '../utils/macSoundEffects';

interface AgentMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  sources?: string[];
}

type AgentViewMode = 'chat' | 'orb' | 'bar';

const INITIAL_MESSAGES: AgentMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content:
      "Hey there! I'm Arther, Pranam Chand's personal RAG assistant. Ask me anything about his education at Ravenshaw University, Data Science & ML projects, technical skills, internships, or hobbies.",
    sources: ['Personal Identity'],
  },
];

const SUGGESTED_PROMPTS = [
  'Who is Pranam & what is he studying?',
  'Tell me about his ML & RAG projects',
  'What are his core technical skills?',
  'What are his career goals?',
  'What are his hobbies & interests?',
];

const MonochromeOrbAvatar: React.FC<{
  size?: 'sm' | 'md' | 'thinking';
}> = ({ size = 'sm' }) => {
  if (size === 'thinking') {
    return (
      <div className="relative w-8 h-7 shrink-0 flex items-center">
        <span
          className="w-5 h-5 rounded-full border border-white/25 opacity-60 animate-pulse"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #ffffff 0%, #8e8e93 45%, #1c1c1e 85%)',
          }}
        />
        <span
          className="w-6 h-6 -ml-2.5 rounded-full border border-white/40 shadow-[0_0_16px_rgba(255,255,255,0.45)] animate-pulse"
          style={{
            background:
              'radial-gradient(circle at 65% 65%, #ffffff 0%, #b0b0b8 42%, #2c2c30 82%)',
          }}
        />
      </div>
    );
  }

  const dim = size === 'md' ? 'w-8 h-8' : 'w-6 h-6';
  return (
    <div
      className={`${dim} rounded-full shrink-0 border border-white/30 shadow-[0_0_14px_rgba(255,255,255,0.28)] relative overflow-hidden`}
      style={{
        background:
          'radial-gradient(circle at 65% 70%, #ffffff 0%, #a1a1aa 38%, #27272a 78%, #09090b 100%)',
      }}
    />
  );
};

export const AiAgentWindow: React.FC = () => {
  const {
    windows,
    closeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const win = windows['ai-agent'];
  const dragControls = useDragControls();

  const [viewMode, setViewMode] = useState<AgentViewMode>('chat');
  const [messages, setMessages] = useState<AgentMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const speakText = (text: string) => {
    if (
      !isTtsEnabled ||
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech synthesis errors
    }
  };

  const handleSend = async (rawText?: string) => {
    const question = (rawText ?? input).trim();
    if (!question || isThinking) return;

    if (!rawText) {
      setInput('');
    }
    setShowSuggestions(false);
    if (viewMode === 'bar') {
      setViewMode('chat');
    }

    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
    };

    const historyPayload = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const customApiUrl = (
        import.meta as unknown as { env?: Record<string, string | undefined> }
      ).env?.VITE_AGENT_API_URL;

      const isStaticHost =
        typeof window !== 'undefined' &&
        window.location.hostname.endsWith('.github.io') &&
        !customApiUrl;

      let data: { reply?: string; sources?: string[] } | null = null;

      if (!isStaticHost) {
        try {
          const response = await fetch(customApiUrl || '/api/agent/chat', {
            method: 'POST',
            signal: AbortSignal.timeout(8000),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: question,
              history: historyPayload,
            }),
          });

          if (response.ok) {
            data = (await response.json()) as {
              reply?: string;
              sources?: string[];
            };
          }
        } catch {
          // Fall back to local RAG synthesis
        }
      }

      const chunks = retrieveKnowledgeChunks(question, 3);
      const replyText =
        data?.reply?.trim() || synthesizeLocalRagResponse(question, chunks);

      const assistantMsg: AgentMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        sources: data?.sources || chunks.map((c) => c.section),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      playMacSound('notification');
      speakText(replyText);
    } catch {
      const chunks = retrieveKnowledgeChunks(question, 3);
      const fallbackText = synthesizeLocalRagResponse(question, chunks);
      const assistantMsg: AgentMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        sources: chunks.map((c) => c.section),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      playMacSound('notification');
      speakText(fallbackText);
    } finally {
      setIsThinking(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setIsThinking(false);
  };

  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRec =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

    if (!SpeechRec) {
      setViewMode((prev) => (prev === 'orb' ? 'chat' : 'orb'));
      return;
    }

    try {
      const recognition = new (SpeechRec as new () => {
        lang: string;
        interimResults: boolean;
        onstart: () => void;
        onend: () => void;
        onresult: (event: {
          results: { 0: { transcript: string } }[];
        }) => void;
        start: () => void;
      })();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  if (!win) return null;
  const isVisible = win.isOpen && !win.isMinimized;
  const lastAssistantMessage =
    [...messages].reverse().find((m) => m.role === 'assistant') ||
    INITIAL_MESSAGES[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          role="dialog"
          aria-label="Arther"
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            updateWindowPosition(
              'ai-agent',
              win.position.x + info.offset.x,
              win.position.y + info.offset.y
            );
          }}
          onMouseDown={() => focusWindow('ai-agent')}
          initial={{
            opacity: 0,
            scale: 0.95,
            x: win.position.x,
            y: win.position.y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: win.position.x,
            y: win.position.y,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.15 },
          }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 32,
          }}
          style={{
            zIndex: win.zIndex,
            position: 'fixed',
            top: 0,
            left: 0,
          }}
          className="select-none"
        >
          {/* MODE 1: Full Minimalist Dark Agent Interface (UI_1 Reference) */}
          {viewMode === 'chat' && (
            <div
              className="w-[min(450px,calc(100vw-24px))] h-[min(560px,calc(100vh-120px))] rounded-[28px] bg-[#0b0b0d] border border-white/[0.1] shadow-[0_32px_85px_rgba(0,0,0,0.78)] flex flex-col overflow-hidden relative text-[#e5e5ea]"
              style={{
                backgroundImage:
                  'radial-gradient(240px circle at 0% 44%, rgba(255,255,255,0.085), transparent 72%)',
              }}
            >
              {/* Header Bar */}
              <header
                onPointerDown={(e) => {
                  focusWindow('ai-agent');
                  dragControls.start(e);
                }}
                className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 cursor-grab active:cursor-grabbing shrink-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MonochromeOrbAvatar size="md" />
                  <div className="min-w-0">
                    <h2 className="text-[14.5px] font-medium text-white tracking-tight leading-tight truncate">
                      Arther
                    </h2>
                    <p className="text-[11.5px] text-white/40 leading-tight truncate">
                      Playground · RAG Knowledge Base
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('bar')}
                    title="Minimal Search Bar View"
                    aria-label="Switch to minimal Ask AI bar"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset Conversation"
                    aria-label="Reset conversation"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => closeWindow('ai-agent')}
                    title="Close Arther"
                    aria-label="Close Arther"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </header>

              {/* Messages Stream */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto mac-scroll px-5 py-3 space-y-5"
              >
                {messages.map((msg) =>
                  msg.role === 'assistant' ? (
                    <div key={msg.id} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <MonochromeOrbAvatar size="sm" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="text-[13.5px] leading-[1.6] text-[#d8d8de] whitespace-pre-line select-text">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[80%] rounded-[18px] bg-[#212125] border border-white/[0.06] px-4 py-3 text-[13.5px] leading-[1.55] text-[#ededf0] select-text">
                        {msg.content}
                      </div>
                    </div>
                  )
                )}

                {isThinking && (
                  <div className="flex items-center gap-3 pt-1">
                    <MonochromeOrbAvatar size="thinking" />
                    <span className="text-[13.5px] font-medium bg-gradient-to-r from-white via-white/70 to-white/30 bg-clip-text text-transparent animate-pulse">
                      Thinking...
                    </span>
                  </div>
                )}

                {/* Quick Prompt Suggestions */}
                {(messages.length === 1 || showSuggestions) && !isThinking && (
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-medium text-white/35 px-1">
                      Suggested questions
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className="px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[12px] text-white/80 hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Input Pill (UI_1 & UI_2 hybrid) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-4 pt-2 shrink-0"
              >
                <div className="flex items-center gap-2.5 rounded-full bg-[#151518] border border-white/[0.1] pl-3.5 pr-2 py-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setShowSuggestions((prev) => !prev)}
                    title="Suggested prompts"
                    aria-label="Toggle suggested prompts"
                    className="text-white/55 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask the agent"
                    aria-label="Ask Arther"
                    className="flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/38 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    title="Voice input"
                    aria-label="Voice input"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isListening
                        ? 'text-[#34c759] bg-white/10'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('orb')}
                    title="Switch to Orb Voice Mode"
                    aria-label="Switch to Orb Voice Mode"
                    className="p-1.5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <AudioLines className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    disabled={!input.trim() || isThinking}
                    aria-label="Send question"
                    className="w-8 h-8 rounded-full bg-[#242429] hover:bg-[#303037] disabled:opacity-40 border border-white/[0.14] flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MODE 2: Compact Orb Voice Card (UI_3 Reference) */}
          {viewMode === 'orb' && (
            <div
              onPointerDown={(e) => {
                focusWindow('ai-agent');
                dragControls.start(e);
              }}
              className="w-[min(360px,calc(100vw-24px))] rounded-[28px] bg-[#050507] border border-white/[0.11] shadow-[0_30px_80px_rgba(0,0,0,0.85)] p-5 flex flex-col justify-between gap-5 cursor-grab active:cursor-grabbing text-white"
            >
              {/* Top Controls */}
              <div
                className="flex items-center justify-between"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => closeWindow('ai-agent')}
                  aria-label="Close Arther"
                  className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('chat')}
                  aria-label="Expand to full chat view"
                  className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Response Text */}
              <div className="px-1 min-h-[54px] max-h-[140px] overflow-y-auto mac-scroll">
                <p className="text-[13.5px] leading-relaxed text-white/90 select-text">
                  {isThinking
                    ? 'Thinking...'
                    : lastAssistantMessage.content}
                </p>
              </div>

              {/* Center Glowing Horizon Orb + Bottom Corner Buttons */}
              <div
                className="flex items-end justify-between pt-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsTtsEnabled((prev) => !prev)}
                  aria-label={isTtsEnabled ? 'Mute voice output' : 'Enable voice output'}
                  title={isTtsEnabled ? 'Voice readout ON' : 'Voice readout OFF'}
                  className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {isTtsEnabled ? (
                    <Volume2 className="w-4 h-4 text-white" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white/60" />
                  )}
                </button>

                {/* Luminous Horizon Sphere from UI_3 */}
                <button
                  type="button"
                  onClick={() => {
                    const nextPrompt =
                      SUGGESTED_PROMPTS[
                        Math.floor(Math.random() * SUGGESTED_PROMPTS.length)
                      ];
                    handleSend(nextPrompt);
                  }}
                  title="Click orb to ask a quick question about Pranam"
                  className="relative w-24 h-24 rounded-full border border-white/15 flex items-center justify-center overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.9)] cursor-pointer group"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 35%, #232529 0%, #0d0e11 65%, #040405 100%)',
                  }}
                >
                  <span
                    className={`w-20 h-3 rounded-full blur-[2px] transition-transform duration-500 ${
                      isThinking
                        ? 'scale-x-110 opacity-100 animate-pulse'
                        : 'group-hover:scale-x-105 opacity-95'
                    }`}
                    style={{
                      background:
                        'radial-gradient(ellipse at center, #ffffff 0%, rgba(210,225,255,0.85) 35%, rgba(255,255,255,0) 75%)',
                      boxShadow: '0 0 22px 4px rgba(255,255,255,0.65)',
                    }}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('bar')}
                  aria-label="Switch to keyboard bar"
                  title="Type question"
                  className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Keyboard className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* MODE 3: Minimal Floating "Ask AI" Pill Bar (UI_2 Reference) */}
          {viewMode === 'bar' && (
            <div
              onPointerDown={(e) => {
                focusWindow('ai-agent');
                dragControls.start(e);
              }}
              className="flex items-center gap-3 cursor-grab active:cursor-grabbing"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-[min(420px,calc(100vw-84px))] h-[58px] rounded-full bg-gradient-to-r from-[#1d1d21]/95 via-[#131316]/95 to-[#222227]/95 backdrop-blur-2xl border border-white/[0.15] px-5 flex items-center gap-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('chat')}
                  title="Maximize Arther"
                  aria-label="Maximize Arther"
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4.5 h-4.5 stroke-[1.8]" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI"
                  aria-label="Ask Arther about Pranam Chand"
                  className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/60 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleVoiceInput}
                  title="Voice input"
                  aria-label="Voice input"
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Mic className="w-5 h-5 stroke-[1.8]" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('orb')}
                  title="Switch to Orb mode"
                  aria-label="Switch to Orb mode"
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <AudioLines className="w-5 h-5 stroke-[1.8]" />
                </button>
              </form>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => closeWindow('ai-agent')}
                title="Close Arther"
                aria-label="Close Ask AI bar"
                className="w-12 h-12 rounded-full bg-[#1c1c20]/95 hover:bg-[#28282e] border border-white/[0.15] flex items-center justify-center text-white/80 hover:text-white shadow-[0_18px_40px_rgba(0,0,0,0.65)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};
