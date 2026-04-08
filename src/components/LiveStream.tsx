import React from 'react';
import { motion } from 'motion/react';
import { Video, Share2, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LiveStream() {
  return (
    <div className="space-y-10 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">البث المباشر</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">شاهد الحرم المكي والنبوي مباشرة</p>
      </div>

      <div className="grid gap-8">
        {/* Makkah Live */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden group rounded-[3rem] bg-white dark:bg-navy-900 border border-stone-200 dark:border-white/5 shadow-2xl shadow-primary/10 ornamental-border"
        >
          <div className="aspect-video relative overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/m7H_LhW9S7c?autoplay=1&mute=1" 
              title="Makkah Live"
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full" />
              مباشر الآن
            </div>
          </div>
          <div className="p-8 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-stone-800 dark:text-slate-100">قناة القرآن الكريم</h3>
              <p className="text-sm font-medium text-stone-400 dark:text-slate-500">بث مباشر من المسجد الحرام بمكة المكرمة</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-rose-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Madinah Live */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden group rounded-[3rem] bg-white dark:bg-navy-900 border border-stone-200 dark:border-white/5 shadow-2xl shadow-primary/10 ornamental-border"
        >
          <div className="aspect-video relative overflow-hidden">
             <iframe 
              src="https://www.youtube.com/embed/0S_XvX0_P6E?autoplay=0&mute=1" 
              title="Madinah Live"
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-stone-800/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              قناة السنة النبوية
            </div>
          </div>
          <div className="p-8 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-stone-800 dark:text-slate-100">قناة السنة النبوية</h3>
              <p className="text-sm font-medium text-stone-400 dark:text-slate-500">بث مباشر من المسجد النبوي بالمدينة المنورة</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-4 rounded-2xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-rose-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-10 bg-primary rounded-[3rem] text-white relative overflow-hidden group ornamental-border">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20" />
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Video className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black">بث مباشر من مكة</h3>
            <p className="text-primary/80 font-medium leading-relaxed">استمتع بمشاهدة الكعبة المشرفة والطواف في أي وقت ومن أي مكان في العالم.</p>
          </div>
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-black shadow-xl shadow-black/10 hover:scale-105 transition-transform">
            فتح في نافذة جديدة
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        {/* Decorative 3D Elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      </div>
    </div>
  );
}
