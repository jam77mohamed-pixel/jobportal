import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { BottomDock } from '../components/common/BottomDock';
import { Sidebar } from '../components/common/Sidebar';
import { CompanyFormModal } from '../components/companies/CompanyFormModal';

export const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-slate-100 relative overflow-x-hidden flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Soft Modern Dark Neutral Ambient Glows */}
      <div className="fixed top-[-10%] left-[-8%] w-[550px] h-[550px] bg-cyan-500/06 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-8%] w-[600px] h-[600px] bg-rose-500/05 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-[35%] right-[15%] w-[400px] h-[400px] bg-violet-600/05 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[20%] left-[10%] w-[350px] h-[350px] bg-emerald-500/04 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating 3D Geometric Accents */}
      <div className="hidden xl:block fixed top-24 left-8 pointer-events-none z-0 opacity-80 animate-pulse">
        <div className="w-4 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 rotate-45 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
      </div>
      <div className="hidden xl:block fixed bottom-32 left-12 pointer-events-none z-0 opacity-70">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-[0_0_20px_rgba(247,37,133,0.5)]" />
      </div>
      <div className="hidden xl:block fixed top-32 right-12 pointer-events-none z-0 opacity-60">
        <div className="w-4 h-4 text-cyan-300">✦</div>
      </div>
      <div className="hidden xl:block fixed bottom-44 right-16 pointer-events-none z-0 opacity-70">
        <div className="w-5 h-5 text-fuchsia-400">✦</div>
      </div>

      {/* Sidebar navigation */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        onOpenAddCompanyModal={() => setIsAddCompanyModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen relative z-10 pb-20">
        {/* Top Navbar */}
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Dynamic page outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Floating Cyber Dock Navigation */}
      <BottomDock />

      {/* Global Add Company modal */}
      <CompanyFormModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
      />
    </div>
  );
};
