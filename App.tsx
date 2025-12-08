
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Roadmap } from './components/Roadmap';
import { Mechanics } from './components/Mechanics';
import { Dashboard } from './components/Dashboard';
import { RewardsGallery } from './components/RewardsGallery';
import { Footer } from './components/Footer';
import { Search, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleConnect = () => {
    // Simulate connection delay
    setTimeout(() => {
      setIsWalletConnected(true);
    }, 800);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-secondary selection:text-white">
      
      {/* Sticky Navigation - NFT.io Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-[#040D21]/90 backdrop-blur-xl border-b border-brand-surface transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex justify-between items-center gap-8">
          
          {/* Left: Logo & Search */}
          <div className="flex items-center gap-8 flex-1">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsWalletConnected(false)}>
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
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-300">
               <a href="#" className="hover:text-white transition-colors">Explore</a>
               <a href="#" className="hover:text-white transition-colors">Marketplace</a>
               <a href="#" className="hover:text-white transition-colors">Create</a>
            </div>

            <div className="h-8 w-px bg-brand-surface hidden md:block"></div>

            <button 
              onClick={isWalletConnected ? () => setIsWalletConnected(false) : handleConnect}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${
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
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
           <div className="md:hidden absolute top-[80px] left-0 right-0 bg-brand-black border-b border-brand-surface p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
              <div className="flex items-center bg-brand-dark border border-brand-surface rounded-xl px-4 py-3">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <input type="text" placeholder="Search..." className="bg-transparent w-full text-white text-sm outline-none" />
              </div>
              <a href="#" className="text-white font-bold py-2">Explore</a>
              <a href="#" className="text-white font-bold py-2">Marketplace</a>
              <a href="#" className="text-white font-bold py-2">Create</a>
           </div>
        )}
      </nav>

      <main>
        {isWalletConnected ? (
          <Dashboard />
        ) : (
          <Hero onConnect={handleConnect} />
        )}

        <Roadmap />
        
        {/* Only show mechanics on public view */}
        {!isWalletConnected && <Mechanics />}
        
        <RewardsGallery />
      </main>

      <Footer />
    </div>
  );
};

export default App;
