import React, { useState } from 'react';
import { duas } from '../data/duas';
import { Heart, Search, Share2, Bookmark, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function DuasList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(duas.map(d => d.category)));

  const filteredDuas = duas.filter(d => 
    (d.text.includes(searchQuery) || d.category.includes(searchQuery)) &&
    (!selectedCategory || d.category === selectedCategory)
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">الأدعية المأثورة</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">أكثر من 150 دعاء من الكتاب والسنة</p>
      </div>

      <div className="relative">
        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="ابحث عن دعاء..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-[2rem] py-5 pr-14 pl-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-bold"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all",
            !selectedCategory ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-500"
          )}
        >
          الكل
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all",
              selectedCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-500"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredDuas.map((dua) => (
          <motion.div
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group ornamental-border"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
                {dua.category}
              </span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-300 hover:text-primary transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-stone-50 dark:hover:bg-slate-800 text-stone-300 hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-right text-2xl leading-[1.8] font-bold text-stone-800 dark:text-slate-100">
              {dua.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
