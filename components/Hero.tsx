
import React, { useState, useEffect } from 'react';
import { ChevronDown, Wallet } from 'lucide-react';

interface HeroProps {
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnect }) => {
  const [timeLeft, setTimeLeft] = useState('');

  // Mock countdown to March 31, 2026
  useEffect(() => {
    const target = new Date('2026-03-31T23:59:59').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}d : ${hours}h : ${minutes}m`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-48 pb-24">
      {/* Background FX - NFT.io Beam Style */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-brand-primary/30 rounded-full bg-brand-primary/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="text-brand-orange font-bold text-xs tracking-wider uppercase">Season 1: Fire is Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
          THE MULTIVERSE <br/>
          <span className="text-transparent bg-clip-text bg-nft-gradient text-glow">
            AWAKENS
          </span>
        </h1>

        <div className="mb-8">
           <span className="text-2xl md:text-3xl font-light text-white/80">
             The <span className="font-bold text-brand-orange fire-glow">Primal Forces</span> Event
           </span>
        </div>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Journey across supported games. Collect Elemental Essence. <br/> Forge your legacy in the next evolution of the Enjin ecosystem.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <button 
            onClick={onConnect}
            className="group relative px-8 py-4 bg-nft-gradient text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(120,53,229,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Wallet className="w-5 h-5" /> Connect Wallet
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button className="px-8 py-4 bg-brand-surface/50 border border-brand-surface text-white font-bold text-lg rounded-xl hover:bg-brand-surface transition-colors">
            View Rewards
          </button>
        </div>

        {/* Countdown Footer */}
        <div className="border-t border-brand-surface pt-8 pb-4 inline-block w-full max-w-lg relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-3">Time Remaining in Chapter</p>
          <div className="flex justify-center gap-4 text-3xl md:text-4xl font-mono font-bold text-white tabular-nums">
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">{timeLeft || "74d : 12h : 45m"}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <ChevronDown className="text-brand-primary w-6 h-6" />
      </div>
    </div>
  );
};
