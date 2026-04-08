import React, { useState, useEffect } from 'react';
import { Search, Book, ChevronLeft, ChevronRight, List, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Surah, Ayah } from '../types';

interface QuranReaderProps {
  isKufi: boolean;
  setIsKufi: (val: boolean) => void;
  isDarkMode: boolean;
  fontSize: number;
}

export default function QuranReader({ isKufi, setIsKufi, isDarkMode, fontSize }: QuranReaderProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'surah' | 'juz' | 'wird'>('surah');

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  const fetchSurah = async (number: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}`);
      const data = await res.json();
      setAyahs(data.data.ayahs);
      setSelectedSurah(surahs.find(s => s.number === number) || null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWird = async () => {
    setLoading(true);
    try {
      // Randomly pick a Juz for the wird
      const randomJuz = Math.floor(Math.random() * 30) + 1;
      const res = await fetch(`https://api.alquran.cloud/v1/juz/${randomJuz}/ar.alafasy`);
      const data = await res.json();
      setAyahs(data.data.ayahs);
      setSelectedSurah({
        number: 0,
        name: `الورد اليومي - الجزء ${randomJuz}`,
        englishName: `Daily Wird - Juz ${randomJuz}`,
        numberOfAyahs: data.data.ayahs.length,
        revelationType: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.name.includes(searchQuery) || s.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedSurah) {
    return (
      <div className={cn(
        "min-h-screen -mx-6 -mt-8 p-6 space-y-10 transition-colors duration-500",
        isDarkMode ? "paper-texture-dark" : "paper-texture"
      )}>
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-navy-900/80 backdrop-blur-md -mx-6 px-6 py-4 border-b border-stone-200 dark:border-white/5 flex items-center justify-between">
          <button 
            onClick={() => setSelectedSurah(null)}
            className="p-3 rounded-2xl bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className={cn("text-3xl font-black text-primary", isKufi && "font-kufi")}>{selectedSurah.name}</h2>
            <p className="text-[10px] text-stone-400 dark:text-slate-500 font-black uppercase tracking-widest">{selectedSurah.englishName}</p>
          </div>
          <button 
            onClick={() => setIsKufi(!isKufi)}
            className={cn(
              "px-4 py-2 rounded-xl transition-all font-kufi font-bold text-xs",
              isKufi ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-stone-100 dark:bg-white/5"
            )}
          >
            كوفي
          </button>
        </div>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-stone-200/50 dark:bg-white/5 rounded-[3rem]" />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-12 pb-32">
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && selectedSurah.number !== 0 && (
              <div className={cn(
                "text-center py-12 text-4xl text-primary/90",
                isKufi ? "font-kufi" : "font-serif"
              )}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            {ayahs.map((ayah) => (
              <motion.div 
                key={ayah.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -right-4 top-0 bottom-0 w-1 bg-primary/10 rounded-full group-hover:bg-primary/30 transition-colors" />
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex items-center justify-center font-black text-sm border border-primary/20 shadow-sm">
                        {ayah.numberInSurah}
                      </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest border border-stone-200 dark:border-white/5">
                      جزء {ayah.juz} • صفحة {ayah.page}
                    </div>
                  </div>
                  <p className={cn(
                    "text-right leading-[2.2] text-stone-800 dark:text-slate-100 selection:bg-primary/10 dark:selection:bg-primary/20",
                    isKufi ? "font-kufi" : "font-serif"
                  )} style={{ fontSize: `${fontSize}px` }}>
                    {ayah.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Floating Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-2 bg-white/80 dark:bg-navy-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-stone-200 dark:border-white/10 shadow-2xl">
          <button className="px-6 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-white/5 text-stone-500 dark:text-slate-400 font-black text-xs transition-all">
            ترجمة
          </button>
          <div className="w-px h-6 bg-stone-200 dark:bg-white/10" />
          <button className="px-6 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-white/5 text-stone-500 dark:text-slate-400 font-black text-xs transition-all">
            تفسير
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200 dark:border-slate-800">
        <button 
          onClick={() => setViewMode('surah')}
          className={cn(
            "flex-1 py-3 rounded-2xl font-black transition-all",
            viewMode === 'surah' ? "bg-primary text-white" : "text-stone-400"
          )}
        >
          السور
        </button>
        <button 
          onClick={() => setViewMode('wird')}
          className={cn(
            "flex-1 py-3 rounded-2xl font-black transition-all",
            viewMode === 'wird' ? "bg-primary text-white" : "text-stone-400"
          )}
        >
          الورد اليومي
        </button>
      </div>

      {viewMode === 'wird' ? (
        <div className="text-center py-12 space-y-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Book className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black">الورد اليومي</h2>
            <p className="text-stone-500 dark:text-slate-400 font-medium">نظام تقسيم القرآن لمساعدتك على الختم</p>
          </div>
          <button 
            onClick={fetchWird}
            className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
          >
            ابدأ ورد اليوم
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-[2rem] py-5 pr-14 pl-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
            />
          </div>

          <div className="grid gap-4">
            {filteredSurahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => fetchSurah(surah.number)}
                className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group ornamental-border"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-stone-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xl text-stone-400 group-hover:text-primary transition-colors">
                    {surah.number}
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-black mb-1">{surah.name}</h3>
                    <p className="text-stone-500 dark:text-slate-400 text-sm font-medium">{surah.numberOfAyahs} آية • {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
                  </div>
                </div>
                <ChevronLeft className="w-6 h-6 text-stone-300 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
