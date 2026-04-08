import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Qibla() {
  const [heading, setHeading] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        
        // Calculate Qibla angle
        const mLat = 21.4225 * (Math.PI / 180);
        const mLng = 39.8262 * (Math.PI / 180);
        const pLat = latitude * (Math.PI / 180);
        const pLng = longitude * (Math.PI / 180);
        
        const y = Math.sin(mLng - pLng);
        const x = Math.cos(pLat) * Math.tan(mLat) - Math.sin(pLat) * Math.cos(mLng - pLng);
        let qibla = Math.atan2(y, x) * (180 / Math.PI);
        setQiblaAngle(qibla);
      }
    );

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const webkitHeading = (e as any).webkitCompassHeading;
      if (webkitHeading !== undefined) {
        setHeading(webkitHeading);
      } else if (e.alpha !== null) {
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const diff = (qiblaAngle - heading + 360) % 360;
  const isAligned = Math.abs(diff) < 5 || Math.abs(diff - 360) < 5;

  return (
    <div className="space-y-12 flex flex-col items-center">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">اتجاه القبلة</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">وجه هاتفك نحو الكعبة المشرفة</p>
        <div className="h-1 w-20 bg-gold-500/30 mx-auto rounded-full" />
        <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">أدوات روحانية</span>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-stone-200 dark:border-slate-800 rounded-full" />
        
        {/* Compass Background */}
        <div className="absolute inset-4 border-2 border-stone-100 dark:border-slate-800/50 rounded-full" />

        {/* Compass Markings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {['ش', 'ق', 'ج', 'غ'].map((dir, i) => (
            <div 
              key={dir} 
              className="absolute font-black text-stone-400 dark:text-slate-600 text-sm"
              style={{ transform: `rotate(${i * 90}deg) translateY(-140px)` }}
            >
              {dir}
            </div>
          ))}
        </div>

        {/* Qibla Indicator */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: qiblaAngle - heading }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30 -translate-y-6">
                <Navigation className="w-6 h-6 text-white fill-current" />
             </div>
             <div className="w-1 h-full bg-primary/20 rounded-full" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900" />
          </div>
        </motion.div>

        {/* Alignment Feedback */}
        <AnimatePresence>
          {isAligned && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"
            />
          )}
        </AnimatePresence>
      </div>

      <div className={cn(
        "px-8 py-6 rounded-[2rem] border transition-all duration-500 flex flex-col items-center gap-2 ornamental-border",
        isAligned 
          ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30" 
          : "bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800"
      )}>
        <span className="text-sm font-black uppercase tracking-widest opacity-70">الحالة</span>
        <h3 className="text-2xl font-black">
          {isAligned ? 'أنت في اتجاه القبلة' : 'قم بتدوير الهاتف'}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 text-center">
          <p className="text-xs font-black text-stone-400 dark:text-slate-500 uppercase mb-1">الزاوية</p>
          <span className="text-xl font-black text-primary">{Math.round(qiblaAngle)}°</span>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 text-center">
          <p className="text-xs font-black text-stone-400 dark:text-slate-500 uppercase mb-1">الموقع</p>
          <span className="text-xl font-black text-primary">{coords ? 'محدد' : 'جاري التحديد'}</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/30 max-w-sm">
        <Info className="w-6 h-6 text-amber-600 shrink-0" />
        <p className="text-sm font-medium text-amber-900 dark:text-amber-200 leading-relaxed">
          للحصول على أفضل النتائج، ابعد الهاتف عن الأجهزة الإلكترونية والمعادن، وقم بتحريك الهاتف بشكل رقم 8 لمعايرة البوصلة.
        </p>
      </div>
    </div>
  );
}
