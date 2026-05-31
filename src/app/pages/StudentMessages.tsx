import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronLeft, ShieldCheck, Play, Plus } from "lucide-react";
import { Haptics } from "../../utils/design-system";
import { useChatEngine, ChatMessages, ChatInput, type ChatMessage } from "../../utils/chat-engine";

export function StudentMessages() {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const ASSIGNED_TASKS = [
    { 
      id: 1, 
      employer: "TBC Tech", 
      job: "Router Diagnostics", 
      payout: "₾15.00",
      lastMessage: "Are you near the lobby?", 
      time: "10:42 AM", 
      online: true,
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100&h=100",
      isAudio: false
    },
    { 
      id: 2, 
      employer: "Mariam D.", 
      job: "Event Cleanup", 
      payout: "₾30.00",
      lastMessage: "Audio Message (0:14)", 
      time: "Yesterday", 
      online: false,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
      isAudio: true
    },
  ];

  return (
    <div className="flex flex-col h-full bg-canvas relative">
      <div className="pt-12 px-6 flex flex-col gap-4">
        <h1 className="text-display">Active Tasks</h1>
        <p className="text-caption text-secondary-color">Your assigned work and communication</p>
        
        <div className="relative mt-2">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-color" />
          <input 
            type="text" 
            placeholder="Search assignments..." 
            className="w-full bg-surface shadow-sm border-micro rounded-[12px] min-touch-target py-3 pl-10 pr-4 text-body-primary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent placeholder:text-secondary-color"
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {ASSIGNED_TASKS.map(task => (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              key={task.id}
              onClick={() => {
                Haptics.mediumTap();
                setActiveChat(task.id);
              }}
              className="flex items-center gap-4 bg-surface p-4 rounded-card shadow-app border-micro cursor-pointer"
            >
              <div className="relative shrink-0">
                <img src={task.avatar} alt={task.employer} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                {task.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-system-success border-2 border-surface rounded-full animate-pulse" />}
              </div>
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-subheading font-bold truncate">{task.job}</span>
                  <span className="text-caption text-secondary-color shrink-0">{task.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-caption font-medium text-brand truncate">Employer: {task.employer}</span>
                  <span className="text-caption font-bold text-system-success bg-system-success/10 px-2 py-0.5 rounded-full shrink-0">{task.payout}</span>
                </div>
                {task.isAudio ? (
                  <span className="text-body-primary font-medium text-brand truncate mt-1 flex items-center gap-1">
                    <Play size={14} className="fill-brand" /> {task.lastMessage}
                  </span>
                ) : (
                  <span className="text-body-primary text-secondary-color truncate mt-1">{task.lastMessage}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeChat !== null && (
          <StudentChatDetail 
            task={ASSIGNED_TASKS.find(t => t.id === activeChat)!} 
            onBack={() => {
              Haptics.mediumTap();
              setActiveChat(null);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Student Chat Panel

const STUDENT_INITIAL_MESSAGES: ChatMessage[] = [
  { id: "s1", text: "Hey! I'm on my way to the location.", sender: "me", time: "10:30 AM" },
  { id: "s2", text: "Great. Are you near the lobby?", sender: "them", time: "10:42 AM" },
];

function StudentChatDetail({ task, onBack }: { task: any; onBack: () => void }) {
  const { messages, sendMessage } = useChatEngine(STUDENT_INITIAL_MESSAGES);

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="absolute inset-0 bg-canvas z-30 flex flex-col"
    >
      {/* Header */}
      <div className="bg-surface/90 backdrop-blur-xl border-b border-micro pt-12 pb-3 px-4 flex flex-col z-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="min-touch-target w-10 flex items-center justify-center -ml-2 rounded-full active:bg-black/5 dark:active:bg-white/5 text-primary-color">
            <ChevronLeft size={24} />
          </button>
          <img src={task.avatar} alt={task.employer} className="w-10 h-10 rounded-full object-cover shadow-sm" />
          <div className="flex flex-col">
            <span className="text-subheading font-semibold">{task.employer}</span>
            <span className="text-caption text-secondary-color">{task.online ? "Online" : "Offline"}</span>
          </div>
        </div>
        
        {/* Context Header Element */}
        <div className="bg-brand/5 dark:bg-brand/10 rounded-interactive p-3 flex justify-between items-center border border-brand/20">
          <div className="flex flex-col">
            <span className="text-caption font-semibold text-brand">{task.job}</span>
            <span className="text-[10px] text-system-success font-bold flex items-center gap-1 mt-0.5">
              <ShieldCheck size={12} /> Escrow Funded
            </span>
          </div>
          <span className="text-h2 font-bold text-primary-color">{task.payout}</span>
        </div>
      </div>

      {/* Messages */}
      <ChatMessages
        messages={messages}
        systemBanner={
          <div className="bg-brand/10 border border-brand/20 rounded-[12px] p-3 flex flex-col items-center text-center max-w-[80%] self-center">
            <span className="text-caption text-brand font-semibold">Assignment Confirmed</span>
            <span className="text-[10px] text-brand/80">Funds are locked in secure escrow.</span>
          </div>
        }
      />

      {/* Input */}
      <ChatInput onSend={sendMessage} placeholder="Message employer... (try @SprintBot)" />
    </motion.div>
  );
}
