import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

const JobContext = createContext(null);

const STORAGE_KEY_JOBS = 'notizjob_jobs_v1';
const STORAGE_KEY_APPLICATIONS = 'notizjob_applications_v1';
const STORAGE_KEY_SAVED = 'notizjob_saved_jobs_v1';
const STORAGE_KEY_CANDIDATES = 'notizjob_candidates_v1';

// Initial realistic seed jobs with Notice Period metadata
const INITIAL_JOBS = [
  {
    id: 101,
    title: 'Senior Frontend Engineer (React & TypeScript)',
    companyId: 1,
    company: 'TechWave Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    minSalary: 120000,
    maxSalary: 160000,
    salaryFormatted: '$120,000 - $160,000 / yr',
    location: 'Remote (US/EU)',
    noticePeriod: '15 Days',
    deadline: '2026-11-20',
    status: 'Open',
    featured: true,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest'],
    description: 'We are seeking an experienced Senior Frontend Engineer to build high-performance client applications. You will collaborate closely with UI/UX designers and backend engineers to craft responsive, accessible, and delightful experiences.',
    responsibilities: [
      'Architect and maintain enterprise React and TypeScript frontends.',
      'Optimize web vitals, rendering performance, and accessibility standards.',
      'Mentor junior and mid-level developers through code reviews.',
      'Collaborate with product managers to scope and deliver new features.'
    ],
    postedAt: '2 days ago',
    applicantsCount: 14
  },
  {
    id: 102,
    title: 'Full Stack Cloud Architect',
    companyId: 2,
    company: 'CloudPulse Networks',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    employmentType: 'Full-time',
    experienceLevel: 'Lead',
    minSalary: 150000,
    maxSalary: 195000,
    salaryFormatted: '$150,000 - $195,000 / yr',
    location: 'San Francisco, CA (Hybrid)',
    noticePeriod: 'Immediate',
    deadline: '2026-11-15',
    status: 'Open',
    featured: true,
    skills: ['AWS', 'Node.js', 'Go', 'Kubernetes', 'Docker', 'GraphQL'],
    description: 'CloudPulse is hiring a Lead Full Stack Cloud Architect to spearhead our next-generation distributed microservices. Urgent requirement with immediate joining preferred.',
    responsibilities: [
      'Design fault-tolerant cloud architecture across multi-region AWS clusters.',
      'Implement scalable REST and GraphQL backend services in Node.js and Go.',
      'Enforce infrastructure-as-code using automated CI/CD pipelines.',
      'Ensure 99.99% uptime and low-latency API delivery.'
    ],
    postedAt: '1 day ago',
    applicantsCount: 22
  },
  {
    id: 103,
    title: 'Principal Product Designer (Design Systems)',
    companyId: 5,
    company: 'Apex Design Studios',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    minSalary: 110000,
    maxSalary: 145000,
    salaryFormatted: '$110,000 - $145,000 / yr',
    location: 'New York, NY (Hybrid)',
    noticePeriod: '30 Days',
    deadline: '2026-12-01',
    status: 'Open',
    featured: false,
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'A/B Testing'],
    description: 'Lead our unified design system across web and mobile platforms. You will bridge brand strategy, user empathy, and engineering constraints.',
    responsibilities: [
      'Expand and govern our multi-brand design tokens and Figma component libraries.',
      'Conduct usability studies and translate user flows into intuitive interfaces.',
      'Partner with product teams to drive user satisfaction and retention.'
    ],
    postedAt: '3 days ago',
    applicantsCount: 9
  },
  {
    id: 104,
    title: 'Senior Quantitative Analyst / ML Engineer',
    companyId: 3,
    company: 'Apex Financial Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    minSalary: 140000,
    maxSalary: 180000,
    salaryFormatted: '$140,000 - $180,000 / yr',
    location: 'Chicago, IL (Hybrid)',
    noticePeriod: '15 Days',
    deadline: '2026-11-25',
    status: 'Open',
    featured: true,
    skills: ['Python', 'PyTorch', 'SQL', 'Time Series', 'Pandas', 'Risk Modeling'],
    description: 'Build predictive alpha generation models and algorithmic execution systems for institutional clients.',
    responsibilities: [
      'Design statistical arbitrage and quantitative predictive models in Python.',
      'Optimize backtesting pipelines on massive tick-level market datasets.',
      'Deliver automated risk exposure monitoring dashboards.'
    ],
    postedAt: '4 days ago',
    applicantsCount: 18
  },
  {
    id: 105,
    title: 'Healthcare Systems DevOps Engineer',
    companyId: 4,
    company: 'Nexus Health Systems',
    companyLogo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    minSalary: 85000,
    maxSalary: 115000,
    salaryFormatted: '$85,000 - $115,000 / yr',
    location: 'Austin, TX (Remote)',
    noticePeriod: 'Immediate',
    deadline: '2026-11-18',
    status: 'Open',
    featured: false,
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Prometheus', 'Linux', 'Docker'],
    description: 'Ensure secure, compliant deployment pipelines for critical health infrastructure serving hospitals and clinics nationwide.',
    responsibilities: [
      'Maintain compliant cloud Kubernetes clusters.',
      'Automate backup, failover, and disaster recovery processes.',
      'Monitor container health and set up real-time alerting.'
    ],
    postedAt: '5 days ago',
    applicantsCount: 8
  },
  {
    id: 106,
    title: 'Growth Product Manager',
    companyId: 6,
    company: 'Vanguard Retail Digital',
    companyLogo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&auto=format&fit=crop&q=80',
    category: 'Product',
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    minSalary: 95000,
    maxSalary: 130000,
    salaryFormatted: '$95,000 - $130,000 / yr',
    location: 'Seattle, WA (Hybrid)',
    noticePeriod: '30 Days',
    deadline: '2026-12-10',
    status: 'Open',
    featured: false,
    skills: ['Product Strategy', 'Analytics', 'Funnel Optimization', 'Agile / Scrum', 'SQL'],
    description: 'Drive acquisition, activation, and monetization funnels for our flagship multi-vendor retail platform.',
    responsibilities: [
      'Define goals and roadmap for core candidate and recruiter growth loops.',
      'Formulate ideas, run user experiments, and report data metrics.',
      'Lead cross-functional sprints with engineers and designers.'
    ],
    postedAt: '6 days ago',
    applicantsCount: 16
  },
  {
    id: 107,
    title: 'Junior React & Mobile Developer',
    companyId: 1,
    company: 'TechWave Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    employmentType: 'Full-time',
    experienceLevel: 'Entry',
    minSalary: 60000,
    maxSalary: 80000,
    salaryFormatted: '$60,000 - $80,000 / yr',
    location: 'Remote (US)',
    noticePeriod: 'Immediate',
    deadline: '2026-11-28',
    status: 'Open',
    featured: false,
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'React Native Basics'],
    description: 'Great opportunity for entry-level developers or recent graduates with solid fundamental React knowledge to join an agile engineering team.',
    responsibilities: [
      'Build UI components following design specifications.',
      'Assist in bug fixes and cross-browser testing.',
      'Participate in daily standups and sprint planning.'
    ],
    postedAt: '1 week ago',
    applicantsCount: 35
  },
  {
    id: 108,
    title: 'Enterprise Cyber Security Consultant',
    companyId: 2,
    company: 'CloudPulse Networks',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    category: 'Security',
    employmentType: 'Contract',
    experienceLevel: 'Senior',
    minSalary: 130000,
    maxSalary: 170000,
    salaryFormatted: '$130,000 - $170,000 / yr',
    location: 'Remote (Global)',
    noticePeriod: '15 Days',
    deadline: '2026-11-12',
    status: 'Closed',
    featured: false,
    skills: ['SOC 2', 'Penetration Testing', 'SIEM', 'Cloud Security', 'OWASP Top 10'],
    description: 'Lead external security audits and implement threat prevention strategies across our cloud infrastructure.',
    responsibilities: [
      'Conduct vulnerability assessments and tests.',
      'Implement zero-trust network policies and access controls.',
      'Provide incident response and security training.'
    ],
    postedAt: '2 weeks ago',
    applicantsCount: 12
  }
];

// Module 6: Realistic Seed Candidate Profiles with all 9 required fields
const INITIAL_CANDIDATES = [
  {
    id: 'cand_1',
    name: 'David Kim',
    title: 'Senior Frontend Engineer',
    email: 'david.kim@example.com',
    phone: '+1 (555) 234-5678',
    address: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest'],
    experience: '6 Years',
    experienceDetails: 'Senior Frontend Engineer at TechWave (2021-Present) • Frontend Developer at CodeSphere (2018-2021)',
    education: 'B.S. in Computer Science • Stanford University (2018)',
    resumeName: 'david-kim-resume.pdf',
    resumeUrl: 'https://linkedin.com/in/david-kim-eng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    noticePeriod: '15 Days',
    status: 'Interview Scheduled',
    bio: 'Experienced frontend engineer specialized in building accessible, high-speed React applications and design systems.'
  },
  {
    id: 'cand_2',
    name: 'Priya Sharma',
    title: 'Cloud & Distributed Systems Architect',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 876-5432',
    address: 'Austin, TX',
    skills: ['AWS', 'Node.js', 'Go', 'Kubernetes', 'Docker', 'GraphQL'],
    experience: '5 Years',
    experienceDetails: 'Cloud Infrastructure Lead at DataGrid (2022-Present) • Backend Engineer at CloudScale (2019-2022)',
    education: 'M.S. in Software Systems • UC Berkeley (2019)',
    resumeName: 'priya-sharma-cloud.pdf',
    resumeUrl: 'https://priyasharma.dev/resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    noticePeriod: 'Immediate',
    status: 'Under Review',
    bio: 'AWS Certified Solutions Architect with hands-on experience in Go microservices, Kubernetes clusters, and low-latency APIs.'
  },
  {
    id: 'cand_3',
    name: 'Marcus Vance',
    title: 'Lead Product & UI/UX Designer',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 345-6789',
    address: 'New York, NY',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing'],
    experience: '4 Years',
    experienceDetails: 'Lead UI/UX Designer at Apex Studio (2022-Present) • Product Designer at BrandHub (2020-2022)',
    education: 'B.F.A. in Graphic Design • Rhode Island School of Design (2020)',
    resumeName: 'marcus-vance-design-portfolio.pdf',
    resumeUrl: 'https://dribbble.com/marcusvance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    noticePeriod: '30 Days',
    status: 'Shortlisted',
    bio: 'Crafting user-friendly interfaces, scalable design systems, and delightful digital product experiences.'
  },
  {
    id: 'cand_4',
    name: 'Elena Rostova',
    title: 'DevOps & Site Reliability Engineer',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 901-2345',
    address: 'Seattle, WA',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Prometheus', 'Linux', 'Docker'],
    experience: '7 Years',
    experienceDetails: 'Senior SRE at BioHealth Cloud (2020-Present) • DevOps Engineer at SysOps Co (2017-2020)',
    education: 'B.S. in Information Systems • University of Washington (2017)',
    resumeName: 'elena-rostova-sre.pdf',
    resumeUrl: 'https://linkedin.com/in/elena-devops',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    noticePeriod: 'Immediate',
    status: 'Under Review',
    bio: 'Focusing on reliable infrastructure, automated continuous deployment pipelines, and proactive performance monitoring.'
  },
  {
    id: 'cand_5',
    name: 'Alex Rivera',
    title: 'Full Stack Web Developer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 432-8765',
    address: 'Chicago, IL',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind CSS', 'SQL'],
    experience: '3 Years',
    experienceDetails: 'Full Stack Engineer at VenturePulse (2023-Present) • Junior Web Dev at DevStudio (2021-2023)',
    education: 'B.S. in Computer Science • University of Illinois (2021)',
    resumeName: 'alex-rivera-developer.pdf',
    resumeUrl: 'https://linkedin.com/in/alexrivera-tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    noticePeriod: '15 Days',
    status: 'Shortlisted',
    bio: 'Energetic full stack developer experienced in modern frontend architecture and reliable relational database backends.'
  },
  {
    id: 'cand_6',
    name: 'Sarah Jenkins',
    title: 'Mobile Application Engineer',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 567-8901',
    address: 'Denver, CO',
    skills: ['Flutter', 'React Native', 'Dart', 'iOS/Android', 'Firebase', 'State Management'],
    experience: '4 Years',
    experienceDetails: 'Mobile Lead at AppVenture (2022-Present) • React Native Developer at SwiftApps (2020-2022)',
    education: 'B.S. in Software Engineering • University of Colorado (2020)',
    resumeName: 'sarah-jenkins-mobile.pdf',
    resumeUrl: 'https://sarahjenkins.dev/resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    noticePeriod: 'Immediate',
    status: 'Under Review',
    bio: 'Developing smooth, responsive cross-platform mobile apps using Flutter and React Native.'
  }
];

export const JobProvider = ({ children }) => {
  // Master state
  const [jobs, setJobs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_JOBS);
      return stored ? JSON.parse(stored) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      return stored ? JSON.parse(stored) : [
        {
          id: 'app_1',
          jobId: 101,
          jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
          company: 'TechWave Solutions',
          candidateName: 'David Kim',
          email: 'david.kim@example.com',
          phone: '+1 (555) 234-5678',
          noticePeriod: '15 Days',
          resumeUrl: 'https://linkedin.com/in/david-kim-eng',
          coverNote: 'Over 6 years of experience in enterprise React, Redux, and TypeScript. Currently serving notice and available within 15 days.',
          appliedAt: 'Yesterday',
          status: 'Interview Scheduled'
        },
        {
          id: 'app_2',
          jobId: 102,
          jobTitle: 'Full Stack Cloud Architect',
          company: 'CloudPulse Networks',
          candidateName: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+1 (555) 876-5432',
          noticePeriod: 'Immediate',
          resumeUrl: 'https://priyasharma.dev/resume.pdf',
          coverNote: 'AWS Certified Solutions Architect with deep Go and Kubernetes experience. Immediate joiner ready to start right away.',
          appliedAt: '2 days ago',
          status: 'Under Review'
        },
        {
          id: 'app_3',
          jobId: 103,
          jobTitle: 'Principal Product Designer (Design Systems)',
          company: 'Apex Design Studios',
          candidateName: 'Marcus Vance',
          email: 'marcus.vance@example.com',
          phone: '+1 (555) 345-6789',
          noticePeriod: '30 Days',
          resumeUrl: 'https://dribbble.com/marcusvance',
          coverNote: 'Led design systems at two scaleups. Excited to streamline Apex Design component libraries.',
          appliedAt: '3 days ago',
          status: 'Shortlisted'
        },
        {
          id: 'app_4',
          jobId: 105,
          jobTitle: 'Healthcare Systems DevOps Engineer',
          company: 'Nexus Health Systems',
          candidateName: 'Elena Rostova',
          email: 'elena.rostova@example.com',
          phone: '+1 (555) 901-2345',
          noticePeriod: 'Immediate',
          resumeUrl: 'https://linkedin.com/in/elena-devops',
          coverNote: 'Experienced in cloud pipelines and multi-region Kubernetes deployments.',
          appliedAt: '4 days ago',
          status: 'Under Review'
        },
        {
          id: 'app_5',
          jobId: 104,
          jobTitle: 'Senior Quantitative Analyst / ML Engineer',
          company: 'Apex Financial Technologies',
          candidateName: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          phone: '+1 (555) 432-8765',
          noticePeriod: '15 Days',
          resumeUrl: 'https://linkedin.com/in/alexrivera-tech',
          coverNote: 'Masters in Computational Finance. Proficient in PyTorch, SQL, and sub-millisecond data modeling.',
          appliedAt: '5 days ago',
          status: 'Shortlisted'
        },
        {
          id: 'app_6',
          jobId: 107,
          jobTitle: 'Junior React & Mobile Developer',
          company: 'TechWave Solutions',
          candidateName: 'Sarah Jenkins',
          email: 'sarah.jenkins@example.com',
          phone: '+1 (555) 567-8901',
          noticePeriod: 'Immediate',
          resumeUrl: 'https://sarahjenkins.dev/resume.pdf',
          coverNote: 'Excited about Flutter and React Native mobile development. Ready to join immediately.',
          appliedAt: '3 days ago',
          status: 'Under Review'
        }
      ];
    } catch {
      return [];
    }
  });

  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : [101, 104];
    } catch {
      return [];
    }
  });

  // Module 6: Candidate Profiles State
  const [candidates, setCandidates] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CANDIDATES);
      return stored ? JSON.parse(stored) : INITIAL_CANDIDATES;
    } catch {
      return INITIAL_CANDIDATES;
    }
  });

  // Filter & Search states (Module 5)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('All');
  const [selectedNoticePeriod, setSelectedNoticePeriod] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Persist jobs on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
    } catch (e) {
      console.error('Failed to save jobs to localStorage:', e);
    }
  }, [jobs]);

  // Persist applications on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to save applications:', e);
    }
  }, [applications]);

  // Persist saved jobs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedJobIds));
    } catch (e) {
      console.error('Failed to save bookmarked jobs:', e);
    }
  }, [savedJobIds]);

  // Persist candidates on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CANDIDATES, JSON.stringify(candidates));
    } catch (e) {
      console.error('Failed to save candidates to localStorage:', e);
    }
  }, [candidates]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedJobType, selectedExperience, selectedSalaryRange, selectedNoticePeriod, selectedLocation, statusFilter, sortBy]);

  // Category and Location unique lists for filters
  const categoriesList = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return ['All', ...Array.from(set)];
  }, [jobs]);

  const locationsList = useMemo(() => {
    return ['All', 'Remote', 'Hybrid', 'On-site'];
  }, []);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          (job.skills && job.skills.some((s) => s.toLowerCase().includes(q))) ||
          (job.description && job.description.toLowerCase().includes(q));

        const matchesCategory =
          selectedCategory === 'All' || job.category === selectedCategory;

        const matchesJobType =
          selectedJobType === 'All' || job.employmentType === selectedJobType;

        const matchesExp =
          selectedExperience === 'All' || job.experienceLevel === selectedExperience;

        const matchesSalary =
          selectedSalaryRange === 'All' ||
          (selectedSalaryRange === '<100k' && ((job.minSalary && job.minSalary < 100000) || (job.maxSalary && job.maxSalary < 100000))) ||
          (selectedSalaryRange === '100k-150k' && (job.maxSalary >= 100000 && job.minSalary <= 150000)) ||
          (selectedSalaryRange === '150k+' && (job.maxSalary >= 150000 || job.minSalary >= 150000));

        const matchesNotice =
          selectedNoticePeriod === 'All' || job.noticePeriod === selectedNoticePeriod;

        const matchesLoc =
          selectedLocation === 'All' ||
          (selectedLocation === 'Remote' && job.location.toLowerCase().includes('remote')) ||
          (selectedLocation === 'Hybrid' && job.location.toLowerCase().includes('hybrid')) ||
          (selectedLocation === 'On-site' && !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid'));

        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'open' && job.status === 'Open') ||
          (statusFilter === 'closed' && job.status === 'Closed');

        return (
          matchesSearch &&
          matchesCategory &&
          matchesJobType &&
          matchesExp &&
          matchesSalary &&
          matchesNotice &&
          matchesLoc &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        if (sortBy === 'salary-desc') {
          return (b.maxSalary || 0) - (a.maxSalary || 0);
        }
        if (sortBy === 'deadline-asc') {
          return new Date(a.deadline) - new Date(b.deadline);
        }
        return b.id - a.id;
      });
  }, [
    jobs,
    searchQuery,
    selectedCategory,
    selectedJobType,
    selectedExperience,
    selectedSalaryRange,
    selectedNoticePeriod,
    selectedLocation,
    statusFilter,
    sortBy
  ]);

  // Paginated jobs
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredJobs.slice(startIdx, startIdx + pageSize);
  }, [filteredJobs, currentPage, pageSize]);

  // Module 4: Job Posting CRUD Actions
  const addJob = (jobData) => {
    const newId = Date.now();
    const formattedSalary = jobData.minSalary && jobData.maxSalary
      ? `$${Number(jobData.minSalary).toLocaleString()} - $${Number(jobData.maxSalary).toLocaleString()} / yr`
      : jobData.salaryFormatted || '$90,000 - $120,000 / yr';

    const newJob = {
      ...jobData,
      id: newId,
      salaryFormatted: formattedSalary,
      status: jobData.status || 'Open',
      applicantsCount: 0,
      postedAt: 'Just now',
      companyLogo:
        jobData.companyLogo ||
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      skills: Array.isArray(jobData.skills)
        ? jobData.skills
        : (jobData.skills || '').split(',').map((s) => s.trim()).filter(Boolean)
    };

    setJobs((prev) => [newJob, ...prev]);
    toast.success('Job opening posted successfully!');
    return newJob;
  };

  const updateJob = (id, updatedFields) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === Number(id) || job.id === id) {
          const skills = Array.isArray(updatedFields.skills)
            ? updatedFields.skills
            : typeof updatedFields.skills === 'string'
            ? updatedFields.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : job.skills;

          const formattedSalary = updatedFields.minSalary && updatedFields.maxSalary
            ? `$${Number(updatedFields.minSalary).toLocaleString()} - $${Number(updatedFields.maxSalary).toLocaleString()} / yr`
            : job.salaryFormatted;

          return {
            ...job,
            ...updatedFields,
            skills,
            salaryFormatted: formattedSalary
          };
        }
        return job;
      })
    );
    toast.success('Job details updated successfully!');
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== Number(id) && j.id !== id));
    toast.info('Job posting removed.');
  };

  const toggleJobStatus = (id) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === Number(id) || job.id === id) {
          const nextStatus = job.status === 'Open' ? 'Closed' : 'Open';
          toast.success(`Job marked as ${nextStatus}`);
          return { ...job, status: nextStatus };
        }
        return job;
      })
    );
  };

  const getJobById = (id) => {
    return jobs.find((j) => String(j.id) === String(id)) || null;
  };

  // Module 7: Applications & Saved Jobs Actions
  const toggleSaveJob = (id) => {
    const numId = Number(id);
    setSavedJobIds((prev) => {
      const isSaved = prev.includes(numId);
      if (isSaved) {
        toast.info('Removed from saved jobs.');
        return prev.filter((item) => item !== numId);
      } else {
        toast.success('Job saved to your bookmarks!');
        return [...prev, numId];
      }
    });
  };

  const removeSavedJob = (id) => {
    const numId = Number(id);
    setSavedJobIds((prev) => prev.filter((item) => item !== numId));
    toast.info('Job removed from saved list.');
  };

  const isJobSaved = (id) => {
    return savedJobIds.includes(Number(id));
  };

  // Saved Jobs full objects list
  const savedJobs = useMemo(() => {
    return jobs.filter((j) => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  const applyToJob = (jobId, applicationData) => {
    const targetJob = getJobById(jobId);
    const newApplication = {
      id: `app_${Date.now()}`,
      jobId: Number(jobId),
      jobTitle: targetJob?.title || 'Position',
      company: targetJob?.company || 'Employer',
      candidateName: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone || 'N/A',
      noticePeriod: applicationData.noticePeriod || 'Immediate',
      resumeUrl: applicationData.resumeUrl || 'portfolio-resume.pdf',
      coverNote: applicationData.coverNote || '',
      appliedAt: 'Just now',
      status: 'Under Review'
    };

    setApplications((prev) => [newApplication, ...prev]);

    // Increment applicants counter on job
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === Number(jobId)) {
          return { ...j, applicantsCount: (j.applicantsCount || 0) + 1 };
        }
        return j;
      })
    );

    toast.success(`Application submitted to ${targetJob?.company || 'the employer'}!`);
    return newApplication;
  };

  const updateApplicationStatus = (appId, newStatus) => {
    let matchedName = null;
    let matchedEmail = null;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          matchedName = app.candidateName;
          matchedEmail = app.email;
          toast.success(`Updated ${app.candidateName}'s status to "${newStatus}"`);
          return { ...app, status: newStatus };
        }
        return app;
      })
    );

    if (matchedName || matchedEmail) {
      setCandidates((prev) =>
        prev.map((cand) => {
          const isMatch =
            (matchedName && cand.name?.toLowerCase().trim() === matchedName.toLowerCase().trim()) ||
            (matchedEmail && cand.email?.toLowerCase().trim() === matchedEmail.toLowerCase().trim());
          return isMatch ? { ...cand, status: newStatus } : cand;
        })
      );
    }
  };

  // Synchronized talent pool actions (Module 6 & 7 integration)
  const shortlistCandidate = (candId) => {
    const target = candidates.find((c) => c.id === candId);
    if (!target) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: 'Shortlisted' } : c))
    );

    const appIndex = applications.findIndex(
      (a) =>
        a.candidateName?.toLowerCase().trim() === target.name?.toLowerCase().trim() ||
        a.email?.toLowerCase().trim() === target.email?.toLowerCase().trim()
    );

    if (appIndex >= 0) {
      setApplications((prev) =>
        prev.map((a, i) => (i === appIndex ? { ...a, status: 'Shortlisted' } : a))
      );
    } else {
      const newApp = {
        id: `app_${Date.now()}`,
        jobId: 101,
        jobTitle: target.title || 'Senior Software Engineer',
        company: 'TechWave Solutions',
        candidateName: target.name,
        email: target.email,
        phone: target.phone || 'N/A',
        noticePeriod: target.noticePeriod || 'Immediate',
        resumeUrl: target.resumeUrl || 'resume.pdf',
        coverNote: target.bio || 'Direct shortlist from candidate talent pool.',
        appliedAt: 'Just now',
        status: 'Shortlisted'
      };
      setApplications((prev) => [newApp, ...prev]);
    }

    toast.success(`${target.name} has been marked as Shortlisted!`);
  };

  const scheduleInterviewForCandidate = (candId) => {
    const target = candidates.find((c) => c.id === candId);
    if (!target) return;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: 'Interview Scheduled' } : c))
    );

    const appIndex = applications.findIndex(
      (a) =>
        a.candidateName?.toLowerCase().trim() === target.name?.toLowerCase().trim() ||
        a.email?.toLowerCase().trim() === target.email?.toLowerCase().trim()
    );

    if (appIndex >= 0) {
      setApplications((prev) =>
        prev.map((a, i) => (i === appIndex ? { ...a, status: 'Interview Scheduled' } : a))
      );
    } else {
      const newApp = {
        id: `app_${Date.now()}`,
        jobId: 101,
        jobTitle: target.title || 'Senior Software Engineer',
        company: 'TechWave Solutions',
        candidateName: target.name,
        email: target.email,
        phone: target.phone || 'N/A',
        noticePeriod: target.noticePeriod || 'Immediate',
        resumeUrl: target.resumeUrl || 'resume.pdf',
        coverNote: target.bio || 'Direct interview scheduled from candidate talent pool.',
        appliedAt: 'Just now',
        status: 'Interview Scheduled'
      };
      setApplications((prev) => [newApp, ...prev]);
    }

    toast.success(`Interview scheduled with ${target.name}!`);
  };

  // Withdraw Application (UI Only)
  const withdrawApplication = (appId) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return { ...app, status: 'Withdrawn' };
        }
        return app;
      })
    );
    toast.info('Application withdrawn successfully.');
  };

  // Module 6: Candidate Profile Management
  const addCandidate = (candidateData) => {
    const newId = `cand_${Date.now()}`;
    const newCandidate = {
      id: newId,
      name: candidateData.name || 'New Candidate',
      title: candidateData.title || 'Software Professional',
      email: candidateData.email || 'candidate@example.com',
      phone: candidateData.phone || '+1 (555) 000-0000',
      address: candidateData.address || 'Remote',
      skills: Array.isArray(candidateData.skills)
        ? candidateData.skills
        : (candidateData.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      experience: candidateData.experience || '2 Years',
      experienceDetails: candidateData.experienceDetails || 'Software Developer at Tech Co',
      education: candidateData.education || 'B.S. in Computer Science',
      resumeName: candidateData.resumeName || `${candidateData.name?.toLowerCase().replace(/\s+/g, '-') || 'candidate'}-resume.pdf`,
      resumeUrl: candidateData.resumeUrl || 'https://linkedin.com',
      avatar: candidateData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(candidateData.name || 'Candidate')}`,
      noticePeriod: candidateData.noticePeriod || 'Immediate',
      bio: candidateData.bio || 'Motivated professional ready to contribute to engineering goals.'
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    toast.success('Candidate profile created successfully!');
    return newCandidate;
  };

  const updateCandidate = (id, updatedFields) => {
    setCandidates((prev) =>
      prev.map((cand) => {
        if (cand.id === id) {
          const skills = Array.isArray(updatedFields.skills)
            ? updatedFields.skills
            : typeof updatedFields.skills === 'string'
            ? updatedFields.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : cand.skills;

          return {
            ...cand,
            ...updatedFields,
            skills
          };
        }
        return cand;
      })
    );
    toast.success('Candidate profile updated successfully!');
  };

  const deleteCandidate = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    toast.info('Candidate profile removed.');
  };

  const getCandidateById = (id) => {
    return candidates.find((c) => c.id === id) || null;
  };

  // Quick reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedJobType('All');
    setSelectedExperience('All');
    setSelectedSalaryRange('All');
    setSelectedNoticePeriod('All');
    setSelectedLocation('All');
    setStatusFilter('all');
    setSortBy('latest');
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        paginatedJobs,
        totalJobsCount: jobs.length,
        activeJobsCount: jobs.filter((j) => j.status === 'Open').length,
        applications,
        savedJobIds,
        savedJobs,
        isJobSaved,
        toggleSaveJob,
        removeSavedJob,
        applyToJob,
        updateApplicationStatus,
        withdrawApplication,
        // Module 6: Candidate Profiles
        candidates,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        getCandidateById,
        shortlistCandidate,
        scheduleInterviewForCandidate,
        // Filters
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedJobType,
        setSelectedJobType,
        selectedExperience,
        setSelectedExperience,
        selectedSalaryRange,
        setSelectedSalaryRange,
        selectedNoticePeriod,
        setSelectedNoticePeriod,
        selectedLocation,
        setSelectedLocation,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        resetFilters,
        // Pagination
        currentPage,
        setCurrentPage,
        pageSize,
        totalPages,
        // Categories & Location lists
        categoriesList,
        locationsList,
        // CRUD Operations
        addJob,
        updateJob,
        deleteJob,
        toggleJobStatus,
        getJobById
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
