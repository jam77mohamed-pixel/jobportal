import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  Users, 
  FileText, 
  Bookmark, 
  Activity, 
  PlusCircle, 
  ShieldCheck, 
  Star, 
  MapPin,
  Clock,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompanies } from '../context/CompanyContext';
import { useJobs } from '../context/JobContext';
import { StatCard } from '../components/common/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { IndustryBreakdown } from '../components/dashboard/IndustryBreakdown';
import { ApplicationTrendsChart } from '../components/dashboard/ApplicationTrendsChart';
import { CompanyFormModal } from '../components/companies/CompanyFormModal';
import { JobFormModal } from '../components/jobs/JobFormModal';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { companies, totalCompaniesCount } = useCompanies();
  const { 
    totalJobsCount, 
    activeJobsCount, 
    applications, 
    candidates, 
    savedJobs, 
    updateApplicationStatus 
  } = useJobs();
  
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Numbers for stats (matching all 6 required dashboard metrics)
  const totalCompanies = totalCompaniesCount || companies.length || 15;
  const totalJobs = totalJobsCount || 10;
  const activePostings = activeJobsCount || 7;
  const totalCandidates = candidates?.length || 6;
  const totalApplications = applications.length || 5;
  const totalSavedJobs = savedJobs?.length || 0;

  const immediateCandidates = applications.filter((a) => a.noticePeriod?.toLowerCase().includes('immediate')).length;
  const shortlistedCandidates = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewsScheduled = applications.filter((a) => a.status === 'Interview Scheduled').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl bg-[#1A1A1A]/95 border border-neutral-800 text-white p-6 sm:p-9 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8),0_0_15px_rgba(0,242,254,0.1)]">
        {/* Ambient neon gradient blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>JOBSOURCE Employer Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Welcome back, {user?.name || 'Employer'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              You have {activePostings} active job openings across {totalCompanies} registered companies. You can review new applicants, manage jobs, and add companies below.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddCompanyModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>+ Add Company</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl btn-gradient-glow text-white text-xs font-black shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post a Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Numbers: Floating Neon StatCards */}
      <section>
        <div className="flex items-center justify-between mb-3.5 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-cyan-400">
              Overview Numbers
            </h2>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Live Updates</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* 1. Total Companies */}
          <StatCard
            title="Total Companies"
            value={totalCompanies}
            change="+8%"
            isPositive={true}
            colorScheme="cyan"
            sparklineType="bars"
            subtitle="Registered"
          />

          {/* 2. Total Jobs */}
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            change="+14%"
            isPositive={true}
            colorScheme="purple"
            sparklineType="wave"
            subtitle="All positions"
          />

          {/* 3. Active Job Postings */}
          <StatCard
            title="Active Postings"
            value={activePostings}
            change="+12%"
            isPositive={true}
            colorScheme="emerald"
            sparklineType="bars"
            subtitle="Open now"
          />

          {/* 4. Total Candidates */}
          <StatCard
            title="Total Candidates"
            value={totalCandidates}
            change="+22%"
            isPositive={true}
            colorScheme="magenta"
            sparklineType="donut"
            subtitle="Verified profiles"
          />

          {/* 5. Total Applications */}
          <StatCard
            title="Applications"
            value={totalApplications}
            change="+19%"
            isPositive={true}
            colorScheme="purple"
            sparklineType="bars"
            subtitle="Submitted"
          />

          {/* 6. Saved Jobs */}
          <StatCard
            title="Saved Jobs"
            value={totalSavedJobs}
            change="+10%"
            isPositive={true}
            colorScheme="amber"
            sparklineType="wave"
            subtitle="Bookmarked"
          />
        </div>

        {/* Live Fast-Track Highlights Strip */}
        <div className="mt-3.5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Ready Immediately:</span>
            <strong className="text-emerald-300 font-black">{immediateCandidates} Candidates</strong>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
            <span className="text-slate-300">Interviews Scheduled:</span>
            <strong className="text-fuchsia-300 font-black">{interviewsScheduled} Active</strong>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Shortlisted:</span>
            <strong className="text-cyan-300 font-black">{shortlistedCandidates} Approved</strong>
          </div>
        </div>
      </section>

      {/* Quick Action Workflows */}
      <QuickActions
        onOpenAddCompanyModal={() => setIsAddCompanyModalOpen(true)}
      />

      {/* SECTION: HIRING CHARTS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-cyan-300">
            Hiring Trends & Popular Roles
          </h2>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Row 1: Trends + Popular Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <ApplicationTrendsChart />
          </div>
          <div className="lg:col-span-5">
            <IndustryBreakdown />
          </div>
        </div>
      </section>

      {/* Recent Applicants Section */}
      <div className="neon-card-cyan p-5 sm:p-6 bg-[#1A1A1A]/95 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-cyan mb-1">
              <Zap className="w-3 h-3" />
              <span>Recent Applicants</span>
            </div>
            <h3 className="text-base font-black text-white tracking-wide uppercase">
              Candidates Ready to Join
            </h3>
            <p className="text-xs text-slate-400">
              Review candidates who applied and choose next steps
            </p>
          </div>

          <Link
            to="/candidates"
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-200 transition-colors self-start sm:self-center"
          >
            <span>View All Applicants ({applications.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {applications.slice(0, 3).map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {app.candidateName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{app.candidateName}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{app.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tag-emerald">
                    {app.noticePeriod}
                  </span>
                </div>

                <div className="mt-3 text-xs text-slate-300">
                  <p className="truncate">
                    Job: <strong className="text-white">{app.jobTitle}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {app.company} &bull; Status: <span className="font-semibold text-cyan-400">{app.status}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    app.status === 'Shortlisted'
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                  }`}
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  onClick={() => updateApplicationStatus(app.id, 'Interview Scheduled')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    app.status === 'Interview Scheduled'
                      ? 'bg-fuchsia-500 text-white font-black'
                      : 'bg-slate-800 text-fuchsia-300 hover:bg-slate-700'
                  }`}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity + Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <RecentActivityFeed />
        </div>

        <div className="lg:col-span-5">
          <div className="app-card bg-[#1A1A1A]/95 border border-neutral-800 p-5 sm:p-6 shadow-2xl flex flex-col justify-between h-full text-slate-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black tracking-wide uppercase text-white">
                    Companies
                  </h3>
                  <p className="text-xs text-slate-400">Hiring organizations in your portal</p>
                </div>
                <Link
                  to="/companies"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {companies.slice(0, 4).map((comp) => (
                  <Link
                    key={comp.id}
                    to={`/companies/${comp.id}`}
                    className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                        {comp.logo ? (
                          <img src={comp.logo} alt={comp.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          comp.name?.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                            {comp.name}
                          </h4>
                          {comp.rating && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-400">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {comp.rating}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{comp.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold tag-cyan px-2 py-0.5 rounded-full">
                        {comp.openJobsCount || 3} Jobs
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Need to add another company?</span>
              <button
                type="button"
                onClick={() => setIsAddCompanyModalOpen(true)}
                className="font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                + Add Company
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Company Modal */}
      <CompanyFormModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
      />

      {/* Post Job Modal */}
      <JobFormModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
      />
    </div>
  );
};
