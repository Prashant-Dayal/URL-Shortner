import React, { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import {
  Link2,
  Sparkles,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  ClipboardPaste,
  X,
  AlertCircle,
  Tag,
  Loader2,
  Lock
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

const UrlForm = () => {
  const [url, setUrl] = useState('https://github.com');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [showCustomSlugField, setShowCustomSlugField] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#38bdf8']
      });
    } catch {
      // safe fallback
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text);
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    // Ensure valid URL prefix
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
      setUrl(cleanUrl);
    }

    try {
      const generatedShortUrl = await createShortUrl(cleanUrl, customSlug ? customSlug.trim() : undefined);
      setShortUrl(generatedShortUrl);
      queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      triggerConfetti();

      // Generate QR Code data URL
      try {
        const qr = await QRCode.toDataURL(generatedShortUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        });
        setQrCodeDataUrl(qr);
      } catch (qrErr) {
        console.error('Failed to generate QR Code:', qrErr);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main URL Input Bar */}
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/15 transition-all">
          <div className="relative flex-1 flex items-center">
            <div className="pl-4 pr-2 text-slate-400">
              <Link2 className="w-5 h-5 text-indigo-400" />
            </div>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long link here... (e.g. https://very-long-url.com/page)"
              required
              className="w-full py-3.5 pr-20 bg-transparent text-slate-100 placeholder:text-slate-500 text-sm sm:text-base font-normal focus:outline-none"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800/60 transition-colors mr-1"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handlePaste}
              className="p-1.5 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800/60 transition-colors mr-2 text-xs font-medium flex items-center gap-1"
              title="Paste from clipboard"
            >
              <ClipboardPaste className="w-4 h-4" />
              <span className="hidden sm:inline">Paste</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="glow-button px-6 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Shortening...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Shorten URL</span>
              </>
            )}
          </button>
        </div>

        {/* Custom Alias Option */}
        <div className="pt-1">
          {isAuthenticated ? (
            <div>
              <button
                type="button"
                onClick={() => setShowCustomSlugField(!showCustomSlugField)}
                className="text-xs font-medium text-slate-400 hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>{showCustomSlugField ? 'Hide custom alias' : 'Add custom alias (optional)'}</span>
              </button>

              {showCustomSlugField && (
                <div className="mt-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">localhost:3000/</span>
                  <input
                    type="text"
                    id="customSlug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/\s+/g, '-'))}
                    placeholder="custom-slug"
                    className="flex-1 w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-500 self-start sm:self-auto">
                    {customSlug ? `Preview: localhost:3000/${customSlug}` : 'Letters, numbers and hyphens'}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Want a custom back-half slug?</span>
              <Link to="/auth" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
                Sign in free
              </Link>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Generated Result Card */}
      {shortUrl && (
        <div className="mt-6 p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-900/80 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Shortened Link Ready
              </h3>
            </div>
            <span className="text-xs text-slate-400">Instant Redirect</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex-1 px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-700/80 flex items-center justify-between overflow-hidden group">
              <span className="font-mono text-sm sm:text-base text-indigo-300 truncate select-all">
                {shortUrl}
              </span>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors ml-2 shrink-0"
                title="Open link in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className={`flex-1 sm:flex-none px-4 py-3 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setQrModalOpen(true)}
                className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center"
                title="View QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="text-lg font-bold text-white mb-1">QR Code</h4>
            <p className="text-xs text-slate-400 mb-4 font-mono truncate px-2">{shortUrl}</p>

            {qrCodeDataUrl && (
              <div className="p-3 bg-white rounded-xl inline-block shadow-inner mb-4">
                <img src={qrCodeDataUrl} alt="Short URL QR Code" className="w-48 h-48 mx-auto" />
              </div>
            )}

            <div className="flex gap-2">
              <a
                href={qrCodeDataUrl}
                download="shortlink-qr.png"
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Download PNG
              </a>
              <button
                onClick={() => setQrModalOpen(false)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;