import React from 'react';
import { Eye, Mail, Flame } from 'lucide-react';

const StartupCard = ({ startup, onViewDetails, onApply, featured }) => (
  <div className={`rounded-xl shadow-lg p-5 flex flex-col gap-2 bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl hover:border-purple-500 cursor-pointer group` + (featured ? ' border-2' : ' border') }>
    <div className="flex items-center gap-2 mb-2">
      <span className="font-bold text-lg line-clamp-1">{startup.name}</span>
      {featured && <span className="rounded-full px-2 py-1 text-xs font-semibold border border-yellow-400 animate-pulse">Featured</span>}
      <span className="rounded-full px-2 py-1 text-xs font-semibold border border-gray-400 bg-white/10 group-hover:border-purple-500 transition-all">{startup.domain}</span>
      <span className={`rounded-full px-2 py-1 text-xs font-semibold border ${startup.stage === 'Idea Stage' ? 'border-yellow-400' : startup.stage === 'MVP' ? 'border-blue-400' : 'border-green-400'} bg-white/10 group-hover:border-purple-500 transition-all`}>{startup.stage}</span>
    </div>
    <div className="flex gap-2 text-xs opacity-80">
      <span>Founded: {startup.foundedYear}</span>
      <span>Team: {startup.teamSize}</span>
      <span>Location: {startup.location}</span>
    </div>
    <div className="text-sm mb-2 line-clamp-2 opacity-90">{startup.description}</div>
    <div className="flex items-center gap-2 mb-2">
      <img src={startup.founder.avatar} alt={startup.founder.name} className="w-8 h-8 rounded-full border border-white/20" />
      <span className="font-semibold text-xs line-clamp-1">{startup.founder.name}</span>
      <span className="text-xs opacity-80 line-clamp-1">{startup.founder.role}</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-2">
      {startup.openRoles.map(role => (
        <span key={role} className="rounded-full px-2 py-1 text-xs font-semibold border border-purple-400 bg-purple-400/10 group-hover:bg-purple-500/20 group-hover:border-purple-500 transition-all animate-pulse hover:scale-105">{role}</span>
      ))}
    </div>
    <div className="flex gap-2 mt-auto">
      <button className="rounded-full px-4 py-1 border font-semibold border-purple-500 bg-white/10 hover:bg-purple-500/20 transition shadow" onClick={() => onViewDetails(startup)}>View Details</button>
      <button className="rounded-full px-4 py-1 border font-semibold border-purple-500 bg-purple-500/10 hover:bg-purple-600/20 transition shadow" onClick={() => onApply(startup)}>Apply Now</button>
    </div>
    <div className="flex gap-4 text-xs mt-2 opacity-80">
      <span className="flex items-center gap-1" title="Views"><Eye className="w-4 h-4" /> {startup.views}</span>
      <span className="flex items-center gap-1" title="Applications"><Mail className="w-4 h-4" /> {startup.applications}</span>
      {startup.trending && <span className="flex items-center gap-1 font-semibold" title="Trending"><Flame className="w-4 h-4 animate-pulse text-orange-400" /> Trending</span>}
    </div>
  </div>
);

export default StartupCard; 