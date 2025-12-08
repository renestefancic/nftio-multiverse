
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020204] border-t border-white/5 py-12 px-4 md:px-8 text-sm relative z-10">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* FAQ Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h3>
          
          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              What is a Web3 Gaming Multiverse?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              <p className="mb-4">
                The Enjin Multiverse is a revolutionary gaming experience where your achievements transcend the boundaries of any single game. This gaming multiverse offers an exhilarating journey where your items and accomplishments move with you as you travel from game to game.
              </p>
              <p>
                Here, you can embark on thrilling cross-game quests, amass powerful items that grow in utility as more games join the multiverse. Your digital assets will gain new functions and abilities across more Enjin games each month, creating an ever-expanding gaming universe at your fingertips.
              </p>
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              What is a Multiverse Item?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              <p className="mb-4">
                Multiverse Items are the backbone of your cross-game dominance in the Enjin ecosystem. These extraordinary digital assets are more than just game items - they're your passport to enhanced gameplay across multiple realms.
              </p>
              <p>
                As you progress, you'll have the opportunity to build an arsenal of Multiverse Items. Each item offers unique abilities that evolve and expand as more Enjin games incorporate them. The more you play, the more powerful and versatile your collection becomes.
              </p>
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              How does the drawing for multiverse items and Degens work?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              Participation is automatic once you collect a minimum of 10 Essence points. The drawing system is weighted based on your performance—the more Essence you accumulate during the season, the higher your statistical chance of winning rare Multiverse Items or the exclusive 1-of-1 Degen NFT.
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              When are prizes distributed?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              All rewards are distributed at the conclusion of the season. Guaranteed items (like Blobs) and won raffle prizes (Artifacts & Degens) will be sent directly to your connected Enjin Wallet address automatically.
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              I'm a game and I want to participate! How do I do that?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              We are constantly looking to expand the Primal Forces event with new worlds and challenges! If you are a game developer and want to integrate your project into the Enjin Multiverse, please get in touch with our team via the <a href="https://enjin.io/contact" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-secondary underline decoration-brand-primary/30 underline-offset-4">Enjin Contact Page</a>.
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              Why is there a 180 point cap?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              The cap ensures fair play and encourages travelers to explore the breadth of the Multiverse rather than grinding a single game endlessly.
            </div>
          </details>

          <details className="group glass-panel rounded-xl overflow-hidden bg-brand-dark border-none">
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none text-gray-300 font-medium hover:text-brand-primary transition-colors">
              Do I need to pay gas fees?
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-0 text-gray-400 border-t border-white/5 mt-2 leading-relaxed">
              No. Essence points are tracked off-chain for the duration of the season. Minting your final rewards at the end of the season may incur a negligible fee on the Enjin Matrixchain.
            </div>
          </details>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-600">
          <div>&copy; 2026 Enjin. All rights reserved.</div>
          <div className="flex space-x-8 mt-4 md:mt-0 font-medium">
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
