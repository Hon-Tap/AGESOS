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
  Loader2,
  X,
  Send
} from 'lucide-react';

// --- TYPES ---
type TabId = 'overview' | 'news' | 'inquiries';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
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

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: 'General', description: '', status: 'Published' });

  const navigation: NavItem[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Field Updates', icon: Newspaper },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [newsRes, inqRes] = await Promise.allSettled([
          fetch('/api/news'),
          fetch('/api/inquiries')
        ]);

        if (newsRes.status === 'fulfilled' && newsRes.value.ok) {
          setNews(await newsRes.value.json());
        }

        if (inqRes.status === 'fulfilled' && inqRes.value.ok) {
          setInquiries(await inqRes.value.json());
        } else {
          setInquiries([]); 
        }
      } catch (err) {
        setError("Database sync failed. Check your connection.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => ({
    totalUpdates: news?.length || 0,
    unreadInquiries: (inquiries || []).filter(i => !i?.isRead).length,
    categoriesCount: news?.length ? new Set(news.map(n => n.category)).size : 0 
  }), [news, inquiries]);

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const mockNewEntry: NewsItem = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      status: newPost.status as "Published" | "Draft"
    };
    setNews([mockNewEntry, ...news]);
    setIsAddingNews(false);
    setNewPost({ title: '', category: 'General', description: '', status: 'Published' });
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-[#1F305E]">Sync Error</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-[#1F305E] text-white px-8 py-3 rounded-xl font-bold">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR (Fixed and Type-Safe) --- */}
      <aside className="w-64 bg-[#1F305E] text-white hidden lg:flex flex-col fixed h-full left-0 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#60A0D2] rounded-xl flex items-center justify-center font-black text-white">A</div>
            <div>
              <h2 className="text-md font-bold leading-tight">AGE Admin</h2>
              <p className="text-[#60A0D2] text-[9px] font-black uppercase tracking-tighter">South Sudan Operations</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { 
                  setActiveTab(tab.id); // No more "as any" red line!
                  setIsAddingNews(false); 
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                  activeTab === tab.id ? 'bg-[#60A0D2] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-5 h-5" />
                  <span className="font-bold text-sm">{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT (With margin to prevent overlap) --- */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-10 max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[80vh]">
              <Loader2 className="w-10 h-10 animate-spin text-[#60A0D2] mb-4" />
              <p className="text-slate-500 font-bold">Synchronizing with Server...</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* DASHBOARD OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <header>
                    <h1 className="text-4xl font-black text-[#1F305E] tracking-tight">Console Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time metrics for field operations.</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <Newspaper className="text-blue-500 mb-4 w-8 h-8" />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Updates</p>
                      <h3 className="text-4xl font-black text-[#1F305E] mt-1">{stats.totalUpdates}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <Mail className="text-red-500 mb-4 w-8 h-8" />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Unread Messages</p>
                      <h3 className="text-4xl font-black text-[#1F305E] mt-1">{stats.unreadInquiries}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <LayoutDashboard className="text-green-500 mb-4 w-8 h-8" />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Sectors</p>
                      <h3 className="text-4xl font-black text-[#1F305E] mt-1">{stats.categoriesCount}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* FIELD UPDATES & FORM */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-3xl font-black text-[#1F305E]">Field Updates</h1>
                      <p className="text-slate-500 text-sm font-medium">Manage public-facing reports and news.</p>
                    </div>
                    {!isAddingNews && (
                      <button 
                        onClick={() => setIsAddingNews(true)}
                        className="bg-[#1F305E] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#60A0D2] transition-colors shadow-lg shadow-blue-900/10"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Create Entry
                      </button>
                    )}
                  </div>

                  {isAddingNews ? (
                    <div className="bg-white rounded-3xl border-2 border-[#60A0D2] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h2 className="text-xl font-black text-[#1F305E]">New Sector Update</h2>
                          <p className="text-slate-400 text-xs font-bold uppercase">South Sudan Operations</p>
                        </div>
                        <button onClick={() => setIsAddingNews(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                          <X className="w-6 h-6 text-slate-400" />
                        </button>
                      </div>
                      <form onSubmit={handleAddNews} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Headline</label>
                            <input 
                              required
                              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 ring-[#60A0D2] outline-none font-bold text-[#1F305E]"
                              placeholder="e.g. Humanitarian Logistics Update"
                              value={newPost.title}
                              onChange={e => setNewPost({...newPost, title: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Sector Category</label>
                            <select 
                              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 ring-[#60A0D2] outline-none font-bold text-[#1F305E]"
                              value={newPost.category}
                              onChange={e => setNewPost({...newPost, category: e.target.value})}
                            >
                              <option>General</option>
                              <option>Healthcare</option>
                              <option>Education</option>
                              <option>Infrastructure</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Report Content</label>
                          <textarea 
                            required
                            rows={5}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 ring-[#60A0D2] outline-none font-medium text-slate-700"
                            placeholder="Describe the update in detail..."
                            value={newPost.description}
                            onChange={e => setNewPost({...newPost, description: e.target.value})}
                          />
                        </div>
                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                          <button type="button" onClick={() => setIsAddingNews(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600">Discard Draft</button>
                          <button type="submit" className="bg-[#1F305E] text-white px-10 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#60A0D2] transition-all shadow-lg">
                            <Send className="w-4 h-4" />
                            Submit Update
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[#1F305E] text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-5">Entry Details</th>
                            <th className="px-6 py-5">Sector</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {news.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 group transition-colors">
                              <td className="px-6 py-5">
                                <p className="font-bold text-[#1F305E] text-sm">{item.title}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{item.date}</p>
                              </td>
                              <td className="px-6 py-5">
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-tighter">
                                  {item.category}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase">
                                  <CheckCircle2 className="w-4 h-4" />
                                  {item.status}
                                </div>
                              </td>
                              <td className="px-6 py-5 text-right">
                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 text-slate-400 hover:text-[#60A0D2]"><Edit3 className="w-4 h-4" /></button>
                                  <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* INQUIRIES LIST */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <header>
                    <h1 className="text-3xl font-black text-[#1F305E]">Inbox</h1>
                    <p className="text-slate-500 text-sm font-medium">Direct communication from portal visitors.</p>
                  </header>
                  <div className="space-y-4">
                    {inquiries.length === 0 ? (
                      <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-slate-200">
                        <Mail className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold">Inbox is currently empty.</p>
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div key={inq.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#60A0D2] text-white flex items-center justify-center font-black text-sm">
                              {inq.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1F305E] text-base leading-tight">{inq.name}</h4>
                              <p className="text-xs text-[#60A0D2] font-bold">{inq.email}</p>
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm italic truncate max-w-sm ml-4">&ldquo;{inq.message}&rdquo;</p>
                          <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-slate-300 uppercase">{inq.date}</span>
                            <button className="bg-[#1F305E] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-[#60A0D2] transition-all shadow-md">Open</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>
      </main>
    </div>
  );
}