import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CompaniesPage } from '../pages/CompaniesPage';
import { CompanyDetailsPage } from '../pages/CompanyDetailsPage';
import { JobsPage } from '../pages/JobsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { ApplicationsPage } from '../pages/ApplicationsPage';
import { CandidateProfilePage } from '../pages/CandidateProfilePage';
import { ReportsPage } from '../pages/ReportsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected In-App Dashboard & Feature Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Module 3: Company Management */}
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies/:id" element={<CompanyDetailsPage />} />
        
        {/* Module 4 & 5: Job Posting & Job Search */}
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobDetailsPage />} />
        
        {/* Module 6: Candidate Profile Management */}
        <Route path="candidates" element={<CandidateProfilePage />} />
        <Route path="profile" element={<CandidateProfilePage />} />

        {/* Module 7: Applications & Saved Jobs */}
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="saved-jobs" element={<ApplicationsPage defaultTab="saved" />} />

        {/* Module 8: Reports */}
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
