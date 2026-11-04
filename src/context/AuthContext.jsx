import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'jobportal_current_user_v1';
const USERS_STORAGE_KEY = 'jobportal_all_users_v1';

// Seed demo users for testing (Recruiter is primary)
const INITIAL_USERS = [
  {
    id: 'user-recruiter-1',
    name: 'Sarah Jenkins',
    email: 'recruiter@techwave.io',
    password: 'password123',
    role: 'recruiter',
    company: 'TechWave Innovations',
    title: 'Senior Talent Partner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-01-15'
  },
  {
    id: 'user-recruiter-2',
    name: 'Marcus Vance',
    email: 'marcus.vance@nexustech.com',
    password: 'password123',
    role: 'recruiter',
    company: 'Nexus Software Labs',
    title: 'Head of Technical Recruiting',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedDate: '2024-02-10'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return { ...parsed, role: 'recruiter' };
      }
      return INITIAL_USERS[0]; // Default to authenticated demo recruiter
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state with localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to sync users list with localStorage', e);
    }
  }, [registeredUsers]);

  // Login handler - Recruiter only
  const login = (email, password) => {
    const cleanEmail = email.toLowerCase().trim();
    let foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    // If user not found but enters demo recruiter credentials, authenticate directly
    if (!foundUser && cleanEmail === 'recruiter@techwave.io') {
      foundUser = INITIAL_USERS[0];
    }

    if (!foundUser) {
      throw new Error('No recruiter account found with this email. Please check credentials.');
    }

    if (foundUser.password !== password) {
      throw new Error('Invalid password. Please check your credentials.');
    }

    // Enforce recruiter role
    const recruiterUser = {
      ...foundUser,
      role: 'recruiter'
    };

    setUser(recruiterUser);
    return recruiterUser;
  };

  // Register handler - Recruiter registration
  const register = ({ name, email, password, company = '' }) => {
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase().trim(),
      password,
      role: 'recruiter',
      company: company || 'Enterprise Partner Co',
      title: 'Talent Acquisition Partner',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    setUser(newUser);
    return newUser;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
  };

  // Switch role helper (Fixed to recruiter per requirement)
  const switchRole = () => {
    // Recruiter-only system
    if (!user) return;
    setUser({ ...user, role: 'recruiter' });
  };

  // Reset password simulation
  const resetPassword = (email, newPassword) => {
    const userIndex = registeredUsers.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (userIndex === -1 && email.toLowerCase().trim() !== 'recruiter@techwave.io') {
      throw new Error('Email address not registered in system.');
    }

    if (userIndex !== -1) {
      const updated = [...registeredUsers];
      updated[userIndex].password = newPassword;
      setRegisteredUsers(updated);
    }

    if (user && user.email.toLowerCase() === email.toLowerCase().trim()) {
      setUser({ ...user, password: newPassword });
    }
    return true;
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: 'recruiter', // Locked to recruiter role
        isAuthenticated,
        login,
        register,
        logout,
        switchRole,
        resetPassword,
        demoUsers: INITIAL_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
