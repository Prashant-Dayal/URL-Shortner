import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import { Link2, LayoutDashboard, LogOut, LogIn, Sparkles, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logout());
      navigate({ to: '/' });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Short<span className="gradient-text">Link</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Pro
                </span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Admin Console Link (Admin Only) */}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-white px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>Admin Console</span>
              </Link>
            )}

            {/* Auth section */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-indigo-500/20">
                    {getInitials(user?.name)}
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-sm font-medium text-slate-200 leading-tight">
                      {user?.name || 'User'}
                    </span>
                    {isAdmin && (
                      <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/auth"
                  className="glow-button inline-flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;