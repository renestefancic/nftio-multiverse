
import React from 'react';
import { Gamepad2, Zap, Trophy, ArrowRight, TrendingUp } from 'lucide-react';

export const Mechanics: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-transparent bg-clip-text bg-nft-gradient font-mono text-sm uppercase tracking-widest mb-3 block font-bold">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">The Path to Glory</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Forge your legacy in the Primal Forces event with our weighted reward system.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-white/10 z-0"></div>

          <div className="relative group z-10">
            <div className="glass-panel p-8 rounded-2xl h-full border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center bg-brand-dark/40">
              <div className="w-24 h-24 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/10 group-hover:scale-110 group-hover:shadow-brand-primary/40 transition-all duration-300 relative">
                 <Gamepad2 className="w-10 h-10 text-brand-primary relative z-10" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-black border border-brand-primary text-brand-primary font-bold font-mono flex items-center justify-center shadow-lg">1</div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">Link & Launch</h3>
              <p className="text-gray-400 leading-relaxed">Connect your Enjin wallet and jump into any Multiverse game. Progress tracks across all participating worlds.</p>
            </div>
          </div>
          
          <div className="relative group z-10">
            <div className="glass-panel p-8 rounded-2xl h-full border-brand-secondary/20 hover:border-brand-secondary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center bg-brand-dark/40">
              <div className="w-24 h-24 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-center mb-8 shadow-lg shadow-brand-secondary/10 group-hover:scale-110 group-hover:shadow-brand-secondary/40 transition-all duration-300 relative">
                 <Zap className="w-10 h-10 text-brand-secondary relative z-10" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-black border border-brand-secondary text-brand-secondary font-bold font-mono flex items-center justify-center shadow-lg">2</div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-secondary transition-colors">Stack Essence</h3>
              <p className="text-gray-400 leading-relaxed">Complete in-game quests to stack Essence. Every point earns you a raffle ticket and unlocks guaranteed seasonal loot.</p>
            </div>
          </div>
          
          <div className="relative group z-10">
            <div className="glass-panel p-8 rounded-2xl h-full border-brand-accent/20 hover:border-brand-accent/50 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center bg-brand-dark/40">
              <div className="w-24 h-24 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-center mb-8 shadow-lg shadow-brand-accent/10 group-hover:scale-110 group-hover:shadow-brand-accent/40 transition-all duration-300 relative">
                 <TrendingUp className="w-10 h-10 text-brand-accent relative z-10" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-black border border-brand-accent text-brand-accent font-bold font-mono flex items-center justify-center shadow-lg">3</div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-accent transition-colors">Boost Your Luck</h3>
              <p className="text-gray-400 leading-relaxed">Our raffle is <strong>weighted</strong>. Users with the most Essence enter a higher "Luck Tier", significantly multiplying their chances to win the 1/1 Degen NFT.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
