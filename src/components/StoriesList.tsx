import React from 'react';
import { prophetStories } from '../data/prophets';
import { User, ChevronLeft, BookOpen, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface StoriesListProps {
  limit?: number;
}

export default function StoriesList({ limit }: StoriesListProps) {
  const stories = limit ? prophetStories.slice(0, limit) : prophetStories;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black">قصص الأنبياء</h2>
        {!limit && (
           <span className="text-sm font-bold text-stone-400">{prophetStories.length} قصة</span>
        )}
      </div>

      <div className="grid gap-6">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-stone-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group ornamental-border"
          >
            <div className="h-32 bg-primary relative overflow-hidden">
               <div className="absolute inset-0 bg-black/20" />
               <img src={`https://picsum.photos/seed/${story.id}/800/400`} alt={story.name} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
               <div className="absolute bottom-6 right-8">
                  <h3 className="text-2xl font-black text-white">{story.name}</h3>
               </div>
            </div>
            
            <div className="p-8">
              <p className="text-stone-600 dark:text-slate-300 leading-relaxed mb-8 line-clamp-3 font-medium">
                {story.story}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {story.lessons.map((lesson, i) => (
                  <span key={i} className="px-4 py-2 bg-stone-50 dark:bg-slate-800 rounded-full text-xs font-bold text-stone-500 dark:text-slate-400 border border-stone-100 dark:border-slate-700">
                    {lesson}
                  </span>
                ))}
              </div>

              <button className="w-full py-4 bg-primary/10 text-primary rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary/20 transition-all">
                <BookOpen className="w-5 h-5" />
                <span>اقرأ القصة كاملة</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
