import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  LogOut, 
  Menu,
  Briefcase,
  UserCheck,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { StructureLogo } from './StructureLogo';

export const Navbar = ({ onMobileMenuToggle }) => {
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Derive current page title for the header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('companies')) return 'Companies';
    if (path.includes('jobs')) return 'Jobs';
    if (path.includes('candidates') || path.includes('applications')) return 'Applicants';
    if (path.includes('reports')) return 'Reports & Analytics';
    return 'Dashboard';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.info('You have been signed out.');
    navigate('/login');
  };

  const handleRoleToggle = () => {
    const nextRole = role === 'recruiter' ? 'candidate' : 'recruiter';
    switchRole(nextRole);
    toast.success(`Switched active view to ${nextRole.toUpperCase()}!`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(navSearch.trim())}`);
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'New Candidate Applied (Immediate Joiner)',
      desc: 'David Kim submitted resume for Senior Cloud Architect.',
      time: '5m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Notice Period Fast-Track Match',
      desc: '3 candidates on 15-day notice match your TechWave position.',
      time: '1h ago',
      unread: true
    }
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#181818]/95 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Left: Brand & Mobile Trigger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <StructureLogo size="sm" to="/dashboard" subtitle={getPageTitle()} />
      </div>

      {/* Middle: Search Bar (Desktop) */}
      <form onSubmit={handleSearchSubmit} className="relative hidden md:block max-w-sm w-full mx-4">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={navSearch}
          onChange={(e) => setNavSearch(e.target.value)}
          placeholder="Search jobs, companies, skills..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-900/70 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 rounded-xl border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 shadow-inner transition-all"
        />
      </form>

      {/* Right: Recruiter Badge, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Recruiter Authority Badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-950/60 border border-fuchsia-500/40 text-xs font-black text-fuchsia-300 shadow-[0_0_12px_rgba(247,37,133,0.3)] tracking-wider"
          title="Verified Recruiter Authority"
        >
          <Briefcase className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>RECRUITER</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/70 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0c1236] border border-slate-700/80 rounded-2xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Alerts</span>
                <span className="text-[10px] text-cyan-400 font-semibold">2 New</span>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-slate-200">{n.title}</p>
                    <p className="text-[11px] text-slate-400">{n.desc}</p>
                    <span className="text-[10px] text-slate-500">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[100px] truncate">
              {user?.name || 'User'}
            </span>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0c1236] border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 space-y-1 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {role} view
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
