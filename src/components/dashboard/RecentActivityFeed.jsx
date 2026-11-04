import React from 'react';
import { 
  Building2, 
  Briefcase, 
  Send, 
  CheckCircle2
} from 'lucide-react';

export const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      title: 'EcoSolutions Inc.',
      action: 'posted 3 new job openings.',
      time: '12m ago',
      icon: Building2,
      badgeClass: 'tag-cyan'
    },
    {
      id: 2,
      title: 'Alex Rivera (Can join immediately)',
      action: 'applied for Senior Cloud Engineer.',
      time: '45m ago',
      icon: Send,
      badgeClass: 'tag-magenta'
    },
    {
      id: 3,
      title: 'MediCare Systems',
      action: 'scheduled an interview with a candidate.',
      time: '2h ago',
      icon: CheckCircle2,
      badgeClass: 'tag-emerald'
    },
    {
      id: 4,
      title: 'AeroLogistics',
      action: 'updated salary range for Lead Systems Engineer.',
      time: '4h ago',
      icon: Briefcase,
      badgeClass: 'tag-amber'
    }
  ];

  return (
    <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl h-full flex flex-col justify-between text-slate-200">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black tracking-wide uppercase text-white">
              Recent Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest updates on jobs, applications, and interviews
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(0,242,254,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Live Updates</span>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-all flex items-start gap-3.5"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${act.badgeClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-white truncate">{act.title}</p>
                    <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{act.action}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
