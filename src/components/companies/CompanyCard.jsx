import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  MoreVertical,
  Globe, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Edit3,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CompanyCard = ({ company, onEdit, onDelete }) => {
  const { role } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternating neon glowing border (Cyan vs Magenta, exact reference match)
  const isCyan = Number(company.id) % 2 === 0;
  const cardBorderClass = isCyan ? 'neon-card-cyan' : 'neon-card-magenta';

  return (
    <div className={`group relative ${cardBorderClass} p-5 flex flex-col justify-between overflow-hidden text-slate-200 transition-all duration-300`}>
      <div>
        {/* Top: Logo & 3-Dots Menu */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              {imgError || !company.logo ? (
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-extrabold text-base shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                  {company.name?.charAt(0) || 'C'}
                </div>
              ) : (
                <img
                  src={company.logo}
                  alt={company.name}
                  onError={() => setImgError(true)}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-xs group-hover:scale-105 transition-transform"
                />
              )}
            </div>

            <div>
              <Link
                to={`/companies/${company.id}`}
                className="text-sm font-bold text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>{company.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{company.location || 'London, UK'}</span>
              </div>
            </div>
          </div>

          {/* 3 dots menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#0d143a] border border-slate-700 rounded-xl shadow-xl py-1 z-30 animate-fade-in text-xs">
                <Link
                  to={`/companies/${company.id}`}
                  className="block px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  View Details
                </Link>
                {role === 'recruiter' && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(company);
                      }}
                      className="w-full text-left px-3 py-1.5 text-slate-300 hover:text-cyan-300 hover:bg-slate-800"
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete(company);
                      }}
                      className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-950/40"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tags / Pills */}
        <div className="flex flex-wrap gap-1.5 my-3">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-cyan">
            {company.industry || 'Technology'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-magenta">
            {company.openJobsCount ? `${company.openJobsCount} Openings` : 'Software'}
          </span>
          {company.rating && (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold tag-amber">
              <Star className="w-2.5 h-2.5 fill-current" />
              <span>{company.rating}</span>
            </span>
          )}
        </div>
      </div>

      {/* Footer Indicators & Action */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
            <span className="text-[11px] text-slate-400">{(company.employees || 500).toLocaleString()} Size</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] text-emerald-400 font-semibold">Active</span>
          </div>
        </div>

        <Link
          to={`/companies/${company.id}`}
          className="px-3 py-1 rounded-xl btn-action-gradient text-white text-[11px] font-bold shadow-xs hover:scale-105 transition-transform"
        >
          Action
        </Link>
      </div>
    </div>
  );
};
