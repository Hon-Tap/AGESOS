"use client";
import React, { useState } from 'react';

// --- TYPES ---
interface NewsItem {
  id: string;
  title: string;
  category: string;
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
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'inquiries'>('overview');
  
  // Mock Data (To be replaced by your database fetch)
  const [news, setNews] = useState<NewsItem[]>([
    { id: "1", title: "Clean Water in Lakes State", category: "Water", date: "2024-05-10", status: "Published" },
    { id: "2", title: "Classroom Block Completed", category: "Education", date: "2024-05-12", status: "Published" },
  ]);

  const [inquiries] = useState<Inquiry[]>([
    { id: "1", name: "John Doe", email: "john@example.com", message: "How can I volunteer with AGE South Sudan?", date: "2024-05-14", isRead: false },
    { id: "2", name: "Mary Akot", email: "mary@lakes.org", message: "Interested in the seed program.", date: "2024-05-13", isRead: true },
  ]);

  return (
    <div className="flex min-h-screen bg-slate-50 pt-20">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#1F305E] text-white hidden md:block fixed h-full left-0 top-20">
        <nav className="p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-[#60A0D2] shadow-lg' : 'hover:bg-white/10'}`}
          >
            📊 Overview
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'news' ? 'bg-[#60A0D2] shadow-lg' : 'hover:bg-white/10'}`}
          >
            📰 Field Updates
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-[#60A0D2] shadow-lg' : 'hover:bg-white/10'}`}
          >
            ✉️ Inquiries
            {inquiries.filter(i => !i.isRead).length > 0 && (
              <span className="ml-2 bg-red-500 text-[10px] px-2 py-1 rounded-full">New</span>
            )}
          </button>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-black text-[#1F305E]">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Total Updates</p>
                  <p className="text-4xl font-black text-[#1F305E]">{news.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">Unread Inquiries</p>
                  <p className="text-4xl font-black text-[#60A0D2]">{inquiries.filter(i => !i.isRead).length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-wider">States Reached</p>
                  <p className="text-4xl font-black text-[#1F305E]">12</p>
                </div>
              </div>
            </div>
          )}

          {/* FIELD UPDATES (NEWS) TAB */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-[#1F305E]">Manage Field Updates</h1>
                <button className="bg-[#60A0D2] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-[#1F305E] transition-all">
                  + Create New
                </button>
              </div>

              {/* POST FORM */}
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-[#1F305E] mb-6">Create New Update</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#60A0D2]" placeholder="Update Title" />
                    <select className="p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none">
                      <option>Education</option>
                      <option>Health</option>
                      <option>Water</option>
                      <option>Agriculture</option>
                    </select>
                  </div>
                  <textarea rows={3} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none" placeholder="Write description..."></textarea>
                  <button className="w-full py-4 bg-[#1F305E] text-white font-black rounded-xl hover:bg-black transition-all">Publish Update</button>
                </form>
              </div>

              {/* NEWS LIST TABLE */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[#1F305E] text-sm uppercase font-black">
                    <tr>
                      <th className="p-6">Title</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Status</th>
                      <th className="p-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {news.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-6 font-bold text-[#1F305E]">{item.title}</td>
                        <td className="p-6 text-slate-500 text-sm">{item.category}</td>
                        <td className="p-6 text-slate-500 text-sm">{item.date}</td>
                        <td className="p-6">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{item.status}</span>
                        </td>
                        <td className="p-6 space-x-3">
                          <button className="text-[#60A0D2] font-bold hover:underline">Edit</button>
                          <button className="text-red-500 font-bold hover:underline">Delete</button>
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
            <div className="space-y-8">
              <h1 className="text-3xl font-black text-[#1F305E]">Contact Inquiries</h1>
              <div className="grid gap-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className={`p-6 rounded-3xl border transition-all ${inq.isRead ? 'bg-white border-slate-100' : 'bg-blue-50 border-[#60A0D2]'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-black text-[#1F305E]">{inq.name}</h3>
                        <p className="text-sm text-[#60A0D2] font-bold">{inq.email}</p>
                      </div>
                      <time className="text-xs text-slate-400 uppercase font-bold">{inq.date}</time>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{inq.message}</p>
                    <div className="flex gap-4">
                      <button className="text-xs font-black uppercase tracking-widest text-[#1F305E]">Reply</button>
                      <button className="text-xs font-black uppercase tracking-widest text-slate-400">Archive</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}