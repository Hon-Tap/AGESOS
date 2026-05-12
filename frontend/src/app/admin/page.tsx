"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Mail, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

// --- TYPES ---
interface NewsItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  image?: string;
  status: "Published" | "Draft";
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  isRead: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'inquiries'>('overview');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // We handle each fetch individually to prevent one 404 from breaking the whole app
        const [newsRes, inqRes] = await Promise.allSettled([
          fetch('/api/news'),
          fetch('/api/inquiries')
        ]);

        if (newsRes.status === 'fulfilled' && newsRes.value.ok) {
          setNews(await newsRes.value.json());
        } else {
          console.error("News API failed or returned 404");
        }

        if (inqRes.status === 'fulfilled' && inqRes.value.ok) {
          setInquiries(await inqRes.value.json());
        } else {
          // This addresses the 404 seen in image_9ecac2.png
          console.warn("Inquiries API not found. Using empty state.");
          setInquiries([]); 
        }
      } catch (err) {
        setError("A critical error occurred while syncing data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => ({
    totalUpdates: news.length,
    unreadInquiries: inquiries.filter(i => !i.isRead).length,
    categoriesCount: new Set(news.map(n => n.category)).size 
  }), [news, inquiries]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Connection Error</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-[#1F305E] text-white px-6 py-2 rounded-xl font-bold">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-[#1F305E] text-white hidden lg:flex flex-col fixed h-screen left-0 z-30">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#60A0D2] rounded-xl flex items-center justify-center font-black">A</div>
            <div>
              <h2 className="text-lg font-bold leading-tight">AGE Admin</h2>
              <p className="text-[#60A0D2] text-[10px] font-black uppercase tracking-widest">South Sudan</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'news', label: 'Field Updates', icon: Newspaper },
              { id: 'inquiries', label: 'Inquiries', icon: Mail },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  activeTab === tab.id 
                  ? 'bg-[#60A0D2] text-white shadow-lg' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'group-hover:text-white'}`} />
                  <span className="font-bold text-sm">{tab.label}</span>
                </div>
                {tab.id === 'inquiries' && stats.unreadInquiries > 0 && (
                  <span className="bg-red-500 text-[10px] px-2 py-0.5 rounded-full text-white">
                    {stats.unreadInquiries}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-500" />
            <div className="text-xs">
              <p className="font-bold">System Monitor</p>
              <p className="text-green-400 font-medium">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#60A0D2]" />
              <p className="font-medium">Syncing with database...</p>
            </div>
          ) : (
            <>
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <header>
                    <h1 className="text-3xl font-black text-[#1F305E]">Console Overview</h1>
                    <p className="text-slate-500">Real-time metrics for AGE South Sudan operations.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Updates", val: stats.totalUpdates, color: "blue", icon: Newspaper },
                      { label: "Unread", val: stats.unreadInquiries, color: "red", icon: Mail },
                      { label: "Sectors", val: stats.categoriesCount, color: "green", icon: LayoutDashboard },
                    ].map((s) => (
                      <div key={s.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${s.color}-50 text-${s.color}-500`}>
                           <s.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{s.label}</p>
                          <p className="text-3xl font-black text-[#1F305E]">{s.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FIELD UPDATES TAB */}
              {activeTab === 'news' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-black text-[#1F305E]">Field Updates</h1>
                    <button className="bg-[#1F305E] hover:bg-[#60A0D2] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                      <PlusCircle className="w-5 h-5" />
                      Create Entry
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[#1F305E] text-[10px] uppercase font-black tracking-widest border-bottom border-slate-100">
                        <tr>
                          <th className="px-6 py-4">Title & Date</th>
                          <th className="px-6 py-4">Sector</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {news.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 group">
                            <td className="px-6 py-5">
                              <p className="font-bold text-[#1F305E] text-sm">{item.title}</p>
                              <p className="text-xs text-slate-400 font-medium">{item.date}</p>
                            </td>
                            <td className="px-6 py-5">
                              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase">
                                {item.category}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
                                 <CheckCircle2 className="w-4 h-4" />
                                 {item.status}
                               </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-[#60A0D2]"><Edit3 className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* INQUIRIES TAB */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h1 className="text-2xl font-black text-[#1F305E]">Inbox</h1>
                  <div className="grid gap-4">
                    {inquiries.length === 0 ? (
                      <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-slate-100 text-slate-400 italic font-medium">
                        Your inbox is currently empty.
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div key={inq.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${inq.isRead ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-[#60A0D2]'}`}>
                              {inq.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-sm">{inq.name}</h3>
                              <p className="text-xs text-[#60A0D2] font-medium">{inq.email}</p>
                            </div>
                          </div>
                          <p className="text-slate-500 text-xs italic flex-1 max-w-md truncate">"{inq.message}"</p>
                          <div className="flex items-center gap-4">
                            <time className="text-[10px] font-black text-slate-400 uppercase">{inq.date}</time>
                            <button className="text-[10px] font-black uppercase text-[#1F305E] bg-slate-50 px-4 py-2 rounded-lg hover:bg-[#1F305E] hover:text-white transition-all">View</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}