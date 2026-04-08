import React, { useState } from 'react';
import { morningAdhkar, eveningAdhkar, otherAdhkar } from '../data/adhkar';
import { Heart, Sun, Moon, Coffee, Bed, MapPin, Plane, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { AdhkarItem } from '../types';

interface AdhkarListProps {
  fontSize: number;
}

export default function AdhkarList({ fontSize }: AdhkarListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('morning');
  const [counts, setCounts] = useState<Record<string, number>>({});

  const categories = [
    { id: 'morning', label: 'أذكار الصباح', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 'evening', label: 'أذكار المساء', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { id: 'sleep', label: 'أذكار النوم', icon: Bed, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { id: 'wake-up', label: 'الاستيقاظ', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { id: 'travel', label: 'أذكار السفر', icon: Plane, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
    { id: 'mosque', label: 'المسجد', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'other', label: 'متنوعة', icon: Heart, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const getAdhkar = () => {
    if (activeCategory === 'morning') return morningAdhkar;
    if (activeCategory === 'evening') return eveningAdhkar;
    return otherAdhkar.filter(item => item.category === activeCategory || (activeCategory === 'other' && !['sleep', 'wake-up', 'travel', 'mosque'].includes(item.category)));
  };

  const currentAdhkar = getAdhkar();

  const handleCount = (id: string, max: number) => {
    setCounts(prev => {
      const current = prev[id] || 0;
      if (current < max) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const resetCounts = () => {
    setCounts({});
  };

  return (
    <div className="space-y-10">
      {/* Category Tabs - Scrollable */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar px-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 whitespace-nowrap border relative group",
              activeCategory === cat.id 
                ? "bg-primary text-white border-primary shadow-xl shadow-primary/30 scale-105" 
                : "bg-white dark:bg-navy-900 border-stone-200 dark:border-white/5 text-stone-500 hover:bg-stone-50 dark:hover:bg-white/5"
            )}
          >
            <cat.icon className={cn("w-5 h-5", activeCategory === cat.id ? "text-white" : cat.color)} />
            <span className="text-sm font-black tracking-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-primary tracking-tight">{categories.find(c => c.id === activeCategory)?.label}</h2>
          <p className="text-[10px] text-stone-400 dark:text-slate-500 font-black uppercase tracking-[0.2em]">طهر قلبك بذكر الله</p>
        </div>
        <button 
          onClick={resetCounts}
          className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-white/5 text-stone-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-stone-200 transition-all"
        >
          إعادة الضبط
        </button>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {currentAdhkar.map((item, index) => {
            const currentCount = counts[item.id] || 0;
            const isDone = currentCount >= item.count;
            const progress = (currentCount / item.count) * 100;

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCount(item.id, item.count)}
                className={cn(
                  "relative p-10 rounded-[3rem] border transition-all duration-700 cursor-pointer group overflow-hidden ornamental-border",
                  isDone 
                    ? "bg-primary/5 dark:bg-primary/10 border-primary/20" 
                    : "bg-white dark:bg-navy-900 border-stone-200 dark:border-white/5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-black/60"
                )}
              >
                {/* Completion Animation */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-20 bg-primary/10 backdrop-blur-sm"
                    >
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="w-24 h-24 text-primary" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Progress Bar Background Fill */}
                <motion.div 
                  className="absolute inset-0 bg-primary/5 transition-all duration-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />

                {/* Visible Progress Bar Line */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-stone-100 dark:bg-white/5">
                  <motion.div 
                    className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-stone-100 dark:bg-white/5 text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest border border-stone-200 dark:border-white/5">
                      {item.reference || 'مأثور'}
                    </div>
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-all duration-500",
                      isDone 
                        ? "bg-primary text-white shadow-lg shadow-primary/40 rotate-[360deg]" 
                        : "bg-stone-50 dark:bg-white/5 text-stone-300 dark:text-slate-700 group-hover:text-primary group-hover:scale-110"
                    )}>
                      {isDone ? <CheckCircle2 className="w-6 h-6" /> : item.count - currentCount}
                    </div>
                  </div>

                  <p className="text-right leading-[2] font-serif text-stone-800 dark:text-slate-100 font-bold" style={{ fontSize: `${fontSize}px` }}>
                    {item.text}
                  </p>

                  {item.benefit && (
                    <div className="flex items-start gap-4 p-6 bg-stone-50/50 dark:bg-white/5 rounded-[2rem] border border-stone-100 dark:border-white/5">
                      <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                        <Info className="w-4 h-4 text-gold-600" />
                      </div>
                      <p className="text-sm font-medium text-stone-500 dark:text-slate-400 leading-relaxed italic">
                        {item.benefit}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
