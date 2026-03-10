import { Button } from '@/components/ui/button';
import { ShoppingBag, Gift } from 'lucide-react';

interface BuyButtonsProps {
  etsyUrl: string | null;
  gumroadUrl: string | null;
  isFree?: boolean;
}

export function BuyButtons({ etsyUrl, gumroadUrl, isFree }: BuyButtonsProps) {
  if (isFree) {
    return (
      <div>
        <Button size="lg" variant="sprouts" className="w-full sm:w-auto" asChild>
          <a href="/free">
            <Gift className="w-4 h-4" />
            Get Free Pack
          </a>
        </Button>
        <p className="mt-2 text-xs text-bark/30 italic">No credit card required.</p>
      </div>
    );
  }

  const hasLinks = etsyUrl || gumroadUrl;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        {etsyUrl && (
          <Button variant="etsy" size="lg" asChild>
            <a href={etsyUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="w-4 h-4" />
              Buy on Etsy
            </a>
          </Button>
        )}
        {gumroadUrl && (
          <Button variant="gumroad" size="lg" asChild>
            <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="w-4 h-4" />
              Buy on Gumroad
            </a>
          </Button>
        )}
        {!hasLinks && (
          <Button size="lg" disabled className="opacity-60">
            <ShoppingBag className="w-4 h-4" />
            Coming Soon
          </Button>
        )}
      </div>
      <p className="mt-3 text-xs text-bark/40">
        One-time purchase. Own it forever. No subscriptions.
      </p>
    </div>
  );
}
