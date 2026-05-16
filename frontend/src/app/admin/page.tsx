"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Newspaper, Mail, PlusCircle, 
  Trash2, Edit3, AlertCircle, Loader2, ArrowLeft, 
  Save, ExternalLink, Database, RefreshCw, Layers, Lock, ChevronRight
} from 'lucide-react';

// --- TYPES & INTERFACES ---
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
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Core Functional States
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<NewsItem>>({
    title: '', category: 'General', description: '', status: 'Published'
  });

  const navigation = [
    { id: 'overview', label: 'Console Overview', icon: LayoutDashboard },
    { id: 'news', label: 'Field Updates', icon: Newspaper },
    { id: 'inquiries', label: 'Inbox Inquiries', icon: Mail },
  ];

  // --- DATA FULFILLMENT HANDLER ---
  const fetchData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    setError(null);
    try {
      const [newsRes, inqRes] = await Promise.allSettled([
        fetch('/api/news'),
        fetch('/api/inquiries')
      ]);

      if (newsRes.status === 'fulfilled' && newsRes.value.ok) {
        const newsData = await newsRes.value.json();
        setNews(Array.isArray(newsData) ? newsData : []);
      } else {
        console.warn("News source uninitialized or returning mock states.");
        setNews([]); 
      }

      if (inqRes.status === 'fulfilled' && inqRes.value.ok) {
        const inqData = await inqRes.value.json();
        setInquiries(Array.isArray(inqData) ? inqData : []);
      } else {
        console.warn("Inquiries data channel inactive.");
        setInquiries([]);
      }
    } catch (err) {
      setError("Unable to confirm safe endpoint synchronization.");
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const triggerSyncRefresh = () => {
    setIsSyncing(true);
    fetchData(true);
  };

  const stats = useMemo(() => ({
    totalUpdates: news.length,
    unreadInquiries: inquiries.filter(i => !i.isRead).length,
    categoriesCount: new Set(news.map(n => n.category)).size 
  }), [news, inquiries]);

  // --- AUTHENTICATION HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (email === 'info@agesos.org' && password === 'AGE-admin-26') {
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid security credentials provided.');
    }
  };

  // --- PERSISTENCE HANDLERS ---
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
        await fetchData(true);
        setIsEditing(false);
        setCurrentPost({ title: '', category: 'General', description: '', status: 'Published' });
      } else {
        throw new Error();
      }
    } catch (err) {
      setError("Database target structurally unavailable. Connect Vercel tables to save.");
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this update?")) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNews(prev => prev.filter(n => n.id !== id));
      } else {
        throw new Error();
      }
    } catch (err) {
      setError("Execution denied. Schema configuration required.");
    }
  };

  if (isLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950">
      <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
      <p className="mt-4 text-sm font-medium text-slate-400">Loading Dashboard...</p>
    </div>
  );

  // SECURITY LOGIN INTERFACE SCOPE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 pt-[120px]">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-500" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-4 border border-sky-500/20">
              <Lock className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            <p className="text-sm text-slate-400 mt-1">Sign in to manage AGESOS platforms</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agesos.org"
                className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm font-medium text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Password</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-sm font-medium text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-[0.98] mt-2"
            >
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // SYSTEM WORKSPACE CONTENT SCOPE
  return (
    // Increased pt-[120px] to ensure it completely clears the external global header. 
    // box-border ensures the padding is calculated within the 100vh height.
    <div className="flex h-screen box-border pt-[120px] bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION UNIT */}
      <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col z-40 justify-between shrink-0">
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-sky-600/20">
              AG
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AGESOS Hub</h2>
              <p className="text-sky-400 text-[11px] font-medium">Workspace</p>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as TabId); setIsEditing(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeTab === item.id 
                      ? 'bg-sky-600 text-white font-medium shadow-md shadow-sky-600/10' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <IconComponent className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.id === 'inquiries' && stats.unreadInquiries > 0 && (
                    <span className="bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {stats.unreadInquiries}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONNECTION MONITOR MODULE */}
        <div className="p-4 m-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Database className="w-4 h-4 text-emerald-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse border-2 border-slate-900"></span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-300">Data Connected</p>
            </div>
          </div>
          <button 
            onClick={triggerSyncRefresh}
            disabled={isSyncing}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </aside>

      {/* CORE FRAMEWORK WORKSPACE */}
      <main className="flex-1 overflow-y-auto bg-slate-900 relative">
        <div className="p-8 max-w-6xl mx-auto pb-24">
          
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" /> 
              <span>{error}</span>
            </div>
          )}

          {/* 1. OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, Admin</h1>
                <p className="text-sm text-slate-400 mt-1">Here is the current status of your platform data.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Clickable Card: Field Updates */}
                <button 
                  onClick={() => setActiveTab('news')}
                  className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden group hover:border-sky-500/50 hover:bg-slate-900 transition-all text-left flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center mb-4 border border-sky-500/20 text-sky-400">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-1">{stats.totalUpdates}</h3>
                  <div className="flex items-center justify-between w-full mt-1">
                    <p className="text-sm font-medium text-slate-400">Field Deployments</p>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  </div>
                </button>

                {/* Clickable Card: Inquiries */}
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden group hover:border-rose-500/50 hover:bg-slate-900 transition-all text-left flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4 border border-rose-500/20 text-rose-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-1">{stats.unreadInquiries}</h3>
                  <div className="flex items-center justify-between w-full mt-1">
                    <p className="text-sm font-medium text-slate-400">Pending Inquiries</p>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" />
                  </div>
                </button>

                {/* Static Card: Sectors */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col items-start">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 border border-violet-500/20 text-violet-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mt-1">{stats.categoriesCount}</h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">Sectors Evaluated</p>
                </div>
              </div>

              {/* EMPTY LIVE TELEMETRY LOG STATE */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 border border-slate-800">
                  <Database className="w-8 h-8 text-slate-500" />
                </div>
                <h4 className="text-base font-semibold text-slate-200">Database Schema Ready</h4>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
                  System handling operations safely. Generated tables and telemetry logs will display here once active.
                </p>
              </div>
            </div>
          )}

          {/* 2. FIELD UPDATES VIEW */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">Field Updates</h1>
                  <p className="text-sm text-slate-400 mt-1">Manage, dispatch, and edit organizational news.</p>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-600/20"
                  >
                    <PlusCircle className="w-4 h-4" /> Create Update
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors w-fit"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                  </button>
                  <form onSubmit={handleSaveNews} className="space-y-6">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Headline Title</label>
                      <input 
                        className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all"
                        value={currentPost.title}
                        onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                        placeholder="e.g. New Water Wells Completed in Fangak"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Category</label>
                      <select 
                        className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm text-white outline-none focus:border-sky-500"
                        value={currentPost.category}
                        onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                      >
                        <option value="Water">Water</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Description / Content</label>
                      <textarea 
                        rows={6}
                        className="w-full bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all resize-y"
                        value={currentPost.description}
                        onChange={e => setCurrentPost({...currentPost, description: e.target.value})}
                        placeholder="Enter the full update details here..."
                        required
                      />
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-800">
                      <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-sky-600/20">
                        <Save className="w-4 h-4" /> Save Publish Entry
                      </button>
                    </div>
                  </form>
                </div>
              ) : news.length > 0 ? (
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-900/50 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-6 py-5">Article Overview</th>
                          <th className="px-6 py-5">Category</th>
                          <th className="px-6 py-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {news.map(item => (
                          <tr key={item.id} className="hover:bg-slate-900/40 transition-colors group">
                            <td className="px-6 py-4">
                              <p className="font-bold text-slate-100 text-sm group-hover:text-sky-400 transition-colors">{item.title}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                            </td>
                            <td className="px-6 py-4">
                               <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                                 {item.category}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => { setCurrentPost(item); setIsEditing(true); }} 
                                  className="p-2.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-slate-700"
                                  title="Edit Update"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => deleteNews(item.id)} 
                                  className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-slate-700"
                                  title="Delete Update"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 border border-slate-800">
                    <Newspaper className="w-8 h-8 text-slate-600" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-200">No Updates Published</h4>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm">You haven&apos;t posted any field updates yet. Click &apos;Create Update&apos; to add your first post.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. INQUIRIES VIEW */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="text-3xl font-bold text-white">Inbox Inquiries</h1>
                <p className="text-sm text-slate-400 mt-1">Read and respond to messages submitted via the contact form.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {inquiries.length > 0 ? inquiries.map(inq => (
                  <div key={inq.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-700 transition-colors shadow-sm">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center font-bold text-lg shrink-0 mt-1">
                        {inq.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-white text-base truncate">{inq.name}</h4>
                          <span className="text-xs font-medium text-slate-500 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">{inq.date}</span>
                        </div>
                        <a href={`mailto:${inq.email}`} className="text-sm text-sky-400 hover:text-sky-300 transition-colors inline-block mb-2">
                          {inq.email}
                        </a>
                        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                          &quot;{inq.message}&quot;
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 self-start sm:self-center">
                      <a 
                        href={`mailto:${inq.email}`} 
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        Reply <ExternalLink className="w-4 h-4 text-slate-400" />
                      </a>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 border border-slate-800">
                      <Mail className="w-8 h-8 text-slate-600" />
                    </div>
                    <h4 className="text-base font-semibold text-slate-200">Inbox is empty</h4>
                    <p className="text-sm text-slate-400 mt-2 max-w-sm">No new inquiries from the public at this time.</p>
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