import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/startups/HeroSection';
import SidebarFilters from '../components/startups/SidebarFilters';
import StartupSummary from '../components/startups/StartupSummary';
import FeaturedStartups from '../components/startups/FeaturedStartups';
import AllStartups from '../components/startups/AllStartups';
import CreateStartupModal from '../components/CreateStartupModal';

const initialStartups = [
  {
    id: 1,
    name: 'EduTech Solutions',
    domain: 'EdTech',
    stage: 'MVP',
    foundedYear: 2022,
    teamSize: 10,
    location: 'Bangalore, India',
    description: 'Revolutionizing education with AI-powered learning analytics and personalized curriculum development.',
    founder: { name: 'Aisha Patel', role: 'CEO & Co-founder', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    openRoles: ['ML Engineer', 'Content Marketing'],
    views: 120,
    applications: 8,
    trending: true
  },
  {
    id: 2,
    name: 'FinLearn',
    domain: 'FinTech',
    stage: 'Idea Stage',
    foundedYear: 2023,
    teamSize: 5,
    location: 'Mumbai, India',
    description: 'Making financial literacy accessible through gamified learning and simulations.',
    founder: { name: 'Vikram Mehta', role: 'CEO', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    openRoles: ['Product Designer', 'Frontend Developer'],
    views: 80,
    applications: 3,
    trending: false
  },
  {
    id: 3,
    name: 'GreenCommute',
    domain: 'Sustainability',
    stage: 'Funded',
    foundedYear: 2021,
    teamSize: 20,
    location: 'Delhi, India',
    description: 'Reduces carbon footprint by connecting students for shared rides and eco-friendly transport.',
    founder: { name: 'Arjun Singh', role: 'CEO & Founder', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    openRoles: ['Mobile Developer', 'Growth Marketing'],
    views: 200,
    applications: 15,
    trending: true
  },
  {
    id: 4,
    name: 'CampusEats',
    domain: 'Food Tech',
    stage: 'MVP',
    foundedYear: 2022,
    teamSize: 8,
    location: 'Pune, India',
    description: 'Connects local restaurants with students for affordable meal plans and on-campus delivery.',
    founder: { name: 'Rohan Desai', role: 'CEO & Co-founder', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    openRoles: ['Operations Manager', 'UI/UX Designer'],
    views: 60,
    applications: 2,
    trending: false
  }
];

const getStats = (startups) => {
  return {
    total: startups.length,
    featured: startups.filter(s => s.trending).length,
    openRoles: startups.reduce((acc, s) => acc + (s.openRoles?.length || 0), 0),
    teamMembers: startups.reduce((acc, s) => acc + (s.teamSize || 0), 0)
  };
};

const Startups = () => {
  const [startups, setStartups] = useState(initialStartups);
  const [filters, setFilters] = useState({
    search: '',
    domains: [],
    stages: [],
    teamSizes: [],
    collabTypes: [],
    locations: [],
    foundedFrom: '',
    foundedTo: ''
  });
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');
  const [showModal, setShowModal] = useState(false);

  // Filtering logic
  const filteredStartups = useMemo(() => {
    return startups.filter(s => {
      // Search
      const searchMatch =
        filters.search === '' ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        (s.domain && s.domain.toLowerCase().includes(filters.search.toLowerCase()));
      // Domain
      const domainMatch = filters.domains.length === 0 || filters.domains.includes(s.domain);
      // Stage
      const stageMatch = filters.stages.length === 0 || filters.stages.includes(s.stage);
      // Team Size
      const sizeMatch = filters.teamSizes.length === 0 || filters.teamSizes.some(size => {
        if (size === '1–5 members') return s.teamSize >= 1 && s.teamSize <= 5;
        if (size === '6–10 members') return s.teamSize >= 6 && s.teamSize <= 10;
        if (size === '11–20 members') return s.teamSize >= 11 && s.teamSize <= 20;
        if (size === '20+ members') return s.teamSize > 20;
        return false;
      });
      // Collaboration Type (not implemented in mock data)
      const collabMatch = true;
      // Location
      const locationMatch = filters.locations.length === 0 || filters.locations.includes(s.location);
      // Founded Year
      const foundedFromMatch = !filters.foundedFrom || s.foundedYear >= Number(filters.foundedFrom);
      const foundedToMatch = !filters.foundedTo || s.foundedYear <= Number(filters.foundedTo);
      return searchMatch && domainMatch && stageMatch && sizeMatch && collabMatch && locationMatch && foundedFromMatch && foundedToMatch;
    });
  }, [startups, filters]);

  // Sorting
  const sortedStartups = useMemo(() => {
    let arr = [...filteredStartups];
    if (sort === 'newest') arr.sort((a, b) => b.foundedYear - a.foundedYear);
    if (sort === 'popular') arr.sort((a, b) => b.views - a.views);
    return arr;
  }, [filteredStartups, sort]);

  // Featured
  const featuredStartups = sortedStartups.filter(s => s.trending);

  // Stats
  const stats = useMemo(() => getStats(filteredStartups), [filteredStartups]);

  const clearAll = () => setFilters({
    search: '',
    domains: [],
    stages: [],
    teamSizes: [],
    collabTypes: [],
    locations: [],
    foundedFrom: '',
    foundedTo: ''
  });

  // Handle create startup
  const handleCreateStartup = (formData) => {
    setStartups(prev => [
      {
        ...formData,
        id: prev.length + 1,
        founder: { name: formData.teamMembers?.[0]?.name || 'Unknown', role: formData.teamMembers?.[0]?.role || '', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' },
        openRoles: formData.opportunities || [],
        views: 0,
        applications: 0,
        trending: false
      },
      ...prev
    ]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <div className="relative max-w-7xl mx-auto px-2 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
          <div className="sticky top-24 self-start z-10">
            <SidebarFilters filters={filters} setFilters={setFilters} clearAll={clearAll} />
          </div>
          <main className="flex-1 flex flex-col gap-8">
            <StartupSummary stats={stats} onCreate={() => setShowModal(true)} />
            <div className="animate-fadeInUp">
              <FeaturedStartups startups={featuredStartups} onViewAll={() => { }} onViewDetails={() => { }} onApply={() => { }} />
            </div>
            <div className="w-full">
              <AllStartups startups={sortedStartups} sort={sort} setSort={setSort} view={view} setView={setView} onViewDetails={() => { }} onApply={() => { }} />
            </div>
          </main>
        </div>
        {showModal && <CreateStartupModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateStartup} />}
      </div>
    </div>
  );
};

export default Startups;
