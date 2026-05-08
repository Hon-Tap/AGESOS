"use client";
import React, { useState, useEffect } from 'react';

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

  // Fetching data from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, inqRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/inquiries') // Assuming you'll have this endpoint
        ]);
        
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setNews(newsData);
        }
        if (inqRes.ok) {
          const inqData = await inqRes.json();
          setInquiries(inqData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- DYNAMIC STATS (No longer hard-coded) ---
  const stats = {
    totalUpdates: news.length,
    unreadInquiries: inquiries.filter(i => !i.isRead).length,
    // You can derive this from unique categories or a specific field
    categoriesCount: new Set(news.map(n => n.category)).size 
  };

  return (
    // mt-20 ensures the Navbar doesn't cover the dashboard content
    <div className="flex min-h-screen bg-[#F8FAFC] mt-20">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-[#1F305E] text-white hidden lg:block fixed h-[calc(100vh-80px)] left-0 shadow-2xl z-20">
        <div className="p-8">
          <div className="mb-10">
            <p className="text-[#60A0D2] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Management</p>
            <h2 className="text-xl font-bold">Admin Console</h2>
          </div>
          
          <nav className="space-y-3">
            {[
              { id: 'overview', label: 'Dashboard', icon: '📊' },
              { id: 'news', label: 'Field Updates', icon: '📰' },
              { id: 'inquiries', label: 'Inquiries', icon: '✉️' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'news' | 'inquiries')}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === tab.id 
                  ? 'bg-[#60A0D2] text-white shadow-lg shadow-[#60A0D2]/20 translate-x-2' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </span>
                {tab.id === 'inquiries' && stats.unreadInquiries > 0 && (
                  <span className="bg-red-500 text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    {stats.unreadInquiries}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-72 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header>
                <h1 className="text-4xl font-black text-[#1F305E] mb-2">Welcome Back</h1>
                <p className="text-slate-500 font-medium">Here is what is happening with AGE South Sudan today.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#60A0D2]/5 rounded-bl-[5rem] transition-all group-hover:scale-110" />
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">Total Field Updates</p>
                  <p className="text-5xl font-black text-[#1F305E]">{stats.totalUpdates}</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[5rem]" />
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">Unread Inquiries</p>
                  <p className="text-5xl font-black text-[#60A0D2]">{stats.unreadInquiries}</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[5rem]" />
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4">Active Categories</p>
                  <p className="text-5xl font-black text-[#1F305E]">{stats.categoriesCount}</p>
                </div>
              </div>
            </div>
          )}

          {/* FIELD UPDATES (NEWS) TAB */}
          {activeTab === 'news' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-[#1F305E]">Field Updates</h1>
                  <p className="text-slate-500 text-sm mt-1">Publish news and progress reports to the Impact page.</p>
                </div>
                <button className="bg-[#1F305E] text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-[#1F305E]/20 hover:bg-[#60A0D2] transition-all transform hover:-translate-y-1">
                  + Create New Update
                </button>
              </div>

              {/* POST FORM - Matches Impact Page Fields */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#1F305E] uppercase tracking-wider ml-1">Update Title</label>
                      <input className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:border-[#60A0D2] outline-none transition-all" placeholder="e.g. 500 Kits Distributed in Juba" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#1F305E] uppercase tracking-wider ml-1">Category</label>
                      <select className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:border-[#60A0D2] outline-none transition-all appearance-none">
                        <option>Education</option>
                        <option>Health</option>
                        <option>Water</option>
                        <option>Agriculture</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <label className="text-xs font-black text-[#1F305E] uppercase tracking-wider ml-1">Publish Date</label>
                      <input type="date" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:border-[#60A0D2] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#1F305E] uppercase tracking-wider ml-1">Featured Image (URL)</label>
                      <input className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:border-[#60A0D2] outline-none" placeholder="https://..." />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#1F305E] uppercase tracking-wider ml-1">Detailed Description</label>
                    <textarea rows={4} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:bg-white focus:border-[#60A0D2] outline-none transition-all" placeholder="Describe the impact achieved..."></textarea>
                  </div>
                  
                  <button className="w-full py-5 bg-[#1F305E] text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg">
                    Publish to Website
                  </button>
                </form>
              </div>

              {/* TABLE LIST */}
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {news.length === 0 ? (
                  <div className="p-20 text-center text-slate-400 italic">No updates found in the database.</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-[#1F305E] text-[10px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="p-8">Post Details</th>
                        <th className="p-8">Category</th>
                        <th className="p-8">Status</th>
                        <th className="p-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {news.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-8">
                            <div className="font-bold text-[#1F305E]">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.date}</div>
                          </td>
                          <td className="p-8">
                            <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-8">
                            <span className="flex items-center gap-2 text-green-600 text-xs font-bold">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              {item.status}
                            </span>
                          </td>
                          <td className="p-8 text-right space-x-4">
                            <button className="text-[#60A0D2] font-black text-[10px] uppercase tracking-widest hover:underline">Edit</button>
                            <button className="text-red-400 font-black text-[10px] uppercase tracking-widest hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <header>
                <h1 className="text-3xl font-black text-[#1F305E]">Messages</h1>
                <p className="text-slate-500 text-sm mt-1">Manage communication from potential donors and volunteers.</p>
              </header>
              
              <div className="grid gap-6">
                {inquiries.length === 0 ? (
                  <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium italic">No messages received yet.</p>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className={`p-8 rounded-[2.5rem] border transition-all duration-300 ${inq.isRead ? 'bg-white border-slate-100' : 'bg-white border-[#60A0D2] shadow-xl shadow-blue-500/5'}`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${inq.isRead ? 'bg-slate-100 text-slate-400' : 'bg-[#60A0D2] text-white'}`}>
                            {inq.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-[#1F305E] text-lg">{inq.name}</h3>
                            <p className="text-sm text-[#60A0D2] font-medium">{inq.email}</p>
                          </div>
                        </div>
                        <time className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{inq.date}</time>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-8 bg-slate-50 p-6 rounded-2xl italic">
                        &quot;{inq.message}&quot;
                    </p>
                      <div className="flex gap-6">
                        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1F305E] bg-slate-100 px-6 py-2.5 rounded-xl hover:bg-[#1F305E] hover:text-white transition-all">Reply via Email</button>
                        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-all">Mark as Read</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}