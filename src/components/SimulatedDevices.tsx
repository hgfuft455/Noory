import React from 'react';
import { motion } from 'motion/react';
import { Clock, Bell, MapPin, Navigation, Compass, Activity, Smartphone, Watch } from 'lucide-react';
import { cn } from '../lib/utils';

const AndroidWidget = () => (
  <div className="w-full max-w-sm aspect-[2/1] bg-white/80 dark:bg-navy-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-2xl shadow-primary/10 p-8 flex flex-col justify-between relative overflow-hidden group ornamental-border">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
    <div className="relative z-10 flex items-center justify-between">
      <div className="space-y-1">
        <h4 className="text-4xl font-black text-stone-800 dark:text-slate-100">15:45</h4>
        <p className="text-xs font-black text-primary uppercase tracking-widest">الثلاثاء، 7 أبريل</p>
      </div>
      <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
        <Clock className="w-7 h-7" />
      </div>
    </div>
    
    <div className="relative z-10 flex items-center justify-between border-t border-stone-100 dark:border-white/5 pt-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest">الصلاة القادمة</p>
          <p className="text-sm font-black text-stone-800 dark:text-slate-100">المغرب • 18:32</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
        <Activity className="w-3 h-3 animate-pulse" />
        تحديث تلقائي
      </div>
    </div>
  </div>
);

const WearOSWatch = () => (
  <div className="w-64 h-64 bg-black rounded-full border-8 border-stone-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30" />
    
    <div className="relative z-10 space-y-2">
      <div className="flex items-center justify-center gap-2 text-primary">
        <Navigation className="w-4 h-4 fill-current" />
        <span className="text-[10px] font-black uppercase tracking-widest">القبلة</span>
      </div>
      <h4 className="text-3xl font-black text-white">15:45</h4>
      <div className="w-px h-6 bg-white/20 mx-auto" />
      <div className="space-y-1">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">المغرب</p>
        <p className="text-lg font-black text-primary">18:32</p>
      </div>
    </div>
    
    <div className="absolute bottom-6 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
      <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">SYNCED</span>
    </div>
    
    {/* Compass Ring */}
    <div className="absolute inset-4 border border-white/5 rounded-full pointer-events-none" />
    <div className="absolute inset-0 border-t-2 border-primary/40 rounded-full animate-[spin_10s_linear_infinite]" />
  </div>
);

export default function SimulatedDevices() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">تكامل الأجهزة الذكية</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">مزامنة كاملة مع هاتفك وساعتك الذكية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-stone-800 dark:text-slate-100">ودجت الشاشة الرئيسية</h3>
              <p className="text-sm font-medium text-stone-400 dark:text-slate-500 leading-relaxed">
                تصميم عصري بأسلوب Material You يتفاعل مع خلفية هاتفك ويحدث مواقيت الصلاة تلقائياً.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start">
            <AndroidWidget />
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Watch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-stone-800 dark:text-slate-100">تطبيق Wear OS</h3>
              <p className="text-sm font-medium text-stone-400 dark:text-slate-500 leading-relaxed">
                واجهة مبسطة لساعتك الذكية تظهر لك الوقت المتبقي للصلاة القادمة واتجاه القبلة بلمحة سريعة.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <WearOSWatch />
          </div>
        </div>
      </div>
    </div>
  );
}
