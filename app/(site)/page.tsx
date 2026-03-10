import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { AgeGroupTabs } from '@/components/landing/AgeGroupTabs';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedPacks } from '@/components/landing/FeaturedPacks';
import { TestimonialSection } from '@/components/landing/TestimonialSection';
import { EmailCapture } from '@/components/landing/EmailCapture';
import { StoreLinks } from '@/components/landing/StoreLinks';
import { WaveDivider } from '@/components/landing/WaveDivider';
import { createServiceClient } from '@/lib/supabase/server';
import type { Pack } from '@/lib/types/pack';

export const revalidate = 60;

async function getPublishedPacks(): Promise<Pack[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('packs')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Failed to fetch packs:', error.message);
      return [];
    }

    return (data as Pack[]) ?? [];
  } catch (err) {
    console.error('Failed to fetch packs:', err);
    return [];
  }
}

export default async function HomePage() {
  const packs = await getPublishedPacks();

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AgeGroupTabs packs={packs} />
      <WaveDivider color="white" />
      <HowItWorks />
      <WaveDivider color="cream-dark" />
      <FeaturedPacks />
      <WaveDivider color="cream-dark" flip />
      <TestimonialSection />
      <WaveDivider color="cream" />
      <EmailCapture />
      <StoreLinks />
    </>
  );
}
