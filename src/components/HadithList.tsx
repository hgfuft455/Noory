import React from 'react';
import { hadiths } from '../data/hadiths';
import { MessageCircle, Quote, Star, Share2, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface HadithListProps {
  limit?: number;
}

export default function HadithList({ limit }: HadithListProps) {
  const items = limit ? hadiths.slice(0, limit) : hadiths;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black">الأحاديث النبوية</h2>
        {!limit && (
           <span className="text-sm font-bold text-stone-400">{hadiths.length} حديث</span>
        )}
      </div>

      <div className="grid gap-6">
        {items.map((hadith) => (
          <motion.div
            key={hadith.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-stone-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group ornamental-border"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Quote className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-black text-primary">عن {hadith.narrator}</h3>
                  <p className="text-xs font-bold text-stone-400 dark:text-slate-500 uppercase tracking-widest">{hadith.source}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 text-stone-400 hover:text-primary transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-800 text-stone-400 hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-right text-2xl leading-[2] font-bold text-stone-800 dark:text-slate-100 mb-8 selection:bg-primary/10 dark:selection:bg-primary/20">
              « {hadith.text} »
            </p>

            {hadith.explanation && (
              <div className="p-6 bg-stone-50 dark:bg-slate-800/50 rounded-3xl border border-stone-100 dark:border-slate-800">
                <h4 className="text-sm font-black text-primary mb-2">شرح الحديث:</h4>
                <p className="text-sm font-medium text-stone-500 dark:text-slate-400 leading-relaxed">
                  {hadith.explanation}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
