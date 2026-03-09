import { redirect } from 'next/navigation';

// Redirect to metadata step by default
export default async function PackOverviewPage({ params }: { params: Promise<{ packId: string }> }) {
  const { packId } = await params;
  redirect(`/admin/packs/${packId}/metadata`);
}
