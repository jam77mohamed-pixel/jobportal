import React from 'react';
import { Link } from 'react-router-dom';

/**
 * JOBSOURCE Geometric Structural Logo Emblem (Exact Match to Reference Model):
 * Features the 4 interlaced vibrant angled bars (Cyan, Magenta, Orange, Purple)
 * with the bold modern typography "JOBSOURCE" and optional section breadcrumb.
 */
export const StructureIcon = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        {/* Glow filter for neon appearance */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00F2FE" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Bar 1: Top-Left to Bottom-Right Cyan */}
      <line
        x1="10"
        y1="12"
        x2="28"
        y2="30"
        stroke="#00F2FE"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bar 2: Top-Right to Bottom-Left Magenta / Pink */}
      <line
        x1="30"
        y1="12"
        x2="12"
        y2="30"
        stroke="#F72585"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bar 3: Horizontal / Offset Angle Orange */}
      <line
        x1="6"
        y1="21"
        x2="24"
        y2="21"
        stroke="#FF8A00"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Bar 4: Vertical / Offset Angle Purple */}
      <line
        x1="26"
        y1="8"
        x2="26"
        y2="26"
        stroke="#7209B7"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Center structural lattice node */}
      <circle cx="20" cy="21" r="2" fill="#FFFFFF" />
    </svg>
  );
};

export const StructureLogo = ({
  size = 'md',
  to = '/dashboard',
  badge = null,
  subtitle = null,
  className = ''
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 42
  };

  const textSizes = {
    sm: 'text-sm tracking-tight',
    md: 'text-lg sm:text-xl tracking-tight',
    lg: 'text-2xl sm:text-3xl tracking-tight'
  };

  const currentSize = iconSizes[size] || iconSizes.md;

  const content = (
    <div className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className="relative p-1 rounded-xl bg-slate-900/60 border border-slate-700/60 shadow-[0_0_15px_rgba(0,242,254,0.25)] group-hover:scale-105 transition-transform">
        <StructureIcon size={currentSize} />
      </div>

      <div className="flex items-center gap-2 font-black">
        <span className={`${textSizes[size]} font-black text-white tracking-wider flex items-center`}>
          JOBSOURCE
        </span>

        {(subtitle || badge) && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-normal">|</span>
            <span className="text-xs sm:text-sm font-semibold text-cyan-300">
              {subtitle || badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
