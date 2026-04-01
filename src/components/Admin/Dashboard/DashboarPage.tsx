"use client";

import React from "react";
import {
  Briefcase,
  Users,
  Mail,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar,
} from "lucide-react";
import { useProjects } from "@/components/Hooks/useProjects";
import { useTeam } from "@/components/Hooks/useTeam";
import { useContacts } from "@/components/Hooks/useContact";
import { useNotices } from "@/components/Hooks/useNotices";

const DashboardPage = () => {
  const { projects, loading: pL } = useProjects();
  const { team, loading: tL } = useTeam();
  const { contacts, loading: cL } = useContacts();
  const { latestNotices, loading: nL } = useNotices();

  const loading = pL || tL || cL || nL;

  const stats = [
    { title: "Active Projects", value: projects?.length || 0, icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Team Members", value: team?.length || 0, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "New Contacts", value: contacts?.length || 0, icon: Mail, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "System Notices", value: latestNotices?.length || 0, icon: Bell, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 overflow-hidden">
      {/* Premium Background Mesh Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              System Overview
            </h1>
            <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live monitoring active — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.07] hover:border-white/10">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    <TrendingUp size={12} /> +12%
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.title}</p>
                  <h2 className="text-4xl font-bold mt-1 tracking-tighter">
                    {loading ? <div className="h-10 w-16 bg-white/10 animate-pulse rounded-lg" /> : stat.value}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Latest Notices - Spans 2 columns */}
          <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Bell className="text-rose-400" size={20} />
                Critical Notices
              </h3>
              <button className="text-sm text-blue-400 hover:underline">View all</button>
            </div>

            <div className="grid gap-3">
              {loading ? (
                 [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)
              ) : latestNotices.length > 0 ? (
                latestNotices.slice(0, 4).map((n: any) => (
                  <div key={n.id} className="group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 text-slate-400 group-hover:text-white transition-colors">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">{n.title}</p>
                        <p className="text-xs text-slate-500">{new Date(n.createdAt).toDateString()}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-500 italic">No recent updates found.</div>
              )}
            </div>
          </div>

          {/* Activity Timeline - Sidebar style */}
          {/* Activity Timeline - Dynamic */}
<div className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
  <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
    <Activity className="text-emerald-400" size={20} />
    Live Activity
  </h3>

  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:to-transparent">

    {loading ? (
      <p className="text-slate-400 text-sm">Loading activity...</p>
    ) : (
      [
        contacts?.[0] && {
          text: `New contact from ${contacts[0]?.name}`,
          time: contacts[0]?.createdAt,
        },
        projects?.[0] && {
          text: `Project added: ${projects[0]?.title}`,
          time: projects[0]?.createdAt,
        },
        team?.[0] && {
          text: `New team member: ${team[0]?.name}`,
          time: team[0]?.createdAt,
        },
        latestNotices?.[0] && {
          text: `Notice published: ${latestNotices[0]?.title}`,
          time: latestNotices[0]?.createdAt,
        },
      ]
        .filter(Boolean)
        .map((item: any, i) => (
          <div key={i} className="relative flex items-center gap-6 pl-8">
            <div className="absolute left-0 w-5 h-5 rounded-full bg-[#020617] border-2 border-emerald-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-200">
                {item.text}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.time
                  ? new Date(item.time).toLocaleString()
                  : "Just now"}
              </p>
            </div>
          </div>
        ))
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;