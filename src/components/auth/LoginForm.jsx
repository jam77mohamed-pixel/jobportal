import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export const LoginForm = () => {
  const { login, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const defaultRecruiter = demoUsers[0] || {
    email: 'recruiter@techwave.io',
    password: 'password123'
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: defaultRecruiter.email,
      password: defaultRecruiter.password,
      rememberMe: true
    }
  });

  const onSubmit = async (data) => {
    setFormError('');
    try {
      const loggedInUser = login(data.email, data.password);
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Login failed. Please check your email and password.');
      toast.error(err.message || 'Incorrect email or password');
    }
  };

  const fillDemoRecruiter = () => {
    setValue('email', defaultRecruiter.email);
    setValue('password', defaultRecruiter.password);
    toast.info(`Filled details for demo employer: ${defaultRecruiter.name}`);
  };

  return (
    <div className="w-full space-y-5">
      {/* 1-Click Quick Demo Details Helper */}
      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Demo:</span>
        </div>
        <button
          type="button"
          onClick={fillDemoRecruiter}
          className="px-3 py-1 rounded-lg font-bold text-[11px] bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-[0_0_12px_rgba(247,37,133,0.5)] transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Building2 className="w-3 h-3" />
          <span>1-Click Fill Details</span>
        </button>
      </div>

      {formError && (
        <div className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs rounded-xl">
          {formError}
        </div>
      )}

      {/* Main Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-left flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
            EMPLOYER SIGN IN
          </h2>
          <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-950/60 border border-fuchsia-500/30 px-2 py-0.5 rounded-full">
            EMPLOYER
          </span>
        </div>

        {/* EMAIL */}
        <div className="space-y-1 text-left">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 text-sm text-white placeholder:text-slate-500 border focus:outline-none transition-all ${
                errors.email
                  ? 'border-rose-500/80'
                  : 'border-slate-700/80 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.3)]'
              }`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-1 text-left">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 text-sm text-white placeholder:text-slate-500 border focus:outline-none transition-all ${
                errors.password
                  ? 'border-rose-500/80'
                  : 'border-slate-700/80 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.3)]'
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters'
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-2xl btn-gradient-glow text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          {isSubmitting ? 'Signing in...' : 'SIGN IN'}
        </button>

        {/* Forgot password */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#1A1A1A] px-3 text-slate-400 font-bold tracking-widest">
              SIGNING IN AS
            </span>
          </div>
        </div>

        {/* User Card: Clean & Beginner Friendly */}
        <div className="w-full">
          <div className="p-4 rounded-2xl flex flex-col items-center text-center bg-slate-900/90 border-2 border-fuchsia-500 shadow-[0_0_25px_rgba(247,37,133,0.35),inset_0_0_15px_rgba(247,37,133,0.1)] relative">
            <div className="w-14 h-14 rounded-full border-2 border-fuchsia-500 flex items-center justify-center text-fuchsia-300 mb-2 shadow-[0_0_15px_rgba(247,37,133,0.4)] bg-fuchsia-950/40">
              <Building2 className="w-7 h-7" />
            </div>
            <span className="text-sm font-black text-white tracking-wider uppercase">
              EMPLOYER / RECRUITER
            </span>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Post jobs, view applicants, and hire candidates</span>
            </p>
            <div className="w-12 h-0.5 bg-fuchsia-500/70 rounded-full mt-2.5" />
          </div>
        </div>

        {/* CONTINUE BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-2xl btn-gradient-glow text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(0,242,254,0.4)] disabled:opacity-50"
        >
          CONTINUE TO DASHBOARD
        </button>
      </form>

      {/* Register Link */}
      <div className="pt-2 text-center text-xs text-slate-400">
        New employer?{' '}
        <Link to="/register" className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
          Create an Account
        </Link>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
