import React from 'react';
import UrlForm from '../components/UrlForm';
import { Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import {
  Sparkles,
  Zap,
  BarChart3,
  ShieldCheck,
  QrCode,
  ArrowRight,
  MousePointerClick,
  Share2,
  Globe2
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Glowing Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Smart, Lightning-Fast URL Shortener</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Shorten links, expand your <span className="gradient-text">digital reach</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Create memorable, branded short URLs with detailed click analytics, custom slugs, and instant QR codes in one seamless platform.
          </p>
        </div>

        {/* Shortener Card Box */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl relative">
            <UrlForm />
          </div>

          {/* Feature Highlights Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant redirection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-purple-400" />
              <span>Free QR codes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Real-time click stats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secure & reliable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="py-16 md:py-24 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Why Choose ShortLink
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for speed, privacy and control
            </h3>
            <p className="text-sm text-slate-400">
              Everything you need to optimize and track your links with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Ultra-Fast Redirects</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Optimized backend routing ensures instant response times with zero redirection latency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Custom Slugs & Aliases</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Personalize your URLs with unique back-half aliases to boost brand trust and memorability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Live Click Tracking</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Monitor engagement in real time with detailed click counting on your personal dashboard.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Dynamic QR Codes</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Download high-resolution QR codes for print materials, packaging, and offline campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Simple 3-Step Process
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              How it works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-indigo-600/30">
                1
              </div>
              <h4 className="text-base font-bold text-white">Paste Long Link</h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Copy any cumbersome destination URL and paste it into the shortener.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-purple-600/30">
                2
              </div>
              <h4 className="text-base font-bold text-white">Customize & Shorten</h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Optionally define a custom back-half alias and generate your short link.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center mx-auto text-lg shadow-lg shadow-cyan-600/30">
                3
              </div>
              <h4 className="text-base font-bold text-white">Share & Track</h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Distribute your link anywhere and monitor click performance in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900/60 border border-indigo-500/20">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to streamline your links?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Create an account to unlock custom slugs, view all your shortened links, and track lifetime clicks.
          </p>
          <div className="pt-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="glow-button inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base"
              >
                <span>Go to Your Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/auth"
                className="glow-button inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm sm:text-base"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;