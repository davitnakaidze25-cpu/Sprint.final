import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mic, Plus, Bot, Sparkles } from "lucide-react";
import { Haptics } from "./design-system";

// Types

export interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "them" | "bot";
  time: string;
  isTyping?: boolean;
}

// SprintBot Response Engine

const BOT_RESPONSES: Record<string, string[]> = {
  price: [
    "Based on similar gigs in this area, ₾45–₾70 is the typical range. Your current pricing looks competitive! 📊",
    "The platform average for this task category is ₾55. Consider adjusting based on urgency and complexity.",
  ],
  help: [
    "I can help with: pricing guidance, task status, dispute mediation, and contract tips. Just tag me with @SprintBot! 🤖",
    "Need help? I can assist with payment questions, task guidelines, or connect you with support. What do you need?",
  ],
  status: [
    "This task is currently ACTIVE with escrow funds secured. The worker is en route — ETA ~14 minutes. ✅",
    "Everything looks good! The assignment is confirmed and funds are locked in escrow until task completion.",
  ],
  schedule: [
    "I'd suggest scheduling this for tomorrow morning between 9–11 AM when most workers are available in your area. 📅",
    "Based on worker availability patterns, late morning slots have 40% faster acceptance rates in Saburtalo.",
  ],
  default: [
    "I'm SprintBot — your task assistant! I can help with pricing, scheduling, status updates, and more. Just ask! 🚀",
    "Got it! Let me know if you need help with anything else. I'm always here to assist with your Sprint tasks. ✨",
    "Thanks for the message! If you need task-specific help, try asking about pricing, status, or scheduling.",
  ],
};

function getSprintBotResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("pay")) {
    return BOT_RESPONSES.price[Math.floor(Math.random() * BOT_RESPONSES.price.length)];
  }
  if (lower.includes("help") || lower.includes("what can you")) {
    return BOT_RESPONSES.help[Math.floor(Math.random() * BOT_RESPONSES.help.length)];
  }
  if (lower.includes("status") || lower.includes("update") || lower.includes("where") || lower.includes("eta")) {
    return BOT_RESPONSES.status[Math.floor(Math.random() * BOT_RESPONSES.status.length)];
  }
  if (lower.includes("schedule") || lower.includes("when") || lower.includes("time") || lower.includes("available")) {
    return BOT_RESPONSES.schedule[Math.floor(Math.random() * BOT_RESPONSES.schedule.length)];
  }
  return BOT_RESPONSES.default[Math.floor(Math.random() * BOT_RESPONSES.default.length)];
}

function getNow(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Chat Input Component

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  showBotInfo?: boolean;
}

export function ChatInput({ onSend, placeholder = "Type a message...", showBotInfo = true }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    Haptics.mediumTap();
    onSend(trimmed);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-surface p-4 pb-safe-offset-4 border-t border-micro shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2">
        <button className="min-touch-target rounded-full bg-black/5 dark:bg-white/10 text-secondary-color shrink-0 flex items-center justify-center w-11 h-11">
          <Plus size={20} />
        </button>
        <div className="flex-1 bg-black/5 dark:bg-white/10 rounded-full flex items-center px-4 py-2 border border-transparent min-touch-target">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent focus:outline-none text-body-primary placeholder:text-secondary-color"
          />
          {!text.trim() && (
            <button className="p-1 text-secondary-color ml-2">
              <Mic size={18} />
            </button>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all ${
            text.trim()
              ? "bg-brand text-white active:scale-95"
              : "bg-black/10 dark:bg-white/10 text-secondary-color"
          }`}
        >
          <Send size={18} className="ml-0.5" />
        </button>
      </div>
      {showBotInfo && (
        <div className="flex items-center gap-1.5 mt-2 px-1">
          <Bot size={12} className="text-brand" />
          <span className="text-[10px] text-secondary-color">
            Tag <span className="text-brand font-bold">@SprintBot</span> for AI assistance
          </span>
        </div>
      )}
    </div>
  );
}

// Chat Bubble Component

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  if (message.sender === "bot") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="self-start max-w-[85%]"
      >
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand/70 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Sparkles size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-brand font-bold mb-1 flex items-center gap-1">
              <Bot size={10} /> SprintBot
            </span>
            <div className="bg-brand/10 border border-brand/20 p-3 rounded-2xl rounded-tl-none shadow-sm">
              {message.isTyping ? (
                <div className="flex items-center gap-1.5 px-2 py-1">
                  <div className="w-2 h-2 bg-brand/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-brand/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-brand/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <p className="text-body-primary text-primary-color">{message.text}</p>
              )}
              <span className="text-[10px] text-brand/60 mt-1 block">{message.time}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (message.sender === "me") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-brand text-white p-3 rounded-2xl rounded-tr-none self-end max-w-[75%] shadow-md"
      >
        <p className="text-body-primary">{message.text}</p>
        <span className="text-[10px] text-white/70 mt-1 block text-right">{message.time}</span>
      </motion.div>
    );
  }

  // "them" sender
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-surface border-micro p-3 rounded-2xl rounded-tl-none self-start max-w-[75%] shadow-sm"
    >
      <p className="text-body-primary">{message.text}</p>
      <span className="text-[10px] text-secondary-color mt-1 block">{message.time}</span>
    </motion.div>
  );
}

// Chat Messages Container

interface ChatMessagesProps {
  messages: ChatMessage[];
  systemBanner?: React.ReactNode;
}

export function ChatMessages({ messages, systemBanner }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-20">
      <div className="flex justify-center">
        <span className="text-[10px] bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full text-secondary-color font-bold uppercase tracking-wider">
          Today
        </span>
      </div>

      {systemBanner}

      <AnimatePresence>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}

// Chat Engine Hook

export function useChatEngine(initialMessages: ChatMessage[], enableBot = true) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const sendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      sender: "me",
      time: getNow(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Check if @SprintBot is tagged
    if (enableBot && text.toLowerCase().includes("@sprintbot")) {
      // Show typing indicator
      const typingId = `bot-typing-${Date.now()}`;
      const typingMsg: ChatMessage = {
        id: typingId,
        text: "",
        sender: "bot",
        time: getNow(),
        isTyping: true,
      };

      setTimeout(() => {
        Haptics.lightWarning();
        setMessages((prev) => [...prev, typingMsg]);
      }, 400);

      // Replace typing with real response
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: `bot-${Date.now()}`,
          text: getSprintBotResponse(text),
          sender: "bot",
          time: getNow(),
        };
        setMessages((prev) => prev.filter((m) => m.id !== typingId).concat(botResponse));
        Haptics.mediumTap();
      }, 1200 + Math.random() * 800);
    }
  }, [enableBot]);

  return { messages, sendMessage };
}
