import React, { useEffect, useState } from 'react';
import { Users, Star, Briefcase, UserPlus } from 'lucide-react';

const statIcons = [
  <Star key="featured" className="w-6 h-6 mb-1" />,
  <Briefcase key="roles" className="w-6 h-6 mb-1" />,
  <UserPlus key="members" className="w-6 h-6 mb-1" />,
  <Users key="total" className="w-6 h-6 mb-1" />,
];

const StartupSummary = ({ stats, onCreate }) => {
  const [animatedStats, setAnimatedStats] = useState({ total: 0, featured: 0, openRoles: 0, teamMembers: 0 });

  useEffect(() => {
    const keys = Object.keys(stats);
    let frame;
    let start = 0;
    const duration = 800;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimatedStats({
        total: Math.floor(stats.total * progress),
        featured: Math.floor(stats.featured * progress),
        openRoles: Math.floor(stats.openRoles * progress),
        teamMembers: Math.floor(stats.teamMembers * progress),
      });
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setAnimatedStats(stats);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [stats]);

  const statList = [
    { label: 'Total Startups', value: animatedStats.total, icon: <Users className="w-6 h-6 mb-1" /> },
    { label: 'Featured', value: animatedStats.featured, icon: <Star className="w-6 h-6 mb-1" /> },
    { label: 'Open Roles', value: animatedStats.openRoles, icon: <Briefcase className="w-6 h-6 mb-1" /> },
    { label: 'Team Members', value: animatedStats.teamMembers, icon: <UserPlus className="w-6 h-6 mb-1" /> },
  ];

  return (
    <section className="mb-8">
      <div className="mb-4">
        
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {statList.map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-xl shadow-lg p-4 flex flex-col items-center bg-white/10 border border-white/10 transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:border-purple-500 cursor-pointer"
          >
            {stat.icon}
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-sm opacity-80">{stat.label}</span>
          </div>
        ))}
      </div>
      <button className="rounded-full px-6 py-2 font-semibold border border-purple-500 bg-white/10 hover:bg-purple-500/20 transition shadow" onClick={onCreate}>+ Create Startup</button>
    </section>
  );
};

export default StartupSummary; 