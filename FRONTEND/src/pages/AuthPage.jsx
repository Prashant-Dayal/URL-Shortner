import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Link2, LogIn, UserPlus } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md mx-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/25 mb-1">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isLogin
              ? 'Enter your credentials to access your dashboard'
              : 'Join thousands of users creating smart short links'}
          </p>
        </div>

        {/* Auth Tab Selector */}
        <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-2 gap-1 mb-6 shadow-md">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isLogin
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
              !isLogin
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </button>
        </div>

        {/* Card Component */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
          {isLogin ? (
            <LoginForm state={setIsLogin} />
          ) : (
            <RegisterForm state={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;