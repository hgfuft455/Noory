import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Volume2, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface Notification {
  id: string;
  text: string;
  type: 'dhikr' | 'alert';
}

const dhikrs = [
  'سُبْحَانَ اللَّهِ',
  'الْحَمْدُ لِلَّهِ',
  'لَا إِلَهَ إِلَّا اللَّهُ',
  'اللَّهُ أَكْبَرُ',
  'أَسْتَغْفِرُ اللَّهَ',
  'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
  'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
  'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ'
];

export default function SmartNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const triggerNotification = () => {
      const randomDhikr = dhikrs[Math.floor(Math.random() * dhikrs.length)];
      const id = Math.random().toString(36).substr(2, 9);
      
      setNotification({ id, text: randomDhikr, type: 'dhikr' });

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotification(prev => prev?.id === id ? null : prev);
      }, 5000);
    };

    // Initial delay then repeat every 30-60 seconds
    const initialTimer = setTimeout(triggerNotification, 10000);
    const interval = setInterval(triggerNotification, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.9 }}
          className="fixed top-6 left-6 right-6 z-[100] flex justify-center pointer-events-none"
        >
          <div className="w-full max-w-md glass-dark backdrop-blur-2xl rounded-[2rem] p-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 pointer-events-auto ornamental-border">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">تذكير إيماني</p>
              <p className="text-xl font-bold text-white truncate font-serif">{notification.text}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    className="stroke-white/10 fill-none"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="18"
                    className="stroke-primary fill-none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "113 113", strokeDashoffset: 113 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-0.5 items-end h-3">
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-primary" />
                    <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 bg-primary" />
                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-primary" />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="p-2 text-white/40 hover:text-primary transition-colors pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
