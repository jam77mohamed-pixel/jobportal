import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchCompaniesApi, saveStoredCompanies } from '../api/companiesApi';

const CompanyContext = createContext(null);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters, search & sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc', 'name-desc', 'employees-desc', 'rating-desc'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Initial load
  const loadCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompaniesApi();
      setCompanies(data);
    } catch (err) {
      console.error('Failed to load companies:', err);
      setError('Unable to fetch companies. Please check your internet or retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  // Sync to local storage on changes
  const persistChanges = (newList) => {
    setCompanies(newList);
    saveStoredCompanies(newList);
  };

  // Add Company
  const addCompany = (newCompanyData) => {
    const newCompany = {
      ...newCompanyData,
      id: Date.now(),
      rating: newCompanyData.rating || 4.5,
      openJobsCount: newCompanyData.openJobsCount || 3,
      founded: newCompanyData.founded || new Date().getFullYear(),
      benefits: newCompanyData.benefits || ['Flexible Hours', 'Health Insurance', 'Growth Opportunities']
    };

    const updated = [newCompany, ...companies];
    persistChanges(updated);
    return newCompany;
  };

  // Update / Edit Company
  const updateCompany = (id, updatedFields) => {
    const updated = companies.map((comp) => {
      if (comp.id === Number(id) || comp.id === id) {
        return { ...comp, ...updatedFields };
      }
      return comp;
    });
    persistChanges(updated);
  };

  // Delete Company
  const deleteCompany = (id) => {
    const updated = companies.filter((comp) => comp.id !== Number(id) && comp.id !== id);
    persistChanges(updated);
  };

  // Get single company by ID
  const getCompanyById = (id) => {
    return companies.find((comp) => String(comp.id) === String(id)) || null;
  };

  // Available unique industries
  const industriesList = useMemo(() => {
    const set = new Set();
    companies.forEach((c) => {
      if (c.industry) set.add(c.industry);
    });
    return ['All', ...Array.from(set)];
  }, [companies]);

  // Filtered & Sorted companies
  const filteredAndSortedCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        // Search query match
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          company.name.toLowerCase().includes(query) ||
          company.location.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query);

        // Industry filter match
        const matchesIndustry =
          selectedIndustry === 'All' || company.industry === selectedIndustry;

        return matchesSearch && matchesIndustry;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === 'employees-desc') {
          return (b.employees || 0) - (a.employees || 0);
        }
        if (sortBy === 'rating-desc') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
  }, [companies, searchQuery, selectedIndustry, sortBy]);

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedIndustry, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / pageSize) || 1;
  const paginatedCompanies = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredAndSortedCompanies.slice(startIdx, startIdx + pageSize);
  }, [filteredAndSortedCompanies, currentPage, pageSize]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        filteredCompanies: filteredAndSortedCompanies,
        paginatedCompanies,
        totalCompaniesCount: companies.length,
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
        addCompany,
        updateCompany,
        deleteCompany,
        getCompanyById,
        reloadCompanies: loadCompanies
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};
