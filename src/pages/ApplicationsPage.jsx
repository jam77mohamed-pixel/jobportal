import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Mail, 
  Phone, 
  FileText, 
  Search, 
  Calendar, 
  Zap, 
  UserCheck, 
  Building2, 
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Send,
  MapPin,
  DollarSign,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { ApplyJobModal } from '../components/jobs/ApplyJobModal';
import { toast } from 'react-toastify';

export const ApplicationsPage = ({ defaultTab = 'applications' }) => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || defaultTab || 'applications';

  const { role } = useAuth();
  const { 
    applications, 
    savedJobs, 
    removeSavedJob, 
    withdrawApplication, 
    updateApplicationStatus 
  } = useJobs();

  // Active top-level tab: 'applications' | 'saved'
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filter state for Applications tab
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('All');

  // Modal state for applying to a saved job
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  const isRecruiter = role === 'recruiter';

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus =
      statusFilter === 'All' || app.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesNotice =
      noticeFilter === 'All' || app.noticePeriod?.toLowerCase().includes(noticeFilter.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      app.candidateName?.toLowerCase().includes(q) ||
      app.jobTitle?.toLowerCase().includes(q) ||
      app.company?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.status?.toLowerCase().includes(q);

    return matchesStatus && matchesNotice && matchesQuery;
  });

  const immediateCount = applications.filter((a) => a.noticePeriod?.toLowerCase().includes('immediate')).length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const reviewCount = applications.filter((a) => a.status === 'Under Review').length;

  const handleWithdraw = (appId, jobTitle) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${jobTitle}"?`)) {
      withdrawApplication(appId);
    }
  };

  const handleOpenApplyForSavedJob = (job) => {
    setSelectedJobToApply(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-slate-200">
      {/* Top Banner */}
      <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tag-cyan mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Job Applications & Saved Roles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Applications & Saved Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Track job applications, review candidate hiring stages, manage withdrawals, and review saved job bookmarks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-2xl border border-slate-800 self-start md:self-center">
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications ({applications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Saved Jobs ({savedJobs.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Applications
            </p>
            <p className="text-2xl font-black text-white mt-0.5">{applications.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Under Review
            </p>
            <p className="text-2xl font-black text-cyan-400 mt-0.5">{reviewCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Shortlisted</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{shortlistedCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Saved Jobs</p>
            <p className="text-2xl font-black text-fuchsia-400 mt-0.5">{savedJobs.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/30">
            <Bookmark className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TAB 1: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {/* Search & Filter Header */}
          <div className="app-card p-4 bg-[#1A1A1A]/95 border border-neutral-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search candidate name, job title, company..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 text-xs sm:text-sm text-white placeholder:text-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <select
                  value={noticeFilter}
                  onChange={(e) => setNoticeFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs text-white rounded-xl focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Joining Times</option>
                  <option value="Immediate">Immediate Joiner</option>
                  <option value="15">15 Days Notice</option>
                  <option value="30">30 Days Notice</option>
                </select>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800 text-xs no-scrollbar">
              {['All', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Extended', 'Withdrawn', 'Rejected'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Listing */}
          {filteredApps.length === 0 ? (
            <div className="app-card p-12 text-center space-y-3 bg-[#1A1A1A]/95 border border-neutral-800">
              <Users className="w-10 h-10 text-cyan-400 mx-auto" />
              <h3 className="text-base font-bold text-white">No Applications Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No job applications match your current search query or filter selection.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="neon-card-cyan p-5 bg-[#1A1A1A]/95 shadow-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                        {app.candidateName ? app.candidateName.charAt(0) : 'A'}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-white">{app.candidateName}</h3>
                          {app.noticePeriod && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tag-emerald">
                              {app.noticePeriod}
                            </span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            app.status === 'Withdrawn'
                              ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                              : app.status === 'Shortlisted'
                              ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                              : app.status === 'Interview Scheduled'
                              ? 'bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/40'
                              : app.status === 'Offer Extended'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'tag-cyan'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Applied for{' '}
                          <Link to={`/jobs/${app.jobId}`} className="text-cyan-300 hover:underline font-bold">
                            {app.jobTitle}
                          </Link>{' '}
                          at <strong className="text-white">{app.company}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Actions Area */}
                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                      {/* Recruiter Stage Status Updates */}
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                        disabled={app.status === 'Withdrawn'}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          app.status === 'Shortlisted'
                            ? 'bg-cyan-500 text-slate-950 font-black'
                            : 'bg-slate-900 border border-slate-700 text-cyan-300 hover:bg-slate-800'
                        }`}
                      >
                        Shortlist
                      </button>

                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, 'Interview Scheduled')}
                        disabled={app.status === 'Withdrawn'}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          app.status === 'Interview Scheduled'
                            ? 'bg-fuchsia-500 text-white font-black'
                            : 'bg-slate-900 border border-slate-700 text-fuchsia-300 hover:bg-slate-800'
                        }`}
                      >
                        Interview
                      </button>

                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, 'Offer Extended')}
                        disabled={app.status === 'Withdrawn'}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          app.status === 'Offer Extended'
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-slate-900 border border-slate-700 text-emerald-300 hover:bg-slate-800'
                        }`}
                      >
                        Offer
                      </button>

                      {/* Withdraw Application */}
                      {app.status !== 'Withdrawn' ? (
                        <button
                          type="button"
                          onClick={() => handleWithdraw(app.id, app.jobTitle)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer"
                          title="Withdraw this application"
                        >
                          Withdraw Application
                        </button>
                      ) : (
                        <span className="px-3 py-1 text-xs font-bold text-rose-400 bg-rose-950/30 border border-rose-900 rounded-lg">
                          Withdrawn
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                        disabled={app.status === 'Withdrawn'}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                        title="Mark as Rejected"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pitch / Cover Note */}
                  {app.coverNote && (
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-cyan-300">Candidate Note: </span>
                      {app.coverNote}
                    </div>
                  )}

                  {/* Contact Info & Meta Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex flex-wrap items-center gap-4">
                      {app.email && (
                        <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 text-cyan-400 hover:underline">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{app.email}</span>
                        </a>
                      )}
                      {app.phone && (
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{app.phone}</span>
                        </span>
                      )}
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl.startsWith('http') ? app.resumeUrl : `https://${app.resumeUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-fuchsia-300 font-semibold hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Resume</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span>Applied {app.appliedAt || 'recently'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED JOBS LIST */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#1A1A1A]/95 rounded-2xl border border-neutral-800">
            <div>
              <h2 className="text-lg font-black text-white">Bookmarked & Saved Positions</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review jobs you have saved for consideration or apply when ready.
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-4 py-2 btn-gradient-glow text-white text-xs font-black rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse All Open Jobs</span>
            </Link>
          </div>

          {savedJobs.length === 0 ? (
            <div className="app-card p-12 text-center space-y-4 bg-[#1A1A1A]/95 border border-neutral-800">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-fuchsia-950/60 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Bookmark className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Saved Jobs Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the bookmark icon on any job card in the Job Openings page to save it here for quick access.
                </p>
              </div>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs font-black rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Explore Open Jobs</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="app-card p-5 bg-[#1A1A1A]/95 border border-neutral-800 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'}
                          alt={job.company}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/jobs/${job.id}`}
                            className="text-sm font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1"
                          >
                            {job.title}
                          </Link>
                          <p className="text-xs text-slate-400 font-semibold">{job.company}</p>
                        </div>
                      </div>

                      {/* Remove Saved Job button */}
                      <button
                        type="button"
                        onClick={() => removeSavedJob(job.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                        title="Remove from saved jobs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{job.location}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{job.salaryFormatted || `$${(job.minSalary || 100000).toLocaleString()} - $${(job.maxSalary || 140000).toLocaleString()}`}</span>
                      </span>
                      {job.noticePeriod && (
                        <span className="px-2 py-0.5 rounded-md tag-emerald font-bold">
                          {job.noticePeriod} Notice
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => removeSavedJob(job.id)}
                      className="text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenApplyForSavedJob(job)}
                        className="px-3.5 py-1.5 rounded-xl btn-gradient-glow text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Apply Modal for Saved Job */}
      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedJobToApply(null);
        }}
        job={selectedJobToApply}
      />
    </div>
  );
};
