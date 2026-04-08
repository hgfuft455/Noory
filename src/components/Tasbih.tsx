import React, { useState, useEffect, useCallback } from 'react';
import { History, RotateCcw, Plus, Minus, Settings, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [total, setTotal] = useState(0);
  const [activeDhikr, setActiveDhikr] = useState(0);

  const dhikrs = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'اللَّهُ أَكْبَرُ',
    'لاَ إِلَهَ إلاَّ اللَّهُ',
    'أَسْتَغْفِرُ اللَّهَ',
  ];

  const targets = [33, 99, 100, 1000];

  const handleIncrement = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      if (next > target) {
        if (navigator.vibrate) navigator.vibrate(20);
        return 1;
      }
      if (navigator.vibrate) navigator.vibrate(10);
      return next;
    });
    setTotal(t => t + 1);
  }, [target]);

  const handleReset = () => {
    setCount(0);
    setTotal(0);
  };

  const progress = (count / target) * 100;

  return (
    <div className="space-y-12 py-10 flex flex-col items-center">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">المسبحة الإلكترونية</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">اذكر الله يذكرك</p>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar justify-center px-6 w-full max-w-md">
          {dhikrs.map((d, i) => (
            <button
              key={d}
              onClick={() => { setActiveDhikr(i); setCount(0); }}
              className={cn(
                "px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-500",
                activeDhikr === i 
                  ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-105" 
                  : "bg-white dark:bg-navy-900 border border-stone-200 dark:border-white/5 text-stone-500"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleIncrement}
          className="relative w-80 h-80 flex items-center justify-center group"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="145"
              className="stroke-stone-100 dark:stroke-white/5 fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="145"
              className="stroke-primary fill-none"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ strokeDasharray: "911 911", strokeDashoffset: 911 }}
              animate={{ strokeDashoffset: 911 - (911 * progress) / 100 }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
            />
          </svg>

          {/* Glass Button */}
          <div className="w-64 h-64 rounded-full bg-white dark:bg-navy-900 border border-stone-200 dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/60 flex flex-col items-center justify-center space-y-2 group-active:scale-95 transition-transform ornamental-border">
            <span className="text-stone-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">العدد الحالي</span>
            <span className="text-8xl font-black text-primary tracking-tighter">{count}</span>
            <div className="flex items-center gap-2">
              <div className="h-px w-4 bg-stone-200 dark:bg-white/10" />
              <span className="text-stone-300 dark:text-slate-700 font-bold text-sm">{target}</span>
              <div className="h-px w-4 bg-stone-200 dark:bg-white/10" />
            </div>
          </div>

          {/* Gold Accent Bead */}
          <motion.div 
            animate={{ rotate: (progress / 100) * 360 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-lg shadow-gold-500/50 border border-white/20" />
          </motion.div>
        </motion.button>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-4">
          {targets.map(t => (
            <button
              key={t}
              onClick={() => { setTarget(t); setCount(0); }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center font-black transition-all duration-300",
                target === t 
                  ? "bg-gold-500 text-white shadow-xl shadow-gold-500/30 scale-110" 
                  : "bg-white dark:bg-navy-900 border border-stone-200 dark:border-white/5 text-stone-400"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={handleReset}
            className="flex items-center gap-3 px-10 py-5 bg-stone-100 dark:bg-white/5 rounded-[2rem] text-stone-600 dark:text-slate-400 font-black hover:bg-stone-200 dark:hover:bg-white/10 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            إعادة تعيين
          </button>
          <div className="px-10 py-5 bg-primary/10 rounded-[2rem] border border-primary/20 shadow-inner">
            <span className="text-primary dark:text-primary font-black text-lg">الإجمالي: {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
