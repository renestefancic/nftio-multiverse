
import { Game, LeaderboardEntry, PlayerProgress, Reward, Season, SeasonStatus } from './types';

export const SEASONS: Season[] = [
  { 
    id: 'q1', 
    name: 'Fire', 
    element: 'Fire', 
    status: SeasonStatus.ACTIVE, 
    dateRange: 'Jan 16 - Mar 31',
    color: 'text-orange-500',
    accent: 'border-orange-500 shadow-[0_0_30px_rgba(255,85,0,0.15)]',
    highlights: ['Magma Blob', 'Eternal Embers', 'Emberborne Degen']
  },
  { 
    id: 'q2', 
    name: 'Water', 
    element: 'Water', 
    status: SeasonStatus.LOCKED, 
    dateRange: 'Apr 13 - Jun 30',
    color: 'text-blue-500',
    accent: 'border-blue-500',
    highlights: ['Coral Blob', 'Seafoam Amulet', 'Tidalborne Degen']
  },
  { 
    id: 'q3', 
    name: 'Wind', 
    element: 'Wind', 
    status: SeasonStatus.LOCKED, 
    dateRange: 'Jul 13 - Sep 30',
    color: 'text-cyan-200',
    accent: 'border-cyan-200',
    highlights: ['Zephyr Blob', 'Windstruck Tome', 'Stormborne Degen']
  },
  { 
    id: 'q4', 
    name: 'Earth', 
    element: 'Earth', 
    status: SeasonStatus.LOCKED, 
    dateRange: 'Oct 9 - Dec 18',
    color: 'text-emerald-500',
    accent: 'border-emerald-500',
    highlights: ['Moss Blob', 'Bedrock Helm', 'Stoneborne Degen']
  },
];

export const GAMES: Game[] = [
  {
    id: 'g1',
    name: 'The Etherscape',
    coverImage: 'https://picsum.photos/seed/etherscape/400/300',
    description: 'A dark fantasy dungeon crawler. Explore the depths.',
    guideUrl: 'https://enjin.io/help-center',
    objectives: [
      { id: 'o1', title: 'Daily Login', description: 'Log in to the game server.', points: 5, isCompleted: true, ctaText: 'Launch' },
      { id: 'o2', title: 'Complete Floor 1', description: 'Clear the first floor of the dungeon.', points: 25, isCompleted: true, ctaText: 'Enter' },
      { id: 'o3', title: 'Find Rare Gem', description: 'Loot a rare gem from a chest.', points: 50, isCompleted: false, ctaText: 'Search' },
      { id: 'o4', title: 'Defeat 50 Skeletons', description: 'Eliminate skeleton warriors.', points: 40, isCompleted: false, ctaText: 'Hunt' },
      { id: 'o5', title: 'Craft Potion', description: 'Brew a health potion.', points: 10, isCompleted: false, ctaText: 'Craft' }
    ]
  },
  {
    id: 'g2',
    name: 'Lost Relics',
    coverImage: 'https://picsum.photos/seed/relics/400/300',
    description: 'Action-adventure RPG. Hack and slash your way to glory.',
    guideUrl: 'https://enjin.io/help-center',
    objectives: [
      { id: 'o1', title: 'Clear Spooky Dungeon', description: 'Complete the level without dying.', points: 30, isCompleted: true, ctaText: 'Enter' },
      { id: 'o2', title: 'Find Ancient Artifact', description: 'Loot a legendary item from a chest.', points: 50, isCompleted: true, ctaText: 'Search' },
      { id: 'o3', title: 'Defeat Boss', description: 'Kill the Level 10 Dungeon Boss.', points: 40, isCompleted: true, ctaText: 'Fight' },
      { id: 'o4', title: 'Collect 100 Gold', description: 'Gather gold coins from fallen enemies.', points: 10, isCompleted: false, ctaText: 'Collect' },
      { id: 'o5', title: 'Equip Rare Armor', description: 'Wear a full set of Rare quality gear.', points: 50, isCompleted: false, ctaText: 'Equip' }
    ]
  },
  {
    id: 'g3',
    name: 'The Six Dragons',
    coverImage: 'https://picsum.photos/seed/dragons/400/300',
    description: 'Open world RPG. Slay dragons, craft items, own the world.',
    guideUrl: 'https://enjin.io/help-center',
    objectives: [
      { id: 'o1', title: 'Craft a Fire Sword', description: 'Forge a weapon using Ember Steel.', points: 50, isCompleted: true, ctaText: 'Craft' },
      { id: 'o2', title: 'Slay 10 Goblins', description: 'Defeat 10 Goblin enemies in the Dark Forest.', points: 20, isCompleted: true, ctaText: 'Hunt' },
      { id: 'o3', title: 'Complete Epic Raid', description: 'Participate in the Molten Core raid.', points: 100, isCompleted: false, ctaText: 'Join Raid' },
      { id: 'o4', title: 'Trade 5 Items', description: 'Sell or trade items on the marketplace.', points: 9, isCompleted: false, ctaText: 'Trade' },
      { id: 'o5', title: 'Visit Capital City', description: 'Discover the main hub.', points: 1, isCompleted: true, ctaText: 'Travel' }
    ]
  },
  {
    id: 'g4',
    name: 'ENJ Excavators',
    coverImage: 'https://picsum.photos/seed/excavators/400/300',
    description: 'Strategic mining simulation. Dig deep for fortune.',
    guideUrl: 'https://enjin.io/help-center',
    objectives: [
      { id: 'o1', title: 'Upgrade Drill', description: 'Reach level 5 with your main drill.', points: 30, isCompleted: false, ctaText: 'Upgrade' },
      { id: 'o2', title: 'Find Obsidan', description: 'Extract 10 units of Obsidian.', points: 40, isCompleted: false, ctaText: 'Dig' },
      { id: 'o3', title: 'Hire Crew', description: 'Recruit a full mining crew.', points: 20, isCompleted: false, ctaText: 'Recruit' },
      { id: 'o4', title: 'Unlock Region 2', description: 'Gain access to the Magma Core.', points: 50, isCompleted: false, ctaText: 'Travel' },
      { id: 'o5', title: 'Daily Contract', description: 'Complete a daily guild contract.', points: 10, isCompleted: false, ctaText: 'Contract' }
    ]
  },
  {
    id: 'g5',
    name: 'Into The Multiverse',
    coverImage: 'https://picsum.photos/seed/multiverse/400/300',
    description: 'Sci-fi shooter. Battle across dimensions.',
    guideUrl: 'https://enjin.io/help-center',
    objectives: [
      { id: 'o1', title: 'Win Deathmatch', description: 'Place 1st in a multiplayer match.', points: 60, isCompleted: false, ctaText: 'Battle' },
      { id: 'o2', title: 'Capture Flag', description: 'Secure the objective 3 times.', points: 30, isCompleted: false, ctaText: 'Play CTF' },
      { id: 'o3', title: 'Unlock Laser Rifle', description: 'Purchase the weapon from armory.', points: 40, isCompleted: false, ctaText: 'Shop' },
      { id: 'o4', title: 'Survive Waves', description: 'Survive 10 waves of aliens.', points: 40, isCompleted: false, ctaText: 'Survival' },
      { id: 'o5', title: 'Customize Avatar', description: 'Change your suit color.', points: 10, isCompleted: false, ctaText: 'Customize' }
    ]
  },
];

export const MOCK_PLAYER_PROGRESS: PlayerProgress[] = [
  { gameId: 'g1', currentEssence: 30, maxEssence: 180, isMastered: false }, // Etherscape
  { gameId: 'g2', currentEssence: 120, maxEssence: 180, isMastered: false }, // Lost Relics
  { gameId: 'g3', currentEssence: 71, maxEssence: 180, isMastered: false }, // Six Dragons
  { gameId: 'g4', currentEssence: 0, maxEssence: 180, isMastered: false }, // Excavators
  { gameId: 'g5', currentEssence: 0, maxEssence: 180, isMastered: false }, // Into Multiverse
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, address: '0x8a...9f2', gamesPlayed: 5, totalEssence: 850 },
  { rank: 2, address: '0xb2...1c4', gamesPlayed: 5, totalEssence: 820 },
  { rank: 3, address: '0x7c...3d1', gamesPlayed: 4, totalEssence: 680 },
  { rank: 4, address: '0x9d...2a5', gamesPlayed: 4, totalEssence: 650 },
  { rank: 5, address: '0x4f...8b9', gamesPlayed: 3, totalEssence: 520 },
  { rank: 6, address: '0x2a...1c3', gamesPlayed: 3, totalEssence: 490 },
  { rank: 7, address: '0xe1...5d4', gamesPlayed: 3, totalEssence: 450 },
  { rank: 8, address: '0x7b...9e2', gamesPlayed: 2, totalEssence: 390 },
  { rank: 9, address: '0x5c...3f1', gamesPlayed: 2, totalEssence: 360 },
  { rank: 42, address: 'You', gamesPlayed: 3, totalEssence: 221, isCurrentUser: true },
];

export const REWARDS: Reward[] = [
  {
    id: 'r1',
    name: 'Magma Blob',
    type: 'Participation',
    image: '',
    description: 'A fiery companion. Guaranteed drop.',
    condition: 'Earn 10+ Essence'
  },
  {
    id: 'r2',
    name: 'Epic Magma Blob',
    type: 'Participation',
    image: '',
    description: 'An evolved form radiating intense heat.',
    condition: '100+ Essence & 2 Games'
  },
  {
    id: 'r3',
    name: 'Legendary Magma Blob',
    type: 'Participation',
    image: '',
    description: 'The ultimate manifestation of Fire.',
    condition: '300+ Essence & 2 Games'
  },
  {
    id: 'r4',
    name: 'Eternal Embers',
    type: 'Artifact',
    image: '',
    description: 'Rare multiverse item. 5% of top players.',
    condition: 'Raffle (Min 10 Essence)'
  },
  {
    id: 'r5',
    name: 'Emberborne Degen',
    type: 'Jackpot',
    image: '',
    description: '1 of 1 Unique Season Avatar.',
    condition: 'Raffle (Min 10 Essence)'
  }
];
