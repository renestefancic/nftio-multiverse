
export enum SeasonStatus {
  ACTIVE = 'ACTIVE',
  LOCKED = 'LOCKED',
  COMPLETED = 'COMPLETED'
}

export interface Season {
  id: string;
  name: string;
  element: 'Fire' | 'Water' | 'Wind' | 'Earth';
  status: SeasonStatus;
  dateRange: string;
  color: string;
  accent: string;
  highlights: string[];
}

export interface QuestObjective {
  id: string;
  title: string;
  description: string;
  points: number;
  isCompleted?: boolean;
  ctaText?: string;
}

export interface Game {
  id: string;
  name: string;
  coverImage: string;
  description: string;
  objectives: QuestObjective[];
  guideUrl?: string;
}

export interface PlayerProgress {
  gameId: string;
  currentEssence: number;
  maxEssence: number;
  isMastered: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  gamesPlayed: number;
  totalEssence: number;
  isCurrentUser?: boolean;
}

export interface Reward {
  id: string;
  name: string;
  type: 'Participation' | 'Artifact' | 'Jackpot';
  image: string;
  description: string;
  condition: string;
}