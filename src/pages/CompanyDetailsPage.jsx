import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowLeft, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Share2, 
  Heart,
  Edit3,
  Trash2,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useCompanies } from '../context/CompanyContext';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { CompanyFormModal } from '../components/companies/CompanyFormModal';
import { DeleteConfirmModal } from '../components/companies/DeleteConfirmModal';
import { ApplyJobModal } from '../components/jobs/ApplyJobModal';
import { toast } from 'react-toastify';

export const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { getCompanyById, deleteCompany } = useCompanies();
  const { jobs, applications } = useJobs();

  const company = getCompanyById(id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);

  if (!company) {
    return (
      <div className="app-card p-12 text-center max-w-lg mx-auto my-12 bg-[#1A1A1A]/95 border border-neutral-800 text-white animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-4">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Company Not Found</h2>
        <p className="text-xs text-slate-400 mt-2 mb-6">
          The organization profile you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const companyJobs = jobs.filter(
    (j) => j.company.toLowerCase() === company.name.toLowerCase()
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.info('Company profile link copied to clipboard!');
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    toast.info(!isSaved ? `Saved ${company.name} to bookmarks!` : `Removed ${company.name} from bookmarks.`);
  };

  const handleConfirmDelete = (companyId) => {
    deleteCompany(companyId);
    toast.success('Company profile removed.');
    navigate('/companies');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-slate-200">
      {/* Breadcrumb & Top bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Companies</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleToggleSave}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isSaved ? 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-950/40' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-fuchsia-400'
            }`}
            title="Bookmark Company"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {role === 'recruiter' && (
            <>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="app-card overflow-hidden bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl">
        <div className="h-44 sm:h-52 bg-gradient-to-r from-cyan-900/40 via-neutral-900 to-fuchsia-950/40 relative border-b border-neutral-800">
          <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold tag-amber flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{company.rating || 4.8} / 5.0 Verified Employer</span>
            </span>
          </div>
        </div>

        {/* Profile info header */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-neutral-900 border-4 border-[#1A1A1A] shadow-2xl flex items-center justify-center text-cyan-400 font-black text-3xl shrink-0 overflow-hidden">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  company.name?.charAt(0) || 'C'
                )}
              </div>
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {company.name}
                  </h1>
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tag-cyan">
                    {company.industry}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tag-emerald">
                    Notice Fast-Track
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Headquarters</p>
                <p className="font-bold text-white truncate">{company.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/30">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Team Size</p>
                <p className="font-bold text-white">{(company.employees || 0).toLocaleString()} Staff</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Inquiries</p>
                <a href={`mailto:${company.contactEmail}`} className="font-bold text-cyan-400 hover:underline truncate block">
                  {company.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Active Roles</p>
                <p className="font-bold text-emerald-400">{companyJobs.length || company.openJobsCount || 2} Openings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: About & Open Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800">
            <h3 className="text-lg font-black text-white mb-3 tracking-wide uppercase">About {company.name}</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {company.description}
            </p>
          </div>

          {/* Open Jobs List for this Company */}
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white tracking-wide uppercase">Current Job Openings</h3>
                <p className="text-xs text-slate-400">
                  {companyJobs.length} live notice positions at {company.name}
                </p>
              </div>
              <Link
                to={`/jobs?search=${encodeURIComponent(company.name)}`}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View in Job Market</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {companyJobs.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-900 text-center text-xs text-slate-400">
                  No active listings registered for this company.
                </div>
              ) : (
                companyJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                        >
                          {job.title}
                        </Link>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tag-emerald">
                          {job.noticePeriod}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>{job.location}</span>
                        <span>&bull;</span>
                        <span className="text-white font-bold">{job.salaryFormatted}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                      >
                        Details
                      </Link>

                      {role === 'recruiter' ? (
                        <Link
                          to={`/candidates?search=${encodeURIComponent(job.title)}`}
                          className="px-3.5 py-1.5 btn-action-gradient text-white rounded-xl text-xs font-bold"
                        >
                          Applicants
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setApplyingJob(job)}
                          className="px-4 py-1.5 btn-gradient-glow text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Perks & Contact */}
        <div className="lg:col-span-4 space-y-6">
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-black uppercase text-white tracking-wide">Talent Contact</h3>
            <p className="text-xs text-slate-400">
              Get in touch directly with the hiring team at {company.name}.
            </p>
            <a
              href={`mailto:${company.contactEmail}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl btn-gradient-glow text-white text-xs font-bold"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Contact Talent Team</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanyFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingCompany={company}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        company={company}
        onConfirm={handleConfirmDelete}
      />

      <ApplyJobModal
        isOpen={Boolean(applyingJob)}
        onClose={() => setApplyingJob(null)}
        job={applyingJob}
      />
    </div>
  );
};
