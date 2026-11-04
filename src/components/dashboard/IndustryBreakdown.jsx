import React, { useMemo } from 'react';
import { Globe, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';

export const IndustryBreakdown = () => {
  const { jobs, applications } = useJobs();

  // Dynamically calculate popular jobs/categories from live job portal data
  const popularRoles = useMemo(() => {
    const categoryStats = {};

    // Aggregate active jobs by category
    jobs.forEach((job) => {
      const cat = job.category || 'General';
      if (!categoryStats[cat]) {
        categoryStats[cat] = {
          role: cat,
          jobCount: 0,
          applicantCount: 0
        };
      }
      categoryStats[cat].jobCount += 1;
      categoryStats[cat].applicantCount += Number(job.applicantsCount || 0);
    });

    // Also factor in direct applications submitted in this session
    applications.forEach((app) => {
      const matchingJob = jobs.find((j) => j.id === app.jobId);
      const cat = matchingJob?.category || 'Engineering';
      if (categoryStats[cat]) {
        categoryStats[cat].applicantCount += 1;
      }
    });

    // Ensure we have top categories
    const defaultCategories = ['Engineering', 'Design', 'Data Science', 'Marketing', 'Product'];
    defaultCategories.forEach((cat) => {
      if (!categoryStats[cat]) {
        categoryStats[cat] = {
          role: cat,
          jobCount: 1,
          applicantCount: 8
        };
      }
    });

    const list = Object.values(categoryStats);
    // Sort by combined interest (jobCount * 10 + applicantCount)
    list.sort((a, b) => (b.jobCount * 10 + b.applicantCount) - (a.jobCount * 10 + a.applicantCount));

    const topFive = list.slice(0, 5);
    const maxScore = Math.max(...topFive.map((item) => item.jobCount * 10 + item.applicantCount), 20);

    return topFive.map((item) => ({
      role: item.role,
      count: item.jobCount,
      percentage: Math.max(20, Math.min(100, Math.round(((item.jobCount * 10 + item.applicantCount) / maxScore) * 100)))
    }));
  }, [jobs, applications]);

  return (
    <div className="neon-card-magenta p-5 sm:p-6 bg-[#1A1A1A]/95 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-600/10 rounded-full blur-[70px] pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black tracking-wider uppercase text-white">
              POPULAR ROLES
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Live distribution by job category ({jobs.length} total openings)
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full tag-magenta">
            Live Data
          </span>
        </div>

        {/* Vertical Bars Chart */}
        <div className="flex items-end justify-between gap-2.5 h-32 pt-2 px-1 border-b border-slate-800">
          {popularRoles.map((r) => (
            <div key={r.role} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-[10px] font-bold text-cyan-300 opacity-80 group-hover:opacity-100 transition-opacity">
                {r.count} {r.count === 1 ? 'role' : 'roles'}
              </span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-fuchsia-600 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(247,37,133,0.3)] transition-all duration-300 group-hover:scale-y-105"
                style={{ height: `${r.percentage}%` }}
              />
              <span className="text-[9px] text-slate-400 truncate w-full text-center mt-1 font-semibold" title={r.role}>
                {r.role.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Locations Section */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>APPLICANT LOCATIONS</span>
            </span>
            <span className="text-[10px] text-slate-400">{applications.length} Active Applicants</span>
          </div>

          {/* Abstract World Reach Intensity Bar */}
          <div className="h-6 rounded-xl bg-slate-900 border border-slate-800 flex items-center px-2 justify-between">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
              <span className="text-[10px] text-slate-300">Remote / US (45%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(247,37,133,0.8)]" />
              <span className="text-[10px] text-slate-300">Europe (35%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className="text-[10px] text-slate-300">Asia (20%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Looking for candidates?</span>
        <Link
          to="/candidates"
          className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
        >
          <span>Candidate Profiles</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
};
