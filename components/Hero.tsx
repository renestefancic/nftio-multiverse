
import React, { useState, useEffect } from 'react';
import { ChevronDown, Wallet, Flame, Sparkles, Droplets, Wind, Mountain, Loader2 } from 'lucide-react';
import { SeasonType } from '../App';
import { SEASONS } from '../constants';

interface HeroProps {
  onConnect: () => void;
  currentSeason: SeasonType;
  isInterlude?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onConnect, currentSeason, isInterlude = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Determine the target date based on interlude status using shared constants
    const seasonData = SEASONS.find(s => s.name === currentSeason);
    const currentIndex = SEASONS.findIndex(s => s.name === currentSeason);
    const nextSeason = SEASONS[(currentIndex + 1) % SEASONS.length];

    let targetDateStr = seasonData?.endDate || '';
    
    // If we are in interlude (drawing period), we count down to the START of the next season
    if (isInterlude) {
      targetDateStr = nextSeason?.startDate || '';
    }
    
    const target = new Date(targetDateStr).getTime();
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;
      
      // If date is passed (which it is for mock dates), we'd typically handle this. 
      // For this demo, we can just let it show 0 or calculate relative distance for visual effect if we wanted.
      // But adhering to the previous logic which seemed to work for the user's specific context/screenshot:
      if (distance < 0) {
          // Fallback or "00" logic could go here, but allowing standard calculation 
          // or Math.abs() like in Dashboard if we want it to always show time remaining "as if" future
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          return { days: Math.abs(days), hours: Math.abs(hours), minutes: Math.abs(minutes), seconds: Math.abs(seconds) };
      }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTime()); 

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSeason, isInterlude]);

  const getSeasonAssets = () => {
    switch (currentSeason) {
      case 'Fire':
        return {
          icon: <Flame className="w-4 h-4 text-brand-season-primary fill-brand-season-primary animate-pulse" />,
          particleClass: 'animate-ember-rise',
          particleColor: 'bg-brand-season-primary/60',
          particleCount: 15,
          titleGlow: 'from-brand-season-primary/20 via-brand-season-secondary/20 to-transparent'
        };
      case 'Water':
        return {
          icon: <Droplets className="w-4 h-4 text-brand-season-primary fill-brand-season-primary animate-bounce" />,
          particleClass: 'animate-bubble-rise',
          particleColor: 'bg-brand-season-primary/40',
          particleCount: 20,
          titleGlow: 'from-brand-season-primary/20 via-brand-season-accent/20 to-transparent'
        };
      case 'Wind':
        return {
          icon: <Wind className="w-4 h-4 text-brand-season-primary animate-spin-slow" />,
          particleClass: 'animate-wind-blow',
          particleColor: 'bg-brand-season-primary/30',
          particleCount: 10,
          titleGlow: 'from-brand-season-primary/20 via-white/10 to-transparent'
        };
      case 'Earth':
        return {
          icon: <Mountain className="w-4 h-4 text-brand-season-primary fill-brand-season-primary" />,
          particleClass: 'animate-dust-float',
          particleColor: 'bg-brand-season-accent/50',
          particleCount: 25,
          titleGlow: 'from-brand-season-primary/20 via-brand-season-secondary/20 to-transparent'
        };
    }
  };

  const assets = getSeasonAssets();

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-40 pb-20 bg-brand-black transition-colors duration-1000">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]"></div>
        
        {/* Radial Mask for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--color-brand-black),0.8)_80%,rgba(var(--color-brand-black),1)_100%)]"></div>
        
        {/* Animated Orbs - Season Colored */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-brand-season-primary/20 blur-[120px] rounded-full animate-pulse-glow opacity-60 transition-colors duration-1000"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-brand-season-secondary/10 blur-[120px] rounded-full animate-pulse-glow opacity-60 transition-colors duration-1000" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles (Embers/Bubbles/Dust) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: assets.particleCount }).map((_, i) => (
          <div
            key={`${currentSeason}-${i}`}
            className={`absolute rounded-full blur-[1px] ${assets.particleClass} ${assets.particleColor}`}
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + 20 + '%',
              animationDuration: Math.random() * 5 + 5 + 's',
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full border backdrop-blur-md shadow-[0_0_30px_rgb(var(--color-season-primary)/0.15)] animate-float transition-colors duration-500 ${isInterlude ? 'bg-purple-500/10 border-purple-500/30' : 'bg-brand-season-primary/5 border-brand-season-primary/20'}`}>
          {isInterlude ? <Loader2 className="w-4 h-4 text-purple-400 animate-spin" /> : assets.icon}
          <span className={`font-bold text-sm tracking-[0.2em] uppercase transition-colors duration-500 ${isInterlude ? 'text-purple-400' : 'text-brand-season-primary'}`}>
            {isInterlude ? 'Season Concluded' : `Season of ${currentSeason}`}
          </span>
        </div>

        {/* Hero Text */}
        <div className="mb-8 relative">
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
            THE MULTIVERSE
            <br />
            <span className="relative inline-block mt-2">
               <span className={`absolute inset-0 bg-gradient-to-r ${assets.titleGlow} blur-3xl opacity-60 bg-clip-text text-transparent transition-all duration-1000`} aria-hidden="true">AWAKENS</span>
               <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-season-primary via-white to-brand-season-secondary transition-all duration-1000 pb-4">AWAKENS</span>
            </span>
           </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl font-medium leading-relaxed">
           Connect your wallet to join the <span className="text-brand-season-primary font-bold transition-colors">Primal Forces</span> event.
           <br className="hidden md:block" /> Collect essence, earn rewards, and shape the future.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full sm:w-auto">
           <button 
             onClick={onConnect}
             className="group relative w-full sm:w-auto px-10 py-5 bg-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgb(var(--color-season-primary)/0.5)] border border-brand-surface/50"
           >
             {/* Textures */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-brand-season-primary to-brand-season-secondary opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             {/* Shine Sweep */}
             <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 ease-in-out"></div>

             <span className="relative z-10 flex items-center justify-center gap-3 text-white font-bold text-lg tracking-wide uppercase">
               <Wallet className="w-5 h-5" /> Connect Wallet
             </span>
           </button>

           <button className="group w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all hover:border-white/20 backdrop-blur-sm flex items-center justify-center gap-2">
             <Sparkles className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
             <span>View Rewards</span>
           </button>
        </div>

        {/* Countdown Timer Panel */}
        <div className="w-full max-w-4xl">
           <div className={`glass-panel rounded-3xl p-8 border ${isInterlude ? 'border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : 'border-white/10'} bg-brand-black/40 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-colors`}>
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent ${isInterlude ? 'via-purple-500' : 'via-brand-season-primary'} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center relative">
                    <span className="text-4xl md:text-6xl font-mono font-bold text-white tracking-tighter tabular-nums drop-shadow-lg">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">{item.label}</span>
                    {/* Divider for desktop */}
                    {i < 3 && <div className="hidden md:block absolute right-[-1rem] top-1/2 -translate-y-1/2 w-px h-12 bg-white/10"></div>}
                  </div>
                ))}
              </div>
           </div>
           
           <div className="text-center mt-4 uppercase tracking-widest font-bold flex items-center justify-center gap-2 animate-in fade-in duration-500">
              {isInterlude ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span className="text-xs text-purple-400 font-mono tracking-widest">Drawing In Progress • Season Begins In</span>
                </>
              ) : (
                <span className="text-xs text-gray-600">Until Season Ends</span>
              )}
           </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce opacity-30 pointer-events-none">
        <ChevronDown className="text-white w-8 h-8" />
      </div>
    </div>
  );
};
