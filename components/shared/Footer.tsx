import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { ETSY_SHOP_URL, GUMROAD_URL } from '@/lib/utils/constants';

export function Footer() {
  return (
    <footer className="relative bg-bark text-cream/80 overflow-hidden">
      {/* Botanical top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-seeds via-sprouts to-branches" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Seedling Stories"
                width={48}
                height={48}
                className="h-11 w-auto rounded-full"
              />
            </Link>
            <p className="text-sm text-cream/50 leading-relaxed">
              Planting God&apos;s Word in little hearts through beautiful, interactive Bible story packs.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Browse Packs', href: '/packs' },
                { label: 'Free Pack', href: '/free' },
                { label: 'Blog', href: '/blog' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-widest">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'For Parents', href: '/parents' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Redeem a Code', href: '/redeem' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-cream mb-4 text-sm uppercase tracking-widest">
              Shop
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={ETSY_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/50 hover:text-[#F1641E] transition-colors duration-200"
                >
                  Shop on Etsy
                </a>
              </li>
              <li>
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/50 hover:text-[#FF90E8] transition-colors duration-200"
                >
                  Shop on Gumroad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="mt-12 pt-8 border-t border-cream/10 text-center">
          <p className="font-display text-sm italic text-gold/60 mb-6">
            &ldquo;Train up a child in the way he should go: and when he is old, he will not depart from it.&rdquo;
            <span className="block mt-1 text-xs not-italic text-cream/30">
              &mdash; Proverbs 22:6
            </span>
          </p>
          <p className="text-xs text-cream/30 flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Seedling Stories. Made with
            <Heart className="w-3 h-3 text-rose inline fill-current" />
            for little ones.
          </p>
        </div>
      </div>
    </footer>
  );
}
