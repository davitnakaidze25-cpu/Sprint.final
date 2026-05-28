import { Award, FileText, CheckCircle, GraduationCap, Code, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Haptics } from "../../utils/design-system";

export function StudentProfile() {
  return (
    <div className="flex flex-col h-full bg-canvas relative">
      <div className="pt-12 px-6 flex flex-col gap-4 pb-6 bg-surface shadow-sm border-b border-micro">
        <h1 className="text-display tracking-tight">Profile</h1>

        <div className="flex items-center gap-4 mt-2">
          <div className="relative shrink-0">
            <img src="/Images/Davit.N.png" alt="Avatar" className="w-20 h-20 rounded-full object-cover shadow-md" />
            <div className="absolute bottom-0 right-0 bg-surface rounded-full p-0.5">
              <CheckCircle size={18} className="text-brand fill-brand/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-display text-[28px] font-bold">Davit N.</h2>
            <span className="text-subheading text-secondary-color flex items-center gap-1.5 mt-0.5">
              <GraduationCap size={16} /> Tbilisi N199 Komarovi school
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto pb-24">
        {/* Verified Badges */}
        <div className="flex flex-col gap-3">
          <h3 className="text-h2 text-primary-color font-bold">Verified Credentials</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => Haptics.mediumTap()} className="bg-surface border-micro rounded-interactive p-3 flex flex-col gap-2 shadow-sm cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-system-success/10 text-system-success flex items-center justify-center">
                <CheckCircle size={16} />
              </div>
              <span className="text-caption font-bold">Identity Verified</span>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }} onClick={() => Haptics.mediumTap()} className="bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/20 rounded-interactive p-3 flex flex-col gap-2 shadow-sm cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shadow-md">
                <Award size={16} />
              </div>
              <span className="text-caption font-bold text-brand">Top 5% Rated</span>
            </motion.div>
          </div>
        </div>

        {/* Portfolio / CV */}
        <div className="flex flex-col gap-3">
          <h3 className="text-h2 font-bold text-primary-color">Digital Curriculum Vitae</h3>
          <div className="bg-surface border-micro rounded-card p-5 shadow-app flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-brand font-bold mb-1">
                <Code size={16} />
                <span className="text-subheading uppercase tracking-wider text-[11px]">Core Capabilities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Python", "Excel Macros", "Data Entry", "Networking"].map(skill => (
                  <span key={skill} className="bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-md text-caption font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-black/5 dark:bg-white/5" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-brand font-bold mb-1">
                <Briefcase size={16} />
                <span className="text-subheading uppercase tracking-wider text-[11px]">Experience Summary</span>
              </div>
              <p className="text-body-primary text-secondary-color leading-relaxed">
                Experienced in writing custom scripts for data cleaning, macro creation, and database management. Over 40 micro-gigs completed successfully for enterprise clients focusing on fast turnaround tech support.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
