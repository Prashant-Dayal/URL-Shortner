import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUserUrls, deleteUserUrl } from '../api/user.api';
import QRCode from 'qrcode';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Search,
  MousePointerClick,
  Calendar,
  Flame,
  X,
  Trash2,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';

const UserUrl = ({ onStatsCalculated }) => {
  const queryClient = useQueryClient();
  const { data: urlsData, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 15000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [qrModal, setQrModal] = useState({ open: false, url: '', dataUrl: '', name: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' });
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'clicks'

  const deleteMutation = useMutation({
    mutationFn: deleteUserUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      setDeleteConfirm({ open: false, id: null, name: '' });
    },
  });

  const urls = useMemo(() => {
    return urlsData?.urls || [];
  }, [urlsData]);

  // Compute metrics for parent dashboard
  React.useEffect(() => {
    if (urls && onStatsCalculated) {
      const totalLinks = urls.length;
      const totalClicks = urls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
      const topLink = [...urls].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0] || null;
      onStatsCalculated({ totalLinks, totalClicks, topLink });
    }
  }, [urls, onStatsCalculated]);

  const filteredUrls = useMemo(() => {
    let result = [...urls];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.full_url?.toLowerCase().includes(q) ||
          u.short_url?.toLowerCase().includes(q)
      );
    }
    if (sortOrder === 'clicks') {
      result.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else {
      result.reverse(); // newest first
    }
    return result;
  }, [urls, searchQuery, sortOrder]);

  const handleCopy = (shortUrlPath, id) => {
    const fullShortUrl = `http://localhost:3000/${shortUrlPath}`;
    navigator.clipboard.writeText(fullShortUrl);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleOpenQr = async (shortUrlPath) => {
    const fullShortUrl = `http://localhost:3000/${shortUrlPath}`;
    try {
      const dataUrl = await QRCode.toDataURL(fullShortUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });
      setQrModal({ open: true, url: fullShortUrl, dataUrl, name: shortUrlPath });
    } catch (e) {
      console.error('QR code generation error:', e);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pt-6">
        <div className="h-10 bg-slate-900/60 rounded-xl animate-pulse border border-slate-800"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-slate-900/40 rounded-xl animate-pulse border border-slate-800/60"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm mt-6">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl glass-panel border border-slate-800/80 mt-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
          <Link2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">No shortened links yet</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Use the form above to create your first short URL with custom slug and instant click tracking!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Controls: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search links by title or slug..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/80"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 hidden sm:inline">Sort by:</span>
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'clicks' : 'newest')}
            className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>{sortOrder === 'newest' ? 'Newest First' : 'Most Clicks'}</span>
          </button>
        </div>
      </div>

      {/* Modern Data Table & Mobile Cards */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Destination URL</th>
                <th className="py-3.5 px-4 sm:px-6">Short Link</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Clicks</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
              {filteredUrls.map((url) => {
                const fullShortUrl = `http://localhost:3000/${url.short_url}`;
                const isTopLink = url.clicks > 0 && url.clicks >= Math.max(...urls.map((u) => u.clicks || 0));

                return (
                  <tr
                    key={url._id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    {/* Original destination */}
                    <td className="py-4 px-4 sm:px-6 max-w-[220px] sm:max-w-xs">
                      <div className="font-medium text-slate-200 truncate" title={url.full_url}>
                        {url.full_url}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {url.createdAt
                            ? new Date(url.createdAt).toLocaleDateString()
                            : 'Created recently'}
                        </span>
                      </div>
                    </td>

                    {/* Shortened link */}
                    <td className="py-4 px-4 sm:px-6 font-mono">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors">
                        <span className="font-semibold">{url.short_url}</span>
                        <a
                          href={fullShortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-white"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                    {/* Clicks counter */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          url.clicks > 0
                            ? isTopLink
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isTopLink && <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        <MousePointerClick className="w-3 h-3" />
                        <span>{url.clicks || 0}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(url.short_url, url._id)}
                          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                            copiedId === url._id
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          }`}
                          title="Copy short link"
                        >
                          {copiedId === url._id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenQr(url.short_url)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="View QR Code"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirm({
                              open: true,
                              id: url._id,
                              name: url.short_url,
                            })
                          }
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                          title="Delete link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Modal for Table item */}
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
              <h4 className="text-base font-bold text-white">Delete Short URL?</h4>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <span className="font-semibold text-slate-200">{deleteConfirm.name}</span>? Redirects to this link will immediately stop working.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                disabled={deleteMutation.isPending}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null, name: '' })}
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

export default UserUrl;