import React, { useState, useEffect } from 'react';
import { ChevronDown, Wallet, Flame, Sparkles } from 'lucide-react';

interface HeroProps {
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnect }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-03-31T23:59:59').getTime();
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTime()); // Initial set

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-brand-black">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]"></div>
        
        {/* Radial Mask for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--color-brand-black),0.8)_80%,rgba(var(--color-brand-black),1)_100%)]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-brand-primary/20 blur-[120px] rounded-full animate-pulse-glow opacity-60"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] rounded-full animate-pulse-glow opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-brand-orange/60 rounded-full blur-[1px] animate-ember-rise"
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
        <div className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full bg-brand-orange/5 border border-brand-orange/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,85,0,0.15)] animate-float">
          <Flame className="w-4 h-4 text-brand-orange fill-brand-orange animate-pulse" />
          <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase">Season of Fire</span>
        </div>

        {/* Hero Text */}
        <div className="mb-8 relative">
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
            THE MULTIVERSE
            <br />
            <span className="relative inline-block mt-2">
               <span className="absolute inset-0 bg-nft-gradient blur-2xl opacity-40 bg-clip-text text-transparent" aria-hidden="true">AWAKENS</span>
               <span className="relative text-transparent bg-clip-text bg-nft-gradient">AWAKENS</span>
            </span>
           </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl font-medium leading-relaxed">
           Connect your wallet to join the <span className="text-white font-bold">Primal Forces</span> event.
           <br className="hidden md:block" /> Collect essence, earn rewards, and shape the future.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full sm:w-auto">
           <button 
             onClick={onConnect}
             className="group relative w-full sm:w-auto px-10 py-5 bg-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(120,53,229,0.5)] border border-brand-surface/50"
           >
             {/* Textures */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
             <div className="absolute inset-0 bg-nft-gradient opacity-90 group-hover:opacity-100 transition-opacity"></div>
             
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
           <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-brand-black/40 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
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
           <p className="text-center text-xs text-gray-600 mt-4 uppercase tracking-widest font-bold">Until Season Ends</p>
        </div>

      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce opacity-30 pointer-events-none">
        <ChevronDown className="text-white w-8 h-8" />
      </div>
    </div>
  );
};