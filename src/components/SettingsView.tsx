import React, { useState } from 'react';
import { 
  Moon, Sun, Type, Bell, Shield, Info, Heart, Share2, Star, Globe, 
  MapPin, Volume2, Smartphone, Download, Watch, Layout, Music, Mic,
  Zap, Wifi, RefreshCw, ChevronDown, Check, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SettingsViewProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isKufi: boolean;
  setIsKufi: (val: boolean) => void;
  theme: 'emerald' | 'pearl' | 'navy';
  setTheme: (val: 'emerald' | 'pearl' | 'navy') => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  onAdminToggle?: () => void;
}

const Switch = ({ active, onChange }: { active: boolean; onChange: () => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={cn(
      "w-14 h-8 rounded-full transition-all duration-500 relative p-1",
      active ? "bg-primary shadow-lg shadow-primary/30" : "bg-stone-200 dark:bg-white/10"
    )}
  >
    <motion.div 
      animate={{ x: active ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-6 h-6 bg-white rounded-full shadow-sm"
    />
  </button>
);

const Slider = ({ value, min, max, onChange, step = 1 }: { value: number; min: number; max: number; onChange: (val: number) => void; step?: number }) => (
  <div className="w-full flex items-center gap-4 mt-4">
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step}
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="flex-1 h-2 bg-stone-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
    />
    <span className="text-sm font-black text-primary w-12 text-center">{value}</span>
  </div>
);

export default function SettingsView({ 
  isDarkMode, 
  setIsDarkMode, 
  isKufi, 
  setIsKufi, 
  theme, 
  setTheme,
  fontSize,
  setFontSize,
  onAdminToggle
}: SettingsViewProps) {
  const [dhikrFreq, setDhikrFreq] = useState(15);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSilent, setAutoSilent] = useState(true);
  const [gpsPrayer, setGpsPrayer] = useState(true);
  const [smartTriggers, setSmartTriggers] = useState(true);
  const [watchSync, setWatchSync] = useState(true);
  const [widgetRefresh, setWidgetRefresh] = useState(30);

  const themes = [
    { id: 'emerald', label: 'سماوي (Sky)', color: 'bg-sky-600' },
    { id: 'navy', label: 'كحلي (Navy)', color: 'bg-navy-900' },
    { id: 'pearl', label: 'ذهبي (Gold)', color: 'bg-gold-500' },
  ];

  const sections = [
    {
      title: 'المظهر والتجربة',
      icon: Layout,
      items: [
        { 
          id: 'theme-selector',
          label: 'سمة التطبيق',
          icon: Star,
          component: (
            <div className="flex gap-3 mt-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={cn(
                    "flex-1 p-4 rounded-3xl text-xs font-black transition-all border-2 flex flex-col items-center gap-2",
                    theme === t.id 
                      ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5" 
                      : "border-transparent bg-stone-50 dark:bg-white/5 text-stone-400"
                  )}
                >
                  <div className={cn("w-8 h-8 rounded-full shadow-inner", t.color)} />
                  {t.label}
                </button>
              ))}
            </div>
          )
        },
        { 
          id: 'dark-mode', 
          label: 'الوضع الليلي', 
          icon: isDarkMode ? Moon : Sun, 
          component: <Switch active={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50 dark:bg-indigo-900/20'
        },
        { 
          id: 'font-style', 
          label: 'نمط الخط العربي', 
          icon: Type, 
          component: (
            <div className="flex gap-2 mt-4">
              {['serif', 'kufi'].map((style) => (
                <button
                  key={style}
                  onClick={() => setIsKufi(style === 'kufi')}
                  className={cn(
                    "flex-1 py-3 rounded-2xl font-black text-sm border-2 transition-all",
                    (style === 'kufi' ? isKufi : !isKufi)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-stone-100 dark:bg-white/5 text-stone-400"
                  )}
                >
                  {style === 'kufi' ? 'كوفي' : 'نسخ'}
                </button>
              ))}
            </div>
          )
        },
        {
          id: 'font-size',
          label: 'حجم الخط',
          icon: Type,
          component: <Slider value={fontSize} min={16} max={48} onChange={setFontSize} />
        },
      ]
    },
    {
      title: 'الأتمتة والذكاء الاصطناعي',
      icon: Zap,
      items: [
        { 
          id: 'gps-prayer', 
          label: 'مواقيت الصلاة حسب الموقع', 
          icon: MapPin, 
          component: <Switch active={gpsPrayer} onChange={() => setGpsPrayer(!gpsPrayer)} />,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50 dark:bg-emerald-900/20'
        },
        { 
          id: 'auto-silent', 
          label: 'صامت تلقائي أثناء الصلاة', 
          icon: Volume2, 
          component: <Switch active={autoSilent} onChange={() => setAutoSilent(!autoSilent)} />,
          color: 'text-rose-500',
          bg: 'bg-rose-50 dark:bg-rose-900/20'
        },
        { 
          id: 'smart-triggers', 
          label: 'محفزات الأذكار الذكية', 
          icon: Zap, 
          component: <Switch active={smartTriggers} onChange={() => setSmartTriggers(!smartTriggers)} />,
          color: 'text-amber-500',
          bg: 'bg-amber-50 dark:bg-amber-900/20'
        },
      ]
    },
    {
      title: 'التنبيهات والتحكم الصوتي',
      icon: Bell,
      items: [
        { 
          id: 'dhikr-freq', 
          label: 'تكرار الذكر التلقائي', 
          icon: RefreshCw, 
          component: (
            <div className="w-full space-y-4 mt-4">
              <Slider value={dhikrFreq} min={5} max={60} step={5} onChange={setDhikrFreq} />
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">كل {dhikrFreq} دقيقة</p>
            </div>
          ),
          color: 'text-blue-500',
          bg: 'bg-blue-50 dark:bg-blue-900/20'
        },
        { 
          id: 'voice-selection', 
          label: 'صوت التنبيه الصوتي', 
          icon: Mic, 
          value: 'الشيخ العفاسي',
          color: 'text-purple-500',
          bg: 'bg-purple-50 dark:bg-purple-900/20'
        },
        { 
          id: 'athan-sound', 
          label: 'صوت الأذان', 
          icon: Music, 
          value: 'مكة المكرمة',
          color: 'text-amber-600',
          bg: 'bg-amber-50 dark:bg-amber-900/20'
        },
      ]
    },
    {
      title: 'المحتوى والتحميلات',
      icon: Download,
      items: [
        { 
          id: 'offline-mode', 
          label: 'وضع الأوفلاين', 
          icon: Wifi, 
          component: <Switch active={offlineMode} onChange={() => setOfflineMode(!offlineMode)} />,
          color: 'text-sky-500',
          bg: 'bg-sky-50 dark:bg-sky-900/20'
        },
        { 
          id: 'download-manager', 
          label: 'مدير التحميلات', 
          icon: Download, 
          value: '2.4 GB مستخدم',
          color: 'text-primary',
          bg: 'bg-primary/10'
        },
      ]
    },
    {
      title: 'المزامنة والأدوات',
      icon: Watch,
      items: [
        { 
          id: 'watch-sync', 
          label: 'مزامنة الساعة الذكية', 
          icon: Watch, 
          component: <Switch active={watchSync} onChange={() => setWatchSync(!watchSync)} />,
          color: 'text-orange-500',
          bg: 'bg-orange-50 dark:bg-orange-900/20'
        },
        { 
          id: 'widget-refresh', 
          label: 'تحديث أدوات الشاشة', 
          icon: Layout, 
          component: (
            <div className="w-full space-y-4 mt-4">
              <Slider value={widgetRefresh} min={15} max={120} step={15} onChange={setWidgetRefresh} />
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">كل {widgetRefresh} دقيقة</p>
            </div>
          ),
          color: 'text-indigo-500',
          bg: 'bg-indigo-50 dark:bg-indigo-900/20'
        },
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <div className="text-center space-y-6 px-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-[0.3em] border border-primary/20 shadow-inner">
          <Settings className="w-4 h-4 animate-spin-slow" />
          لوحة التحكم المتقدمة
        </div>
        <h2 className="text-5xl font-black text-stone-800 dark:text-slate-100 tracking-tight">الإعدادات</h2>
        <p className="text-lg text-stone-500 dark:text-slate-400 font-medium max-w-md mx-auto">قم بتخصيص كل تفاصيل تجربتك الروحانية والتقنية في نور الهدى</p>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 px-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <section.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-stone-800 dark:text-slate-100 tracking-tight">
                {section.title}
              </h3>
            </div>

            <div className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-3xl rounded-[3.5rem] border border-stone-200 dark:border-white/5 overflow-hidden shadow-2xl shadow-primary/5 ornamental-border relative">
              {/* Decorative Islamic Divider */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none arabesque-pattern" />

              {section.items.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    "w-full p-8 transition-all duration-500 relative z-10",
                    i !== section.items.length - 1 && "border-b border-stone-100 dark:border-white/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 shadow-inner border border-transparent group-hover:border-current", 
                        item.bg, 
                        item.color
                      )}>
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-black text-xl text-stone-800 dark:text-slate-100 block tracking-tight">{item.label}</span>
                        {item.value && (
                          <span className="text-xs font-black text-primary uppercase tracking-widest opacity-80">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.component && <div className="flex-shrink-0">{item.component}</div>}
                    {!item.component && !item.value && (
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-white/5 flex items-center justify-center text-stone-300">
                        <ChevronDown className="w-6 h-6 -rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center py-16 space-y-6">
        <div className="flex justify-center gap-4">
          {[Shield, Info, Heart].map((Icon, i) => (
            <button key={i} className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 hover:text-primary hover:border-primary transition-all shadow-sm">
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black text-stone-300 dark:text-slate-700 uppercase tracking-[0.4em]">نور الهدى</p>
          <p className="text-xs font-bold text-stone-400 dark:text-slate-600">الإصدار المتقدم 2.0.4 • تجربة فاخرة متكاملة</p>
        </div>
        {onAdminToggle && (
          <button 
            onClick={onAdminToggle}
            className="mt-8 px-8 py-3 bg-navy-900 dark:bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-slate-500 hover:text-primary transition-all flex items-center gap-3 mx-auto"
          >
            <Shield className="w-4 h-4" />
            الدخول لوضع الإدارة (Admin)
          </button>
        )}
      </div>
    </div>
  );
}
