import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, QrCode, ShieldCheck, CheckCircle2, Circle } from "lucide-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export function Wallet() {
  const [view, setView] = useState<"wallet" | "profile">("wallet");
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col h-full bg-canvas relative">
      <div className="pt-12 px-6 pb-2">
        <ToggleGroup.Root
          type="single"
          value={view}
          onValueChange={(val) => val && setView(val as "wallet" | "profile")}
          className="flex bg-black/5 dark:bg-white/10 rounded-xl p-1 w-full relative mb-6"
        >
          <ToggleGroup.Item value="wallet" className="flex-1 flex justify-center items-center py-2 text-caption font-semibold rounded-lg transition-colors z-10 data-[state=on]:text-primary-color data-[state=off]:text-secondary-color">
            Asset Ledger
          </ToggleGroup.Item>
          <ToggleGroup.Item value="profile" className="flex-1 flex justify-center items-center py-2 text-caption font-semibold rounded-lg transition-colors z-10 data-[state=on]:text-primary-color data-[state=off]:text-secondary-color">
            Trust Profile
          </ToggleGroup.Item>
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg z-0"
            animate={{ left: view === "wallet" ? "4px" : "calc(50%)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </ToggleGroup.Root>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
        <AnimatePresence mode="wait">
          {view === "wallet" ? (
            <motion.div 
              key="wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              className="flex flex-col gap-6"
            >
              {/* Balance Card */}
              <div className="bg-surface rounded-[20px] p-6 shadow-app border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <span className="text-caption text-secondary-color uppercase tracking-wider block mb-2">Total Balance (GEL)</span>
                <div className="text-[42px] font-bold tracking-tight text-primary-color leading-none mb-6">
                  ₾120<span className="text-[24px] text-secondary-color">.00</span>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowQR(true)}
                    className="flex-1 bg-brand text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold active:scale-[0.98] transition-transform shadow-md"
                  >
                    <QrCode size={18} /> Receive
                  </button>
                  <button className="flex-1 bg-black/5 dark:bg-white/10 text-primary-color rounded-xl py-3 flex items-center justify-center gap-2 font-semibold active:scale-[0.98] transition-transform">
                    <ArrowUpRight size={18} /> Withdraw
                  </button>
                </div>
              </div>

              {/* Escrow Tracker */}
              <div className="bg-surface rounded-[16px] p-4 shadow-app border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-system-warning/10 text-system-warning flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-subheading font-semibold">Active Escrow</span>
                    <span className="text-caption text-secondary-color">Awaiting job completion</span>
                  </div>
                </div>
                <span className="text-h2 font-semibold">₾30.00</span>
              </div>

              {/* Transaction Log */}
              <div className="flex flex-col gap-3">
                <h2 className="text-h2">Recent Transactions</h2>
                <div className="flex flex-col gap-0 bg-surface rounded-[16px] shadow-app border border-black/5 dark:border-white/5 overflow-hidden">
                  <TxRow title="Structural Cleaning" type="receive" amount="+₾30.00" date="Today, 14:30" />
                  <div className="h-px bg-black/5 dark:bg-white/5 mx-4" />
                  <TxRow title="Withdrawal to TBC" type="withdraw" amount="-₾60.00" date="Yesterday" />
                  <div className="h-px bg-black/5 dark:bg-white/5 mx-4" />
                  <TxRow title="Tech Support" type="receive" amount="+₾15.00" date="Oct 12" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              className="flex flex-col gap-6"
            >
              {/* Profile Header */}
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-brand to-system-success">
                    <img src="/Images/Davit.N.png" alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-surface" />
                  </div>
                  <div className="absolute -bottom-2 right-0 bg-surface px-2 py-1 rounded-full shadow-md border border-black/5 flex items-center gap-1">
                    <ShieldCheck size={14} className="text-system-success" />
                    <span className="text-[10px] font-bold">@edu.ge</span>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-h1">Davit N.</h1>
                  <span className="text-body-primary text-secondary-color">Tbilisi State University</span>
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface p-4 rounded-[16px] shadow-app border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-1">
                  <span className="text-display text-primary-color">98%</span>
                  <span className="text-caption text-secondary-color">Trust Score</span>
                </div>
                <div className="bg-surface p-4 rounded-[16px] shadow-app border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-1">
                  <span className="text-display text-primary-color">42</span>
                  <span className="text-caption text-secondary-color">Tasks Completed</span>
                </div>
              </div>

              {/* Endorsements */}
              <div className="flex flex-col gap-3">
                <h2 className="text-h2">Verified Capabilities</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge label="Tech Support" level={3} />
                  <Badge label="Data Entry" level={2} />
                  <Badge label="Logistics" level={1} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Settlement Sheet */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 190, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-surface rounded-t-[32px] p-6 pb-safe flex flex-col items-center"
            >
              <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mb-6" />
              
              <h2 className="text-h1 mb-2">Escrow Settlement</h2>
              <p className="text-body-primary text-secondary-color text-center mb-8">
                Present this cryptographically secure QR code to the hiring entity to release funds.
              </p>

              <div className="bg-white p-4 rounded-[24px] shadow-lg mb-8">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SPRINT_SETTLEMENT_${Math.random()}`} 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>

              <div className="w-full bg-black/5 dark:bg-white/5 rounded-[16px] p-4 flex flex-col gap-3 border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-system-success" />
                  <span className="text-caption font-medium">Signature Compiled</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle size={18} className="text-secondary-color" />
                  <span className="text-caption font-medium text-secondary-color">Awaiting Scan...</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle size={18} className="text-secondary-color" />
                  <span className="text-caption font-medium text-secondary-color">Ledger Transfer</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TxRow({ title, type, amount, date }: { title: string, type: "receive" | "withdraw", amount: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface active:bg-black/5 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'receive' ? 'bg-system-success/10 text-system-success' : 'bg-black/5 dark:bg-white/10 text-primary-color'}`}>
          {type === 'receive' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
        </div>
        <div className="flex flex-col">
          <span className="text-subheading font-medium">{title}</span>
          <span className="text-caption text-secondary-color">{date}</span>
        </div>
      </div>
      <span className={`text-subheading font-semibold ${type === 'receive' ? 'text-system-success' : 'text-primary-color'}`}>
        {amount}
      </span>
    </div>
  );
}

function Badge({ label, level }: { label: string, level: number }) {
  return (
    <div className="bg-surface shadow-sm border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
      <span className="text-caption font-semibold">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-brand' : 'bg-black/10 dark:bg-white/10'}`} />
        ))}
      </div>
    </div>
  );
}
