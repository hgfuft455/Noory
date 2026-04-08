import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface KhatmaTrackerProps {
  onStartReading?: () => void;
}

export default function KhatmaTracker({ onStartReading }: KhatmaTrackerProps) {
  const [totalPages, setTotalPages] = useState(604);
  const [readPages, setReadPages] = useState(() => {
    const saved = localStorage.getItem('khatma_read_pages');
    return saved ? parseInt(saved) : 120; // Example starting point
  });
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('khatma_start_date');
    return saved ? new Date(saved) : new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
  });
  const [targetDays, setTargetDays] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('khatma_read_pages', readPages.toString());
  }, [readPages]);

  const progress = (readPages / totalPages) * 100;
  const daysElapsed = Math.max(1, Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const pagesPerDayActual = readPages / daysElapsed;
  const pagesPerDayTarget = totalPages / targetDays;
  
  const expectedPages = Math.floor(pagesPerDayTarget * daysElapsed);
  const diff = readPages - expectedPages;
  const daysDiff = Math.round(diff / pagesPerDayTarget);

  const handleFinishReading = () => {
    if (readPages < totalPages) {
      const dailyPortion = Math.ceil(totalPages / targetDays);
      setReadPages(prev => Math.min(totalPages, prev + dailyPortion));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-navy-900/80 backdrop-blur-3xl rounded-[3.5rem] border border-stone-200 dark:border-white/5 shadow-2xl shadow-primary/5 p-10 relative overflow-hidden group ornamental-border transition-all duration-700 hover:shadow-primary/10">
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />

      <div className="absolute top-0 left-0 w-full h-2 bg-stone-100 dark:bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary via-gold-500 to-primary shadow-[0_0_20px_rgba(var(--primary),0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary shadow-inner border border-primary/10 group-hover:rotate-6 transition-transform duration-500">
            <BookOpen className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-stone-800 dark:text-slate-100 tracking-tight">ختمة القرآن الكريم</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-black text-primary uppercase tracking-widest">خطة {targetDays} يوماً</span>
              <div className="w-1 h-1 bg-stone-300 rounded-full" />
              <span className="text-sm font-bold text-stone-400 dark:text-slate-500">صفحة {readPages} من {totalPages}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={cn(
              "px-6 py-3 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-500",
              daysDiff >= 0 ? "bg-emerald-500/10 text-emerald-600 shadow-emerald-500/5" : "bg-rose-500/10 text-rose-600 shadow-rose-500/5"
            )}
          >
            {daysDiff >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span>{Math.abs(daysDiff)} {Math.abs(daysDiff) === 1 ? "يوم" : "أيام"} {daysDiff >= 0 ? "متقدم" : "متأخر"}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-primary/10 text-primary rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/5"
          >
            <Calendar className="w-5 h-5" />
            <span>{daysElapsed} / {targetDays}</span>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 relative z-10">
        <div className="p-8 bg-stone-50/50 dark:bg-white/5 rounded-[2.5rem] border border-stone-100 dark:border-white/5 shadow-inner group/card hover:bg-white dark:hover:bg-white/10 transition-all duration-500">
          <p className="text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest mb-4">الورد اليومي القادم</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-stone-800 dark:text-slate-100 tracking-tight">الصفحات {readPages + 1} - {Math.min(totalPages, readPages + Math.ceil(pagesPerDayTarget))}</span>
            <button 
              onClick={onStartReading}
              className="w-10 h-10 bg-primary text-white rounded-xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 bg-stone-50/50 dark:bg-white/5 rounded-[2.5rem] border border-stone-100 dark:border-white/5 shadow-inner hover:bg-white dark:hover:bg-white/10 transition-all duration-500">
          <p className="text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest mb-4">معدل القراءة</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-800 dark:text-slate-100">{pagesPerDayActual.toFixed(1)}</span>
            <span className="text-xs font-black text-stone-400 uppercase tracking-widest">صفحة / يوم</span>
          </div>
        </div>

        <div className="p-8 bg-stone-50/50 dark:bg-white/5 rounded-[2.5rem] border border-stone-100 dark:border-white/5 shadow-inner hover:bg-white dark:hover:bg-white/10 transition-all duration-500">
          <p className="text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest mb-4">المتبقي للختم</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-stone-800 dark:text-slate-100">{totalPages - readPages}</span>
            <span className="text-xs font-black text-stone-400 uppercase tracking-widest">صفحة</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFinishReading}
          className="flex-1 py-6 bg-primary text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all flex items-center justify-center gap-4 group/btn"
        >
          <CheckCircle2 className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
          أتممت ورد اليوم
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-6 bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-slate-300 rounded-[2.5rem] font-black hover:bg-stone-200 dark:hover:bg-white/10 transition-all border border-stone-200 dark:border-white/10"
        >
          تعديل الخطة
        </motion.button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center text-white z-20"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h4 className="text-2xl font-black mb-2">تقبل الله منك!</h4>
            <p className="font-medium opacity-80">تم تحديث تقدمك في الختمة بنجاح</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
