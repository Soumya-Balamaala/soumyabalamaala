// app/page.tsx (or page.js if using JS)
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/home');
}
