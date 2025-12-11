import React, { useState } from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { Trophy } from 'lucide-react';
import { SeasonType } from '../App';

interface LeaderboardProps {
  currentSeason: SeasonType;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentSeason }) => {
  const [view, setView] = useState<'season' | 'all-time'>('season');

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col pb-2 border-brand-season-primary/20">
      <div className="h-14 px-4 border-b border-white/5 bg-brand-surface/50 flex justify-between items-center backdrop-blur-md">
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-season-accent" />
          Leaderboard
        </h3>
        <div className="flex space-x-1">
          <button 
            onClick={() => setView('season')}
            className={`px-3 py-1 text-[10px] font-bold rounded shadow-sm uppercase tracking-wide transition-all border ${
              view === 'season' 
                ? 'bg-brand-season-primary/20 text-brand-season-primary border-brand-season-primary/20' 
                : 'bg-transparent text-gray-500 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            {currentSeason} Season
          </button>
          <button 
            onClick={() => setView('all-time')}
            className={`px-3 py-1 text-[10px] font-bold rounded shadow-sm uppercase tracking-wide transition-all border ${
              view === 'all-time' 
                ? 'bg-brand-season-primary/20 text-brand-season-primary border-brand-season-primary/20' 
                : 'bg-transparent text-gray-500 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            All-Time
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-brand-dark/30 flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/5 bg-black/20">
              <th className="py-3 pl-4 font-bold">Rank</th>
              <th className="py-3 font-bold">Player</th>
              <th className="py-3 text-center font-bold">Games</th>
              <th className="py-3 text-right pr-4 font-bold">Essence</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MOCK_LEADERBOARD.map((entry) => (
              <tr 
                key={entry.address} 
                className={`group border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${entry.isCurrentUser ? 'bg-brand-season-primary/5 border-brand-season-primary/20' : ''}`}
              >
                <td className="py-3 pl-4 font-mono">
                  {entry.rank <= 3 ? (
                    <span className="text-brand-season-accent font-bold drop-shadow-md">#{entry.rank}</span>
                  ) : (
                    <span className="text-gray-500">#{entry.rank}</span>
                  )}
                </td>
                <td className="py-3 font-medium text-gray-300 group-hover:text-white transition-colors">
                  {entry.address}
                  {entry.isCurrentUser && <span className="ml-2 text-[9px] bg-brand-season-primary text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">YOU</span>}
                </td>
                <td className="py-3 text-center text-gray-500 group-hover:text-gray-300">{entry.gamesPlayed}</td>
                <td className="py-3 text-right pr-4 font-mono text-brand-season-primary font-bold group-hover:text-white">{entry.totalEssence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};