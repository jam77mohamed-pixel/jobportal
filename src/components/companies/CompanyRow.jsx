import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  MapPin, 
  Building2, 
  ExternalLink,
  Edit3,
  Trash2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CompanyRow = ({ company, onEdit, onDelete, isSelected = false, onSelect }) => {
  const { role } = useAuth();
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  // Industry tags styling
  const industryPill = company.industry || 'Technology';
  const subTag = company.openJobsCount > 3 ? 'Software' : 'AI';

  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors text-xs text-slate-300">
      {/* Checkbox */}
      <td className="py-3 px-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect && onSelect(company.id)}
          className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
        />
      </td>

      {/* Company Name & Logo */}
      <td className="py-3 px-3 font-semibold text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 font-bold shrink-0 shadow-xs">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              company.name?.charAt(0) || 'C'
            )}
          </div>
          <Link
            to={`/companies/${company.id}`}
            className="hover:text-cyan-300 transition-colors truncate max-w-[140px] sm:max-w-xs font-bold"
          >
            {company.name}
          </Link>
        </div>
      </td>

      {/* Location */}
      <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
        {company.location || 'London, UK'}
      </td>

      {/* Industry & Sub-tag */}
      <td className="py-3 px-3 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tag-cyan">
            {industryPill}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tag-magenta">
            {subTag}
          </span>
        </div>
      </td>

      {/* Size */}
      <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
        {company.employees ? `${company.employees} - ${company.employees + 500}` : '501-1000'}
      </td>

      {/* Status */}
      <td className="py-3 px-3 whitespace-nowrap">
        <span className="text-emerald-400 font-bold text-xs">
          Active
        </span>
      </td>

      {/* Action Button Dropdown */}
      <td className="py-3 px-3 text-right relative whitespace-nowrap">
        <div className="inline-block relative">
          <button
            type="button"
            onClick={() => setActionMenuOpen(!actionMenuOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl btn-action-gradient text-white text-[11px] font-bold shadow-xs hover:scale-105 transition-all cursor-pointer"
          >
            <span>Action</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {actionMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-[#0c1236] border border-slate-700/80 rounded-xl shadow-2xl py-1 z-30 text-left text-xs">
              <Link
                to={`/companies/${company.id}`}
                className="block px-3 py-1.5 text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
              >
                View Profile
              </Link>
              {role === 'recruiter' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setActionMenuOpen(false);
                      onEdit(company);
                    }}
                    className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-slate-800 hover:text-cyan-300"
                  >
                    Edit Company
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActionMenuOpen(false);
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
      </td>
    </tr>
  );
};
