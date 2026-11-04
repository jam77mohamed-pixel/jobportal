import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Users, 
  Save 
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { useCompanies } from '../../context/CompanyContext';

const DEFAULT_LOGOS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=160&auto=format&fit=crop&q=80'
];

export const CompanyFormModal = ({ isOpen, onClose, editingCompany = null }) => {
  const { addCompany, updateCompany } = useCompanies();

  const isEditing = Boolean(editingCompany);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      industry: 'Technology',
      location: '',
      website: '',
      contactEmail: '',
      employees: '',
      logo: '',
      description: ''
    }
  });

  useEffect(() => {
    if (editingCompany) {
      reset({
        name: editingCompany.name || '',
        industry: editingCompany.industry || 'Technology',
        location: editingCompany.location || '',
        website: editingCompany.website || '',
        contactEmail: editingCompany.contactEmail || '',
        employees: editingCompany.employees || '',
        logo: editingCompany.logo || DEFAULT_LOGOS[0],
        description: editingCompany.description || ''
      });
    } else {
      reset({
        name: '',
        industry: 'Technology',
        location: '',
        website: '',
        contactEmail: '',
        employees: '',
        logo: DEFAULT_LOGOS[Math.floor(Math.random() * DEFAULT_LOGOS.length)],
        description: ''
      });
    }
  }, [editingCompany, isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name.trim(),
        industry: data.industry,
        location: data.location.trim(),
        website: data.website.trim(),
        contactEmail: data.contactEmail.trim(),
        employees: Number(data.employees) || 100,
        logo: data.logo?.trim() || DEFAULT_LOGOS[0],
        description: data.description?.trim() || ''
      };

      if (isEditing) {
        updateCompany(editingCompany.id, payload);
        toast.success(`"${payload.name}" updated successfully!`);
      } else {
        addCompany(payload);
        toast.success(`"${payload.name}" created and added to directory!`);
      }
      onClose();
    } catch (err) {
      toast.error(err.message || 'Error saving company.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Company Profile' : 'Register New Company'}
      subtitle={
        isEditing
          ? 'Update organization details, staffing numbers, and contact points'
          : 'Fill in company credentials to add to the JOBSOURCE verified directory'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-slate-200">
        {/* Name & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Company Name *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="e.g. EcoSolutions, Stripe"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                {...register('name', {
                  required: 'Company name is required',
                  minLength: { value: 2, message: 'Must be at least 2 characters' }
                })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Industry *
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-400 focus:outline-none"
              {...register('industry', { required: 'Please select an industry' })}
            >
              <option value="Technology">Technology</option>
              <option value="Finance & FinTech">Finance & FinTech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Design & Creative">Design & Creative</option>
              <option value="Consulting">Consulting</option>
              <option value="Aviation">Aviation</option>
            </select>
          </div>
        </div>

        {/* Location & Team Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Headquarters Location *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="e.g. London, UK or Remote"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                {...register('location', { required: 'Location is required' })}
              />
            </div>
            {errors.location && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Team Size (Employees)
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="number"
                placeholder="e.g. 500"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                {...register('employees')}
              />
            </div>
          </div>
        </div>

        {/* Website & Contact Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Website URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="https://company.io"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                {...register('website')}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Talent Contact Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="email"
                placeholder="careers@company.io"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
                {...register('contactEmail')}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Overview & Notice Period Hiring Culture
          </label>
          <textarea
            rows={3}
            placeholder="Brief summary of company mission, tech stack, and rapid notice period hiring..."
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
            {...register('description')}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 btn-gradient-glow text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Register Organization'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
