import React from 'react';
import StartupCard from './StartupCard';

const AllStartups = ({ startups, sort, setSort, view, setView, onViewDetails, onApply }) => (
  <section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">All Startups ({startups.length})</h2>
      <div className="flex items-center gap-2">
        <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-full px-3 py-1 border border-purple-500 bg-white/10 text-white transition focus:ring-2 focus:ring-purple-500">
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
        <button className={`rounded-full px-3 py-1 border border-purple-500 bg-white/10 transition ${view === 'grid' ? 'font-bold shadow' : ''}`} onClick={() => setView('grid')}>Grid</button>
        <button className={`rounded-full px-3 py-1 border border-purple-500 bg-white/10 transition ${view === 'list' ? 'font-bold shadow' : ''}`} onClick={() => setView('list')}>List</button>
      </div>
    </div>
    <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300' : 'flex flex-col gap-4 transition-all duration-300'}>
      {startups.map(startup => (
        <StartupCard key={startup.id} startup={startup} onViewDetails={onViewDetails} onApply={onApply} featured={false} />
      ))}
    </div>
  </section>
);

export default AllStartups; 