import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StructureIcon } from '../components/common/StructureLogo';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6 text-center relative overflow-hidden text-slate-100">
      {/* Soft Modern Dark glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/06 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#1A1A1A]/95 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.1)] space-y-4 relative z-10">
        <div className="flex justify-center mx-auto mb-2">
          <StructureIcon size={64} />
        </div>
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 tracking-wider">
          404
        </h1>
        <h2 className="text-xl font-black text-white uppercase tracking-wider">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The page you are looking for does not exist or has been moved to another location.
        </p>
        <div className="pt-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 btn-gradient-glow text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
