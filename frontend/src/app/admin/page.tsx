"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Newspaper, Mail, PlusCircle, 
  Trash2, Edit3, CheckCircle2, AlertCircle,
  Loader2, ArrowLeft, Save, ExternalLink
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<NewsItem>>({
    title: '', category: 'General', description: '', status: 'Published'
  });

  const navigation = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Field Updates', icon: Newspaper },
    { id: 'inquiries', label: 'Inquiries', icon: Mail },
  ];

  // --- DATA FETCHING ---
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetching individually to handle partial failures
      const newsRes = await fetch('/api/news');
      const inqRes = await fetch('/api/inquiries');

      if (newsRes.ok) {
        setNews(await newsRes.json());
      } else {
        console.error("Failed to load news");
      }

      if (inqRes.ok) {
        setInquiries(await inqRes.json());
      } else {
        console.error("Failed to load inquiries");
      }
    } catch (err) {
      setError("System connection error. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = useMemo(() => ({
    totalUpdates: news.length,
    unreadInquiries: inquiries.filter(i => !i.isRead).length,
    categoriesCount: new Set(news.map(n => n.category)).size 
  }), [news, inquiries]);

  // --- HANDLERS ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentPost.id ? 'PUT' : 'POST';
    const endpoint = currentPost.id ? `/api/news/${currentPost.id}` : '/api/news';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost),
      });

      if (res.ok) {
        await fetchData(); // Refresh list
        setIsEditing(false);
        setCurrentPost({ title: '', category: 'General', description: '', status: 'Published' });
      }
    } catch (err) {
      alert("Error saving news feed.");
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Permanently delete this update?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) setNews(news.filter(n => n.id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (isLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-12 h-12 animate-spin text-[#60A0D2]" />
      <p className="mt-4 font-bold text-[#1F305E]">Accessing Command Center...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1F305E] text-white flex flex-col z-50 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-[#60A0D2] to-blue-600 rounded-xl flex items-center justify-center font-black shadow-lg">A</div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-tight">AGE Admin</h2>
              <p className="text-[#60A0D2] text-[8px] font-black tracking-[0.2em]">MANAGEMENT</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabId); setIsEditing(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                  activeTab === item.id ? 'bg-[#60A0D2] text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-10 max-w-6xl mx-auto">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-bold text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10">
                <h1 className="text-4xl font-black text-[#1F305E]">Console Overview</h1>
                <p className="text-slate-500">Global metrics and status reports.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <Newspaper className="w-8 h-8 text-blue-500 mb-6" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Field Updates</p>
                  <h3 className="text-5xl font-black text-[#1F305E]">{stats.totalUpdates}</h3>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <Mail className="w-8 h-8 text-red-500 mb-6" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Inquiries</p>
                  <h3 className="text-5xl font-black text-[#1F305E]">{stats.unreadInquiries}</h3>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <LayoutDashboard className="w-8 h-8 text-green-500 mb-6" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sectors Tracked</p>
                  <h3 className="text-5xl font-black text-[#1F305E]">{stats.categoriesCount}</h3>
                </div>
              </div>
            </div>
          )}

          {/* NEWS MANAGEMENT TAB */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-[#1F305E]">News Feed</h1>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="bg-[#1F305E] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#60A0D2] transition-all shadow-lg">
                    <PlusCircle className="w-5 h-5" /> Create Update
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="bg-white p-8 rounded-3xl border-2 border-[#60A0D2] shadow-2xl animate-in zoom-in-95">
                  <button onClick={() => setIsEditing(false)} className="mb-6 text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Cancel and Return
                  </button>
                  <form onSubmit={handleSaveNews} className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Headline</label>
                      <input 
                        className="w-full bg-slate-50 p-4 rounded-xl font-bold outline-none ring-[#60A0D2] focus:ring-2"
                        value={currentPost.title}
                        onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Sector</label>
                      <select 
                        className="w-full bg-slate-50 p-4 rounded-xl font-bold outline-none"
                        value={currentPost.category}
                        onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                      >
                        <option value="Water">Water</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Content</label>
                      <textarea 
                        rows={6}
                        className="w-full bg-slate-50 p-4 rounded-xl outline-none ring-[#60A0D2] focus:ring-2"
                        value={currentPost.description}
                        onChange={e => setCurrentPost({...currentPost, description: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button type="submit" className="bg-[#1F305E] text-white px-10 py-4 rounded-xl font-black flex items-center gap-2 shadow-lg">
                        <Save className="w-5 h-5" /> Commit Update
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <tr>
                        <th className="px-8 py-5">Article</th>
                        <th className="px-8 py-5">Sector</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {news.map(item => (
                        <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-bold text-[#1F305E]">{item.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</p>
                          </td>
                          <td className="px-8 py-6">
                             <span className="px-3 py-1 bg-blue-50 text-[#60A0D2] rounded-full text-[10px] font-black uppercase">{item.category}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setCurrentPost(item); setIsEditing(true); }} className="p-2 text-slate-400 hover:text-[#60A0D2] hover:bg-white rounded-lg transition-all"><Edit3 className="w-4 h-4" /></button>
                              <button onClick={() => deleteNews(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
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

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-black text-[#1F305E]">Inbox</h1>
              <div className="grid grid-cols-1 gap-4">
                {inquiries.length > 0 ? inquiries.map(inq => (
                  <div key={inq.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-[#60A0D2]/10 text-[#60A0D2] flex items-center justify-center font-black">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1F305E]">{inq.name}</h4>
                        <p className="text-xs text-[#60A0D2] font-bold">{inq.email}</p>
                      </div>
                      <div className="ml-8 flex-1 max-w-lg">
                         <p className="text-slate-500 text-sm truncate font-medium">"{inq.message}"</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-slate-300 uppercase">{inq.date}</span>
                      <a href={`mailto:${inq.email}`} className="bg-[#1F305E] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
                        Reply <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <Mail className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No inquiries received yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}