import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  PlusCircle, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Zap, 
  Clock, 
  MapPin, 
  Filter,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/jobs/JobCard';
import { JobRow } from '../components/jobs/JobRow';
import { JobFormModal } from '../components/jobs/JobFormModal';
import { DeleteJobModal } from '../components/jobs/DeleteJobModal';
import { ApplyJobModal } from '../components/jobs/ApplyJobModal';
import { Pagination } from '../components/common/Pagination';

export const JobsPage = () => {
  const { role } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    jobs,
    filteredJobs,
    paginatedJobs,
    totalJobsCount,
    activeJobsCount,
    savedJobIds,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedJobType,
    setSelectedJobType,
    selectedExperience,
    setSelectedExperience,
    selectedSalaryRange,
    setSelectedSalaryRange,
    selectedNoticePeriod,
    setSelectedNoticePeriod,
    selectedLocation,
    setSelectedLocation,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    resetFilters,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    categoriesList,
    locationsList,
    deleteJob
  } = useJobs();

  const [viewMode, setViewMode] = useState('grid');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);

  useEffect(() => {
    const action = searchParams.get('action');
    const search = searchParams.get('search');
    if (action === 'new' && role === 'recruiter') {
      setIsFormModalOpen(true);
      setEditingJob(null);
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams, setSearchParams, role, setSearchQuery]);

  const handleOpenAdd = () => {
    setEditingJob(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingJobId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingJobId) {
      deleteJob(deletingJobId);
      setIsDeleteModalOpen(false);
      setDeletingJobId(null);
    }
  };

  const handleOpenApply = (job) => {
    setApplyingJob(job);
    setIsApplyModalOpen(true);
  };

  const jobToDelete = jobs.find((j) => j.id === deletingJobId);
  const immediateCount = jobs.filter((j) => j.noticePeriod?.toLowerCase().includes('immediate')).length;
  const isRecruiter = role === 'recruiter';

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Banner (Matching Reference Image 3) */}
      <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 mb-2 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>0–30 Days Notice Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isRecruiter ? 'Notice Period Job Postings' : 'Find Notice Jobs'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {isRecruiter
              ? 'View and manage your open jobs, applicant responses, and hiring details.'
              : 'Browse open jobs with clear salary details, requirements, and easy application.'}
          </p>
        </div>

        {/* View Switcher & Recruiter Post Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table Rows"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {isRecruiter && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2.5 btn-gradient-glow text-white text-xs sm:text-sm font-black rounded-xl shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Category Chips Section (Exact Match to Reference Image 3: Job Type, Location, Salary, Notice) */}
      <div className="app-card p-4 sm:p-5 bg-[#1A1A1A]/95 border border-neutral-800 space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 text-xs sm:text-sm text-white placeholder:text-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chips Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2 border-t border-slate-800">
          {/* 1. Job Type */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Job Type</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Full-time', 'Contract', 'Remote'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedJobType(type === 'All' ? 'All' : type)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    (selectedJobType === type) || (type === 'All' && selectedJobType === 'All')
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Location */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Location</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Remote', 'San Francisco', 'London'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocation(loc === 'All' ? 'All' : loc)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    (selectedLocation === loc) || (loc === 'All' && selectedLocation === 'All')
                      ? 'bg-fuchsia-500 text-white font-bold shadow-[0_0_10px_rgba(247,37,133,0.5)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Salary Range */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Salary Range</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'All', val: 'All' },
                { label: '< $100k', val: '<100k' },
                { label: '$100k - $150k', val: '100k-150k' },
                { label: '$150k+', val: '150k+' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSelectedSalaryRange(item.val)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedSalaryRange === item.val
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Experience Level */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Experience</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Mid', 'Senior', 'Lead'].map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setSelectedExperience(exp === 'All' ? 'All' : exp)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    (selectedExperience === exp) || (exp === 'All' && selectedExperience === 'All')
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Notice Period */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Notice Period</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'All', val: 'All' },
                { label: 'Immediate', val: 'Immediate' },
                { label: '15 Days', val: '15 Days' },
                { label: '30 Days', val: '30 Days' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setSelectedNoticePeriod(item.val)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedNoticePeriod === item.val
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,254,0.5)]'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters, Active Count indicator & Sort Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-2 border-t border-slate-800 text-slate-400">
          <div className="flex items-center gap-3">
            <span>Found <strong className="text-white">{filteredJobs.length}</strong> matching positions</span>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Sort By Dropdown (Module 5: Sort by Latest Jobs) */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              <option value="latest">Sort by Latest Jobs</option>
              <option value="salary-desc">Highest Salary</option>
              <option value="deadline-asc">Application Deadline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Jobs Listing Display */}
      {paginatedJobs.length === 0 ? (
        <div className="app-card p-12 text-center space-y-3 bg-[#1A1A1A]/95 border border-neutral-800">
          <Briefcase className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Positions Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, location, or notice period criteria.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl btn-gradient-glow text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid of Glowing Cards (Matching Reference Image 3) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onApply={handleOpenApply}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="app-card bg-[#1A1A1A]/95 border border-neutral-800 p-4 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 px-4">Role & Organization</th>
                <th className="py-2.5 px-4">Notice Period</th>
                <th className="py-2.5 px-4">Salary</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((job) => (
                <JobRow
                  key={job.id}
                  job={job}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                  onApply={handleOpenApply}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredJobs.length}
        pageSize={pageSize}
      />

      {/* Modals */}
      <JobFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingJob(null);
        }}
        editingJob={editingJob}
      />

      <DeleteJobModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        jobTitle={jobToDelete?.title}
      />

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setApplyingJob(null);
        }}
        job={applyingJob}
      />
    </div>
  );
};
