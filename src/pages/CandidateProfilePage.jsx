import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  PlusCircle, 
  Clock, 
  MapPin, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X,
  GraduationCap,
  Briefcase,
  Calendar
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { CandidateDetailModal } from '../components/candidates/CandidateDetailModal';
import { CandidateFormModal } from '../components/candidates/CandidateFormModal';

export const CandidateProfilePage = () => {
  const { 
    candidates, 
    applications, 
    deleteCandidate, 
    shortlistCandidate, 
    scheduleInterviewForCandidate 
  } = useJobs();

  const [searchQuery, setSearchQuery] = useState('');
  const [noticeFilter, setNoticeFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  
  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Helper to resolve active hiring stage
  const getCandidateStage = (cand) => {
    if (cand.status) return cand.status;
    const match = applications?.find(
      (a) =>
        a.candidateName?.toLowerCase().trim() === cand.name?.toLowerCase().trim() ||
        a.email?.toLowerCase().trim() === cand.email?.toLowerCase().trim()
    );
    return match?.status || 'Under Review';
  };

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        (c.skills && c.skills.some((s) => s.toLowerCase().includes(q)));

      const matchesNotice =
        noticeFilter === 'All' ||
        c.noticePeriod.toLowerCase().includes(noticeFilter.toLowerCase());

      const currentStage = getCandidateStage(c);
      const matchesStage =
        stageFilter === 'All' ||
        currentStage.toLowerCase() === stageFilter.toLowerCase();

      return matchesSearch && matchesNotice && matchesStage;
    });
  }, [candidates, applications, searchQuery, noticeFilter, stageFilter]);

  const shortlistedCount = candidates.filter((c) => getCandidateStage(c) === 'Shortlisted').length;
  const interviewCount = candidates.filter((c) => getCandidateStage(c) === 'Interview Scheduled').length;
  const immediateCount = candidates.filter((c) => c.noticePeriod?.toLowerCase().includes('immediate')).length;

  const handleOpenDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingCandidate(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (candidate) => {
    setEditingCandidate(candidate);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}'s profile?`)) {
      deleteCandidate(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-slate-200">
      {/* Top Banner */}
      <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tag-cyan mb-2">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Candidate Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Candidate Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            View, create, and manage candidate profiles with verified skills, experience, and uploaded resumes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs sm:text-sm font-black rounded-xl shadow-md cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Candidate Profile</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Profiles</p>
            <p className="text-2xl font-black text-white mt-0.5">{candidates.length}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Shortlisted</p>
            <p className="text-2xl font-black text-cyan-300 mt-0.5">{shortlistedCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-400">Interviews</p>
            <p className="text-2xl font-black text-fuchsia-300 mt-0.5">{interviewCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-fuchsia-950 text-fuchsia-400 border border-fuchsia-500/30">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Ready Immediately</p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{immediateCount}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filter Chips */}
      <div className="app-card p-4 sm:p-5 bg-[#1A1A1A]/95 border border-neutral-800 space-y-3.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, skills (e.g. React, Python), location..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 text-xs sm:text-sm text-white placeholder:text-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-400 mr-1">Hiring Stage:</span>
          {['All', 'Shortlisted', 'Interview Scheduled', 'Under Review'].map((stg) => (
            <button
              key={stg}
              type="button"
              onClick={() => setStageFilter(stg)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                stageFilter === stg
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {stg === 'All' ? 'All Stages' : stg}
            </button>
          ))}
        </div>

        {/* Notice Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
          <span className="text-xs font-bold text-slate-400 mr-1">Joining Time:</span>
          {['All', 'Immediate', '15 Days', '30 Days'].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setNoticeFilter(period)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                noticeFilter === period
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {period === 'All' ? 'All Candidates' : period}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Profile Cards Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="p-12 text-center app-card bg-[#1A1A1A]/95 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No candidates found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search query or notice period filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setNoticeFilter('All');
            }}
            className="text-xs font-bold text-cyan-400 underline underline-offset-4 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => {
            const stage = getCandidateStage(candidate);
            return (
              <div
                key={candidate.id}
                className="p-5 rounded-2xl bg-[#0e163d]/80 hover:bg-[#101946] border border-cyan-500/20 hover:border-cyan-400/50 shadow-lg hover:shadow-[0_0_20px_rgba(0,242,254,0.18)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Avatar + Name + Notice Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-xl object-cover border border-cyan-400/40 shadow-xs shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors truncate">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-slate-300 truncate">{candidate.title}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{candidate.address}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${
                      candidate.noticePeriod?.toLowerCase().includes('immediate')
                        ? 'tag-emerald'
                        : candidate.noticePeriod?.toLowerCase().includes('15')
                        ? 'tag-cyan'
                        : 'tag-amber'
                    }`}>
                      {candidate.noticePeriod}
                    </span>
                  </div>

                  {/* Live Stage Badge Directly on Card */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                      stage === 'Interview Scheduled'
                        ? 'tag-magenta shadow-[0_0_10px_rgba(236,72,153,0.35)]'
                        : stage === 'Shortlisted'
                        ? 'tag-cyan shadow-[0_0_10px_rgba(0,242,254,0.35)]'
                        : stage === 'Offer Extended'
                        ? 'tag-emerald shadow-[0_0_10px_rgba(16,185,129,0.35)]'
                        : 'bg-slate-800 text-amber-300 border border-amber-500/30'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>Stage: {stage}</span>
                    </span>
                  </div>

                {/* Experience & Education Tags */}
                <div className="space-y-1.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="flex items-center gap-1.5 truncate">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span><strong>Experience:</strong> {candidate.experience}</span>
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-slate-400 text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                    <span>{candidate.education}</span>
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills && candidate.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="tag-cyan text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills && candidate.skills.length > 4 && (
                    <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Resume indicator */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate text-[11px]">{candidate.resumeName || 'Resume uploaded'}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3.5 mt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(candidate)}
                  className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(candidate)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="Edit Profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(candidate.id, candidate.name)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-colors cursor-pointer"
                  title="Delete Profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        candidate={selectedCandidate}
        onEdit={handleOpenEdit}
      />

      {/* Candidate Form Modal */}
      <CandidateFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCandidate(null);
        }}
        editingCandidate={editingCandidate}
      />
    </div>
  );
};
