import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  Edit3, 
  Trash2, 
  Zap, 
  Globe, 
  Share2, 
  Users, 
  ChevronRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { useCompanies } from '../context/CompanyContext';
import { ApplyJobModal } from '../components/jobs/ApplyJobModal';
import { JobFormModal } from '../components/jobs/JobFormModal';
import { DeleteJobModal } from '../components/jobs/DeleteJobModal';
import { toast } from 'react-toastify';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { 
    getJobById, 
    isJobSaved, 
    toggleSaveJob, 
    toggleJobStatus, 
    deleteJob, 
    applications,
    updateApplicationStatus 
  } = useJobs();
  const { companies } = useCompanies();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="app-card p-12 text-center space-y-4 max-w-lg mx-auto my-12 bg-[#1A1A1A]/95 border border-neutral-800 animate-fade-in text-white">
        <div className="w-16 h-16 rounded-2xl bg-rose-950 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
          <Briefcase className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Job Posting Not Found</h2>
        <p className="text-xs text-slate-400">
          The position you are looking for may have been filled or removed by the employer.
        </p>
        <button
          type="button"
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 px-4 py-2 btn-gradient-glow text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Job Listings</span>
        </button>
      </div>
    );
  }

  const isRecruiter = role === 'recruiter';
  const saved = isJobSaved(job.id);
  const isOpen = job.status === 'Open';
  const relatedCompany = companies.find((c) => c.name.toLowerCase() === job.company.toLowerCase());

  const jobApplications = applications.filter(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  const userApplication = applications.find(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  const handleConfirmDelete = () => {
    deleteJob(job.id);
    navigate('/jobs');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-slate-200 pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Listings</span>
        </button>
      </div>

      {/* Main Header Card (Glowing Neon Cyber Border) */}
      <div className="neon-card-cyan p-6 sm:p-8 bg-[#1A1A1A]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-black text-xl shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                job.company?.charAt(0) || 'J'
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
                  {job.company}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isOpen ? 'tag-emerald' : 'bg-slate-800 text-slate-500'
                }`}>
                  {isOpen ? 'Active Opening' : 'Closed'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 font-medium text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {job.location}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {job.employmentType}
                </span>
                <span>&bull;</span>
                <span>Posted {job.postedAt}</span>
              </div>
            </div>
          </div>

          {/* Top-Right Action Controls (Role-Based) */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Share Job"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Recruiter Responsibilities */}
            {isRecruiter ? (
              <>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => toggleJobStatus(job.id)}
                    className="px-2.5 py-1.5 text-xs font-bold rounded-lg text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isOpen ? 'Close Role' : 'Reopen Role'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg transition-colors cursor-pointer"
                    title="Edit Job"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                    title="Delete Job"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  to={`/candidates?search=${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl btn-action-gradient text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>{jobApplications.length} Applicants</span>
                </Link>
              </>
            ) : (
              /* Candidate Responsibilities */
              <>
                <button
                  type="button"
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    saved
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                      : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  title={saved ? 'Remove Bookmark' : 'Save Job'}
                >
                  {saved ? <BookmarkCheck className="w-4 h-4 fill-cyan-400 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
                </button>

                {userApplication ? (
                  <Link
                    to="/applications"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Applied ({userApplication.status})</span>
                  </Link>
                ) : isOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 btn-gradient-glow text-white text-xs sm:text-sm font-black rounded-xl shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </button>
                ) : (
                  <span className="px-4 py-2.5 bg-slate-800 text-slate-500 text-xs font-bold rounded-xl">
                    Applications Closed
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compensation</span>
            <div className="flex items-center gap-1 text-sm font-black text-white mt-0.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{job.salaryFormatted}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Notice Preference</span>
            <div className="flex items-center gap-1 text-sm font-black text-cyan-300 mt-0.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{job.noticePeriod}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience Tier</span>
            <div className="text-sm font-black text-white mt-0.5">
              {job.experienceLevel} Level
            </div>
          </div>

          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Deadline</span>
            <div className="flex items-center gap-1 text-sm font-black text-slate-200 mt-0.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(job.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Left, Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Full Job Spec */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Position */}
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-3">
            <h3 className="text-base font-black text-white tracking-wide uppercase">
              About the Position
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-4">
              <h3 className="text-base font-black text-white tracking-wide uppercase">
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-3">
            <h3 className="text-base font-black text-white tracking-wide uppercase">
              Required Skills & Competencies
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {job.skills && job.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-bold tag-purple">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notice Period Guarantee */}
          <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 shrink-0 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <h4 className="text-sm font-bold text-cyan-300">Fast-Track Notice Period Match</h4>
              <p>
                The employer ({job.company}) has prioritized this listing for talent on immediate or 15–30 day notice period. Submitted applications are reviewed within 48 business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Role-Tailored Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* RECRUITER VIEW: Applicant Pipeline for this Role */}
          {isRecruiter ? (
            <div className="neon-card-cyan p-6 bg-[#1A1A1A]/95 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase text-white">
                    Applicants for this Job
                  </h3>
                  <p className="text-xs text-slate-400">
                    {jobApplications.length} candidate{jobApplications.length === 1 ? '' : 's'} applied for this role
                  </p>
                </div>
                <span className="text-[10px] font-bold tag-cyan px-2 py-0.5 rounded-full">
                  Employer View
                </span>
              </div>

              {jobApplications.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-400 space-y-1">
                  <p className="font-bold text-white">No applicants yet</p>
                  <p>Candidates on active notice will appear here upon submission.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {jobApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {app.candidateName?.charAt(0) || 'C'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{app.candidateName}</h4>
                            <p className="text-[10px] text-cyan-400">{app.noticePeriod} Notice</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tag-cyan">
                          {app.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                          className="flex-1 py-1 text-[11px] font-bold rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 cursor-pointer"
                        >
                          Shortlist
                        </button>
                        <button
                          type="button"
                          onClick={() => updateApplicationStatus(app.id, 'Interview Scheduled')}
                          className="flex-1 py-1 text-[11px] font-bold rounded-lg bg-slate-800 text-fuchsia-300 hover:bg-slate-700 cursor-pointer"
                        >
                          Interview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to={`/candidates?search=${encodeURIComponent(job.title)}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 btn-action-gradient text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>View All Applicants</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            /* CANDIDATE VIEW: Quick Apply Card */
            <div className="neon-card-magenta p-6 bg-[#1A1A1A]/95 shadow-2xl space-y-4">
              <h3 className="text-sm font-black uppercase text-white">
                Ready to take the next step?
              </h3>
              <p className="text-xs text-slate-400">
                Submit your notice period details and resume directly to {job.company}&apos;s talent team.
              </p>

              {userApplication ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Application Active</span>
                  </div>
                  <p className="text-slate-300">
                    Status: <strong className="text-emerald-400">{userApplication.status}</strong>
                  </p>
                  <Link
                    to="/applications"
                    className="block text-center w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors mt-2"
                  >
                    View Status Tracker
                  </Link>
                </div>
              ) : isOpen ? (
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-3 px-4 btn-gradient-glow text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Send className="w-4 h-4 inline mr-2" />
                  <span>Apply for this Position</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900 text-slate-500 text-xs text-center font-bold">
                  Position Currently Closed
                </div>
              )}
            </div>
          )}

          {/* Hiring Company Overview */}
          <div className="app-card p-6 bg-[#1A1A1A]/95 border border-neutral-800 space-y-4">
            <h3 className="text-sm font-black uppercase text-white">
              About {job.company}
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{relatedCompany?.industry || job.category} Industry</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{relatedCompany?.location || job.location}</span>
              </div>
            </div>

            {relatedCompany && (
              <Link
                to={`/companies/${relatedCompany.id}`}
                className="block w-full py-2 px-3 text-center text-xs font-bold text-cyan-300 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700"
              >
                View Full Company Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={job}
      />

      <JobFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingJob={job}
      />

      <DeleteJobModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        jobTitle={job.title}
      />
    </div>
  );
};
