import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';

const steps = [
  { title: "مرحباً بك في نور الهدى", desc: "رفيقك الإسلامي المتكامل الذي يجمع لك كل ما تحتاجه في يومك." },
  { title: "القرآن والأذكار", desc: "تصفح القرآن الكريم، واقرأ الأذكار اليومية بأسلوب مريح للعين." },
  { title: "مواقيت الصلاة والقبلة", desc: "تابع مواقيت الصلاة بدقة، وحدد اتجاه القبلة بسهولة." },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white dark:bg-navy-900 flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-black text-primary">ن</span>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-black text-stone-900 dark:text-white">{steps[step].title}</h2>
            <p className="text-stone-500 dark:text-slate-400 text-lg leading-relaxed">{steps[step].desc}</p>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex gap-2 justify-center">
          {steps.map((_, i) => (
            <div key={i} className={cn("h-2 rounded-full transition-all", i === step ? "w-8 bg-primary" : "w-2 bg-stone-200 dark:bg-white/10")} />
          ))}
        </div>

        <button 
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
          className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
        >
          {step < steps.length - 1 ? (
            <>
              التالي
              <ArrowLeft className="w-5 h-5" />
            </>
          ) : (
            <>
              ابدأ الآن
              <Check className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

import { cn } from '../lib/utils';
