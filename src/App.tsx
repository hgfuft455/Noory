/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Book, 
  Clock, 
  Heart, 
  Compass, 
  Settings, 
  Home, 
  History, 
  User, 
  MessageCircle,
  Bell,
  Search,
  Menu,
  X,
  Shield,
  Video
} from 'lucide-react';
import { cn } from './lib/utils';

// Components (to be implemented)
import PrayerTimesCard from './components/PrayerTimesCard';
import QuranReader from './components/QuranReader';
import AdhkarList from './components/AdhkarList';
import Tasbih from './components/Tasbih';
import Qibla from './components/Qibla';
import StoriesList from './components/StoriesList';
import HadithList from './components/HadithList';
import DuasList from './components/DuasList';
import RuqyahView from './components/RuqyahView';
import SettingsView from './components/SettingsView';
import HomeHub from './components/HomeHub';
import SmartNotification from './components/SmartNotification';
import LiveStream from './components/LiveStream';
import FiqhEncyclopedia from './components/FiqhEncyclopedia';

// Removed DailyVerse


import AdminDashboard from './components/AdminDashboard';
import Onboarding from './components/Onboarding';
import { usePrayerTimes } from './hooks/usePrayerTimes';

type Tab = 'home' | 'quran' | 'prayer' | 'adhkar' | 'tasbih' | 'qibla' | 'stories' | 'hadith' | 'ruqyah' | 'duas' | 'settings' | 'live' | 'fiqh' | 'donations' | 'admin';
export type Theme = 'emerald' | 'pearl' | 'navy';

const Greeting = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  let greeting = "السلام عليكم";
  if (hour >= 5 && hour < 12) greeting = "صباح الخير والبركة";
  else if (hour >= 12 && hour < 17) greeting = "طاب يومك بذكر الله";
  else if (hour >= 17 && hour < 21) greeting = "مساء الخير والسكينة";
  else greeting = "ليلة هادئة بذكر الله";

  return (
    <div className="space-y-2 mb-10 px-2">
      <h2 className="text-4xl font-black text-stone-800 dark:text-slate-100 tracking-tight">{greeting}</h2>
      <div className="flex items-center gap-3 text-stone-400 dark:text-slate-500 font-black text-xs uppercase tracking-widest">
        <span>{time.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        <div className="w-1 h-1 bg-primary rounded-full" />
        <span>{time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>('emerald');
  const [isKufi, setIsKufi] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const prayerTimes = usePrayerTimes();

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (!seen) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  // Time-Aware UI Logic
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 5) {
        setIsDarkMode(true);
        setTheme('navy');
      } else if (hour >= 5 && hour < 8) {
        setIsDarkMode(false);
        setTheme('pearl');
      } else {
        setIsDarkMode(false);
        setTheme('emerald');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Simulated Travel Mode Detection
  useEffect(() => {
    if ("geolocation" in navigator) {
      let lastCoords: { lat: number; lon: number } | null = null;
      
      const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (lastCoords) {
          // If moved more than ~50km (very rough check for simulation)
          const dist = Math.sqrt(Math.pow(latitude - lastCoords.lat, 2) + Math.pow(longitude - lastCoords.lon, 2));
          if (dist > 0.5) {
            setIsTraveling(true);
          }
        }
        lastCoords = { lat: latitude, lon: longitude };
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const tabs = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'quran', icon: Book, label: 'القرآن' },
    { id: 'prayer', icon: Clock, label: 'الصلاة' },
    { id: 'adhkar', icon: Heart, label: 'الأذكار' },
    { id: 'duas', icon: MessageCircle, label: 'الأدعية' },
    { id: 'tasbih', icon: History, label: 'التسبيح' },
    { id: 'qibla', icon: Compass, label: 'القبلة' },
    { id: 'ruqyah', icon: Shield, label: 'الرقية' },
    { id: 'stories', icon: User, label: 'القصص' },
    { id: 'hadith', icon: MessageCircle, label: 'الأحاديث' },
    { id: 'live', icon: Video, label: 'بث مباشر' },
    { id: 'fiqh', icon: Shield, label: 'الفقه' },
    { id: 'donations', icon: Heart, label: 'تبرعات' },
    { id: 'settings', icon: Settings, label: 'الإعدادات' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-12">
            <HomeHub onNavigate={(tab) => setActiveTab(tab as Tab)} />
            <div className="space-y-8">
              <div className="px-2">
                <h2 className="text-2xl font-black text-stone-800 dark:text-slate-100">آية اليوم</h2>
                <p className="text-sm font-medium text-stone-400 dark:text-slate-500">تدبر في آيات الله</p>
              </div>
              <div className="h-48 glass rounded-[3rem] flex items-center justify-center text-stone-400">آية اليوم (قريباً)</div>
            </div>
          </div>
        );
      case 'quran': return <QuranReader isKufi={isKufi} setIsKufi={setIsKufi} isDarkMode={isDarkMode} fontSize={fontSize} />;
      case 'prayer': return <PrayerTimesCard />;
      case 'adhkar': return <AdhkarList fontSize={fontSize} />;
      case 'duas': return <DuasList />;
      case 'tasbih': return <Tasbih />;
      case 'qibla': return <Qibla />;
      case 'ruqyah': return <RuqyahView />;
      case 'stories': return <StoriesList />;
      case 'hadith': return <HadithList />;
      case 'live': return <LiveStream />;
      case 'fiqh': return <FiqhEncyclopedia />;
      case 'donations': return <div className="p-10 text-center">صفحة التبرعات قيد التطوير</div>;
      case 'settings': return <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isKufi={isKufi} setIsKufi={setIsKufi} theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} onAdminToggle={() => setIsAdminMode(true)} />;
      default: return null;
    }
  };

  if (isAdminMode) {
    return <AdminDashboard onLogout={() => setIsAdminMode(false)} />;
  }

  return (
    <div dir="rtl" className={cn(
      "min-h-screen font-sans transition-colors duration-500 relative overflow-hidden noise-texture",
      `theme-${theme}`,
      isDarkMode ? "bg-navy-900 text-slate-100" : "bg-[#fcfbf9] text-stone-900"
    )}>
      <AnimatePresence>
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      </AnimatePresence>
      <SmartNotification />
      
      {/* Travel Mode Banner */}
      <AnimatePresence>
        {isTraveling && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-500 text-white px-6 py-3 flex items-center justify-between gap-4 relative z-[60]"
          >
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 animate-spin-slow" />
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest">تم رصد سفر</p>
                <p className="text-sm font-bold">هل تود عرض أحكام قصر الصلاة وأدعية السفر؟</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('duas')}
                className="px-4 py-1.5 bg-white text-amber-600 rounded-full text-xs font-black hover:scale-105 transition-transform"
              >
                عرض الآن
              </button>
              <button 
                onClick={() => setIsTraveling(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-navy-900/70 border-b border-stone-200 dark:border-white/5 px-6 py-6 pt-safe flex items-center justify-between safe-top">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 ornamental-border">
            <span className="text-white text-2xl font-black">ن</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">نور الهدى</h1>
            <p className="text-[10px] text-stone-400 dark:text-slate-500 font-black uppercase tracking-[0.2em]">تطبيقك الإسلامي المتكامل</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-gold-500" /> : <Moon className="w-5 h-5 text-navy-900" />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-10 pb-40 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-[2rem] p-2 flex items-center overflow-x-auto no-scrollbar shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-black/80 z-50 safe-mb">
        {tabs.map((tab) => {
          const getButtonShape = (id: string) => {
            switch (id) {
              case 'home': return 'rounded-full';
              case 'quran': return 'rounded-xl';
              case 'prayer': return 'rounded-3xl';
              case 'adhkar': return 'rounded-t-3xl';
              case 'duas': return 'rounded-br-3xl';
              case 'tasbih': return 'rounded-tl-3xl';
              case 'qibla': return 'rounded-bl-3xl';
              case 'ruqyah': return 'rounded-tr-3xl';
              case 'stories': return 'rounded-r-3xl';
              case 'hadith': return 'rounded-l-3xl';
              case 'live': return 'rounded-t-xl';
              case 'fiqh': return 'rounded-b-xl';
              case 'donations': return 'rounded-full';
              case 'settings': return 'rounded-xl';
              default: return 'rounded-2xl';
            }
          };

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "relative flex flex-col items-center gap-1 p-3 transition-all duration-300 min-w-[4rem]",
                getButtonShape(tab.id),
                activeTab === tab.id ? "text-primary scale-105 bg-primary/10 dark:bg-primary/20" : "text-stone-400 dark:text-slate-500 hover:text-stone-600 dark:hover:text-slate-300"
              )}
            >
              <tab.icon className={cn(
                "w-6 h-6 transition-all duration-300", 
                activeTab === tab.id ? "fill-current" : ""
              )} />
              <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 z-[70] shadow-2xl p-8"
            >
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-black mb-4">القائمة</h2>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as Tab);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all",
                      activeTab === tab.id ? "bg-primary/10 dark:bg-primary/20 text-primary" : "hover:bg-stone-50 dark:hover:bg-slate-800"
                    )}
                  >
                    <tab.icon className="w-6 h-6" />
                    <span className="font-bold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
