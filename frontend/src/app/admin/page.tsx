"use client";
import { useState } from 'react';

export default function AdminDashboard() {
  const [form, setForm] = useState({ title: '', category: '', description: '', date: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // LOGIC: Use fetch() to POST this data to your database (MongoDB, Supabase, etc.)
    console.log("Saving to backend...", form);
    alert("Post Published!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 pt-24">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-xl">
        <h1 className="text-2xl font-black text-[#1F305E] mb-8 border-b pb-4">Post New Field Update</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Update Title</label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" 
              placeholder="e.g. 500 Kits Distributed"
              onChange={(e) => setForm({...form, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl"
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                <option>Education</option>
                <option>Health</option>
                <option>Water</option>
                <option>Agriculture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <input 
                type="date" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" 
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea 
              rows={4} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl"
              onChange={(e) => setForm({...form, description: e.target.value})}
            ></textarea>
          </div>

          <button className="w-full bg-[#1F305E] text-white py-4 rounded-xl font-bold hover:bg-black transition-colors">
            Publish to Website
          </button>
        </form>
      </div>
    </div>
  );
}