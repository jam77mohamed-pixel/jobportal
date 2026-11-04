import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Zap, 
  Bookmark, 
  BookmarkCheck, 
  Edit3, 
  Trash2, 
  Users 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';

export const JobRow = ({ job, onEdit, onDelete, onApply }) => {
  const { role } = useAuth();
  const { isJobSaved, toggleSaveJob, toggleJobStatus, applications } = useJobs();

  const saved = isJobSaved(job.id);
  const isOpen = job.status === 'Open';
  const isRecruiter = role === 'recruiter';
  const isImmediate = job.noticePeriod?.toLowerCase().includes('immediate');

  const jobApplicants = applications.filter(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  const hasApplied = applications.some(
    (a) => Number(a.jobId) === Number(job.id) || a.jobTitle?.toLowerCase() === job.title?.toLowerCase()
  );

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors text-xs text-slate-300">
      {/* Title & Company */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 font-bold shrink-0">
            {job.company?.charAt(0) || 'J'}
          </div>
          <div className="min-w-0">
            <Link
              to={`/jobs/${job.id}`}
              className="text-sm font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1"
            >
              {job.title}
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
              <span className="font-medium text-slate-300">{job.company}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {job.location}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Notice Period */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
          isImmediate ? 'tag-emerald' : 'tag-cyan'
        }`}>
          {isImmediate ? <Zap className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
          <span>{job.noticePeriod} Notice</span>
        </span>
      </td>

      {/* Salary */}
      <td className="py-3.5 px-4 whitespace-nowrap font-bold text-white">
        {job.salaryFormatted}
      </td>

      {/* Status */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          isOpen ? 'tag-emerald' : 'bg-slate-800 text-slate-400'
        }`}>
          {job.status}
        </span>
      </td>

      {/* Action */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        {isRecruiter ? (
          <div className="flex items-center justify-end gap-1.5">
            <Link
              to={`/candidates?search=${encodeURIComponent(job.title)}`}
              className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 hover:text-white text-[11px] font-bold flex items-center gap-1"
            >
              <Users className="w-3 h-3" />
              <span>{jobApplicants.length}</span>
            </Link>
            <button
              type="button"
              onClick={() => onEdit(job)}
              className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg transition-colors cursor-pointer"
              title="Edit Post"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(job)}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
              title="Delete Post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => toggleSaveJob(job.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              title={saved ? 'Remove Bookmark' : 'Save Job'}
            >
              {saved ? <BookmarkCheck className="w-4 h-4 fill-cyan-400 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {hasApplied ? (
              <span className="text-[11px] font-bold text-emerald-400">Applied ✓</span>
            ) : isOpen ? (
              <button
                type="button"
                onClick={() => onApply && onApply(job)}
                className="px-3 py-1 rounded-xl btn-gradient-glow text-white text-[11px] font-bold cursor-pointer"
              >
                Apply
              </button>
            ) : (
              <span className="text-[11px] text-slate-500">Closed</span>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};
