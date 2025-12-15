
import React, { useState, useEffect } from 'react';
import { GAMES, MOCK_PLAYER_PROGRESS, SEASONS } from '../constants';
import { Leaderboard } from './Leaderboard';
import { ActivityFeed } from './ActivityFeed';
import { Info, ChevronDown, Check, ArrowRight, BookOpen, Lock, Trophy, Gift, Target, Flame, Droplets, Wind, Mountain, CalendarOff, Hourglass, Loader2 } from 'lucide-react';
import { SeasonType } from '../App';

// Simple Identicon Generator Component
const PixelAvatar: React.FC<{ address: string }> = ({ address }) => {
  // Generate a deterministic pattern based on address
  const generatePattern = () => {
    const seed = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['#7835E5', '#E61F9D', '#00C2FF', '#FF5500', '#1F2D4D'];
    
    return Array(16).fill(0).map((_, i) => {
      const val = Math.sin(seed * (i + 1)) * 10000;
      const isActive = (val - Math.floor(val)) > 0.5;
      const colorIndex = Math.floor(Math.abs(Math.sin(seed + i)) * colors.length);
      return { isActive, color: colors[colorIndex] };
    });
  };

  const pattern = generatePattern();

  return (
    <div className="w-16 h-16 rounded-lg overflow-hidden grid grid-cols-4 bg-brand-black border border-white/10 shadow-lg shadow-brand-season-primary/20">
      {pattern.map((cell, i) => (
        <div 
          key={i} 
          style={{ backgroundColor: cell.isActive ? cell.color : 'transparent' }} 
        />
      ))}
    </div>
  );
};

interface DashboardProps {
  currentSeason: SeasonType;
  isInterlude?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentSeason, isInterlude = false }) => {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);
  const [expandedRewardId, setExpandedRewardId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [nextSeasonName, setNextSeasonName] = useState('');

  // Seasonal Countdown
  useEffect(() => {
    const currentSeasonData = SEASONS.find(s => s.name === currentSeason);
    const currentIndex = SEASONS.findIndex(s => s.name === currentSeason);
    const nextSeason = SEASONS[(currentIndex + 1) % SEASONS.length];
    
    // Set next season name for the UI
    setNextSeasonName(nextSeason?.name || 'Unknown');

    // If interlude, count down to next season start. If active, count down to current season end.
    const targetDateString = isInterlude ? nextSeason.startDate : currentSeasonData?.endDate;
    const target = new Date(targetDateString || '').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime(); // In a real app this would be checking against the server time or simulated dev time
      
      // For demo purposes, we are just calculating distance from the target constant
      // Note: Since the dates in constants are fixed in 2026, and Date.now() is 2024/2025, this math will be large. 
      // In a real implementation we would clamp or assume the current date is close. 
      // For this visual demo, we will calculate based on the target.
      const distance = target - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeLeft(`${Math.abs(days)}d ${Math.abs(hours)}h`);
    }, 1000); 
    return () => clearInterval(interval);
  }, [currentSeason, isInterlude]);
  
  // Stats Calculations
  const totalEssence = MOCK_PLAYER_PROGRESS.reduce((acc, curr) => acc + curr.currentEssence, 0);
  const gamesWithProgress = MOCK_PLAYER_PROGRESS.filter(p => p.currentEssence > 0).length;

  // Sorting Games: Active/Incomplete first, Mastered last
  const sortedGames = [...GAMES].sort((a, b) => {
    const progressA = MOCK_PLAYER_PROGRESS.find(p => p.gameId === a.id);
    const progressB = MOCK_PLAYER_PROGRESS.find(p => p.gameId === b.id);
    const masteredA = progressA?.isMastered ? 1 : 0;
    const masteredB = progressB?.isMastered ? 1 : 0;
    return masteredA - masteredB;
  });

  const toggleGame = (id: string) => {
    setExpandedGameId(expandedGameId === id ? null : id);
  };

  const toggleReward = (id: string) => {
    setExpandedRewardId(expandedRewardId === id ? null : id);
  };

  const getSeasonBlobName = (prefix: string = '') => {
      const base = currentSeason === 'Water' ? 'Aqua Blob' : 
                   currentSeason === 'Wind' ? 'Zephyr Blob' : 
                   currentSeason === 'Earth' ? 'Terra Blob' : 'Magma Blob';
      return prefix ? `${prefix} ${base}` : base;
  };

  // New Eligibility Logic
  const getEligibilityStatus = (id: string) => {
    switch (id) {
      case 'SEASON_BLOB': // Guaranteed at 10 pts
        return { 
          unlocked: totalEssence >= 10, 
          progress: Math.min(totalEssence, 10), 
          target: 10, 
          label: getSeasonBlobName()
        };
      case 'EPIC_BLOB': // 100 pts + 2 games
        return { 
          unlocked: totalEssence >= 100 && gamesWithProgress >= 2, 
          progress: totalEssence, 
          target: 100, // Displaying points as primary metric
          secondaryProgress: gamesWithProgress,
          secondaryTarget: 2,
          label: getSeasonBlobName('Epic') 
        };
      case 'LEGENDARY_BLOB': // 300 pts + 2 games
        return { 
          unlocked: totalEssence >= 300 && gamesWithProgress >= 2, 
          progress: totalEssence, 
          target: 300, 
          secondaryProgress: gamesWithProgress,
          secondaryTarget: 2,
          label: getSeasonBlobName('Legendary')
        };
      case 'MULTIVERSE_ITEM': // Draw, min 10 pts
        return { 
          unlocked: totalEssence >= 10, 
          progress: totalEssence, 
          target: 10, 
          label: 'Eternal Embers' 
        };
      case 'DEGEN_NFT': // Draw, min 10 pts
        return { 
          unlocked: totalEssence >= 10, 
          progress: totalEssence, 
          target: 10, 
          label: 'Emberborne Degen' 
        };
      default:
        return { unlocked: false, progress: 0, target: 1, label: '' };
    }
  };

  const getSeasonIcon = () => {
    switch (currentSeason) {
      case 'Fire': return Flame;
      case 'Water': return Droplets;
      case 'Wind': return Wind;
      case 'Earth': return Mountain;
    }
  };

  const SeasonIcon = getSeasonIcon();

  const REWARD_TRACKER = [
    { id: 'SEASON_BLOB', ...getEligibilityStatus('SEASON_BLOB'), icon: Gift, type: 'guaranteed' },
    { id: 'EPIC_BLOB', ...getEligibilityStatus('EPIC_BLOB'), icon: SeasonIcon, type: 'tiered' },
    { id: 'LEGENDARY_BLOB', ...getEligibilityStatus('LEGENDARY_BLOB'), icon: Trophy, type: 'tiered' },
    { id: 'MULTIVERSE_ITEM', ...getEligibilityStatus('MULTIVERSE_ITEM'), icon: Target, type: 'raffle' },
    { id: 'DEGEN_NFT', ...getEligibilityStatus('DEGEN_NFT'), icon: Lock, type: 'raffle' },
  ];

  return (
    <div className="pt-48 pb-40 px-4 md:px-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* --- LEFT COLUMN: STICKY SIDEBAR (Profile + Rewards) --- */}
        {/* Adjusted top position to account for double navbar (80px + 60px + margin) */}
        <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-40 z-40">
          
          {/* 1. Identity Card */}
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group flex flex-col items-center text-center border-brand-surface bg-brand-dark/40">
            <div className={`absolute top-0 left-0 right-0 h-1 ${isInterlude ? 'bg-gray-600' : 'bg-season-gradient'}`}></div>
            
            <div className="w-full flex flex-col items-center gap-6">
               {/* Profile Info - Now on Top */}
               <div className="flex items-center gap-4 w-full justify-center bg-brand-surface/20 p-3 rounded-xl border border-white/5 shadow-inner">
                 <PixelAvatar address="0x8a...9f2" />
                 <div className="text-left">
                    <h2 className="text-base font-bold text-white font-mono tracking-tight">0x8a...9f2</h2>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-season-primary/20 text-brand-season-primary border border-brand-season-primary/30 shadow-sm">Rank #42</span>
                    </div>
                 </div>
               </div>

               {/* Essence Stats - Now Below */}
               <div className="flex flex-col items-center relative">
                 <span className="text-[10px] text-brand-season-secondary font-bold uppercase tracking-[0.2em] mb-1 opacity-80">Your Essence</span>
                 <span className={`text-5xl font-display font-black text-transparent bg-clip-text drop-shadow-xl leading-none ${isInterlude ? 'bg-gradient-to-b from-white to-gray-500' : 'bg-season-gradient'}`}>
                   {totalEssence}
                 </span>
                 <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4"></div>
               </div>
            </div>
          </div>

          {/* 2. Rewards Tracker - Accordion Style */}
          <div className="glass-panel p-4 rounded-2xl border-brand-surface bg-brand-dark/40 relative">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-brand-season-secondary" />
                  REWARDS
                </h3>
                {isInterlude && <span className="text-[9px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-1.5 py-0.5 rounded font-bold animate-pulse">DISTRIBUTING</span>}
              </div>
              
              <div className="space-y-2">
                {REWARD_TRACKER.map((item) => {
                  const isItemExpanded = expandedRewardId === item.id;
                  const isRaffleAndInterlude = isInterlude && item.type === 'raffle';
                  
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => toggleReward(item.id)}
                      className={`relative flex flex-col rounded-lg border transition-all cursor-pointer overflow-hidden ${
                        item.unlocked 
                          ? 'bg-brand-season-primary/5 border-brand-season-primary/30 hover:bg-brand-season-primary/10' 
                          : 'bg-brand-gray/30 border-transparent hover:border-white/10 hover:bg-brand-gray/50'
                      }`}
                    >
                      {/* Header (Always Visible) */}
                      <div className="p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className={`shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ${item.unlocked ? 'bg-brand-season-primary text-white shadow-sm' : 'bg-brand-gray text-gray-500'}`}>
                             {item.unlocked ? <Check className="w-3.5 h-3.5" /> : <item.icon className="w-3.5 h-3.5" />}
                           </div>
                           <span className={`text-[11px] font-bold leading-tight ${item.unlocked ? 'text-white' : 'text-gray-400'}`}>
                             {item.label}
                           </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isRaffleAndInterlude ? (
                             <span className="flex items-center gap-1 text-[9px] bg-brand-surface px-1.5 py-0.5 rounded text-white border border-brand-surface font-bold uppercase tracking-wide animate-pulse">
                               <Loader2 className="w-2.5 h-2.5 animate-spin" /> DRAWING
                             </span>
                          ) : (
                             <>
                              {item.unlocked && (
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                                  item.type === 'raffle' 
                                  ? 'bg-brand-season-accent/10 text-brand-season-accent border-brand-season-accent/20' 
                                  : 'bg-brand-season-primary/10 text-brand-season-primary border-brand-season-primary/20'
                                }`}>
                                    {item.type === 'raffle' ? 'DRAW ENTRY' : 'UNLOCKED'}
                                </span>
                              )}
                              {!item.unlocked && item.type === 'raffle' && (
                                <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-500 border border-white/5 uppercase tracking-wide">
                                    Draw
                                </span>
                              )}
                             </>
                          )}
                           <ChevronDown className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${isItemExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Expanded Content (Progress) */}
                      <div className={`transition-all duration-300 ease-in-out px-3 bg-black/20 ${isItemExpanded ? 'max-h-40 pb-3 pt-1 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                        
                        {/* Standard Progress (Points) */}
                         <div className="flex items-center justify-between text-[11px] mb-1">
                           <span className="text-gray-400">Essence Required</span>
                           <span className={item.progress >= item.target ? 'text-brand-season-primary font-bold' : 'text-gray-500'}>
                              {item.progress} <span className="text-gray-600">/ {item.target}</span>
                           </span>
                         </div>
                         <div className="w-full h-1.5 bg-brand-black rounded-full overflow-hidden border border-white/5 mb-2.5">
                            <div className={`h-full rounded-full transition-all duration-500 ${item.progress >= item.target ? 'bg-brand-season-primary' : 'bg-gray-600'}`} style={{ width: `${Math.min((item.progress / item.target) * 100, 100)}%` }}></div>
                         </div>

                         {/* Secondary Requirement (Games Played) if applicable */}
                         {item.type === 'tiered' && item.secondaryTarget && (
                           <>
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                  <span className="text-gray-400">Games Played</span>
                                  <span className={(item.secondaryProgress || 0) >= item.secondaryTarget ? 'text-brand-season-primary font-bold' : 'text-gray-500'}>
                                      {item.secondaryProgress} <span className="text-gray-600">/ {item.secondaryTarget}</span>
                                  </span>
                              </div>
                              <div className="w-full h-1.5 bg-brand-black rounded-full overflow-hidden border border-white/5">
                                  <div className={`h-full rounded-full transition-all duration-500 ${(item.secondaryProgress || 0) >= item.secondaryTarget ? 'bg-brand-season-primary' : 'bg-gray-600'}`} style={{ width: `${Math.min(((item.secondaryProgress || 0) / item.secondaryTarget) * 100, 100)}%` }}></div>
                              </div>
                           </>
                         )}
                      </div>

                    </div>
                  );
                })}
              </div>
           </div>
        </div>

        {/* --- RIGHT COLUMN: MAIN CONTENT (Quests, Leaderboard, Feed) --- */}
        <div className="lg:col-span-3 space-y-0 relative z-0">
          
          {/* SECTION 1: ACTIVE QUESTS */}
          <div className="mb-10">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                  {isInterlude ? 'Season Concluded' : 'Active Quests'}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider uppercase ${isInterlude ? 'bg-gray-700 text-gray-300 border-gray-600' : 'text-brand-season-primary bg-brand-season-primary/10 border-brand-season-primary/20'}`}>
                    {currentSeason} SEASON
                  </span>
                  
                  <span className={`text-[10px] font-mono border px-2 py-0.5 rounded flex items-center gap-2 ${isInterlude ? 'text-purple-400 border-purple-500/30 bg-purple-500/10' : 'text-gray-500 border-white/5 bg-white/5'}`}>
                    {isInterlude ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /> DRAWING PERIOD • {nextSeasonName} STARTS IN <span className="text-white font-bold">{timeLeft}</span></>
                    ) : (
                      <>ENDS IN <span className="text-gray-300">{timeLeft}</span></>
                    )}
                  </span>
                </h2>
              </div>
              <div className="space-y-4">
                {sortedGames.map((game) => {
                  const progress = MOCK_PLAYER_PROGRESS.find(p => p.gameId === game.id);
                  const percent = progress ? (progress.currentEssence / progress.maxEssence) * 100 : 0;
                  const isMastered = progress?.isMastered;
                  const isExpanded = expandedGameId === game.id;
                  
                  // Filter objectives based on the selected Season
                  const seasonalObjectives = game.objectives.filter(obj => obj.seasonId === currentSeason);

                  return (
                    <div 
                      key={game.id} 
                      className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                        isMastered 
                          ? 'bg-black/20 border-brand-season-secondary/20 opacity-75 grayscale-[0.3]' 
                          : isInterlude
                            ? 'bg-black/40 border-gray-800' // Darker styling for interlude
                            : isExpanded 
                                ? 'bg-brand-gray border-brand-season-primary/50 shadow-lg shadow-brand-season-primary/5' 
                                : 'bg-brand-dark border-brand-surface hover:border-brand-season-primary/30'
                      }`}
                    >
                      {/* Main Card Header (Clickable) */}
                      <div 
                        onClick={() => toggleGame(game.id)}
                        className="p-4 cursor-pointer flex items-center justify-between gap-4"
                      >
                         <div className="flex items-center gap-4 flex-1">
                            <img 
                              src={game.coverImage} 
                              alt={game.name} 
                              className={`w-12 h-12 rounded-lg object-cover ring-1 ${isMastered || isInterlude ? 'ring-brand-season-secondary/30 grayscale' : 'ring-white/10'}`} 
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-bold text-base ${isMastered || isInterlude ? 'text-gray-400' : 'text-white'}`}>{game.name}</h3>
                                {isMastered && <Check className="w-4 h-4 text-brand-season-secondary" />}
                                {game.guideUrl && (
                                  <a 
                                    href={game.guideUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="ml-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-brand-season-primary transition-colors border border-transparent hover:border-brand-season-primary/30 px-2 py-0.5 rounded bg-white/5 hover:bg-brand-season-primary/10"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    <span>Guide</span>
                                  </a>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="h-2 w-24 sm:w-32 bg-brand-black rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-500 ${isMastered ? 'bg-brand-season-secondary/70' : isInterlude ? 'bg-gray-600' : 'bg-season-gradient'}`}
                                    style={{ width: `${percent}%` }}
                                  ></div>
                                </div>
                                <span className={`text-xs font-mono font-bold ${isMastered ? 'text-brand-season-secondary/70' : 'text-gray-400'}`}>
                                  {progress?.currentEssence}/{progress?.maxEssence}
                                </span>
                              </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-3">
                           {isMastered ? (
                             <button className="hidden sm:flex w-24 justify-center px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-colors items-center gap-1 bg-brand-season-secondary/5 text-brand-season-secondary/70 border-brand-season-secondary/10 cursor-default">
                               Mastered
                             </button>
                           ) : isInterlude ? (
                            <button className="hidden sm:flex w-24 justify-center px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-colors items-center gap-1 bg-white/5 text-gray-500 border-white/5 cursor-not-allowed uppercase tracking-wider">
                              Closed
                            </button>
                           ) : (
                             <a 
                               href={game.playUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               onClick={(e) => e.stopPropagation()}
                               className="hidden sm:flex w-24 justify-center px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-colors items-center gap-1 bg-brand-surface border-brand-surface text-gray-300 hover:border-brand-season-primary/30 hover:text-brand-season-primary"
                             >
                               Launch
                             </a>
                           )}
                           <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-season-primary' : ''}`} />
                         </div>
                      </div>

                      {/* Accordion Content: Objectives */}
                      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 border-t border-brand-surface' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 bg-black/20 space-y-2">
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 px-1 font-bold">
                            {seasonalObjectives.length > 0 ? 'Season Objectives' : 'No Active Objectives'}
                          </p>
                          
                          {seasonalObjectives.length > 0 ? (
                            seasonalObjectives.map((obj) => (
                              <div key={obj.id} className="group flex items-center justify-between p-3 rounded-lg bg-brand-surface/30 hover:bg-brand-surface/60 transition-colors border border-transparent hover:border-white/5">
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border ${obj.isCompleted ? 'bg-brand-season-primary/20 text-brand-season-primary border-brand-season-primary/50' : 'bg-transparent border-gray-700'}`}>
                                    {obj.isCompleted ? <Check className="w-3 h-3" /> : <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" />}
                                  </div>
                                  <div>
                                    <h4 className={`text-xs font-bold ${obj.isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                                      {obj.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1">{obj.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${obj.isCompleted ? 'bg-brand-season-primary/10 text-brand-season-primary' : 'bg-brand-dark text-gray-400'}`}>
                                    {obj.isCompleted ? obj.points : 0}/{obj.points} PTS
                                  </span>
                                  {!obj.isCompleted && (
                                    isInterlude ? (
                                      <button className="w-24 justify-center py-1.5 text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-500 rounded flex items-center gap-1 cursor-not-allowed">
                                        Closed
                                      </button>
                                    ) : (
                                      <button className="w-24 justify-center py-1.5 text-[10px] font-bold uppercase tracking-wider bg-season-gradient text-white rounded transition-all hover:scale-105 flex items-center gap-1 group/btn shadow-lg shadow-brand-season-primary/20">
                                        {obj.ctaText || "Start"}
                                        <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover/btn:translate-x-0.5" />
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-gray-500 gap-2 opacity-60">
                               <CalendarOff className="w-6 h-6" />
                               <span className="text-xs">No active quests for {currentSeason} season.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>

           {/* SECTION 2: LEADERBOARD & FEED */}
           <div className="mt-12 mb-10 px-1">
             <h2 className="text-xl font-bold flex items-center gap-3 text-white mb-4">
               Community & Rankings
             </h2>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative">
                 {isInterlude && (
                    <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-brand-black/40 flex items-center justify-center rounded-2xl border border-white/5">
                       <div className="bg-brand-black border border-brand-season-primary/30 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-sm">
                          <div className="w-12 h-12 bg-brand-season-primary/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                             <Trophy className="w-6 h-6 text-brand-season-primary" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">Finalizing Results</h3>
                          <p className="text-gray-400 text-sm">
                            The {currentSeason} Season has ended. Our scribes are tabulating the final scores to ensure fairness. Final rankings will be revealed shortly.
                          </p>
                       </div>
                    </div>
                 )}
                 <div>
                  <Leaderboard currentSeason={currentSeason} />
                 </div>
              </div>
              <div className="lg:col-span-1 h-full">
                 <div className="h-full">
                  <ActivityFeed />
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};
