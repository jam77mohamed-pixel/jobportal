import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  Users, 
  FileCheck,
  BarChart3,
  ShieldCheck 
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';

export const BottomDock = () => {
  const { applications, activeJobsCount, candidates } = useJobs();
  const location = useLocation();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      to: '/jobs',
      label: 'Jobs',
      icon: Briefcase,
      badge: activeJobsCount > 0 ? activeJobsCount : null
    },
    {
      to: '/candidates',
      label: 'Profiles',
      icon: Users,
      badge: candidates?.length || null
    },
    {
      to: '/applications',
      label: 'Applications',
      icon: FileCheck,
      badge: applications?.length || null
    },
    {
      to: '/companies',
      label: 'Companies',
      icon: Building2
    },
    {
      to: '/reports',
      label: 'Reports',
      icon: BarChart3
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5 bg-[#181818]/95 backdrop-blur-xl border-t border-neutral-800 shadow-[0_-5px_25px_rgba(0,0,0,0.6)] flex items-center justify-between sm:justify-center gap-2 sm:gap-6">
      <div className="flex items-center justify-around w-full max-w-4xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-2 px-3 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(0,242,254,0.45)]'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline whitespace-nowrap">{item.label}</span>

              {item.badge && !isActive && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-fuchsia-500 text-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* Employer Indicator */}
        <div
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs font-black text-fuchsia-300 bg-fuchsia-950/40 border border-fuchsia-500/30 shadow-[0_0_10px_rgba(247,37,133,0.25)]"
          title="Employer Account"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
          <span className="hidden sm:inline tracking-wider uppercase text-[11px]">Employer</span>
        </div>
      </div>
    </nav>
  );
};
