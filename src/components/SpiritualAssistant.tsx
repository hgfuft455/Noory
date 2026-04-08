import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Moon, 
  Sun, 
  VolumeX, 
  Mic, 
  Zap, 
  ShieldCheck, 
  Compass, 
  Bell, 
  WifiOff,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AutomationStatusProps {
  label: string;
  isActive: boolean;
  icon: React.ElementType;
  description: string;
}

const AutomationBadge = ({ label, isActive, icon: Icon, description }: AutomationStatusProps) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className={cn(
      "p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group ornamental-border",
      isActive 
        ? "bg-white dark:bg-navy-900/80 border-primary/30 shadow-xl shadow-primary/5" 
        : "bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/5 opacity-60"
    )}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
        isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-stone-200 dark:bg-white/10 text-stone-400"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
        isActive ? "bg-primary/10 text-primary" : "bg-stone-200 dark:bg-white/10 text-stone-400"
      )}>
        {isActive ? "نشط" : "معطل"}
      </div>
    </div>
    <h4 className="text-lg font-black text-stone-800 dark:text-slate-100 mb-1">{label}</h4>
    <p className="text-xs font-medium text-stone-400 dark:text-slate-500 leading-relaxed">{description}</p>
    
    {isActive && (
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-primary"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    )}
  </motion.div>
);

export default function SpiritualAssistant() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [automationActive, setAutomationActive] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const automations = [
    { 
      id: 'gps', 
      label: 'تتبع الموقع الذكي', 
      icon: MapPin, 
      isActive: true, 
      description: 'تحديث تلقائي لمواقيت الصلاة والقبلة بناءً على موقعك الحالي.' 
    },
    { 
      id: 'theme', 
      label: 'واجهة متفاعلة مع الوقت', 
      icon: Sun, 
      isActive: true, 
      description: 'تغيير ألوان وسمات التطبيق تلقائياً لتناسب وقت الفجر، الظهر، والليل.' 
    },
    { 
      id: 'volume', 
      label: 'التحكم الصامت التلقائي', 
      icon: VolumeX, 
      isActive: true, 
      description: 'صمت الهاتف تلقائياً أثناء وقت الصلاة في المسجد القريب منك.' 
    },
    { 
      id: 'azkar', 
      label: 'إطلاق الأذكار الذكي', 
      icon: Bell, 
      isActive: true, 
      description: 'تنبيهات أذكار الصباح والمساء عند الاستيقاظ أو النوم.' 
    },
    { 
      id: 'travel', 
      label: 'وضع السفر التلقائي', 
      icon: Compass, 
      isActive: false, 
      description: 'كشف السفر واقتراح أدعية المسافر وأحكام قصر الصلاة.' 
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-primary">المساعد الروحي الذكي</h2>
            <div className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              BETA
            </div>
          </div>
          <p className="text-stone-500 dark:text-slate-400 font-medium">نظام أتمتة متقدم لتعزيز تجربتك الإيمانية</p>
        </div>

        <div className="flex items-center gap-4">
          <div className={cn(
            "px-6 py-3 rounded-2xl border flex items-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-500",
            isOffline 
              ? "bg-stone-100 dark:bg-white/5 border-stone-200 dark:border-white/5 text-stone-400" 
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
          )}>
            {isOffline ? <WifiOff className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{isOffline ? "وضع الأوفلاين نشط" : "متصل وآمن"}</span>
          </div>
          <div className="px-6 py-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>الأتمتة نشطة</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((auto) => (
          <AutomationBadge key={auto.id} {...auto} />
        ))}
      </div>

      <div className="p-10 bg-primary rounded-[3rem] text-white relative overflow-hidden group ornamental-border shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-right">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto md:mx-0">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black">تحسين استهلاك البطارية</h3>
            <p className="text-primary-foreground/80 font-medium leading-relaxed max-w-md">
              يعمل نظام المساعد الروحي في الخلفية بكفاءة عالية، مع استهلاك شبه معدوم للطاقة لضمان استمرارية التنبيهات والأتمتة.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-white text-primary rounded-[2rem] font-black shadow-xl shadow-black/10 hover:scale-105 transition-transform flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              تحسين الأداء الآن
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-[2rem] font-black hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <AlertCircle className="w-5 h-5" />
              عرض تقرير الطاقة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
