import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Send, 
  FileText, 
  Settings, 
  RefreshCw, 
  Users, 
  Bell, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3,
  Zap,
  Database,
  ShieldCheck,
  ArrowUpRight,
  MessageSquare,
  History,
  BookOpen,
  Scale
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'notifications' | 'content' | 'automation' | 'updates'>('overview');

  const stats = [
    { label: 'إجمالي المستخدمين', value: '12,450', change: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'الإشعارات المرسلة', value: '850', change: '+5%', icon: Bell, color: 'text-amber-500' },
    { label: 'المحتوى الجديد', value: '42', change: '+18%', icon: FileText, color: 'text-emerald-500' },
    { label: 'وقت التشغيل', value: '99.9%', change: '0%', icon: ShieldCheck, color: 'text-indigo-500' },
  ];

  const renderOverview = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={cn("w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="text-emerald-500 text-xs font-black bg-emerald-500/10 px-3 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-[3.5rem] shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-white">نشاط المستخدمين</h3>
            <BarChart3 className="w-6 h-6 text-slate-500" />
          </div>
          <div className="h-64 flex items-end gap-4">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-xl"
              />
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span>السبت</span>
            <span>الأحد</span>
            <span>الاثنين</span>
            <span>الثلاثاء</span>
            <span>الأربعاء</span>
            <span>الخميس</span>
            <span>الجمعة</span>
          </div>
        </div>

        <div className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-[3.5rem] shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-10">آخر التحديثات</h3>
          <div className="space-y-6">
            {[
              { title: 'إضافة قصة جديدة', time: 'منذ ساعتين', user: 'أحمد علي' },
              { title: 'تحديث خوارزمية الصلاة', time: 'منذ 5 ساعات', user: 'نظام' },
              { title: 'إرسال إشعار جماعي', time: 'منذ يوم', user: 'سارة محمد' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.time} بواسطة {item.user}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-12 rounded-[4rem] shadow-2xl">
        <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
          <Send className="w-8 h-8 text-primary" />
          مرسل الإشعارات الفوري
        </h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">عنوان الإشعار</label>
            <input 
              type="text" 
              placeholder="مثال: ذكر الله حياة القلوب"
              className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">محتوى الرسالة</label>
            <textarea 
              rows={4}
              placeholder="اكتب محتوى الذكر أو التنبيه هنا..."
              className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">الفئة المستهدفة</label>
              <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none">
                <option>جميع المستخدمين</option>
                <option>المشتركون النشطون</option>
                <option>مستخدمو الأندرويد</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">نوع التنبيه</label>
              <select className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none">
                <option>ذكر (Dhikr)</option>
                <option>تنبيه صلاة</option>
                <option>تحديث نظام</option>
              </select>
            </div>
          </div>
          <button className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-4">
            <Send className="w-6 h-6" />
            إرسال الإشعار الآن
          </button>
        </div>
      </div>
    </div>
  );

  const renderContentManager = () => (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-white">إدارة المحتوى الإسلامي</h3>
        <button className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black flex items-center gap-3 shadow-lg shadow-emerald-500/20">
          <Plus className="w-5 h-5" />
          إضافة محتوى جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'قصص الأنبياء', count: 24, icon: History, color: 'text-amber-500' },
          { title: 'الأحاديث النبوية', count: 150, icon: MessageSquare, color: 'text-blue-500' },
          { title: 'موسوعة الفقه', count: 85, icon: Scale, color: 'text-rose-500' },
        ].map((cat) => (
          <div key={cat.title} className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-10 rounded-[3.5rem] shadow-2xl group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center", cat.color)}>
                <cat.icon className="w-8 h-8" />
              </div>
              <span className="text-slate-500 text-sm font-black">{cat.count} عنصر</span>
            </div>
            <h4 className="text-2xl font-black text-white mb-6">{cat.title}</h4>
            <div className="flex gap-3">
              <button className="flex-1 h-12 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black text-slate-300 transition-all">تعديل</button>
              <button className="w-12 h-12 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 transition-all">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-12 rounded-[4rem] shadow-2xl">
        <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
          <Zap className="w-8 h-8 text-amber-500" />
          التحكم في الأتمتة والخوارزميات
        </h3>
        <div className="space-y-10">
          <div className="flex items-center justify-between p-8 bg-white/5 rounded-3xl border border-white/5">
            <div>
              <h4 className="text-xl font-black text-white mb-2">خوارزمية حساب أوقات الصلاة</h4>
              <p className="text-sm text-slate-500">تعديل الطريقة المستخدمة لحساب المواقيت عالمياً</p>
            </div>
            <select className="bg-navy-900 border border-white/10 rounded-xl px-4 py-2 text-white outline-none">
              <option>رابطة العالم الإسلامي</option>
              <option>أم القرى (مكة)</option>
              <option>الهيئة المصرية العامة للمساحة</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-8 bg-white/5 rounded-3xl border border-white/5">
            <div>
              <h4 className="text-xl font-black text-white mb-2">تحديث الموقع التلقائي</h4>
              <p className="text-sm text-slate-500">تفعيل تحديث إحداثيات المستخدمين في الخلفية</p>
            </div>
            <div className="w-16 h-8 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
              <div className="w-6 h-6 bg-white rounded-full absolute left-9" />
            </div>
          </div>

          <div className="flex items-center justify-between p-8 bg-white/5 rounded-3xl border border-white/5">
            <div>
              <h4 className="text-xl font-black text-white mb-2">خادم المزامنة السحابية</h4>
              <p className="text-sm text-slate-500">حالة الاتصال بخادم مزامنة الأجهزة الذكية</p>
            </div>
            <div className="flex items-center gap-3 text-emerald-500 font-black">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              متصل
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-navy-800/50 backdrop-blur-xl border border-white/5 p-12 rounded-[4rem] shadow-2xl">
        <h3 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
          <Database className="w-8 h-8 text-indigo-500" />
          تحديثات النظام وقاعدة البيانات
        </h3>
        <div className="space-y-8">
          <div className="p-10 bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem] text-center space-y-6">
            <RefreshCw className="w-16 h-16 text-indigo-500 mx-auto animate-spin-slow" />
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">تحديث قاعدة البيانات الأوفلاين</h4>
              <p className="text-slate-400">آخر تحديث كان قبل 12 يوماً (v2.4.0)</p>
            </div>
            <button className="px-10 py-4 bg-indigo-500 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20">
              دفع تحديث جديد للجميع
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
              <h5 className="text-sm font-black text-white uppercase tracking-widest">إصدار التطبيق الحالي</h5>
              <p className="text-3xl font-black text-primary">v3.1.2</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
              <h5 className="text-sm font-black text-white uppercase tracking-widest">حجم قاعدة البيانات</h5>
              <p className="text-3xl font-black text-primary">124 MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-navy-900 border-l border-white/5 p-10 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">مركز التحكم</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">نور الهدى - أدمن</p>
            </div>
          </div>

          <nav className="space-y-4">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
              { id: 'notifications', label: 'الإشعارات', icon: Send },
              { id: 'content', label: 'إدارة المحتوى', icon: FileText },
              { id: 'automation', label: 'الأتمتة', icon: Zap },
              { id: 'updates', label: 'التحديثات', icon: Database },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={cn(
                  "w-full h-16 px-6 rounded-2xl flex items-center gap-4 font-black transition-all",
                  activeSection === item.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={onLogout}
          className="w-full h-16 rounded-2xl border border-white/5 text-slate-500 font-black hover:bg-rose-500/10 hover:text-rose-500 transition-all flex items-center justify-center gap-3"
        >
          <Settings className="w-5 h-5" />
          العودة لتجربة المستخدم
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 overflow-y-auto no-scrollbar">
        <header className="flex items-center justify-between mb-16">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">
              {activeSection === 'overview' && 'لوحة التحكم الرئيسية'}
              {activeSection === 'notifications' && 'إدارة التنبيهات'}
              {activeSection === 'content' && 'إدارة المحتوى الإسلامي'}
              {activeSection === 'automation' && 'إعدادات الأتمتة'}
              {activeSection === 'updates' && 'تحديثات النظام'}
            </h1>
            <p className="text-slate-500 font-medium">مرحباً بك مجدداً في مركز إدارة التطبيق</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="w-7 h-7 text-slate-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-navy-950 flex items-center justify-center text-[8px] font-black">3</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-slate-300" />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'notifications' && renderNotifications()}
            {activeSection === 'content' && renderContentManager()}
            {activeSection === 'automation' && renderAutomation()}
            {activeSection === 'updates' && renderUpdates()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
