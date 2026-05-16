"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Mail,
  Layers,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// --- System Types ---
interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  replied?: boolean;
}

interface FieldUpdate {
  id: string;
  title: string;
  cat: string;
  date: string;
  excerpt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "updates" | "inquiries">("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [updates, setUpdates] = useState<FieldUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Form states for creating a new Field Update
  const [isCreatingUpdate, setIsCreatingUpdate] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    cat: "Education",
    excerpt: "",
    content: ""
  });

  // Modal / Interaction states for handling custom actions
  const [replyingTo, setReplyingTo] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const categories = ["Emergency", "Education", "Reporting", "Livelihoods", "Health"];

  // Fetch metrics and records across your administrative sub-routes
  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        // Points exactly to your nested route structures: /admin/api/...
        const inquiriesRes = await fetch("/admin/api/inquiries");
        const updatesRes = await fetch("/admin/api/news");

        if (inquiriesRes.ok) {
          const inquiriesData = await inquiriesRes.json();
          setInquiries(inquiriesData);
        }
        if (updatesRes.ok) {
          const updatesData = await updatesRes.json();
          setUpdates(updatesData);
        }
      } catch (error) {
        console.error("Error synchronizing admin dashboard data arrays:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, [refreshKey]);

  // Trigger transient message banners for validation feedback loops
  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Submit operations targeting handler route collections
  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/admin/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUpdate)
      });

      if (res.ok) {
        showToast("success", "Field update payload successfully compiled and dispatched.");
        setIsCreatingUpdate(false);
        setNewUpdate({ title: "", cat: "Education", excerpt: "", content: "" });
        setRefreshKey(prev => prev + 1);
      } else {
        showToast("error", "Failed to dispatch system data parameters to upstream table structures.");
      }
    } catch (err) {
      showToast("error", "A network fault occurred during database entry preparation lifecycle optimization.");
    }
  };

  // Dispatches transactional email payloads through backend handlers
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTo) return;

    try {
      // Passes the targeting index back up to the specific parameter handler
      const res = await fetch(`/admin/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId: replyingTo.id,
          targetEmail: replyingTo.email,
          bodyText: replyMessage
        })
      });

      if (res.ok) {
        showToast("success", `System message routing to ${replyingTo.email} execution completed.`);
        
        // Optimistic UI update to show inquiry has been marked replied
        setInquiries(prev =>
          prev.map(item => (item.id === replyingTo.id ? { ...item, replied: true } : item))
        );
        
        setReplyingTo(null);
        setReplyMessage("");
      } else {
        showToast("error", "Message engine rejected processing configuration parameters.");
      }
    } catch (err) {
      showToast("error", "Failed to establish a clear pipeline link execution context.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 flex flex-col font-sans pt-20">
      
      {/* Toast Notification Engine */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-[110] flex items-center gap-3 px-5 py-3 rounded-xl border text-sm shadow-xl font-medium tracking-wide backdrop-blur-md ${
              notification.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400"
                : "bg-rose-950/80 border-rose-500/30 text-rose-400"
            }`}
          >
            {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        {/* Navigation Sidebar Drawer Panel */}
        <aside className="w-64 border-r border-slate-800/40 bg-[#0A0E1A] p-6 flex flex-col justify-between hidden md:flex">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">Workspace</p>
              <h2 className="text-sm font-bold text-sky-400 mt-1">AGESOS Hub Console</h2>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "overview"
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                }`}
              >
                <LayoutDashboard size={14} /> Console Overview
              </button>

              <button
                onClick={() => setActiveTab("updates")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "updates"
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                }`}
              >
                <span className="flex items-center gap-3"><FileText size={14} /> Field Updates</span>
                {updates.length > 0 && <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{updates.length}</span>}
              </button>

              <button
                onClick={() => setActiveTab("inquiries")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "inquiries"
                    ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30"
                }`}
              >
                <span className="flex items-center gap-3"><Mail size={14} /> Inbox Inquiries</span>
                {inquiries.filter(i => !i.replied).length > 0 && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                    {inquiries.filter(i => !i.replied).length}
                  </span>
                )}
              </button>
            </nav>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Data Pipeline Active</p>
            </div>
            <button 
              onClick={() => setRefreshKey(k => k + 1)} 
              className="text-slate-500 hover:text-slate-300 transition-colors"
              title="Force pipeline reload sync"
            >
              <RefreshCw size={12} className={isLoading ? "animate-spin text-sky-400" : ""} />
            </button>
          </div>
        </aside>

        {/* Dynamic Context Dashboard Workspace Content Wrapper */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
          {isLoading ? (
            <div className="h-96 w-full flex items-center justify-center flex-col gap-3">
              <RefreshCw className="animate-spin text-sky-400" size={24} />
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Querying live schemas...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW SCREEN METRICS */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">System Environment Overview</h1>
                    <p className="text-xs text-slate-400 font-light mt-1">Real-time indicators tracking compiled data pipelines safely.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0A0E1A] border border-slate-800/40 rounded-2.5rem p-6 space-y-4">
                      <div className="h-10 w-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Field Deployments</p>
                        <p className="text-3xl font-black mt-1 text-slate-100">{updates.length}</p>
                      </div>
                    </div>

                    <div className="bg-[#0A0E1A] border border-slate-800/40 rounded-2.5rem p-6 space-y-4">
                      <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Pending Inquiries</p>
                        <p className="text-3xl font-black mt-1 text-amber-400">{inquiries.filter(i => !i.replied).length}</p>
                      </div>
                    </div>

                    <div className="bg-[#0A0E1A] border border-slate-800/40 rounded-2.5rem p-6 space-y-4">
                      <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Layers size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Sectors Evaluated</p>
                        <p className="text-3xl font-black mt-1 text-slate-100">5</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-800/40 rounded-3xl bg-[#0A0E1A] p-8 text-center space-y-3">
                    <div className="h-8 w-8 bg-slate-800/60 text-slate-400 flex items-center justify-center rounded-lg mx-auto">
                      <Layers size={14} />
                    </div>
                    <h3 className="text-xs uppercase tracking-widest font-black text-slate-400">Database Schema Execution Pipeline Pending</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto font-light leading-relaxed">
                      System handling operations using localized state routing frameworks safely. Tables will display here once database connection string structures populate downstream array sets.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: FIELD UPDATES NEWS ARTICLE COMPILER FORM */}
              {activeTab === "updates" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-black tracking-tight">Field Updates Manager</h1>
                      <p className="text-xs text-slate-400 font-light mt-1">Manage, dispatch, and edit organizational news objects directly into routing components.</p>
                    </div>
                    <button
                      onClick={() => setIsCreatingUpdate(!isCreatingUpdate)}
                      className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-sky-500/5"
                    >
                      {isCreatingUpdate ? "Close Compilers" : "Create Update"} <Plus size={14} />
                    </button>
                  </div>

                  {isCreatingUpdate && (
                    <motion.form
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleCreateUpdate}
                      className="bg-[#0A0E1A] border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6"
                    >
                      <h2 className="text-sm uppercase font-black text-sky-400 tracking-wider">New Update Dispatch Node</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Article Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Transforming Access for 500+ Children in Juba"
                            value={newUpdate.title}
                            onChange={e => setNewUpdate({ ...newUpdate, title: e.target.value })}
                            className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Category Node</label>
                          <select
                            value={newUpdate.cat}
                            onChange={e => setNewUpdate({ ...newUpdate, cat: e.target.value })}
                            className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all text-slate-300"
                          >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Short Summary Excerpt</label>
                        <input
                          type="text"
                          required
                          placeholder="Provide a clean short summary meta paragraph text snippet..."
                          value={newUpdate.excerpt}
                          onChange={e => setNewUpdate({ ...newUpdate, excerpt: e.target.value })}
                          className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Article Content Payload</label>
                        <textarea
                          rows={5}
                          required
                          placeholder="Compile complete report description logs safely here..."
                          value={newUpdate.content}
                          onChange={e => setNewUpdate({ ...newUpdate, content: e.target.value })}
                          className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-sky-500 hover:bg-sky-600 text-slate-950 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all"
                        >
                          Publish To Field Updates
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {updates.length === 0 ? (
                    <div className="h-64 border border-slate-800/40 bg-[#0A0E1A] rounded-2.5rem flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <FileText size={28} className="text-slate-600" />
                      <h3 className="text-sm font-bold text-slate-300">No Updates Published</h3>
                      <p className="text-xs text-slate-500 max-w-xs font-light">You haven&apos;t posted any field updates yet. Click &apos;Create Update&apos; to add your first post.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {updates.map((post) => (
                        <div key={post.id} className="bg-[#0A0E1A] border border-slate-800/40 rounded-2xl p-5 flex items-center justify-between gap-6">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-3 text-[9px] font-bold uppercase">
                              <span className="text-sky-400">{post.cat}</span>
                              <span className="h-1 w-1 bg-slate-700 rounded-full" />
                              <span className="text-slate-500">{post.date}</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-200">{post.title}</h3>
                            <p className="text-xs text-slate-400 line-clamp-1 font-light">{post.excerpt}</p>
                          </div>
                          <button className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INBOX INQUIRIES INTERACTION MATRIX PANEL */}
              {activeTab === "inquiries" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight">Inbox Inquiries Window</h1>
                    <p className="text-xs text-slate-400 font-light mt-1">Read, inspect, and safely execute SMTP responses out back via client contact tracking.</p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="h-64 border border-slate-800/40 bg-[#0A0E1A] rounded-2.5rem flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <Mail size={28} className="text-slate-600" />
                      <h3 className="text-sm font-bold text-slate-300">Inbox Clean</h3>
                      <p className="text-xs text-slate-500 max-w-xs font-light">No new inbound communications have entered processing systems workflows.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`bg-[#0A0E1A] border border-slate-800/40 rounded-2.5rem p-6 space-y-4 transition-all ${
                            inq.replied ? "opacity-60 border-slate-900" : "ring-1 ring-sky-500/10"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/40 pb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-200">{inq.name}</h3>
                                {inq.replied && (
                                  <span className="bg-emerald-950 text-emerald-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    Resolved Sync
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-sky-400/80 font-mono mt-0.5">{inq.email}</p>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{inq.date}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed font-light bg-slate-900/30 p-4 rounded-xl border border-slate-900">
                            &ldquo;{inq.message}&rdquo;
                          </p>

                          {!inq.replied && (
                            <div className="flex justify-end pt-2">
                              <button
                                onClick={() => setReplyingTo(inq)}
                                className="bg-slate-800/80 hover:bg-sky-500 hover:text-slate-950 border border-slate-700/60 hover:border-transparent text-slate-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all flex items-center gap-2"
                              >
                                Dispatch Response <Send size={12} />
                              </button>
                            </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Reply Workspace Panel Modal Overlay Overlay Sheet */}
      <AnimatePresence>
        {replyingTo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setReplyingTo(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#0A0E1A] border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6"
            >
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-sky-400">SMTP Response Terminal</span>
                <h2 className="text-lg font-bold text-slate-100 mt-1">Replying to {replyingTo.name}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{replyingTo.email}</p>
              </div>

              <div className="bg-slate-900/60 border border-slate-900 p-4 rounded-xl text-xs text-slate-400 font-light italic max-h-24 overflow-y-auto">
                &ldquo;{replyingTo.message}&rdquo;
              </div>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Message Body Context</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Type your official administrative outreach reply message payload safely here..."
                    value={replyMessage}
                    onChange={e => setReplyMessage(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all resize-none text-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="text-slate-400 hover:text-slate-100 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Abort
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-slate-950 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all"
                  >
                    Execute Send Delivery
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}