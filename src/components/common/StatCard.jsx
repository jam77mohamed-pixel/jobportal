import React from 'react';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  colorScheme = 'cyan', // 'cyan', 'magenta', 'purple', 'emerald', 'amber'
  subtitle,
  sparklineType = 'bars' // 'bars' or 'wave' or 'donut'
}) => {
  const neonClasses = {
    cyan: 'neon-card-cyan',
    magenta: 'neon-card-magenta',
    purple: 'neon-card-purple',
    emerald: 'neon-card-cyan',
    amber: 'neon-card-magenta',
    indigo: 'neon-card-purple'
  };

  const borderClass = neonClasses[colorScheme] || 'neon-card-cyan';

  return (
    <div className={`p-4 sm:p-5 ${borderClass} flex flex-col justify-between text-slate-100 transition-all duration-300 group`}>
      <div>
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider truncate">
            {title}
          </span>
          <MoreVertical className="w-3.5 h-3.5 text-slate-500" />
        </div>

        <div className="flex items-baseline justify-between gap-2 mt-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {value}
          </h3>
          {change && (
            <div
              className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isPositive
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-400" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini Sparkline Visualization (Matching Reference Image 5) */}
      <div className="mt-3 pt-2">
        {sparklineType === 'bars' && (
          <div className="flex items-end gap-1 h-6 pt-1">
            {[40, 60, 35, 75, 55, 90, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500/30 to-cyan-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}

        {sparklineType === 'wave' && (
          <div className="h-6 flex items-center">
            <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible">
              <path
                d="M0 16 Q 25 4, 50 14 T 100 6"
                fill="none"
                stroke={colorScheme === 'magenta' ? '#f72585' : '#00f2fe'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {sparklineType === 'donut' && (
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Direct</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
              <span>Fast-Track</span>
            </div>
          </div>
        )}

        {subtitle && (
          <p className="mt-1 text-[10px] text-slate-400 font-semibold truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
