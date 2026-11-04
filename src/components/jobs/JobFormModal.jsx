import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, Plus, Trash2, Building, DollarSign, Calendar, MapPin, Zap } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { useCompanies } from '../../context/CompanyContext';
import { Modal } from '../common/Modal';

export const JobFormModal = ({ isOpen, onClose, editingJob = null }) => {
  const { addJob, updateJob } = useJobs();
  const { companies } = useCompanies();
  const [skillInput, setSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState([]);

  const isEdit = Boolean(editingJob);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      company: '',
      category: 'Engineering',
      employmentType: 'Full-time',
      experienceLevel: 'Mid',
      minSalary: 90000,
      maxSalary: 130000,
      location: 'Remote (US)',
      noticePeriod: '15 Days',
      deadline: '2026-12-15',
      status: 'Open',
      description: '',
      responsibilities: ''
    }
  });

  useEffect(() => {
    if (editingJob) {
      setValue('title', editingJob.title || '');
      setValue('company', editingJob.company || '');
      setValue('category', editingJob.category || 'Engineering');
      setValue('employmentType', editingJob.employmentType || 'Full-time');
      setValue('experienceLevel', editingJob.experienceLevel || 'Mid');
      setValue('minSalary', editingJob.minSalary || 90000);
      setValue('maxSalary', editingJob.maxSalary || 130000);
      setValue('location', editingJob.location || 'Remote');
      setValue('noticePeriod', editingJob.noticePeriod || '15 Days');
      setValue('deadline', editingJob.deadline ? editingJob.deadline.slice(0, 10) : '2026-12-15');
      setValue('status', editingJob.status || 'Open');
      setValue('description', editingJob.description || '');
      setValue(
        'responsibilities',
        Array.isArray(editingJob.responsibilities)
          ? editingJob.responsibilities.join('\n')
          : editingJob.responsibilities || ''
      );
      setSkillsList(editingJob.skills || ['React', 'TypeScript']);
    } else {
      reset({
        title: '',
        company: companies[0]?.name || 'TechWave Solutions',
        category: 'Engineering',
        employmentType: 'Full-time',
        experienceLevel: 'Mid',
        minSalary: 90000,
        maxSalary: 130000,
        location: 'Remote (Global)',
        noticePeriod: '15 Days',
        deadline: '2026-12-31',
        status: 'Open',
        description: '',
        responsibilities: ''
      });
      setSkillsList(['React', 'TypeScript', 'Node.js']);
    }
    setSkillInput('');
  }, [editingJob, isOpen, setValue, reset, companies]);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

  const onSubmit = async (data) => {
    const selectedComp = companies.find(
      (c) => c.name.toLowerCase() === (data.company || '').toLowerCase()
    );

    const payload = {
      ...data,
      minSalary: Number(data.minSalary) || 0,
      maxSalary: Number(data.maxSalary) || 0,
      skills: skillsList,
      responsibilities: data.responsibilities
        ? data.responsibilities.split('\n').filter((line) => line.trim().length > 0)
        : [],
      companyLogo: selectedComp?.logo || (editingJob ? editingJob.companyLogo : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80')
    };

    if (isEdit) {
      updateJob(editingJob.id, payload);
    } else {
      addJob(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Job Posting' : 'Post a New Job Opportunity'}
      subtitle="Fast-track listing with notice period prioritization and cyber matching."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Job Title</span> <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Fullstack Engineer (React/Node.js)"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
              errors.title
                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
            }`}
            {...register('title', {
              required: 'Job title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            })}
          />
          {errors.title && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* Company Selection & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hiring Company</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              list="companies-datalist"
              placeholder="Select or enter company"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('company', { required: 'Company name is required' })}
            />
            <datalist id="companies-datalist">
              {companies.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Category / Department
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('category')}
            >
              <option value="Engineering" className="bg-[#0c1238]">Engineering & Development</option>
              <option value="Design" className="bg-[#0c1238]">Product & UI/UX Design</option>
              <option value="Product" className="bg-[#0c1238]">Product Management</option>
              <option value="Data Science" className="bg-[#0c1238]">Data Science & AI/ML</option>
              <option value="Security" className="bg-[#0c1238]">Cyber Security</option>
              <option value="Marketing" className="bg-[#0c1238]">Marketing & Growth</option>
              <option value="Sales" className="bg-[#0c1238]">Sales & Business Dev</option>
            </select>
          </div>
        </div>

        {/* Employment Type & Experience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Employment Type
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('employmentType')}
            >
              <option value="Full-time" className="bg-[#0c1238]">Full-time</option>
              <option value="Part-time" className="bg-[#0c1238]">Part-time</option>
              <option value="Contract" className="bg-[#0c1238]">Contract</option>
              <option value="Internship" className="bg-[#0c1238]">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Experience Level
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('experienceLevel')}
            >
              <option value="Entry" className="bg-[#0c1238]">Entry Level (0–2 yrs)</option>
              <option value="Mid" className="bg-[#0c1238]">Mid Level (2–5 yrs)</option>
              <option value="Senior" className="bg-[#0c1238]">Senior Level (5–8 yrs)</option>
              <option value="Lead" className="bg-[#0c1238]">Lead / Staff (8+ yrs)</option>
            </select>
          </div>
        </div>

        {/* Salary Range (Min - Max) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>Min Annual Salary ($)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 90000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('minSalary', { required: 'Min salary is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>Max Annual Salary ($)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 140000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('maxSalary', { required: 'Max salary is required' })}
            />
          </div>
        </div>

        {/* Location & Notice Period Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Remote (US) or San Francisco, CA"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('location', { required: 'Location is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>Preferred Notice Period</span>
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('noticePeriod')}
            >
              <option value="Immediate" className="bg-[#0c1238]">Immediate Joiner (0 Days)</option>
              <option value="15 Days" className="bg-[#0c1238]">15 Days Notice</option>
              <option value="30 Days" className="bg-[#0c1238]">30 Days Notice</option>
              <option value="60 Days" className="bg-[#0c1238]">60 Days Notice</option>
              <option value="Any" className="bg-[#0c1238]">Any Notice Period</option>
            </select>
          </div>
        </div>

        {/* Application Deadline & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Application Deadline</span>
            </label>
            <input
              type="date"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('deadline', { required: 'Deadline is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Posting Status
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('status')}
            >
              <option value="Open" className="bg-[#0c1238]">Open (Accepting Applications)</option>
              <option value="Closed" className="bg-[#0c1238]">Closed (Paused / Filled)</option>
            </select>
          </div>
        </div>

        {/* Required Skills Tag Editor */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Required Skills (Tags)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(e);
                }
              }}
              placeholder="Type skill & press Enter (e.g. React, Docker, Python)"
              className="flex-1 px-3.5 py-2 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3.5 py-2 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/40 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5 min-h-9 p-2.5 rounded-xl bg-[#080d27] border border-cyan-500/20">
            {skillsList.map((skill) => (
              <span
                key={skill}
                className="tag-cyan inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-cyan-300 hover:text-pink-400 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            {skillsList.length === 0 && (
              <span className="text-xs text-slate-500 italic">No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Role Description <span className="text-pink-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Outline the mission, primary objectives, and impact of this role..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
              errors.description
                ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
            }`}
            {...register('description', {
              required: 'Job description is required',
              minLength: { value: 15, message: 'Description must be at least 15 characters' }
            })}
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Key Responsibilities (One per line)
          </label>
          <textarea
            rows={3}
            placeholder="Architect clean frontend modules.&#10;Optimize Core Web Vitals.&#10;Conduct technical interviews."
            className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            {...register('responsibilities')}
          />
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-action-gradient px-6 py-2.5 text-xs font-bold cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Posting' : 'Publish Job Listing'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
