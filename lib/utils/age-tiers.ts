export type AgeTier = 'seeds' | 'sprouts' | 'branches' | 'roots';

export const AGE_TIERS: Record<AgeTier, {
  label: string;
  ageRange: string;
  color: string;
  colorLight: string;
  colorDark: string;
  emoji: string;
  icon: string;
  description: string;
}> = {
  seeds: {
    label: 'Seeds',
    ageRange: '2–4',
    color: '#F5A623',
    colorLight: '#FFF8E7',
    colorDark: '#D4841F',
    emoji: '🌱',
    icon: '/images/tier-seeds.png',
    description: 'God made me, God loves me',
  },
  sprouts: {
    label: 'Sprouts',
    ageRange: '4–6',
    color: '#66BB6A',
    colorLight: '#E8F5E9',
    colorDark: '#388E3C',
    emoji: '🌿',
    icon: '/images/tier-sprouts.png',
    description: 'Key Bible stories & kindness',
  },
  branches: {
    label: 'Branches',
    ageRange: '6–9',
    color: '#42A5F5',
    colorLight: '#E3F2FD',
    colorDark: '#1565C0',
    emoji: '🌳',
    icon: '/images/tier-branches.png',
    description: 'Character studies & parables',
  },
  roots: {
    label: 'Roots',
    ageRange: '9–12',
    color: '#AB47BC',
    colorLight: '#F3E5F5',
    colorDark: '#7B1FA2',
    emoji: '🏔️',
    icon: '/images/tier-roots.png',
    description: 'Deeper theology & reflection',
  },
};

export const AGE_TIER_ORDER: AgeTier[] = ['seeds', 'sprouts', 'branches', 'roots'];
