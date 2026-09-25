import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Link2,
  MousePointerClick,
  Flame,
  Sparkles,
  TrendingUp,
  Plus
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0, topLink: null });
  const [showCreateForm, setShowCreateForm] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Welcome back, <span className="text-indigo-300 font-semibold">{user?.name || 'User'}</span>! Manage and monitor your shortened links below.
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className={`w-4 h-4 text-indigo-400 transition-transform ${showCreateForm ? 'rotate-45' : ''}`} />
          <span>{showCreateForm ? 'Collapse Shortener' : 'Create New Link'}</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Total Links Card */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Links
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Link2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-white">
              {stats.totalLinks}
            </span>
            <span className="text-xs text-slate-500 ml-2">shortened</span>
          </div>
        </div>

        {/* Total Clicks Card */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Clicks
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold gradient-text">
              {stats.totalClicks}
            </span>
            <span className="text-xs text-slate-500 ml-2">all-time views</span>
          </div>
        </div>

        {/* Top Link Card */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Top Performing Link
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            {stats.topLink ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-300 font-mono">
                  {stats.topLink.short_url}
                </span>
                <span className="text-xs text-amber-400/80 font-medium">
                  ({stats.topLink.clicks || 0} clicks)
                </span>
              </div>
            ) : (
              <span className="text-sm text-slate-500">No clicks yet</span>
            )}
          </div>
        </div>
      </div>

      {/* URL Shortener Creation Card */}
      {showCreateForm && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-900/60 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Create a New Short Link</h2>
          </div>
          <UrlForm />
        </div>
      )}

      {/* User URLs Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Your Link Library</span>
          </h2>
        </div>

        <UserUrl onStatsCalculated={setStats} />
      </div>
    </div>
  );
};

export default DashboardPage;