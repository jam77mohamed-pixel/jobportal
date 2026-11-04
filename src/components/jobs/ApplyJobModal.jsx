import React from 'react';
import { useForm } from 'react-hook-form';
import { Send, User, Mail, Phone, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { Modal } from '../common/Modal';

export const ApplyJobModal = ({ isOpen, onClose, job }) => {
  const { user } = useAuth();
  const { applyToJob } = useJobs();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: user?.name || 'David Kim',
      email: user?.email || 'candidate@notizjob.com',
      phone: '+1 (555) 432-8765',
      noticePeriod: '15 Days',
      resumeUrl: 'https://linkedin.com/in/candidate-profile',
      coverNote: 'I am currently serving my notice period and can join immediately within 15 days.'
    }
  });

  if (!isOpen || !job) return null;

  const onSubmit = async (data) => {
    applyToJob(job.id, data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Position"
      subtitle={`${job.title} • ${job.company}`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Header Preview & Notice Fast-Track Banner */}
        <div className="p-3.5 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-fuchsia-950/30 border border-cyan-500/30 rounded-2xl flex items-center gap-3">
          <img
            src={job.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
            alt={job.company}
            className="w-11 h-11 rounded-xl object-cover border border-cyan-500/30 shrink-0"
          />
          <div className="text-xs min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-white truncate">{job.title}</span>
              <span className="tag-cyan font-bold text-[10px] shrink-0">{job.noticePeriod} Notice</span>
            </div>
            <p className="text-cyan-300/80 text-[11px] mt-0.5 truncate">
              Candidates with active notice period receive prioritized profile review.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Name</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address</span> <span className="text-pink-500">*</span>
              </label>
              <input
                type="email"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] focus:outline-none transition-all ${
                  errors.email
                    ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                    : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                }`}
                {...register('email', { required: 'Email is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                {...register('phone')}
              />
            </div>
          </div>

          {/* Notice Period Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Your Current Notice Period</span> <span className="text-pink-500">*</span>
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('noticePeriod')}
            >
              <option value="Immediate" className="bg-[#0c1238]">Immediate Joiner (0 Days)</option>
              <option value="15 Days" className="bg-[#0c1238]">15 Days Notice</option>
              <option value="30 Days" className="bg-[#0c1238]">30 Days Notice</option>
              <option value="60 Days" className="bg-[#0c1238]">60 Days Notice</option>
              <option value="90 Days" className="bg-[#0c1238]">90 Days Notice</option>
            </select>
          </div>

          {/* Resume Link */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume / Portfolio Link</span>
            </label>
            <input
              type="text"
              placeholder="https://linkedin.com/in/... or Google Drive URL"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('resumeUrl')}
            />
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Short Pitch to Recruiter
            </label>
            <textarea
              rows={2}
              placeholder="Highlight relevant skills, years of experience, or early availability..."
              className="w-full px-3.5 py-2 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('coverNote')}
            />
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct application delivery</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-action-gradient flex items-center gap-2 px-5 py-2.5 text-xs cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
