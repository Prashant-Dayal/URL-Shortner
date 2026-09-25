import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAdminStats,
  getAllSystemUrls,
  deleteSystemUrl,
  getAllUsers,
  updateUserRole,
  deleteAdminUser,
} from '../api/admin.api';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode';
import {
  ShieldAlert,
  Users,
  Link2,
  MousePointerClick,
  Globe2,
  Search,
  Trash2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  ShieldCheck,
  ShieldMinus,
  Calendar,
  Flame,
  X,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  UserX,
  Lock
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('urls'); // 'urls' | 'users'
  const [urlSearch, setUrlSearch] = useState('');
  const [urlFilter, setUrlFilter] = useState('all'); // 'all' | 'user' | 'guest'
  const [userSearch, setUserSearch] = useState('');

  const [copiedId, setCopiedId] = useState(null);
  const [qrModal, setQrModal] = useState({ open: false, url: '', dataUrl: '', name: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: null, id: null, name: '' });

  // 1. Fetch Stats
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats,
  });

  // 2. Fetch All URLs
  const { data: systemUrls = [], isLoading: urlsLoading, refetch: refetchUrls } = useQuery({
    queryKey: ['adminUrls', urlSearch],
    queryFn: () => getAllSystemUrls(urlSearch),
  });

  // 3. Fetch All Users
  const { data: usersList = [], isLoading: usersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: getAllUsers,
  });

  // Mutations
  const deleteUrlMutation = useMutation({
    mutationFn: deleteSystemUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUrls'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      setDeleteConfirm({ open: false, type: null, id: null, name: '' });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminUrls'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setDeleteConfirm({ open: false, type: null, id: null, name: '' });
    },
  });

  const handleCopy = (shortUrlPath, id) => {
    const full = `http://localhost:3000/${shortUrlPath}`;
    navigator.clipboard.writeText(full);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenQr = async (shortUrlPath) => {
    const full = `http://localhost:3000/${shortUrlPath}`;
    try {
      const dataUrl = await QRCode.toDataURL(full, {
        width: 300,
        margin: 2,
        color: { dark: '#0f172a', light: '#ffffff' },
      });
      setQrModal({ open: true, url: full, dataUrl, name: shortUrlPath });
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUrls = systemUrls.filter((item) => {
    if (urlFilter === 'user') return Boolean(item.user);
    if (urlFilter === 'guest') return !item.user;
    return true;
  });

  const filteredUsers = usersList.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  const handleRefreshAll = () => {
    refetchStats();
    refetchUrls();
    refetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold border border-purple-500/30">
              Super Admin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            System-wide URL moderation, global analytics, and user access management.
          </p>
        </div>

        <button
          onClick={handleRefreshAll}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs font-medium text-slate-300 flex items-center gap-2 transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4 text-indigo-400" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Users */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Registered Users
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-white">
              {statsLoading ? '...' : stats?.totalUsers || 0}
            </span>
            <span className="text-xs text-slate-500 ml-2">accounts</span>
          </div>
        </div>

        {/* Total URLs */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Short Links
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Link2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold gradient-text">
              {statsLoading ? '...' : stats?.totalUrls || 0}
            </span>
            <span className="text-xs text-slate-500 ml-2">system-wide</span>
          </div>
        </div>

        {/* Total Clicks */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Global Clicks
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-300">
              {statsLoading ? '...' : stats?.totalClicks || 0}
            </span>
            <span className="text-xs text-slate-500 ml-2">redirects</span>
          </div>
        </div>

        {/* Links Breakdown */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Link Sources
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <div className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400">User: </span>
              <span className="font-bold text-indigo-300">{stats?.userUrls || 0}</span>
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400">Guest: </span>
              <span className="font-bold text-slate-200">{stats?.guestUrls || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('urls')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'urls'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>All System URLs</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60">
            {systemUrls.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts & Roles</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-900/60">
            {usersList.length}
          </span>
        </button>
      </div>

      {/* TAB 1: SYSTEM URLS */}
      {activeTab === 'urls' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={urlSearch}
                onChange={(e) => setUrlSearch(e.target.value)}
                placeholder="Search all URLs by destination, slug, or user..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {urlSearch && (
                <button
                  onClick={() => setUrlSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-400">Filter:</span>
              <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex text-xs">
                <button
                  onClick={() => setUrlFilter('all')}
                  className={`px-3 py-1 rounded-lg ${
                    urlFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  All ({systemUrls.length})
                </button>
                <button
                  onClick={() => setUrlFilter('user')}
                  className={`px-3 py-1 rounded-lg ${
                    urlFilter === 'user' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setUrlFilter('guest')}
                  className={`px-3 py-1 rounded-lg ${
                    urlFilter === 'guest' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Guests
                </button>
              </div>
            </div>
          </div>

          {/* URLs Table */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 sm:px-6">Destination</th>
                    <th className="py-3.5 px-4 sm:px-6">Short Link</th>
                    <th className="py-3.5 px-4 sm:px-6">Creator</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Clicks</th>
                    <th className="py-3.5 px-4 sm:px-6">Date</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                  {urlsLoading ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        Loading system URLs...
                      </td>
                    </tr>
                  ) : filteredUrls.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        No shortened URLs matched your filter.
                      </td>
                    </tr>
                  ) : (
                    filteredUrls.map((url) => {
                      const fullShortUrl = `http://localhost:3000/${url.short_url}`;
                      return (
                        <tr key={url._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-4 sm:px-6 max-w-[200px] sm:max-w-xs">
                            <div className="font-medium text-slate-200 truncate" title={url.full_url}>
                              {url.full_url}
                            </div>
                          </td>

                          <td className="py-4 px-4 sm:px-6 font-mono">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                              <span>{url.short_url}</span>
                              <a
                                href={fullShortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-white"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </td>

                          <td className="py-4 px-4 sm:px-6">
                            {url.user ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                                  {url.user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-slate-200 text-xs">
                                    {url.user.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                                    {url.user.email}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-medium border border-slate-700/60">
                                Guest / Anonymous
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                              <MousePointerClick className="w-3 h-3" />
                              <span>{url.clicks || 0}</span>
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-slate-400 text-xs">
                            {url.createdAt
                              ? new Date(url.createdAt).toLocaleDateString()
                              : 'Recent'}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(url.short_url, url._id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                                title="Copy Short Link"
                              >
                                {copiedId === url._id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenQr(url.short_url)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                                title="QR Code"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    open: true,
                                    type: 'url',
                                    id: url._id,
                                    name: url.short_url,
                                  })
                                }
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                                title="Delete URL"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {userSearch && (
                <button
                  onClick={() => setUserSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 sm:px-6">User</th>
                    <th className="py-3.5 px-4 sm:px-6">Role</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Links Created</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Total Clicks</th>
                    <th className="py-3.5 px-4 sm:px-6">Joined Date</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Role & Account Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                  {usersLoading ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        Loading user accounts...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">
                        No registered users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((usr) => {
                      const isSelf = currentUser?._id === usr._id;
                      const isAdmin = usr.role === 'admin';

                      return (
                        <tr key={usr._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                                {usr.name?.[0]?.toUpperCase() || 'U'}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                                  {usr.name}
                                  {isSelf && (
                                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 rounded">
                                      (You)
                                    </span>
                                  )}
                                </span>
                                <span className="text-xs text-slate-400">{usr.email}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 sm:px-6">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                isAdmin
                                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              {isAdmin ? (
                                <>
                                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                                  <span>Admin</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                                  <span>User</span>
                                </>
                              )}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-center font-medium text-slate-200">
                            {usr.urlCount || 0}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-center font-medium text-slate-200">
                            {usr.totalClicks || 0}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-slate-400 text-xs">
                            {usr.createdAt
                              ? new Date(usr.createdAt).toLocaleDateString()
                              : 'Recent'}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!isSelf ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateRoleMutation.mutate({
                                        id: usr._id,
                                        role: isAdmin ? 'user' : 'admin',
                                      })
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                                      isAdmin
                                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                                        : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/30'
                                    }`}
                                  >
                                    {isAdmin ? (
                                      <>
                                        <ShieldMinus className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Demote</span>
                                      </>
                                    ) : (
                                      <>
                                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                                        <span>Make Admin</span>
                                      </>
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        open: true,
                                        type: 'user',
                                        id: usr._id,
                                        name: usr.name || usr.email,
                                      })
                                    }
                                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                                    title="Delete User"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500 italic">Current Session</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={() => setQrModal({ open: false, url: '', dataUrl: '', name: '' })}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-lg font-bold text-white mb-1">QR Code</h4>
            <p className="text-xs text-slate-400 mb-4 font-mono truncate px-2">{qrModal.url}</p>

            {qrModal.dataUrl && (
              <div className="p-3 bg-white rounded-xl inline-block shadow-inner mb-4">
                <img src={qrModal.dataUrl} alt="Short URL QR Code" className="w-48 h-48 mx-auto" />
              </div>
            )}

            <div className="flex gap-2">
              <a
                href={qrModal.dataUrl}
                download={`${qrModal.name || 'qr-code'}.png`}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Download PNG
              </a>
              <button
                onClick={() => setQrModal({ open: false, url: '', dataUrl: '', name: '' })}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                Delete {deleteConfirm.type === 'url' ? 'Short URL' : 'User Account'}?
              </h4>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <span className="font-semibold text-slate-200">{deleteConfirm.name}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'url') {
                    deleteUrlMutation.mutate(deleteConfirm.id);
                  } else {
                    deleteUserMutation.mutate(deleteConfirm.id);
                  }
                }}
                disabled={deleteUrlMutation.isPending || deleteUserMutation.isPending}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {deleteUrlMutation.isPending || deleteUserMutation.isPending
                  ? 'Deleting...'
                  : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setDeleteConfirm({ open: false, type: null, id: null, name: '' })}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
