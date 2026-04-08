import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Search, ChevronLeft, ChevronRight, BookOpen, Info, Share2, Heart, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

interface FiqhTopic {
  id: string;
  title: string;
  category: 'العبادات' | 'المعاملات' | 'الأحوال الشخصية' | 'الجنايات';
  content: string;
  source: string;
}

const fiqhData: FiqhTopic[] = [
  {
    id: 'f1',
    title: 'أحكام الصلاة',
    category: 'العبادات',
    content: 'الصلاة هي الركن الثاني من أركان الإسلام، وهي عماد الدين، وأول ما يحاسب عليه العبد يوم القيامة. تشمل أحكام الصلاة شروط صحتها، وأركانها، وسننها، ومبطلاتها. يجب على كل مسلم بالغ عاقل أداء الصلوات الخمس في أوقاتها.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f2',
    title: 'أحكام الطهارة',
    category: 'العبادات',
    content: 'الطهارة هي مفتاح الصلاة، وتشمل أحكام الوضوء، والغسل، والتيمم، وإزالة النجاسات. لا تصح الصلاة بدون طهارة.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f3',
    title: 'أحكام الزكاة',
    category: 'العبادات',
    content: 'الزكاة هي الركن الثالث من أركان الإسلام، وهي حق معلوم في مال مخصوص لطائفة مخصوصة في وقت مخصوص. تشمل أحكام الزكاة نصاب الذهب والفضة، وعروض التجارة، وزكاة الفطر. وهي مطهرة للمال ومزكية للنفس.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f4',
    title: 'أحكام البيوع',
    category: 'المعاملات',
    content: 'البيع هو مبادلة مال بمال لتملك عين أو منفعة على التأبيد. تشمل أحكام البيوع شروط صحة البيع، وأنواع البيوع المنهي عنها كالربا والغرر. يجب أن يكون البيع قائماً على التراضي والصدق.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f5',
    title: 'أحكام الرهن',
    category: 'المعاملات',
    content: 'الرهن هو جعل عين مالية وثيقة بدين يستوفى منها أو من ثمنها إذا تعذر الوفاء. وهو من عقود التوثيقات التي تضمن الحقوق.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f6',
    title: 'أحكام النكاح',
    category: 'الأحوال الشخصية',
    content: 'النكاح هو عقد يتضمن إباحة استمتاع كل من الزوجين بالآخر على الوجه المشروع. تشمل أحكامه شروط العقد، والولي، والشهود، والمهر، وحقوق الزوجين.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f7',
    title: 'أحكام الرضاعة',
    category: 'الأحوال الشخصية',
    content: 'الرضاعة هي وصول لبن امرأة إلى جوف طفل لم يبلغ الحولين. يترتب على الرضاعة أحكام التحريم، حيث يحرم من الرضاع ما يحرم من النسب.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f8',
    title: 'أحكام القصاص',
    category: 'الجنايات',
    content: 'القصاص هو أن يفعل بالجاني مثل ما فعل بالمجني عليه. وهو من أحكام الجنايات التي تحفظ دماء الناس وأموالهم وأعراضهم.',
    source: 'الفقه الميسر'
  },
  {
    id: 'f9',
    title: 'أحكام الديات',
    category: 'الجنايات',
    content: 'الديّة هي المال الواجب بالجناية على النفس أو ما دونها. وهي بدل عن القصاص إذا عفي عنه أو تعذر استيفاؤه.',
    source: 'الفقه الميسر'
  }
];

const categories = ['الكل', 'العبادات', 'المعاملات', 'الأحوال الشخصية', 'الجنايات'];

export default function FiqhEncyclopedia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedTopic, setSelectedTopic] = useState<FiqhTopic | null>(null);

  const filteredTopics = fiqhData.filter(t => 
    (selectedCategory === 'الكل' || t.category === selectedCategory) &&
    (t.title.includes(searchTerm) || t.content.includes(searchTerm))
  );

  return (
    <div className="space-y-10 py-10 px-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary">موسوعة الفقه</h2>
        <p className="text-stone-500 dark:text-slate-400 font-medium">تعلم أحكام دينك بيسر وسهولة</p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="ابحث في الموسوعة الفقهية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-16 pr-14 pl-6 bg-white dark:bg-navy-900/50 backdrop-blur-xl rounded-[2rem] border border-stone-200 dark:border-white/5 shadow-xl shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg font-medium"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-6 py-3 rounded-full text-xs font-black transition-all whitespace-nowrap",
                    selectedCategory === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/30" 
                      : "bg-stone-100 dark:bg-white/5 text-stone-500 dark:text-slate-400"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              {filteredTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ scale: 1.01, x: -4 }}
                  onClick={() => setSelectedTopic(topic)}
                  className="p-8 bg-white dark:bg-navy-900/80 backdrop-blur-xl rounded-[2.5rem] border border-stone-200 dark:border-white/5 shadow-xl shadow-primary/5 text-right flex items-center justify-between group ornamental-border"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-stone-800 dark:text-slate-100">{topic.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-white/5 text-[10px] font-black text-stone-400 dark:text-slate-500 uppercase tracking-widest">{topic.category}</span>
                    </div>
                  </div>
                  <ChevronLeft className="w-6 h-6 text-stone-300 group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 p-4 bg-stone-100 dark:bg-white/5 rounded-2xl text-stone-500 dark:text-slate-400 font-black text-xs transition-all hover:bg-stone-200"
            >
              <ChevronRight className="w-5 h-5" />
              العودة للموسوعة
            </button>

            <div className="bg-white dark:bg-navy-900/80 backdrop-blur-xl rounded-[3rem] border border-stone-200 dark:border-white/5 shadow-2xl p-10 space-y-10 ornamental-border">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20">
                    {selectedTopic.category}
                  </span>
                  <h3 className="text-4xl font-black text-stone-800 dark:text-slate-100">{selectedTopic.title}</h3>
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

              <div className="p-8 bg-stone-50 dark:bg-white/5 rounded-[2.5rem] border border-stone-100 dark:border-white/5">
                <p className="text-2xl leading-[2] font-serif text-stone-800 dark:text-slate-100 font-bold">
                  {selectedTopic.content}
                </p>
              </div>

              <div className="flex items-center gap-3 p-6 bg-primary/5 dark:bg-primary/10 rounded-[2rem] border border-primary/20">
                <Info className="w-5 h-5 text-primary" />
                <p className="text-sm font-medium text-stone-500 dark:text-slate-400 italic">
                  المصدر: {selectedTopic.source}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
