
import React from 'react';
import { GAMES } from '../constants';
import { Zap, ArrowRight } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, user: '0x8a...9f2', action: 'earned 60 Essence', gameId: 'g3', time: '2m ago', type: 'earn' },
  { id: 2, user: '0xb2...1c4', action: 'earned 15 Essence', gameId: 'g2', time: '5m ago', type: 'earn' },
  { id: 3, user: '0x7c...3d1', action: 'earned 30 Essence', gameId: 'g1', time: '12m ago', type: 'earn' },
  { id: 4, user: '0xff...a2b', action: 'earned 50 Essence', gameId: 'g2', time: '15m ago', type: 'earn' },
  { id: 5, user: '0x11...222', action: 'earned 10 Essence', gameId: 'g4', time: '18m ago', type: 'earn' },
  { id: 6, user: '0x33...444', action: 'earned 25 Essence', gameId: 'g3', time: '22m ago', type: 'earn' },
  { id: 7, user: '0x99...888', action: 'earned 5 Essence', gameId: 'g5', time: '25m ago', type: 'earn' },
];

export const ActivityFeed: React.FC = () => {
  const getGame = (id: string) => GAMES.find(g => g.id === id);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="h-14 px-4 border-b border-white/5 bg-brand-surface/50 flex justify-between items-center backdrop-blur-md">
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Feed
        </h3>
        <span className="text-[10px] bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded border border-brand-primary/20 font-bold uppercase tracking-wide">REAL-TIME</span>
      </div>
      
      <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1 bg-brand-dark/30">
        {ACTIVITIES.map((item) => {
          const game = getGame(item.gameId);
          return (
            <div 
              key={item.id} 
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 cursor-pointer relative"
              onClick={() => window.open('https://placeholder.com', '_blank')}
            >
              {/* Game Icon */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-brand-primary/50 transition-colors`}>
                  {game ? (
                    <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800"></div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-dark rounded-full flex items-center justify-center border border-white/10 shadow-sm">
                   <Zap className="w-2.5 h-2.5 text-brand-accent" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-sm font-bold text-white truncate group-hover:text-brand-accent transition-colors">{item.user}</span>
                  <span className="text-[10px] text-gray-600 font-mono group-hover:text-gray-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                  {item.action} <span className="text-gray-600 px-1">•</span> <span className="text-white font-medium group-hover:text-brand-primary transition-colors truncate">{game?.name}</span>
                </p>
              </div>
              
              <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/30 transition-all -translate-x-2 group-hover:translate-x-0 absolute right-3" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
