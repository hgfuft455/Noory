import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface PrayerTimesCardProps {
  compact?: boolean;
}

export default function PrayerTimesCard({ compact }: PrayerTimesCardProps) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [hijriDate, setHijriDate] = useState<string>('');

  useEffect(() => {
    // Simple Hijri date calculation or fetch
    const date = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
    setHijriDate(date);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords(new Coordinates(latitude, longitude));
      },
      () => {
        // Default to Makkah if geolocation fails
        setCoords(new Coordinates(21.4225, 39.8262));
      }
    );
  }, []);

  useEffect(() => {
    if (coords) {
      const date = new Date();
      const params = CalculationMethod.MuslimWorldLeague();
      const times = new PrayerTimes(coords, date, params);
      setPrayerTimes(times);
      
      const next = times.nextPrayer();
      setNextPrayer(next);
    }
  }, [coords]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (prayerTimes) {
        const next = prayerTimes.nextPrayer();
        const nextTime = prayerTimes.timeForPrayer(next);
        if (nextTime) {
          const diff = nextTime.getTime() - new Date().getTime();
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          }
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerTimes]);

  if (!prayerTimes) return <div className="animate-pulse h-48 bg-stone-100 dark:bg-slate-800 rounded-3xl" />;

  const prayers = [
    { name: 'الفجر', time: prayerTimes.fajr, id: 'fajr' },
    { name: 'الشروق', time: prayerTimes.sunrise, id: 'sunrise' },
    { name: 'الظهر', time: prayerTimes.dhuhr, id: 'dhuhr' },
    { name: 'العصر', time: prayerTimes.asr, id: 'asr' },
    { name: 'المغرب', time: prayerTimes.maghrib, id: 'maghrib' },
    { name: 'العشاء', time: prayerTimes.isha, id: 'isha' },
  ];

  const getGradient = (id: string | null) => {
    switch (id) {
      case 'fajr': return 'from-indigo-900 via-purple-800 to-violet-700'; // Sunrise/Dawn
      case 'sunrise': return 'from-amber-300 via-orange-400 to-rose-500'; // Brighter sunrise
      case 'dhuhr': return 'from-sky-300 via-blue-400 to-blue-500'; // Brighter Dhuhr
      case 'asr': return 'from-orange-300 via-amber-400 to-orange-500'; // Brighter Asr
      case 'maghrib': return 'from-rose-700 via-purple-800 to-indigo-900'; // Darker Maghrib
      case 'isha': return 'from-indigo-950 via-slate-900 to-black'; // Darker Isha
      default: return 'from-sky-500 to-blue-600';
    }
  };

  const getBackgroundImage = (id: string | null) => {
    switch (id) {
      case 'fajr': return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800';
      case 'sunrise': return 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800';
      case 'dhuhr': return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
      case 'asr': return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800';
      case 'maghrib': return 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800';
      case 'isha': return 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800';
      default: return 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=800';
    }
  };

  if (compact) {
    const currentNext = prayers.find(p => p.id === nextPrayer) || prayers[0];
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden rounded-[4rem] p-12 text-white shadow-2xl transition-all duration-1000 group min-h-[400px] flex flex-col justify-center",
          "bg-gradient-to-br",
          getGradient(nextPrayer)
        )}
      >
        <div className="absolute inset-0">
           <img 
            src={getBackgroundImage(nextPrayer)} 
            alt="Prayer Background" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-[2000ms]" 
            referrerPolicy="no-referrer" 
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-[0.3em] bg-white/10 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/20 shadow-lg"
          >
            <Calendar className="w-4 h-4 text-gold-500" />
            <span>{hijriDate}</span>
          </motion.div>
          
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-white font-black text-sm uppercase tracking-[0.4em]"
            >
              الصلاة القادمة
            </motion.p>
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl font-black tracking-tighter drop-shadow-2xl"
            >
              {currentNext.name}
            </motion.h2>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-light opacity-90 tracking-tight"
            >
              {format(currentNext.time, 'hh:mm a')}
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-3 bg-black/40 backdrop-blur-3xl px-10 py-6 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-gold-500 animate-spin-slow" />
              <span className="font-mono text-3xl font-black tracking-[0.2em]">{timeLeft}</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">متبقي على الأذان</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-navy-900/80 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-stone-200 dark:border-white/5 shadow-2xl shadow-primary/5 ornamental-border relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none arabesque-pattern" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="text-center sm:text-right space-y-2">
            <h2 className="text-3xl font-black text-stone-800 dark:text-slate-100 tracking-tight">مواقيت الصلاة</h2>
            <p className="text-primary font-black text-xs uppercase tracking-[0.2em]">{hijriDate}</p>
            <div className="h-1 w-16 bg-gold-500/30 rounded-full" />
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">العبادات اليومية</span>
          </div>
          <div className="flex items-center gap-3 bg-stone-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-stone-100 dark:border-white/5 shadow-inner">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-bold text-stone-600 dark:text-slate-400">مكة المكرمة (تلقائي)</span>
          </div>
        </div>
 
        <div className="grid gap-4 relative z-10">
          {prayers.map((prayer) => (
            <motion.div 
              key={prayer.id}
              whileHover={{ x: -10 }}
              className={cn(
                "flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 border",
                nextPrayer === prayer.id 
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-[1.03] z-20" 
                  : "bg-stone-50/50 dark:bg-white/5 border-stone-100 dark:border-white/5 text-stone-500 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-black",
                  nextPrayer === prayer.id ? "bg-white/20" : "bg-stone-100 dark:bg-white/5"
                )}>
                  {prayer.name[0]}
                </div>
                <span className="font-black text-xl tracking-tight">{prayer.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-black text-2xl tracking-widest">{format(prayer.time, 'hh:mm')}</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{format(prayer.time, 'a')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
