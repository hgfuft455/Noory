import React, { useState } from 'react';
import { ruqyahData } from '../data/ruqyah';
import { Shield, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function RuqyahView() {
  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleCount = (index: number, max: number) => {
    setCounts(prev => {
      const current = prev[index] || 0;
      if (current < max) return { ...prev, [index]: current + 1 };
      return prev;
    });
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/30">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-black text-primary">الرقية الشرعية</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">حصن نفسك بذكر الله</p>
      </div>

      <div className="space-y-6">
        {ruqyahData.map((item, index) => {
          const currentCount = counts[index] || 0;
          const isDone = currentCount >= item.count;

          return (
            <motion.div
              layout
              key={index}
              onClick={() => handleCount(index, item.count)}
              className={cn(
                "relative p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group overflow-hidden ornamental-border",
                isDone 
                  ? "bg-primary/5 dark:bg-primary/10 border-primary/20 opacity-60" 
                  : "bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 hover:border-primary/50 shadow-sm hover:shadow-md"
              )}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-primary">{item.title}</h3>
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all",
                    isDone ? "bg-primary text-white" : "bg-stone-50 dark:bg-slate-800 text-stone-400 group-hover:text-primary"
                  )}>
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : item.count - currentCount}
                  </div>
                </div>
                <p className="text-right text-2xl leading-[2] font-bold text-stone-800 dark:text-slate-100">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
        <Info className="w-6 h-6 text-blue-600 shrink-0" />
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200 leading-relaxed">
          يُستحب قراءة الرقية الشرعية بيقين تام بأن الشفاء من عند الله وحده، مع النفث في اليدين ومسح ما استطاع من الجسد.
        </p>
      </div>
    </div>
  );
}
