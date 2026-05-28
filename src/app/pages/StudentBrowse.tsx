import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, Map as MapIcon, SlidersHorizontal, MapPin, Clock, Star, ShieldCheck, Check } from "lucide-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Haptics } from "../../utils/design-system";

const JOBS_DATA = [
  { id: 1, title: "Router Diagnostics", cat: "Tech Support", price: "₾15", dist: "1.2 km", time: "1-2 hrs", employer: "TBC Tech", rating: 4.9, urgent: true },
  { id: 2, title: "Excel Formatting", cat: "Data Entry", price: "₾12", dist: "2.5 km", time: "2-3 hrs", employer: "Mariam D.", rating: 5.0, urgent: false },
  { id: 3, title: "Delivery Assist", cat: "Logistics", price: "₾10", dist: "3.1 km", time: "1 hr", employer: "Glovo Hub", rating: 4.8, urgent: true },
];

export function StudentBrowse() {
  const [view, setView] = useState<"list" | "map">("list");
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const handleDragEnd = (event: any, info: any, id: number) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      // Swipe Right: Apply
      Haptics.mediumTap();
      setAppliedJobs(prev => [...prev, id]);
    } else if (offset < -100 || velocity < -500) {
      // Swipe Left: Archive/Dismiss
      Haptics.lightWarning();
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="pt-12 px-6 pb-4 bg-surface shadow-sm z-20 flex flex-col gap-4 border-b border-micro">
        <div className="flex justify-between items-center">
          <h1 className="text-display">Explore</h1>
          <button onClick={() => Haptics.mediumTap()} className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-primary-color active:scale-95 transition-transform">
            <SlidersHorizontal size={20} />
          </button>
        </div>
        
        {/* Segmented Control */}
        <ToggleGroup.Root
          type="single"
          value={view}
          onValueChange={(val) => {
            if (val) {
              Haptics.mediumTap();
              setView(val as "list" | "map");
            }
          }}
          className="flex bg-black/5 dark:bg-white/5 rounded-[12px] p-1"
        >
          <ToggleGroup.Item value="list" className="flex-1 flex items-center justify-center gap-2 py-2 text-caption font-semibold rounded-[8px] data-[state=on]:bg-surface data-[state=on]:shadow-sm transition-all text-secondary-color data-[state=on]:text-primary-color min-touch-target">
            <List size={16} /> List
          </ToggleGroup.Item>
          <ToggleGroup.Item value="map" className="flex-1 flex items-center justify-center gap-2 py-2 text-caption font-semibold rounded-[8px] data-[state=on]:bg-surface data-[state=on]:shadow-sm transition-all text-secondary-color data-[state=on]:text-primary-color min-touch-target">
            <MapIcon size={16} /> Map
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="absolute inset-0 overflow-y-auto no-scrollbar p-6 flex flex-col gap-4"
            >
              {JOBS.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              <div className="h-20" /> {/* Bottom padding for tab bar */}
            </motion.div>
          ) : (
            <motion.div 
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="absolute inset-0 bg-[#E5E3DF] dark:bg-[#1A1A1A]"
            >
              {/* Fake Map Implementation */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply dark:mix-blend-screen" />
              
              {/* Map Pins */}
              {JOBS.map((job, i) => (
                <div 
                  key={job.id} 
                  className="absolute transform -translate-x-1/2 -translate-y-full"
                  style={{ top: `${30 + i * 20}%`, left: `${40 + i * 15}%` }}
                >
                  <div className="bg-surface px-3 py-1.5 rounded-full shadow-app border border-black/5 text-caption font-bold text-primary-color mb-1">
                    {job.price}
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-surface mx-auto drop-shadow-md" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const JOBS = [
  { id: 1, title: "Router Diagnostics & Setup", cat: "Tech Support", price: "₾15", dist: "1.2 km", time: "2 hrs", rating: 4.9, verified: true, urgent: true },
  { id: 2, title: "Post-Event Space Cleanup", cat: "Structural Cleaning", price: "₾30", dist: "3.4 km", time: "4 hrs", rating: 4.7, verified: true, urgent: false },
  { id: 3, title: "Last Mile Package Delivery", cat: "Logistics", price: "₾8", dist: "0.8 km", time: "45 min", rating: 4.5, verified: false, urgent: true },
  { id: 4, title: "Intro to Python Tutoring", cat: "Education", price: "₾15", dist: "Remote", time: "1 hr", rating: 5.0, verified: true, urgent: false },
];

function JobCard({ job }: { job: typeof JOBS[0] }) {
  return (
    <div className="bg-surface rounded-[16px] p-4 shadow-app border border-black/5 dark:border-white/5 flex flex-col gap-3 active:scale-[0.98] transition-transform">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <span className="text-caption text-secondary-color font-medium bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md">{job.cat}</span>
          {job.urgent && <span className="text-caption text-system-warning font-bold bg-system-warning/10 px-2 py-0.5 rounded-md">Urgent</span>}
        </div>
        <span className="text-h2 font-semibold text-primary-color">{job.price}</span>
      </div>
      
      <h3 className="text-h1">{job.title}</h3>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
        <div className="flex items-center gap-1 text-caption text-secondary-color">
          <MapPin size={14} /> {job.dist}
        </div>
        <div className="flex items-center gap-1 text-caption text-secondary-color">
          <Clock size={14} /> {job.time}
        </div>
        <div className="flex items-center gap-1 text-caption text-secondary-color">
          <Star size={14} className="text-system-warning fill-system-warning" /> {job.rating}
        </div>
        {job.verified && (
          <div className="flex items-center gap-1 text-caption text-system-success">
            <ShieldCheck size={14} /> Verified
          </div>
        )}
      </div>
    </div>
  );
}
