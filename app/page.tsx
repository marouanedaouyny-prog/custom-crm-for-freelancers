"use client";

import { useState, useEffect } from "react";
import { fetchCRMData } from "../lib/crm-data";
import { 
  Users, Briefcase, Calendar, CheckSquare, Search, Plus, MoreVertical, 
  TrendingUp, Clock, Mail, ChevronRight, Filter 
} from "lucide-react";

export default function FreelancerCRM() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("leads");

  useEffect(() => {
    fetchCRMData().then(setData);
  }, []);

  if (!data) return <div className="p-20 text-center text-gray-400">Loading CRM data...</div>;

  return (
    <main className="min-h-screen bg-[#FDFDFE] flex font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-white p-6 space-y-10 hidden md:block">
        <div className="flex items-center gap-2 font-extrabold text-xl tracking-tighter">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white"><Briefcase size={20}/></div>
          Freelancer <span className="text-indigo-600">CRM</span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={<TrendingUp size={18}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Users size={18}/>} label="Leads Pipeline" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <NavItem icon={<Mail size={18}/>} label="Contacts" active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} />
          <NavItem icon={<CheckSquare size={18}/>} label="Tasks" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="px-8 py-5 bg-white border-b flex justify-between items-center shadow-sm z-10">
          <h2 className="text-lg font-bold uppercase tracking-widest text-slate-400">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input className="pl-9 pr-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50" placeholder="Search..." />
            </div>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
              <Plus size={16}/> New {activeTab === 'leads' ? 'Lead' : 'Entry'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard label="Pipeline Value" value={data.stats.pipelineValue} icon={<TrendingUp size={18}/>} color="indigo" />
            <SummaryCard label="Active Leads" value={data.stats.activeLeads} icon={<Users size={18}/>} color="blue" />
            <SummaryCard label="Won This Month" value={data.stats.convertedThisMonth} icon={<Calendar size={18}/>} color="emerald" />
          </div>

          {/* Lead Pipeline View */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-white flex justify-between items-center">
                 <span className="font-bold text-slate-800">Recent Leads</span>
                 <button className="text-slate-400 hover:text-indigo-600 transition"><Filter size={18}/></button>
              </div>
              <div className="divide-y divide-slate-50">
                {data.leads.map((lead: any) => (
                  <div key={lead.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">{lead.name[0]}</div>
                      <div>
                        <h4 className="font-bold text-slate-800">{lead.name}</h4>
                        <span className="text-xs text-slate-400 font-medium">{lead.project} • {lead.value}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          lead.status === 'In Discussion' ? 'bg-indigo-100 text-indigo-700' : 
                          lead.status === 'Proposed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {lead.status}
                        </span>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase flex items-center gap-1 justify-end">
                          <Clock size={10}/> {lead.lastContact}
                        </p>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-indigo-600 transition" size={20}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks & Contacts (Simplified for Demo) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border shadow-sm space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><CheckSquare size={18} className="text-indigo-600"/> Urgent Tasks</h3>
              <div className="space-y-4">
                 {data.tasks.map((task: any) => (
                   <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group border border-transparent hover:border-indigo-100 transition">
                      <div className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                         <p className="text-sm font-bold text-slate-700">{task.task}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{task.due}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
               <Briefcase className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:scale-150 transition duration-1000" size={140}/>
               <h4 className="font-bold text-xl mb-3 flex items-center gap-2 relative z-10"><TrendingUp size={20}/> Business Insight</h4>
               <p className="text-sm opacity-80 leading-relaxed font-medium relative z-10">
                 Your lead-to-proposal conversion rate is up by 15% this quarter. Focus on "SkyStream Solutions" as they have the highest projected value in your current pipeline.
               </p>
               <button className="mt-6 px-6 py-2.5 bg-white text-indigo-700 rounded-xl font-bold text-xs relative z-10 hover:bg-indigo-50 transition">
                 Full Performance Report
               </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm ${
        active ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function SummaryCard({ label, value, icon, color }: any) {
  const colorMap: any = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600'
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-gray-100 flex items-center justify-between transition hover:scale-[1.02] duration-300">
       <div className="space-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{label}</p>
          <h4 className="text-3xl font-extrabold text-slate-800">{value}</h4>
       </div>
       <div className={`p-4 rounded-2xl ${colorMap[color]}`}>{icon}</div>
    </div>
  );
}
