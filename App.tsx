import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Roadmap } from './components/Roadmap';
import { Mechanics } from './components/Mechanics';
import { Dashboard } from './components/Dashboard';
import { RewardsGallery } from './components/RewardsGallery';
import { Footer } from './components/Footer';
import { CampaignHeader } from './components/CampaignHeader';
import { Search, Menu, X, Wallet } from 'lucide-react';

export type SeasonType = 'Fire' | 'Water' | 'Wind' | 'Earth';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [currentSeason, setCurrentSeason] = useState<SeasonType>('Fire');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-season', currentSeason);
  }, [currentSeason]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleConnect = () => {
    // Simulate connection delay
    setTimeout(() => {
      setIsWalletConnected(true);
    }, 800);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-secondary selection:text-white transition-colors duration-300">
      
      {/* Sticky Navigation - NFT.io Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-brand-black/95 backdrop-blur-xl border-b border-brand-surface transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex justify-between items-center gap-4 md:gap-8">
          
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => setIsWalletConnected(false)}>
              <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-xl overflow-hidden shadow-lg shadow-brand-primary/20 transition-transform group-hover:scale-105">
                 <div className="absolute inset-0 bg-nft-gradient opacity-100"></div>
                 <span className="relative z-10 text-white font-black text-xl tracking-tighter">E</span>
              </div>
              <div className="flex flex-col justify-center hidden sm:flex">
                <span className="font-display font-bold tracking-tight text-white text-xl leading-none">nft.io</span>
                <span className="text-[10px] text-brand-secondary font-bold tracking-[0.2em] uppercase leading-none mt-1">Multiverse</span>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center bg-brand-dark border border-brand-surface rounded-xl px-4 py-2.5 w-full max-w-md focus-within:border-brand-primary/50 focus-within:bg-brand-gray transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search collections, assets, or users..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
              />
              <div className="flex items-center gap-1.5 ml-2">
                 <span className="text-[10px] bg-brand-surface text-gray-400 px-1.5 py-0.5 rounded border border-white/5 font-mono">/</span>
              </div>
            </div>
          </div>
          
          {/* Right: Links & Connect */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-300">
               <a href="#" className="hover:text-white transition-colors">Explore</a>
               <a href="#" className="hover:text-white transition-colors">Marketplace</a>
               <a href="#" className="hover:text-white transition-colors">Create</a>
            </div>

            <div className="h-8 w-px bg-brand-surface hidden md:block"></div>

            {/* Desktop Connect Button */}
            <button 
              onClick={isWalletConnected ? () => setIsWalletConnected(false) : handleConnect}
              className={`hidden md:block px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${
                isWalletConnected 
                  ? 'bg-brand-surface border border-white/10 text-white hover:bg-brand-gray' 
                  : 'bg-nft-gradient hover:bg-nft-gradient-hover text-white hover:scale-[1.02] shadow-brand-primary/30'
              }`}
            >
              {isWalletConnected ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                  0x8a...9f2
                </span>
              ) : 'Connect Wallet'}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
           <div className="md:hidden absolute top-[80px] left-0 right-0 bg-brand-black border-b border-brand-surface p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto">
              
              {/* Mobile Connect Button - Prominent */}
              <button 
                onClick={() => {
                  if (!isWalletConnected) handleConnect();
                  else setIsWalletConnected(false);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg mb-2 flex items-center justify-center gap-2 ${
                  isWalletConnected 
                    ? 'bg-brand-surface border border-white/10 text-white' 
                    : 'bg-nft-gradient text-white shadow-brand-primary/20'
                }`}
              >
                {isWalletConnected ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                    0x8a...9f2
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </>
                )}
              </button>

              <div className="flex items-center bg-brand-dark border border-brand-surface rounded-xl px-4 py-3">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <input type="text" placeholder="Search..." className="bg-transparent w-full text-white text-sm outline-none" />
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <a href="#" className="text-white font-bold py-3 px-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">Explore</a>
                <a href="#" className="text-white font-bold py-3 px-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">Marketplace</a>
                <a href="#" className="text-white font-bold py-3 px-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">Create</a>
              </div>
           </div>
        )}
      </nav>

      <CampaignHeader 
        isWalletConnected={isWalletConnected} 
        theme={theme}
        onToggleTheme={toggleTheme}
        currentSeason={currentSeason}
        onSetSeason={setCurrentSeason}
      />

      <main>
        {isWalletConnected ? (
          <Dashboard currentSeason={currentSeason} />
        ) : (
          <Hero onConnect={handleConnect} currentSeason={currentSeason} />
        )}

        <div id="roadmap">
          <Roadmap currentSeason={currentSeason} />
        </div>
        
        {/* Only show mechanics on public view */}
        {!isWalletConnected && (
          <div id="mechanics">
            <Mechanics />
          </div>
        )}
        
        <div id="rewards">
          <RewardsGallery currentSeason={currentSeason} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;