import React from 'react';
import { SEASONS } from '../constants';
import { SeasonStatus } from '../types';
import { Lock, Flame, Droplets, Wind, Mountain, CheckCircle2, Clock } from 'lucide-react';
import { SeasonType } from '../App';

interface RoadmapProps {
  currentSeason: SeasonType;
}

export const Roadmap: React.FC<RoadmapProps> = ({ currentSeason }) => {
  const getIcon = (element: string) => {
    switch (element) {
      case 'Fire': return <Flame className="w-5 h-5" />;
      case 'Water': return <Droplets className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Earth': return <Mountain className="w-5 h-5" />;
      default: return <Lock className="w-5 h-5" />;
    }
  };

  const getGradient = (element: string, isActive: boolean) => {
    // Increased opacity for inactive cards to mask the timeline behind them
    if (!isActive) return 'bg-brand-dark/95 backdrop-blur-md';
    switch (element) {
      case 'Fire': return 'bg-gradient-to-br from-orange-500/20 to-brand-dark';
      case 'Water': return 'bg-gradient-to-br from-blue-500/20 to-brand-dark';
      case 'Wind': return 'bg-gradient-to-br from-cyan-200/20 to-brand-dark';
      case 'Earth': return 'bg-gradient-to-br from-emerald-500/20 to-brand-dark';
      default: return 'bg-brand-dark';
    }
  };

  const seasonNames = ['Fire', 'Water', 'Wind', 'Earth'];
  const currentIndex = seasonNames.indexOf(currentSeason);
  const progressWidth = (currentIndex + 1) * 25;

  return (
    <section className="py-24 px-4 md:px-8 border-t border-white/5 relative overflow-hidden bg-brand-black">
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-brand-season-primary/10 blur-[100px] rounded-full transition-colors duration-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-transparent bg-clip-text bg-nft-gradient font-mono text-sm uppercase tracking-widest mb-3 block font-bold">The Journey</span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">Multiverse Roadmap</h2>
        </div>
        
        {/* Timeline Container */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-surface/50 -z-10">
            <div 
              className="h-full bg-brand-season-primary/50 shadow-[0_0_15px_rgb(var(--color-season-primary))] transition-all duration-1000 ease-in-out"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {SEASONS.map((season, index) => {
              // Override active status based on Dev Selection
              const isActive = season.name === currentSeason;
              
              // Simple logic for locked: if it's after the current season in the list
              const seasonIndex = seasonNames.indexOf(season.name);
              const isLocked = seasonIndex > currentIndex;
              const isCompleted = seasonIndex < currentIndex;
              
              return (
                <div 
                  key={season.id}
                  className={`relative group flex flex-col h-full`}
                >
                  {/* Timeline Node */}
                  <div className={`hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 items-center justify-center -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                     <div className={`w-full h-full rounded-full blur-xl ${isActive ? 'bg-brand-season-primary/20' : 'bg-brand-primary/10'}`}></div>
                  </div>

                  <div 
                    className={`
                      relative p-6 rounded-2xl border flex-1 flex flex-col transition-all duration-500
                      ${getGradient(season.element, isActive)}
                      ${isActive 
                        ? `border-brand-season-primary shadow-[0_0_30px_rgb(var(--color-season-primary)/0.15)]` 
                        : 'border-white/5 opacity-70 hover:opacity-100 hover:border-white/20'
                      }
                    `}
                  >
                    {/* Header Icon */}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg backdrop-blur-md relative z-10
                        ${isActive 
                          ? `text-brand-season-primary bg-brand-dark border-current` 
                          : 'text-gray-500 bg-brand-black border-white/5'
                        }
                      `}>
                        {isActive ? getIcon(season.element) : isLocked ? <Lock className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      
                      <div className="text-right">
                         <span className={`text-sm font-bold font-mono uppercase tracking-widest block mb-2 ${isActive ? 'text-brand-season-accent' : 'text-gray-500'}`}>
                           {season.dateRange}
                         </span>
                         {isActive && (
                           <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-season-primary/10 border border-brand-season-primary/20 text-[10px] font-bold text-brand-season-primary animate-pulse">
                             <span className="w-1.5 h-1.5 rounded-full bg-brand-season-primary"></span> LIVE
                           </span>
                         )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-4 font-display ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {season.name}
                    </h3>

                    {/* Highlights List */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {season.highlights?.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-gray-400">
                          <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isActive ? 'bg-white' : 'bg-gray-600'}`}></span>
                          <span className={isActive ? 'text-gray-300' : 'text-gray-500'}>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Progress Bar (Only for Active) */}
                    {isActive ? (
                      <div className="mt-auto">
                        <div className="flex justify-between text-[10px] font-mono text-brand-season-primary mb-1.5">
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> SEASON PROGRESS</span>
                           <span>35%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-brand-season-primary to-brand-season-accent w-[35%] rounded-full shadow-[0_0_10px_rgb(var(--color-season-primary))]"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto h-1.5 w-full bg-white/5 rounded-full"></div>
                    )}
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};