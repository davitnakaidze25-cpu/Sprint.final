import { Building, FileText, CreditCard, ChevronRight, Bookmark, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Haptics } from "../../utils/design-system";

export function BusinessProfile() {
  return (
    <div className="flex flex-col h-full bg-canvas relative">
      <div className="pt-12 px-6 flex flex-col gap-4 pb-6 bg-surface shadow-sm border-b border-micro">
        <h1 className="text-display tracking-tight">Corporate Hub</h1>
        
        {/* Company Branding Header */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-20 h-20 rounded-[20px] bg-brand flex items-center justify-center text-white text-[32px] font-bold shadow-md shrink-0 border-micro relative overflow-hidden">
            <img src="/Images/TBC.png" alt="TB Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-display text-[28px] font-bold leading-tight">TBC Tech</h2>
            <div className="flex flex-col gap-1 mt-1.5">
               <span className="text-[11px] text-secondary-color font-bold uppercase tracking-wider flex items-center gap-1">
                 <Building size={12} /> ID: 404123456
               </span>
               <span className="text-[11px] text-system-success font-bold uppercase tracking-wider flex items-center gap-1">
                 <ShieldCheck size={12} /> Corporate Verified
               </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto pb-24">
        
        {/* Billing & Tax Navigation Group */}
        <div className="flex flex-col gap-3">
          <h3 className="text-h2 font-bold text-primary-color">Billing & Tax</h3>
          <div className="bg-surface border-micro rounded-card shadow-app flex flex-col overflow-hidden">
            
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => Haptics.mediumTap()} className="p-4 flex items-center justify-between cursor-pointer active:bg-black/5 dark:active:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-secondary-color flex items-center justify-center">
                    <FileText size={18} />
                 </div>
                 <span className="text-subheading font-bold">Invoices</span>
              </div>
              <div className="flex items-center gap-3">
                 {/* Secondary Alert Badge */}
                 <span className="bg-system-warning/10 text-system-warning px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle size={10} /> 2 Overdue
                 </span>
                 <ChevronRight size={18} className="text-secondary-color" />
              </div>
            </motion.div>
            
            <div className="h-px w-full bg-black/5 dark:bg-white/5" />
            
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => Haptics.mediumTap()} className="p-4 flex items-center justify-between cursor-pointer active:bg-black/5 dark:active:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-secondary-color flex items-center justify-center">
                    <CreditCard size={18} />
                 </div>
                 <span className="text-subheading font-bold">Payment Methods</span>
              </div>
              <ChevronRight size={18} className="text-secondary-color" />
            </motion.div>

          </div>
        </div>

        {/* Favorites Talent Ledger */}
        <div className="flex flex-col gap-3">
          <h3 className="text-h2 font-bold text-primary-color">Talent Ledgers</h3>
          <motion.div whileTap={{ scale: 0.98 }} onClick={() => Haptics.mediumTap()} className="bg-surface border-micro rounded-card p-4 shadow-app flex items-center justify-between cursor-pointer active:bg-black/5 dark:active:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-brand/10 text-brand flex items-center justify-center">
                <Bookmark size={20} className="fill-brand/20" />
              </div>
              <div className="flex flex-col">
                <span className="text-subheading font-bold">Saved Talent</span>
                <span className="text-caption text-secondary-color mt-0.5">12 curated candidates</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-secondary-color" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
