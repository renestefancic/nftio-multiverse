import React from 'react';
import { REWARDS } from '../constants';
import { Lock } from 'lucide-react';
import { SeasonType } from '../App';

interface RewardsGalleryProps {
  currentSeason: SeasonType;
}

export const RewardsGallery: React.FC<RewardsGalleryProps> = ({ currentSeason }) => {
  
  const getSeasonColors = (type: string) => {
    // Map season to hex colors for SVG gradients
    const colors = {
      Fire: { primary: '#FF5500', secondary: '#FF2A00', accent: '#FFD700', dark: '#8B0000' },
      Water: { primary: '#00C2FF', secondary: '#0055FF', accent: '#38BDF8', dark: '#00008B' },
      Wind: { primary: '#2DD4BF', secondary: '#0F766E', accent: '#FFFFFF', dark: '#134E4A' },
      Earth: { primary: '#10B981', secondary: '#15803D', accent: '#FBBF24', dark: '#064E3B' },
    }[currentSeason];

    if (type === 'Legendary') return { color1: colors.accent, color2: 'purple', glow: colors.accent, speed: '3s' };
    if (type === 'Epic') return { color1: colors.primary, color2: colors.dark, glow: colors.primary, speed: '4s' };
    return { color1: colors.accent, color2: colors.primary, glow: colors.secondary, speed: '6s' };
  };

  const renderAsset = (reward: any) => {
    if (reward.name.includes('Blob')) {
        let type = 'Standard';
        if (reward.name.includes('Legendary')) type = 'Legendary';
        else if (reward.name.includes('Epic')) type = 'Epic';

        const style = getSeasonColors(type);

        return (
            <div className="w-full h-full flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 blur-3xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundColor: style.glow }}></div>
                <svg viewBox="0 0 200 200" className="w-56 h-56" style={{ filter: `drop-shadow(0 0 20px ${style.glow}80)` }}>
                <defs>
                    <radialGradient id={`blobGradient-${reward.id}-${currentSeason}`} cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
                    <stop offset="0%" stopColor={style.color1} />
                    <stop offset="100%" stopColor={style.color2} />
                    </radialGradient>
                </defs>
                <g className="animate-float">
                    <path fill={`url(#blobGradient-${reward.id}-${currentSeason})`}>
                    <animate attributeName="d" dur={style.speed} repeatCount="indefinite" values="
                        M100 30 C150 30 180 70 180 100 C180 140 150 170 100 170 C50 170 20 140 20 100 C20 60 50 30 100 30 Z;
                        M100 25 C160 40 190 80 170 120 C160 160 130 175 90 170 C40 160 15 120 30 80 C40 40 60 25 100 25 Z;
                        M100 30 C150 30 180 70 180 100 C180 140 150 170 100 170 C50 170 20 140 20 100 C20 60 50 30 100 30 Z" 
                    />
                    </path>
                    {/* Face */}
                    <g>
                    <circle cx="75" cy="90" r="8" fill="#330000" opacity="0.8">
                        <animate attributeName="cy" values="90;88;90" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="125" cy="90" r="8" fill="#330000" opacity="0.8">
                        <animate attributeName="cy" values="90;92;90" dur="3s" repeatCount="indefinite" />
                    </circle>
                    {reward.name.includes('Legendary') && (
                        <path d="M60 60 L75 70 L90 55 L110 70 L125 55 L140 65" fill="none" stroke="#FFD700" strokeWidth="3" className="animate-pulse" />
                    )}
                    </g>
                </g>
                </svg>
            </div>
        );
    }

    if (reward.type === 'Artifact') {
        return (
          <div className="w-full h-full flex items-center justify-center relative group-hover:-translate-y-2 transition-transform duration-500">
             <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
             <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-[0_0_20px_rgba(120,53,229,0.5)]">
               <defs>
                 <linearGradient id="obsidianGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#374151" />
                   <stop offset="50%" stopColor="#1F2937" />
                   <stop offset="100%" stopColor="#111827" />
                 </linearGradient>
                 <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#7835E5" />
                   <stop offset="100%" stopColor="#E61F9D" />
                 </linearGradient>
               </defs>
               <g className="animate-float" style={{ animationDuration: '8s' }}>
                 <path d="M50 70 L50 140 L100 170 L150 140 L150 70 L100 40 Z" fill="url(#obsidianGradient)" stroke="#4B5563" strokeWidth="2" />
                 <path d="M100 40 L100 170" stroke="#374151" strokeWidth="2" fill="none" opacity="0.5" />
                 <path d="M60 95 Q100 115 140 95" stroke="url(#visorGradient)" strokeWidth="6" fill="none" strokeLinecap="round" className="animate-pulse shadow-[0_0_15px_#7835E5]" />
               </g>
             </svg>
          </div>
        );
    }

    if (reward.type === 'Jackpot') {
        return (
          <div className="w-full h-full flex items-center justify-center relative bg-black/60 overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

            {/* Blurred Content */}
            <div className="relative z-0 opacity-50 blur-xl scale-75 transition-all duration-500 group-hover:blur-md">
               <svg viewBox="0 0 200 200" className="w-56 h-56">
                 <defs>
                   <linearGradient id="cyberBody" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#1a202c" />
                     <stop offset="100%" stopColor="#000000" />
                   </linearGradient>
                 </defs>
                 <g>
                   <path d="M100 50 C70 50 50 80 50 120 L50 200 L150 200 L150 120 C150 80 130 50 100 50 Z" fill="url(#cyberBody)" />
                   <rect x="65" y="100" width="70" height="12" rx="2" fill="#00C2FF" className="animate-pulse shadow-[0_0_20px_#00C2FF]" />
                 </g>
               </svg>
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
               <div className="w-12 h-12 rounded-full bg-brand-dark/80 border border-white/10 flex items-center justify-center backdrop-blur-md mb-3 shadow-xl">
                  <Lock className="w-5 h-5 text-gray-400" />
               </div>
               <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] bg-black/50 px-3 py-1 rounded border border-white/5 backdrop-blur-sm">
                 Reveal Pending
               </span>
            </div>
          </div>
        );
    }
    return null;
  };

  const getRarityColor = (reward: any) => {
    if (reward.name.includes('Legendary') || reward.type === 'Jackpot') return 'border-brand-season-primary/20 hover:border-brand-season-primary/60 shadow-[0_0_20px_rgb(var(--color-season-primary)/0.1)] hover:shadow-[0_0_30px_rgb(var(--color-season-primary)/0.3)]';
    if (reward.name.includes('Epic') || reward.type === 'Artifact') return 'border-brand-secondary/20 hover:border-brand-secondary/60 shadow-[0_0_20px_rgb(var(--color-season-secondary)/0.1)] hover:shadow-[0_0_30px_rgb(var(--color-season-secondary)/0.3)]';
    return 'border-brand-primary/20 hover:border-brand-primary/60 shadow-[0_0_20px_rgba(120,53,229,0.1)] hover:shadow-[0_0_30px_rgba(120,53,229,0.3)]';
  };

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden bg-brand-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-season-primary/5 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-nft-gradient font-mono text-sm uppercase tracking-widest mb-3 block font-bold">The Vault</span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 tracking-tight">Season Rewards</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Exclusive artifacts forged in the <span className="text-brand-season-primary font-bold">{currentSeason}</span>. Collect Essence to unlock guaranteed prizes and entry into legendary raffles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
          {REWARDS.map((reward) => (
            <div 
              key={reward.id} 
              className={`group relative glass-panel rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border ${getRarityColor(reward)} flex flex-col`}
            >
              {/* Asset Container */}
              <div className="h-48 relative bg-gradient-to-b from-brand-surface/30 to-transparent flex items-center justify-center overflow-hidden">
                 {renderAsset(reward)}
              </div>

              {/* Content */}
              <div className="p-5 relative z-20 bg-brand-dark/90 backdrop-blur-xl border-t border-white/5 flex-1 flex flex-col">
                <div className="mb-2">
                   <h3 className="text-base font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-nft-gradient transition-all font-display leading-tight">
                    {reward.name.replace('Magma', currentSeason === 'Water' ? 'Aqua' : currentSeason === 'Wind' ? 'Zephyr' : currentSeason === 'Earth' ? 'Terra' : 'Magma')}
                  </h3>
                </div>
                
                <p className="text-gray-400 text-xs mb-4 leading-relaxed flex-1">
                  {reward.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Condition</span>
                  <span className="text-[10px] font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/5 shadow-sm inline-block self-start">
                    {reward.condition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};