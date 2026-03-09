import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { AGE_TIERS, type AgeTier } from '@/lib/utils/age-tiers';

interface AgeBadgeProps {
  tier: AgeTier;
  showAge?: boolean;
  size?: 'sm' | 'default';
}

export function AgeBadge({ tier, showAge = true, size = 'default' }: AgeBadgeProps) {
  const info = AGE_TIERS[tier];
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <Badge
      variant={tier}
      className={`${size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''} inline-flex items-center gap-1`}
    >
      <Image src={info.icon} alt="" width={iconSize} height={iconSize} className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} />
      {info.label}{showAge ? ` (${info.ageRange})` : ''}
    </Badge>
  );
}
