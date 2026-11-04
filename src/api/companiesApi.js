import axios from 'axios';

// Storage key for local persistence
const STORAGE_KEY = 'jobportal_companies_v1';

// Curated high quality seed companies with realistic data and logos
export const INITIAL_COMPANIES = [
  {
    id: 1,
    name: 'TechWave Innovations',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    industry: 'Technology',
    location: 'San Francisco, CA',
    website: 'https://techwave.io',
    contactEmail: 'careers@techwave.io',
    employees: 1250,
    founded: 2017,
    rating: 4.8,
    openJobsCount: 14,
    description: 'TechWave is a premier distributed cloud intelligence platform revolutionizing edge computing, microservices, and AI-assisted enterprise analytics.',
    benefits: ['Remote First', 'Competitive Equity', 'Health & Wellness Stipend', 'Learning Allowance'],
    featured: true
  },
  {
    id: 2,
    name: 'Apex Financial Technologies',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=160&auto=format&fit=crop&q=80',
    industry: 'Finance & FinTech',
    location: 'New York, NY',
    website: 'https://apexfintech.com',
    contactEmail: 'talent@apexfintech.com',
    employees: 3400,
    founded: 2014,
    rating: 4.6,
    openJobsCount: 22,
    description: 'Next-generation algorithmic trading, modern banking APIs, and high-frequency settlement infrastructure trusted by leading global institutions.',
    benefits: ['Annual Bonuses', '401(k) Match 6%', 'Comprehensive Medical', 'Parental Leave'],
    featured: true
  },
  {
    id: 3,
    name: 'BioPulse HealthTech',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=160&auto=format&fit=crop&q=80',
    industry: 'Healthcare',
    location: 'Boston, MA',
    website: 'https://biopulsehealth.org',
    contactEmail: 'hr@biopulsehealth.org',
    employees: 820,
    founded: 2019,
    rating: 4.9,
    openJobsCount: 9,
    description: 'Transforming clinical trial management and telehealth monitoring systems with machine learning and automated patient care workflows.',
    benefits: ['Full Medical & Dental', 'Flexible Schedule', 'Mental Health Support', 'Sabbaticals'],
    featured: false
  },
  {
    id: 4,
    name: 'NovaScale Commerce',
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=160&auto=format&fit=crop&q=80',
    industry: 'E-Commerce',
    location: 'Austin, TX',
    website: 'https://novascale.shop',
    contactEmail: 'jobs@novascale.shop',
    employees: 1850,
    founded: 2016,
    rating: 4.4,
    openJobsCount: 18,
    description: 'End-to-end headless commerce infrastructure enabling global direct-to-consumer lifestyle and luxury brands to scale globally.',
    benefits: ['Home Office Budget', 'Product Discounts', 'Unlimited PTO', 'Annual Retreats'],
    featured: false
  },
  {
    id: 5,
    name: 'Aetheria Studio Labs',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=160&auto=format&fit=crop&q=80',
    industry: 'Design & Creative',
    location: 'Seattle, WA',
    website: 'https://aetheriadesign.co',
    contactEmail: 'hello@aetheriadesign.co',
    employees: 210,
    founded: 2021,
    rating: 4.9,
    openJobsCount: 6,
    description: 'Award-winning digital experience and interaction design studio crafting immersive design systems for Fortune 500 tech leaders.',
    benefits: ['Latest Apple Gear', 'Creative Hackathons', 'Wellness Days', 'Dog-friendly Offices'],
    featured: true
  },
  {
    id: 6,
    name: 'CloudVanguard Systems',
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=160&auto=format&fit=crop&q=80',
    industry: 'Technology',
    location: 'Denver, CO',
    website: 'https://cloudvanguard.net',
    contactEmail: 'recruiting@cloudvanguard.net',
    employees: 4200,
    founded: 2012,
    rating: 4.5,
    openJobsCount: 31,
    description: 'Zero-trust cybersecurity, multi-cloud Kubernetes orchestration, and enterprise observability platforms.',
    benefits: ['Hybrid Work', 'Stock Options', 'Tuition Reimbursement', 'Fitness Stipend'],
    featured: false
  },
  {
    id: 7,
    name: 'Starlight Media Group',
    logo: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=160&auto=format&fit=crop&q=80',
    industry: 'Marketing & Media',
    location: 'Los Angeles, CA',
    website: 'https://starlightmedia.com',
    contactEmail: 'team@starlightmedia.com',
    employees: 640,
    founded: 2018,
    rating: 4.3,
    openJobsCount: 11,
    description: 'Data-driven omnichannel viral marketing, creator management, and interactive streaming content production.',
    benefits: ['Free Streaming Services', 'Flexible Hours', 'Catered Lunches', 'Travel Grants'],
    featured: false
  },
  {
    id: 8,
    name: 'Veritas Quantum AI',
    logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=160&auto=format&fit=crop&q=80',
    industry: 'Technology',
    location: 'Cambridge, MA',
    website: 'https://veritasquantum.ai',
    contactEmail: 'careers@veritasquantum.ai',
    employees: 480,
    founded: 2022,
    rating: 4.9,
    openJobsCount: 16,
    description: 'Pioneering generative models and quantum computational simulations for material discovery and bio-molecular simulation.',
    benefits: ['Top-tier Research Grants', 'Competitive Base + Equity', 'Conference Travel', 'Full Health'],
    featured: true
  },
  {
    id: 9,
    name: 'GreenHorizon Energy',
    logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=160&auto=format&fit=crop&q=80',
    industry: 'CleanTech & Energy',
    location: 'Portland, OR',
    website: 'https://greenhorizonenergy.org',
    contactEmail: 'talent@greenhorizonenergy.org',
    employees: 1100,
    founded: 2015,
    rating: 4.7,
    openJobsCount: 8,
    description: 'Smart grid energy storage, battery analytics, and community solar distributed IoT management software.',
    benefits: ['Electric Vehicle Stipend', 'Solar Subsidies', '401(k) Match', 'Paid Volunteer Days'],
    featured: false
  }
];

// Helper to get from local storage
export const getStoredCompanies = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading stored companies:', err);
  }
  return null;
};

// Helper to save to local storage
export const saveStoredCompanies = (companies) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  } catch (err) {
    console.error('Error saving companies to storage:', err);
  }
};

/**
 * Fetch companies with third-party API integration (DummyJSON / JSONPlaceholder)
 * and merge with local storage overrides
 */
export const fetchCompaniesApi = async () => {
  // Check if we already have persisted modified data in local storage
  const stored = getStoredCompanies();
  if (stored && stored.length > 0) {
    return stored;
  }

  try {
    // Calling DummyJSON users API (or JSONPlaceholder) to demonstrate real third-party API integration
    const response = await axios.get('https://dummyjson.com/users?limit=6', { timeout: 6000 });
    
    // Map third party API response to rich company schema
    if (response.data && Array.isArray(response.data.users)) {
      const externalCompanies = response.data.users.map((user, idx) => ({
        id: 100 + user.id,
        name: user.company?.name || `Global Dynamics ${user.id}`,
        logo: `https://images.unsplash.com/photo-${1550000000000 + (idx * 12345)}?w=160&auto=format&fit=crop&q=80`,
        industry: user.company?.department?.includes('Tech') ? 'Technology' : 
                  user.company?.department?.includes('Finance') ? 'Finance & FinTech' : 
                  user.company?.department?.includes('Marketing') ? 'Marketing & Media' : 'Technology',
        location: `${user.company?.address?.city || 'Chicago'}, ${user.company?.address?.state || 'IL'}`,
        website: `https://${(user.company?.name || 'company').toLowerCase().replace(/[^a-z]/g, '')}.com`,
        contactEmail: user.email || `contact@${user.company?.name || 'company'}.com`,
        employees: 350 + (user.age * 25),
        founded: 2010 + (idx % 12),
        rating: 4.5,
        openJobsCount: 4 + (idx % 7),
        description: `Specializing in ${user.company?.department || 'enterprise solutions'} and ${user.company?.title || 'digital transformation'}. Delivering best-in-class operations worldwide.`,
        benefits: ['Medical Insurance', 'Flexible PTO', 'Retirement Plan'],
        featured: false
      }));

      // Merge initial high-grade companies with the fetched ones
      const combined = [...INITIAL_COMPANIES, ...externalCompanies];
      saveStoredCompanies(combined);
      return combined;
    }
  } catch (apiError) {
    console.warn('Third-party API request failed or timed out, utilizing local seed dataset:', apiError.message);
  }

  // Fallback to initial seeds
  saveStoredCompanies(INITIAL_COMPANIES);
  return INITIAL_COMPANIES;
};
