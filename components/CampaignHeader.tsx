import React from 'react';
import { Flame, Droplets, Wind, Mountain, Sun, Moon } from 'lucide-react';
import { SeasonType } from '../App';

interface CampaignHeaderProps {
  isWalletConnected: boolean;
  theme: string;
  onToggleTheme: () => void;
  currentSeason: SeasonType;
  onSetSeason: (season: SeasonType) => void;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({ 
  isWalletConnected, 
  theme, 
  onToggleTheme,
  currentSeason,
  onSetSeason
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSeasonIcon = () => {
    switch (currentSeason) {
      case 'Fire': return <Flame className="w-3 h-3 text-brand-season-primary fill-brand-season-primary" />;
      case 'Water': return <Droplets className="w-3 h-3 text-brand-season-primary fill-brand-season-primary" />;
      case 'Wind': return <Wind className="w-3 h-3 text-brand-season-primary" />;
      case 'Earth': return <Mountain className="w-3 h-3 text-brand-season-primary fill-brand-season-primary" />;
    }
  };

  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 h-[60px] bg-brand-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 h-full flex justify-between items-center">
        
        {/* Campaign Identity */}
        <div className="flex items-center gap-4">
          <h1 className="hidden md:block text-xl md:text-2xl font-display font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-sm">
            THE MULTIVERSE
          </h1>
          
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-season-primary/10 border border-brand-season-primary/20">
             {getSeasonIcon()}
             <span className="text-[10px] font-bold text-brand-season-primary uppercase tracking-wider">Season: {currentSeason}</span>
          </div>
        </div>

        {/* Local Navigation Anchors & Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-6">
          {isWalletConnected && (
             <button 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="text-xs font-bold text-white hover:text-brand-primary transition-colors uppercase tracking-wide px-2 py-1"
             >
               Dashboard
             </button>
          )}
          
          <button 
            onClick={() => scrollToSection('roadmap')}
            className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wide px-2 py-1"
          >
            Roadmap
          </button>
          
          <button 
            onClick={() => scrollToSection('rewards')}
            className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wide px-2 py-1"
          >
            Rewards
          </button>

          {!isWalletConnected && (
             <button 
               onClick={() => scrollToSection('mechanics')}
               className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wide px-2 py-1 hidden sm:block"
             >
               How it Works
             </button>
          )}

          <div className="h-4 w-px bg-white/10 mx-2"></div>
          
          {/* Dev: Season Selector */}
           <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-gray-600 hidden lg:block">DEV:</span>
              <select 
                value={currentSeason}
                onChange={(e) => onSetSeason(e.target.value as SeasonType)}
                className="bg-black/20 text-white text-[10px] font-bold uppercase rounded border border-white/10 px-2 py-1 outline-none focus:border-brand-season-primary"
              >
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Wind">Wind</option>
                <option value="Earth">Earth</option>
              </select>
           </div>

          <div className="h-4 w-px bg-white/10 mx-2"></div>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};