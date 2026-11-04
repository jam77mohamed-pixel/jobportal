import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { StructureLogo } from '../components/common/StructureLogo';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-slate-100 flex flex-col justify-center items-center py-8 px-4 sm:px-6 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Soft Modern Dark Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-cyan-500/06 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-fuchsia-600/05 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[45%] right-[15%] w-[350px] h-[350px] bg-purple-600/05 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating 3D Geometric Accents */}
      <div className="hidden lg:block fixed top-20 left-16 pointer-events-none z-0 opacity-80 animate-pulse">
        <div className="w-5 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 rotate-45 shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
      </div>
      <div className="hidden lg:block fixed bottom-24 left-20 pointer-events-none z-0 opacity-80">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-[0_0_25px_rgba(247,37,133,0.4)]" />
      </div>
      <div className="hidden lg:block fixed top-28 right-24 pointer-events-none z-0 text-cyan-300 text-lg opacity-70">
        ✦
      </div>
      <div className="hidden lg:block fixed bottom-32 right-28 pointer-events-none z-0 text-fuchsia-400 text-2xl opacity-80">
        ✦
      </div>

      {/* Central Modern Dark Card */}
      <div className="w-full max-w-lg bg-[#1A1A1A]/95 backdrop-blur-2xl rounded-[2.5rem] border border-neutral-800 p-6 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.1)] relative z-10 transition-all">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-block">
            <StructureLogo size="md" to="/register" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
            Create an Account
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Post Jobs & Find Candidates Ready to Join
          </p>
        </div>

        {/* The Register Form */}
        <RegisterForm />
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-slate-500 font-medium relative z-10">
        &copy; {new Date().getFullYear()} JOBSOURCE &bull; Easy Hiring for Everyone
      </div>
    </div>
  );
};
