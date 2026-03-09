import { HeroSection } from '@/components/landing/HeroSection';
import { AgeGroupTabs } from '@/components/landing/AgeGroupTabs';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedPacks } from '@/components/landing/FeaturedPacks';
import { TestimonialSection } from '@/components/landing/TestimonialSection';
import { EmailCapture } from '@/components/landing/EmailCapture';
import { StoreLinks } from '@/components/landing/StoreLinks';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="vine-divider" />
      <AgeGroupTabs />
      <HowItWorks />
      <FeaturedPacks />
      <div className="vine-divider" />
      <TestimonialSection />
      <EmailCapture />
      <StoreLinks />
    </>
  );
}
