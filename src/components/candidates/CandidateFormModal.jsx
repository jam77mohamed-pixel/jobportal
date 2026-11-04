import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Plus, 
  Trash2, 
  UploadCloud, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { Modal } from '../common/Modal';
import { toast } from 'react-toastify';

export const CandidateFormModal = ({ isOpen, onClose, editingCandidate = null }) => {
  const { addCandidate, updateCandidate } = useJobs();
  const [skillInput, setSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const isEdit = Boolean(editingCandidate);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      experience: '3 Years',
      experienceDetails: '',
      education: '',
      noticePeriod: '15 Days',
      bio: '',
      avatar: ''
    }
  });

  useEffect(() => {
    if (editingCandidate) {
      setValue('name', editingCandidate.name || '');
      setValue('title', editingCandidate.title || '');
      setValue('email', editingCandidate.email || '');
      setValue('phone', editingCandidate.phone || '');
      setValue('address', editingCandidate.address || '');
      setValue('experience', editingCandidate.experience || '3 Years');
      setValue('experienceDetails', editingCandidate.experienceDetails || '');
      setValue('education', editingCandidate.education || '');
      setValue('noticePeriod', editingCandidate.noticePeriod || '15 Days');
      setValue('bio', editingCandidate.bio || '');
      setValue('avatar', editingCandidate.avatar || '');
      setSkillsList(editingCandidate.skills || ['React', 'JavaScript']);
      setUploadedFileName(editingCandidate.resumeName || 'candidate-resume.pdf');
    } else {
      reset({
        name: '',
        title: '',
        email: '',
        phone: '',
        address: 'San Francisco, CA',
        experience: '3 Years',
        experienceDetails: 'Frontend Developer at WebTech Solutions (2022-Present)',
        education: 'B.S. in Computer Science',
        noticePeriod: 'Immediate',
        bio: '',
        avatar: ''
      });
      setSkillsList(['React', 'JavaScript', 'HTML/CSS']);
      setUploadedFileName('');
    }
    setSkillInput('');
  }, [editingCandidate, isOpen, setValue, reset]);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  const handleSimulatedFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      toast.success(`Resume selected: ${file.name}`);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      skills: skillsList.length > 0 ? skillsList : ['Problem Solving', 'Communication'],
      resumeName: uploadedFileName || `${data.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`
    };

    if (isEdit) {
      updateCandidate(editingCandidate.id, payload);
    } else {
      addCandidate(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Candidate Profile' : 'Create Candidate Profile'}
      subtitle="Complete profile management with skills, experience, and resume upload."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name & Current Job Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Name</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Rivera"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('name', { required: 'Full name is required' })}
            />
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Job Title / Headline</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Developer"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('title', { required: 'Job title is required' })}
            />
            {errors.title && (
              <p className="text-xs text-rose-400 mt-1">{errors.title.message}</p>
            )}
          </div>
        </div>

        {/* Email & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email Address</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.email
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mobile Number</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="+1 (555) 000-0000"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('phone', { required: 'Mobile number is required' })}
            />
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Address & Notice Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Location / Address</span> <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco, CA or Remote"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none transition-all ${
                errors.address
                  ? 'border-rose-400 focus:ring-1 focus:ring-rose-400'
                  : 'border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && (
              <p className="text-xs text-rose-400 mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Notice Period / Joining Time</span>
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              {...register('noticePeriod')}
            >
              <option value="Immediate" className="bg-[#0c1238]">Immediate (0 Days)</option>
              <option value="15 Days" className="bg-[#0c1238]">15 Days</option>
              <option value="30 Days" className="bg-[#0c1238]">30 Days</option>
              <option value="60 Days" className="bg-[#0c1238]">60 Days</option>
            </select>
          </div>
        </div>

        {/* Skills Tag Editor */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Key Skills (Add multiple skills)
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
              placeholder="Type skill & press Enter (e.g. React, Python, Figma)"
              className="flex-1 px-3.5 py-2 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/40 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-9 p-2.5 rounded-xl bg-[#080d27] border border-cyan-500/20">
            {skillsList.map((skill) => (
              <span key={skill} className="tag-cyan inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold">
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

        {/* Experience & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Work Experience (Years & Role)
            </label>
            <input
              type="text"
              placeholder="e.g. 5 Years • Senior Developer at TechWave"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              {...register('experienceDetails')}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Education</span>
            </label>
            <input
              type="text"
              placeholder="e.g. B.S. in Computer Science • Stanford (2020)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              {...register('education')}
            />
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload Resume</span>
          </label>
          <div className="relative border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-4 bg-[#181818]/70 text-center transition-all">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleSimulatedFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
              <UploadCloud className="w-7 h-7 text-cyan-400" />
              {uploadedFileName ? (
                <p className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected: {uploadedFileName}</span>
                </p>
              ) : (
                <>
                  <p className="text-xs font-bold text-white">Click or drag & drop resume file here</p>
                  <p className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio / Summary */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            Short Professional Bio / Pitch
          </label>
          <textarea
            rows={2}
            placeholder="Brief introduction of skills, background, and availability..."
            className="w-full px-3.5 py-2 rounded-xl border border-cyan-500/30 text-sm text-white bg-[#080d27] placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            {...register('bio')}
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
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
            className="btn-action-gradient px-6 py-2.5 text-xs font-black cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Saving Profile...' : isEdit ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
