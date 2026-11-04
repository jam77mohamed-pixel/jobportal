import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, User, Building, Eye, EyeOff, UserPlus, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
      terms: true
    }
  });

  const onSubmit = async (data) => {
    setFormError('');
    try {
      const newUser = registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        company: data.company
      });
      toast.success(`Account created! Welcome, ${newUser.name}!`);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setFormError(err.message || 'Could not create account');
      toast.error(err.message || 'Failed to create account');
    }
  };

  return (
    <div className="w-full">
      {formError && (
        <div className="mb-4 p-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-sm rounded-xl">
          <span className="font-bold">Notice:</span> {formError}
        </div>
      )}

      {/* Role Banner: Simple & Beginner-Friendly */}
      <div className="mb-5">
        <div className="p-3.5 rounded-2xl border-2 border-fuchsia-500 bg-fuchsia-950/30 shadow-[0_0_20px_rgba(247,37,133,0.35)] flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(247,37,133,0.4)]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black tracking-wide uppercase text-white">
              EMPLOYER REGISTRATION
            </p>
            <p className="text-[11px] text-fuchsia-300/80 mt-0.5">
              Post job openings and connect with candidates ready to join
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Your Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              placeholder="e.g. Sarah Jenkins"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('name', {
                required: 'Please enter your name',
                minLength: { value: 2, message: 'Name must have at least 2 letters' }
              })}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Company Name
          </label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              placeholder="e.g. TechWave Solutions"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.company
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('company', {
                required: 'Please enter your company name'
              })}
            />
          </div>
          {errors.company && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.company.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.email
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
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
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                  errors.password
                    ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                    : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Must have at least 6 characters' }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                  errors.confirmPassword
                    ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                    : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === watch('password') || 'Passwords do not match'
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="pt-1">
          <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-cyan-400 border-slate-700 rounded bg-[#080d27]"
              {...register('terms', {
                required: 'Please agree to terms'
              })}
            />
            <span>
              I agree to JOBSOURCE{' '}
              <a href="#terms" className="text-cyan-400 hover:underline font-bold">Terms of Service</a> &{' '}
              <a href="#privacy" className="text-cyan-400 hover:underline font-bold">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.terms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-gradient-glow flex items-center justify-center gap-2 py-3 px-4 text-white font-black text-sm uppercase tracking-wider rounded-xl cursor-pointer disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
        </button>
      </form>

      {/* Sign In link */}
      <div className="mt-4 text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
          Sign In
        </Link>
      </div>
    </div>
  );
};
