import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Users, 
  FileCheck, 
  BarChart3,
  PlusCircle, 
  X,
  ShieldCheck,
  BookmarkCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCompanies } from '../../context/CompanyContext';
import { useJobs } from '../../context/JobContext';
import { StructureLogo } from './StructureLogo';

export const Sidebar = ({ isMobileOpen, onMobileClose, onOpenAddCompanyModal }) => {
  const { user } = useAuth();
  const { totalCompaniesCount } = useCompanies();
  const { applications, activeJobsCount, candidates, savedJobs } = useJobs();

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/jobs',
      label: 'Job Openings',
      icon: Briefcase,
      badge: activeJobsCount > 0 ? `${activeJobsCount} Active` : null
    },
    {
      to: '/candidates',
      label: 'Candidate Profiles',
      icon: Users,
      badge: candidates?.length ? `${candidates.length}` : null
    },
    {
      to: '/applications',
      label: 'Applications & Saved',
      icon: FileCheck,
      badge: applications?.length ? `${applications.length}` : null
    },
    {
      to: '/companies',
      label: 'Companies',
      icon: Building2,
      badge: totalCompaniesCount || '15+'
    },
    {
      to: '/reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: 'Live'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#181818]/95 backdrop-blur-2xl text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-neutral-800 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <StructureLogo size="md" to="/dashboard" />

            <button
              onClick={onMobileClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="p-4 space-y-2">
            <Link
              to="/jobs?action=new"
              onClick={onMobileClose}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 btn-gradient-glow text-white text-xs font-black rounded-xl shadow-[0_0_15px_rgba(0,242,254,0.35)] transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post a Job</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                if (onOpenAddCompanyModal) onOpenAddCompanyModal();
                if (onMobileClose) onMobileClose();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold rounded-xl transition-colors border border-slate-700/80 cursor-pointer"
            >
              <span>+ Add Company</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Main Menu</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-fuchsia-950 text-fuchsia-300 font-bold uppercase border border-fuchsia-500/30">
                Employer
              </span>
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Widget */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {user?.name?.charAt(0) || 'E'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Employer'}</p>
                <p className="text-[10px] text-fuchsia-400 truncate font-semibold">
                  {user?.company || 'Hiring Manager'}
                </p>
              </div>
            </div>

            <div className="p-1.5 rounded-lg text-emerald-400 bg-emerald-950/40 border border-emerald-500/30" title="Active Employer Account">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
