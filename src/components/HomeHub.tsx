import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, Coffee, Bed, MapPin, Plane, 
  Book, History, MessageCircle, Shield, 
  Compass, Heart, Video, Target,
  ChevronLeft, Search, Zap, WifiOff, 
  ShieldCheck, Clock, Star, HandHelping,
  ArrowUpRight, Bell, Volume2, Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

interface HomeHubProps {
  onNavigate: (tab: string) => void;
}

const SpiritualProgressRing = ({ progress = 65 }: { progress?: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center group">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          className="stroke-stone-100 dark:stroke-white/5 fill-none"
          strokeWidth="8"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="64"
          cy="64"
          r={radius}
          className="stroke-primary fill-none"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-primary">{progress}%</span>
        <span className="text-[8px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest">التقدم اليومي</span>
      </div>
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

const NextPrayerCard = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isNight = time.getHours() >= 18 || time.getHours() < 5;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative w-full h-64 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/10 group"
    >
      {/* Dynamic Sky Background */}
      <div className={cn(
        "absolute inset-0 transition-all duration-1000",
        isNight 
          ? "bg-gradient-to-br from-navy-900 via-indigo-950 to-slate-900" 
          : "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"
      )}>
        {/* Animated Stars/Clouds */}
        <div className="absolute inset-0 opacity-30 arabesque-pattern mix-blend-overlay" />
        <div className="absolute top-10 right-10">
          {isNight ? (
            <Moon className="w-16 h-16 text-gold-500/50 animate-pulse" />
          ) : (
            <Sun className="w-16 h-16 text-amber-300/50 animate-spin-slow" />
          )}
        </div>
      </div>

      <div className="relative h-full p-10 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">الصلاة القادمة</span>
            </div>
            <h3 className="text-5xl font-black text-white tracking-tighter">صلاة العصر</h3>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs font-black uppercase tracking-widest">الوقت المتبقي</p>
            <p className="text-3xl font-black text-gold-500 tracking-tight">01:24:45</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-white/60 uppercase tracking-widest">الموقع الحالي</p>
              <p className="text-sm font-bold text-white">مكة المكرمة، السعودية</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-primary rounded-2xl text-xs font-black hover:scale-105 transition-transform shadow-lg">
            تنبيه الأذان
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function HomeHub({ onNavigate }: HomeHubProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const priorityGrid = {
    top: [
      { id: 'quran', label: 'القرآن الكريم', sub: 'تلاوة وتدبر', virtue: 'فضل القرآن: نور وهدى', icon: Book, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { id: 'prayer', label: 'مواقيت الصلاة', sub: 'تنبيهات دقيقة', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
      { id: 'adhkar', label: 'مركز الأذكار', sub: 'حصن المسلم', virtue: 'فضل الذكر: طمأنينة القلب', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    ],
    supporting: [
      { id: 'stories', label: 'قصص الأنبياء', sub: 'عبر ومواعظ', icon: History, color: 'text-sky-600', bg: 'bg-sky-50' },
      { id: 'hadith', label: 'الأحاديث', sub: 'السنة النبوية', virtue: 'فضل الحديث: اتباع الرسول', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
      { id: 'fiqh', label: 'الفقه', sub: 'أحكام الشريعة', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
      { id: 'ruqyah', label: 'الرقية', sub: 'شفاء ورحمة', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ],
    tools: [
      { id: 'tasbih', label: 'مسبحة', icon: Target },
      { id: 'qibla', label: 'قبلة', icon: Compass },
      { id: 'live', label: 'مباشر', icon: Video },
      { id: 'donations', label: 'تبرعات', icon: HandHelping },
    ]
  };

  return (
    <div className="space-y-12 pb-32">
      {/* Search Header */}
      <div className="sticky top-0 z-40 -mx-6 px-6 py-4 bg-[#fcfbf9]/80 dark:bg-navy-900/80 backdrop-blur-xl border-b border-stone-100 dark:border-white/5">
        <div className="relative group">
          <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن سورة، ذكر، أو فتوى..."
            className="w-full h-14 pr-14 pl-6 bg-stone-100 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Header & Progress */}
      <header className="flex items-center justify-between px-2">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-stone-800 dark:text-slate-100 tracking-tight">السلام عليكم</h1>
          <p className="text-lg text-stone-500 dark:text-slate-400 font-medium">طاب يومك بذكر الله</p>
        </div>
        <SpiritualProgressRing />
      </header>

      {/* Next Prayer Card */}
      <NextPrayerCard />

      {/* Automation Banner */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-6 flex items-center justify-between group overflow-hidden relative"
      >
        <div className="absolute inset-0 opacity-[0.03] arabesque-pattern pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-widest">الأتمتة الذكية نشطة</p>
            <p className="text-sm font-bold text-stone-600 dark:text-slate-300">تم تفعيل الوضع الصامت لصلاة الظهر تلقائياً</p>
          </div>
        </div>
        <button className="p-3 rounded-xl bg-white dark:bg-white/5 text-stone-400 hover:text-primary transition-colors relative z-10">
          <Settings className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Priority Grid - Top Level */}
      <section className="space-y-6">
        <div className="flex flex-col items-center gap-2 px-2 mb-4">
          <h3 className="text-xl font-black text-stone-800 dark:text-slate-100">الخدمات الأساسية</h3>
          <div className="h-1 w-16 bg-gold-500/30 rounded-full" />
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">أركان التطبيق</span>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {priorityGrid.top.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className="premium-islamic-btn p-8 flex items-center justify-between group text-right"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-inner",
                  item.bg, item.color
                )}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-white tracking-tight">{item.label}</span>
                  <span className="text-xs font-black text-gold-500 uppercase tracking-[0.2em] opacity-80">{item.sub}</span>
                  {'virtue' in item && <span className="block text-[10px] font-bold text-white/70 mt-1">{item.virtue}</span>}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/40 group-hover:text-gold-500 group-hover:bg-white/20 transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Priority Grid - Second Level */}
      <section className="space-y-6">
        <div className="flex flex-col items-center gap-2 px-2">
          <h3 className="text-xl font-black text-stone-800 dark:text-slate-100">المكتبة والعلوم</h3>
          <div className="h-1 w-16 bg-gold-500/30 rounded-full" />
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">المحتوى المعرفي</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {priorityGrid.supporting.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className="bg-white dark:bg-navy-900 p-6 rounded-[2.5rem] border border-stone-200 dark:border-white/5 shadow-xl shadow-primary/5 text-right flex flex-col gap-4 items-end group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.02] arabesque-pattern pointer-events-none" />
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-inner",
                item.bg, item.color
              )}>
                <item.icon className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-stone-800 dark:text-slate-100 tracking-tight">{item.label}</span>
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{item.sub}</span>
                {'virtue' in item && <span className="block text-[9px] font-bold text-stone-500 dark:text-slate-400 mt-1">{item.virtue}</span>}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Priority Grid - Third Level (Tools) */}
      <section className="space-y-6">
        <div className="flex flex-col items-center gap-2 px-2">
          <h3 className="text-xl font-black text-stone-800 dark:text-slate-100">الأدوات السريعة</h3>
          <div className="h-1 w-16 bg-gold-500/30 rounded-full" />
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">أدوات مساعدة</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          {priorityGrid.tools.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className="flex-shrink-0 w-32 h-32 bg-stone-50 dark:bg-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 border border-stone-100 dark:border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-stone-400 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black text-stone-500 dark:text-slate-400 uppercase tracking-widest">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onNavigate('tasbih')}
        className="fixed bottom-32 left-8 w-20 h-20 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-50 border-4 border-white dark:border-navy-900"
      >
        <Target className="w-10 h-10" />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white dark:border-navy-900">
          33
        </div>
      </motion.button>
    </div>
  );
}
