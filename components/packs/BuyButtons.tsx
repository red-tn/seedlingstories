import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface BuyButtonsProps {
  etsyUrl: string | null;
  gumroadUrl: string | null;
  isFree?: boolean;
}

export function BuyButtons({ etsyUrl, gumroadUrl, isFree }: BuyButtonsProps) {
  if (isFree) {
    return (
      <Button size="lg" variant="sprouts" className="w-full sm:w-auto" asChild>
        <a href="/free">
          <ShoppingBag className="w-4 h-4" />
          Get Free Pack
        </a>
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {etsyUrl && (
        <Button variant="etsy" size="lg" asChild>
          <a href={etsyUrl} target="_blank" rel="noopener noreferrer">
            Buy on Etsy
          </a>
        </Button>
      )}
      {gumroadUrl && (
        <Button variant="gumroad" size="lg" asChild>
          <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
            Buy on Gumroad
          </a>
        </Button>
      )}
    </div>
  );
}
