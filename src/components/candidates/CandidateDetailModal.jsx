import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useJobs } from '../../context/JobContext';
import { toast } from 'react-toastify';

export const CandidateDetailModal = ({ isOpen, onClose, candidate, onEdit }) => {
  const { applications, shortlistCandidate, scheduleInterviewForCandidate } = useJobs();

  if (!isOpen || !candidate) return null;

  // Check if this candidate has an active application
  const matchedApp = applications?.find(
    (a) =>
      a.candidateName?.toLowerCase().trim() === candidate.name?.toLowerCase().trim() ||
      a.email?.toLowerCase().trim() === candidate.email?.toLowerCase().trim()
  );

  const currentStatus = candidate.status || matchedApp?.status || 'Under Review';

  const handleDownloadResume = () => {
    toast.success(`Opening ${candidate.resumeName || 'candidate-resume.pdf'}...`);
  };

  const handleShortlist = () => {
    shortlistCandidate(candidate.id);
    onClose();
  };

  const handleScheduleInterview = () => {
    scheduleInterviewForCandidate(candidate.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Candidate Profile"
      subtitle={`${candidate.name} • ${candidate.title}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-slate-200">
        {/* Header Hero Strip */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-fuchsia-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={candidate.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={candidate.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.35)] shrink-0"
          />

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-white">{candidate.name}</h2>
              <span className="tag-emerald text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{candidate.noticePeriod} Notice</span>
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                currentStatus === 'Interview Scheduled'
                  ? 'tag-magenta'
                  : currentStatus === 'Shortlisted'
                  ? 'tag-cyan'
                  : currentStatus === 'Offer Extended'
                  ? 'tag-emerald'
                  : 'tag-amber'
              }`}>
                Status: {currentStatus}
              </span>
            </div>
            <p className="text-sm font-semibold text-cyan-300">{candidate.title}</p>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{candidate.address}</span>
            </p>
          </div>

          {onEdit && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(candidate);
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Contact Information Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
              <a href={`mailto:${candidate.email}`} className="text-xs font-bold text-white hover:text-cyan-300 truncate block">
                {candidate.email}
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/30">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</p>
              <p className="text-xs font-bold text-white truncate">{candidate.phone}</p>
            </div>
          </div>
        </div>

        {/* Professional Summary / Bio */}
        {candidate.bio && (
          <div className="space-y-1.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">About Candidate</h4>
            <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
              {candidate.bio}
            </p>
          </div>
        )}

        {/* Skills List */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">Key Skills & Abilities</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills && candidate.skills.map((skill) => (
              <span key={skill} className="tag-cyan px-3 py-1 rounded-lg text-xs font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Briefcase className="w-4 h-4" />
              <h5 className="text-xs font-black uppercase tracking-wider text-white">Experience</h5>
            </div>
            <p className="text-sm font-extrabold text-cyan-300">{candidate.experience}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{candidate.experienceDetails}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-fuchsia-400">
              <GraduationCap className="w-4 h-4" />
              <h5 className="text-xs font-black uppercase tracking-wider text-white">Education</h5>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{candidate.education}</p>
          </div>
        </div>

        {/* Resume Preview & Download UI (Email Requirement) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{candidate.resumeName || 'candidate-resume.pdf'}</p>
              <p className="text-[10px] text-slate-400">Verified PDF Resume &bull; 2.4 MB</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadResume}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleShortlist}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/40 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Shortlist Candidate</span>
          </button>
          <button
            type="button"
            onClick={handleScheduleInterview}
            className="btn-action-gradient px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
