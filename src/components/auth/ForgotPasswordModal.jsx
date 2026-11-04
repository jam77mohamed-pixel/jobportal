import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const { resetPassword } = useAuth();
  const [step, setStep] = useState(1);
  const [targetEmail, setTargetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
    reset: resetEmailForm
  } = useForm();

  const {
    register: registerNewPass,
    handleSubmit: handlePassSubmit,
    watch,
    formState: { errors: passErrors, isSubmitting: isPassSubmitting },
    reset: resetPassForm
  } = useForm();

  if (!isOpen) return null;

  const onEmailStepSubmit = (data) => {
    setTargetEmail(data.email);
    toast.info(`Verification code sent to ${data.email}`);
    setStep(2);
  };

  const onNewPassSubmit = (data) => {
    try {
      resetPassword(targetEmail, data.newPassword);
      toast.success('Password updated successfully! You can now log in.');
      setStep(3);
    } catch (err) {
      toast.error(err.message || 'Failed to reset password.');
    }
  };

  const handleClose = () => {
    setStep(1);
    setTargetEmail('');
    resetEmailForm();
    resetPassForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0c1236] w-full max-w-md rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.2)] border border-cyan-500/40 overflow-hidden text-slate-100">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-800 bg-slate-900/60">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 mb-3 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-white">Reset Password</h3>
          <p className="text-xs text-slate-400 mt-1">
            {step === 1 && 'Enter your email to receive recovery instructions'}
            {step === 2 && `Set a new secure password for ${targetEmail}`}
            {step === 3 && 'Password successfully updated!'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit(onEmailStepSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                    {...registerEmail('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Enter a valid email address'
                      }
                    })}
                  />
                </div>
                {emailErrors.email && (
                  <p className="text-xs text-rose-400 mt-1 font-medium">{emailErrors.email.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEmailSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePassSubmit(onNewPassSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Verification Code
                </label>
                <input
                  type="text"
                  defaultValue="782-901"
                  readOnly
                  className="w-full px-4 py-2 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/30 text-cyan-300 text-sm font-mono text-center tracking-widest font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter at least 6 characters"
                    className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                    {...registerNewPass('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passErrors.newPassword && (
                  <p className="text-xs text-rose-400 mt-1 font-medium">{passErrors.newPassword.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isPassSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Password Reset Complete</h4>
                <p className="text-xs text-slate-400 mt-1">
                  You can now sign in with your new password.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 btn-gradient-glow text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
