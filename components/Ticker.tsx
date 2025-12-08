import React from 'react';

const EVENTS = [
  "User 0x...8d2 just earned 60 Ember Essence in The Six Dragons!",
  "User 0x...a1b unlocked the Magma Blob!",
  "New High Score! User 0x...ff3 reached Rank #5.",
  "Fire Season ends in 74 days. Keep pushing!",
];

export const Ticker: React.FC = () => {
  return (
    <div className="w-full bg-brand-dark border-b border-brand-orange/20 overflow-hidden py-2 relative z-50">
      <div className="animate-ticker whitespace-nowrap flex space-x-12">
        {[...EVENTS, ...EVENTS].map((event, i) => (
          <span key={i} className="text-sm text-brand-orange/80 font-mono flex items-center">
            <span className="w-2 h-2 bg-brand-orange rounded-full mr-2 animate-pulse"></span>
            {event}
          </span>
        ))}
      </div>
    </div>
  );
};