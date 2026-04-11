"use client";

import React, { useMemo } from 'react';
import { StatCard } from "@/components/shoofly/stat-card";
import { Button } from "@/components/shoofly/button";
import { StatusBadge } from "@/components/shoofly/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { listAdminTransactions, listAdminWithdrawals } from "@/lib/api/transactions";
import { useAsyncData } from "@/lib/hooks/use-async-data";
import { 
  FiPackage, 
  FiUsers, 
  FiTrendingUp, 
  FiAlertCircle,
  FiSearch,
  FiDollarSign,
  FiActivity
} from "react-icons/fi";

export default function AdminDashboardPage() {
  const { data: txs, loading: txLoading } = useAsyncData(() => listAdminTransactions(), []);
  
  // Dynamic KPIs calculations
  const platformRevenue = useMemo(() => {
    return (txs ?? []).filter((t: any) => t.type === 'ADMIN_COMMISSION')
                      .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
  }, [txs]);

  const recentTxs = useMemo(() => {
    return (txs ?? []).slice(0, 7);
  }, [txs]);

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 font-sans dir-rtl text-right pb-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 border-r-4 border-primary pr-4">وحدة التحكم المركزية (القيادة)</h1>
          <p className="text-muted text-sm mt-3 pr-4">التحكم الكلي بالعمليات الحية، السيولة النقدية، والإيرادات.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="بحث برقم المعاملة..." 
              className="pr-12 pl-4 py-3 bg-white border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* KPI Metric Grid - Neo Brutalist */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-colors" />
           <div className="flex justify-between items-start mb-4">
              <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">صافي إيرادات المنصة</p>
              <FiDollarSign className="text-emerald-400" size={24} />
           </div>
           <h2 className="text-4xl font-black font-jakarta tracking-tighter flex items-end gap-2 relative z-10">
             {txLoading ? '...' : formatCurrency(platformRevenue).split(' ')[0]} 
             <span className="text-emerald-400 text-2xl">EGP</span>
           </h2>
        </div>

        <StatCard 
          title="طلبات مالية وحوالات نشطة" 
          value={txLoading ? "..." : (txs ?? []).length} 
          trend={{ value: "مباشر", isUp: true }}
          icon={<FiActivity size={20} />}
        />
        <StatCard 
          title="النزاعات أو التذاكر" 
          value="0" 
          trend={{ value: "النظام مستقر", isUp: true }}
          icon={<FiAlertCircle size={20} className="text-emerald-500" />}
        />
        <StatCard 
          title="عقود الصيانة المنجزة" 
          value="جاري الاسترداد" 
          trend={{ value: "مزامنة...", isUp: true }}
          icon={<FiPackage size={20} />}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity Ledger */}
        <div className="lg:col-span-2 shoofly-card bg-white p-8 border-2 border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
            <h2 className="font-bold text-xl flex items-center gap-2">
               <FiTrendingUp className="text-primary" /> التدفق المالي المباشر للمنصة
            </h2>
            <Button variant="ghost" size="sm" className="font-bold text-primary">عرض السجل الكامل</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-muted text-xs uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                  <th className="py-4 px-4 pr-2 rounded-r-xl">المعاملة</th>
                  <th className="py-4 px-4">نوع التدفق</th>
                  <th className="py-4 px-4">القيمة (EGP)</th>
                  <th className="py-4 px-4 rounded-l-xl">التوقيت</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {txLoading ? (
                  <tr><td colSpan={4} className="py-10 text-center font-bold text-slate-400 animate-pulse">جاري سحب بيانات البنوك والتسوية...</td></tr>
                ) : recentTxs.length === 0 ? (
                  <tr><td colSpan={4} className="py-10 text-center font-bold text-slate-400">لا يوجد حركات مالية مسجلة بعد</td></tr>
                ) : recentTxs.map((row: any) => (
                  <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-4 font-jakarta font-bold text-slate-800">
                      TXN-{row.id}
                      <p className="text-[10px] text-slate-400 font-sans mt-1">مستخدم #{row.userId}</p>
                    </td>
                    <td className="py-5 px-4 font-bold text-slate-700">
                      {row.type === 'ADMIN_COMMISSION' ? 'عمولة أرباح' : row.type}
                    </td>
                    <td className="py-5 px-4 font-jakarta font-black text-lg text-emerald-600">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="py-5 px-4 text-muted text-xs font-jakarta">
                      {formatDate(row.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Live Feed */}
        <div className="space-y-6">
          <div className="shoofly-card bg-white p-8 border-2 border-slate-100 shadow-sm">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
              <FiActivity className="text-emerald-500" /> نبض خوادم Shoofly
            </h2>
            <div className="space-y-6">
              {[
                { label: 'استجابة السيرفرات (Latency)', value: '42ms', color: 'bg-emerald-500', width: '90%' },
                { label: 'حالة قواعد البيانات (Prisma)', value: 'مُستقرة', color: 'bg-emerald-400', width: '100%' },
                { label: 'استهلاك الذاكرة (Memory)', value: '38%', color: 'bg-amber-400', width: '38%' },
              ].map((item, i) => (
                 <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>{item.label}</span>
                    <span className="font-jakarta text-slate-500">{item.value}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shoofly-card bg-slate-900 border-4 border-slate-800 p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
               <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/30">
                 <FiAlertCircle size={24} />
               </div>
               <h3 className="font-bold text-xl mb-2">إصدار قرار تنفيذي</h3>
               <p className="text-sm opacity-60 mb-6 leading-relaxed">
                 عند الضرورة، يمكنك التدخل المباشر لإيقاف حسابات المخالفين أو التراجع عن المدفوعات بقوة الإدارة (Override).
               </p>
               <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white border-none font-bold uppercase tracking-wider h-12 rounded-xl">
                 تفعيل حالة الطوارئ
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
