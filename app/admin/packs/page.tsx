import { redirect } from 'next/navigation';

// /admin/packs just redirects to dashboard
export default function PacksPage() {
  redirect('/admin');
}
