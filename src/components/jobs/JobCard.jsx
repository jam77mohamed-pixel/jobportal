import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Trash2, 
  Zap, 
  Send,
  MoreVertical,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';

export const JobCard = ({ job, onEdit, onDelete, onApply }) => {
  const { role } = useAuth();
  const { isJobSaved, toggleSaveJob, toggleJobStatus, applications } = useJobs();
  const [menuOpen, setMenuOpen] = useState(false);

  const saved = isJobSaved(job.id);
  const isOpen = job.status === 'Open';
  const isRecruiter = role === 'recruiter';

  // Specific applicants count for this job
  const jobApplicants = applications.filter(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  const hasApplied = applications.some(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  // Alternating neon card glowing border
  const isCyan = Number(job.id) % 2 === 0;
  const cardBorderClass = isCyan ? 'neon-card-cyan' : 'neon-card-magenta';

  return (
    <div className={`group relative ${cardBorderClass} p-5 flex flex-col justify-between transition-all duration-300 text-slate-200`}>
      <div>
        {/* Top Header: Title, 3-dots, and Company */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <Link
              to={`/jobs/${job.id}`}
              className="text-base sm:text-lg font-bold text-cyan-300 hover:text-white transition-colors line-clamp-1 group-hover:text-cyan-200"
            >
              {job.title}
            </Link>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {job.company}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-[#0c1236] border border-slate-700 rounded-xl shadow-2xl py-1 z-30 text-left text-xs">
                <Link
                  to={`/jobs/${job.id}`}
                  className="block px-3 py-1.5 text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
                >
                  View Details
                </Link>
                {isRecruiter ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        toggleJobStatus(job.id);
                      }}
                      className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-slate-800"
                    >
                      {isOpen ? 'Close Role' : 'Reopen Role'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(job);
                      }}
                      className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
                    >
                      Edit Post
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete(job);
                      }}
                      className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-950/40"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      toggleSaveJob(job.id);
                    }}
                    className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-slate-800"
                  >
                    {saved ? 'Unsave Job' : 'Save Job'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Location & Salary Row */}
        <div className="flex items-center justify-between text-xs text-slate-400 my-2.5">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{job.location}</span>
          </div>
          <span className="font-extrabold text-white text-xs sm:text-sm">
            {job.salaryFormatted}
          </span>
        </div>

        {/* Skill & Notice Badges (Matching Reference Image 3) */}
        <div className="flex flex-wrap gap-1.5 my-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-emerald">
            {job.noticePeriod} Notice
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-cyan">
            {job.employmentType}
          </span>
          {job.skills && job.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-purple">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {/* Recruiter controls */}
        {isRecruiter ? (
          <div className="flex items-center justify-between w-full">
            <Link
              to={`/candidates?search=${encodeURIComponent(job.title)}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{jobApplicants.length} Applicants</span>
            </Link>

            <Link
              to={`/jobs/${job.id}`}
              className="px-4 py-1.5 rounded-xl btn-action-gradient text-white text-xs font-bold hover:scale-105 transition-transform"
            >
              Manage
            </Link>
          </div>
        ) : (
          /* Candidate controls */
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => toggleSaveJob(job.id)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                saved
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                  : 'border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={saved ? 'Remove Bookmark' : 'Save Job'}
            >
              {saved ? <BookmarkCheck className="w-4 h-4 fill-cyan-400 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {hasApplied ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                Applied ✓
              </span>
            ) : isOpen ? (
              <button
                type="button"
                onClick={() => onApply && onApply(job)}
                className="px-5 py-1.5 rounded-xl btn-gradient-glow text-white text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                Apply
              </button>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-500 text-xs font-bold">
                Closed
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
