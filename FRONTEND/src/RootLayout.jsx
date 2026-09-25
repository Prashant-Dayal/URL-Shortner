import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
import Navbar from './components/NavBar';
import { Link2, Heart, Shield, Zap, Sparkles } from 'lucide-react';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative selection:bg-indigo-500 selection:text-white">
      {/* Background ambient gradient glow lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '5s' }}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Short<span className="gradient-text">Link</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm">
                Next-generation URL shortening platform engineered for speed, custom aliases, QR codes, and real-time click insights.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/" className="hover:text-indigo-400 transition-colors">URL Shortener</Link></li>
                <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Analytics Dashboard</Link></li>
                <li><span className="text-slate-500">Custom Slugs</span></li>
                <li><span className="text-slate-500">QR Code Generation</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">Highlights</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Ultra-fast Redirects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>100% Free to Use</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} ShortLink. Built with React, Vite & Tailwind CSS.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for modern developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;