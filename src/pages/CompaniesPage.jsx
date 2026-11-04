import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  Filter, 
  PlusCircle, 
  RefreshCw, 
  X, 
  ChevronDown 
} from 'lucide-react';
import { useCompanies } from '../context/CompanyContext';
import { CompanyCard } from '../components/companies/CompanyCard';
import { CompanyRow } from '../components/companies/CompanyRow';
import { CompanyFormModal } from '../components/companies/CompanyFormModal';
import { DeleteConfirmModal } from '../components/companies/DeleteConfirmModal';
import { Pagination } from '../components/common/Pagination';
import { toast } from 'react-toastify';

export const CompaniesPage = () => {
  const {
    filteredCompanies,
    paginatedCompanies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    industriesList,
    deleteCompany,
    reloadCompanies
  } = useCompanies();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [deletingCompany, setDeletingCompany] = useState(null);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams, searchQuery, setSearchQuery]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedCompanies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCompanies.map((c) => c.id));
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (company) => {
    setDeletingCompany(company);
  };

  const handleConfirmDelete = (id) => {
    deleteCompany(id);
    toast.success('Company removed successfully.');
    setDeletingCompany(null);
  };

  // Top 6 cards for the right-hand neon grid
  const highlightedCompanies = filteredCompanies.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Bar with Title, Search, Filters & Controls */}
      <div className="app-card p-5 sm:p-6 bg-[#1A1A1A]/95 border border-neutral-800 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Companies
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            All companies registered in your hiring portal
          </p>
        </div>

        {/* Search, All Industries Dropdown, Sort Button */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search company..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-white placeholder:text-slate-500 border border-slate-700 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Industry Filter ("All Industries") */}
          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-900 text-xs font-bold text-slate-200 border border-slate-700 hover:border-slate-600 focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              {industriesList.map((ind) => (
                <option key={ind} value={ind} className="bg-slate-900 text-white">
                  {ind === 'All' ? 'All Industries' : ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-900 text-xs font-bold text-slate-200 border border-slate-700 hover:border-slate-600 focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              <option value="name-asc" className="bg-slate-900">Sort: A to Z</option>
              <option value="name-desc" className="bg-slate-900">Sort: Z to A</option>
              <option value="employees-desc" className="bg-slate-900">Sort: By Size</option>
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Add Company Button */}
          <button
            type="button"
            onClick={() => {
              setEditingCompany(null);
              setIsFormModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl btn-gradient-glow text-white text-xs font-black shadow-md cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add Company</span>
          </button>

          <button
            type="button"
            onClick={reloadCompanies}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl flex items-center justify-between text-rose-300 text-xs">
          <span>{error}</span>
          <button onClick={reloadCompanies} className="font-bold underline cursor-pointer">Retry</button>
        </div>
      )}

      {/* Split Layout: Company Table Left (60%) + Cards Grid Right (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Companies Table */}
        <div className="lg:col-span-7 app-card bg-[#0b1136]/90 border border-slate-800/80 p-4 sm:p-5 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
              Companies List ({filteredCompanies.length})
            </h2>
            <span className="text-xs text-cyan-400 font-semibold">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === paginatedCompanies.length}
                      onChange={handleSelectAll}
                      className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-400 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Industry</th>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Options</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCompanies.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                      No companies match your search.
                    </td>
                  </tr>
                ) : (
                  paginatedCompanies.map((comp) => (
                    <CompanyRow
                      key={comp.id}
                      company={comp}
                      isSelected={selectedIds.includes(comp.id)}
                      onSelect={handleToggleSelect}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCompanies.length}
              pageSize={pageSize}
            />
          </div>
        </div>

        {/* Right Side: Grid of Top Company Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
              Top Companies
            </h2>
            <span className="text-[11px] font-bold text-fuchsia-400">
              Currently Hiring
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlightedCompanies.map((comp) => (
              <CompanyCard
                key={comp.id}
                company={comp}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanyFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingCompany(null);
        }}
        editingCompany={editingCompany}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingCompany)}
        onClose={() => setDeletingCompany(null)}
        company={deletingCompany}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
