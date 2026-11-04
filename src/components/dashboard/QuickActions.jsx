import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Building2, 
  Users, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';

export const QuickActions = ({ onOpenAddCompanyModal }) => {
  const actions = [
    {
      title: 'Post a New Job',
      desc: 'Add a job opening with salary, requirements, and how fast you need someone to join.',
      icon: PlusCircle,
      gradient: 'from-cyan-500 to-blue-600',
      to: '/jobs?action=new'
    },
    {
      title: 'Add a Company',
      desc: 'Add a new company profile, industry, website, and company logo.',
      icon: Building2,
      gradient: 'from-fuchsia-500 to-purple-600',
      action: () => onOpenAddCompanyModal && onOpenAddCompanyModal()
    },
    {
      title: 'View Applicants',
      desc: 'See all candidate applications and find people who can join right away.',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      to: '/candidates'
    },
    {
      title: 'Browse Companies',
      desc: 'See all hiring organizations and their currently open job listings.',
      icon: Briefcase,
      gradient: 'from-emerald-500 to-teal-600',
      to: '/companies'
    }
  ];

  return (
    <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl text-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-black tracking-wide uppercase text-white">
            Quick Actions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Common tasks to manage your jobs, companies, and applicants
          </p>
        </div>
        <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider tag-cyan">
          Employer Dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <div className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all duration-200 flex flex-col justify-between h-full group">
              <div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );

          if (item.to) {
            return (
              <Link key={idx} to={item.to} className="block text-left">
                {content}
              </Link>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={item.action}
              className="w-full text-left block cursor-pointer"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};
