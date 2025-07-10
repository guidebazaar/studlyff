import React from 'react';
import StartupCard from './StartupCard';

const FeaturedStartups = ({ startups, onViewAll, onViewDetails, onApply }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <div>
        <h2 className="text-2xl font-bold">Featured Startups</h2>
        <p className="text-base opacity-80">Trending ventures with exciting opportunities</p>
      </div>
      <button className="rounded-full px-4 py-2 font-semibold border border-purple-500 bg-white/10 hover:bg-purple-500/20 transition shadow" onClick={onViewAll}>View All Trending</button>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
      {startups.map(startup => (
        <div key={startup.id} className="snap-center min-w-[320px] max-w-xs">
          <StartupCard startup={startup} onViewDetails={onViewDetails} onApply={onApply} featured />
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedStartups; 